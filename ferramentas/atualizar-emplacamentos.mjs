// Gera emplacamentos/dados.json com os últimos 12 meses publicados.
// Fonte principal: informes mensais da Fenabrave. O ranking do Guia Carros completa os modelos fora das listas oficiais.
// Uso: node ferramentas/atualizar-emplacamentos.mjs [--forcar] [--cache pasta] [--fen-cache tabelas.json] [--ref AAAA-MM]
// Requer Python com pypdf (variável PYTHON aponta o executável, se necessário).
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { lerRanking, urlMes } from './emplacamentos-fonte.mjs';
import { ALIASES, CATEGORIAS, SISTEMA } from './emplacamentos-config.mjs';
import { idFenabrave } from './fenabrave-nomes.mjs';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(AQUI, '..');
const SAIDA = path.join(RAIZ, 'emplacamentos', 'dados.json');
const PORTAL = 'https://www.fenabrave.org.br/portalv2/Conteudo/emplacamentos';
const NOMES = ['janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const CURTOS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const CABECALHO = { 'User-Agent': 'Mozilla/5.0 (compatible; comparador-suv/1.0)' };
const TOLERANCIA = 0.02;
// A Fenabrave lista EX5 e EX5 EM-i em separado, e o painel soma os dois.
const SEM_CALCULO = new Set(['geely/ex5']);
const arg = n => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : null; };
const cache = arg('--cache');
const fenCache = arg('--fen-cache');
const forcar = process.argv.includes('--forcar');
const espera = ms => new Promise(r => setTimeout(r, ms));
const chave = (a, m) => `${a}-${String(m).padStart(2, '0')}`;
const separar = k => k.split('-').map(Number);

async function pedir(url) {
  const r = await fetch(url, { headers: CABECALHO });
  if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
  return r;
}
const baixar = async url => (await pedir(url)).text();

async function ultimoGuia() {
  const html = await baixar('https://guiacarros.com.br/mais-vendidos');
  const t = html.match(/<title>[^<]*em\s+(\S+)\s+de\s+(\d{4})/i);
  if (!t) throw new Error('Não foi possível identificar o mês mais recente no Guia Carros');
  const nome = t[1].toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  return chave(Number(t[2]), NOMES.indexOf(nome) + 1);
}

// O nome dos arquivos não é regular, então os endereços vêm da própria página da Fenabrave.
async function informesPublicados() {
  const html = await baixar(PORTAL);
  const achados = {};
  for (const m of html.matchAll(/href=["']([^"']*\/portal\/files\/(\d{4})_(\d{2})_[^"']*\.pdf)["']/gi)) {
    const k = `${m[2]}-${m[3]}`;
    if (!achados[k]) achados[k] = new URL(m[1].replace(/ /g, '%20'), PORTAL).href;
  }
  if (!Object.keys(achados).length) throw new Error('Nenhum informe encontrado na página da Fenabrave');
  return achados;
}

async function lerInformes(meses, enderecos) {
  const pasta = fs.mkdtempSync(path.join(os.tmpdir(), 'fenabrave-'));
  try {
    const pares = [];
    for (const k of meses) {
      if (!enderecos[k]) throw new Error(`Informe de ${k} não publicado`);
      const r = await pedir(enderecos[k]);
      const arq = path.join(pasta, `${k}.pdf`);
      fs.writeFileSync(arq, Buffer.from(await r.arrayBuffer()));
      pares.push(`${k}=${arq}`);
      await espera(900);
    }
    const destino = path.join(pasta, 'tabelas.json');
    const p = spawnSync(process.env.PYTHON || 'python', [path.join(AQUI, 'fenabrave_pdf.py'), destino, ...pares], { encoding: 'utf8' });
    if (p.status !== 0) throw new Error(`Leitura dos PDFs falhou: ${p.stderr || p.error}`);
    return JSON.parse(fs.readFileSync(destino, 'utf8'));
  } finally {
    fs.rmSync(pasta, { recursive: true, force: true });
  }
}

async function lerMesGuia(ano, mes) {
  if (cache) return fs.readFileSync(path.join(cache, `${ano}-${NOMES[mes - 1]}.html`), 'utf8');
  await espera(900);
  return baixar(urlMes(ano, mes));
}

function consolidar(linhas) {
  const m = new Map();
  for (const l of linhas) {
    const id = ALIASES[l.id] || l.id;
    m.set(id, (m.get(id) || 0) + l.unidades);
  }
  return m;
}

// Posição 1 = maior volume; empates dividem a mesma posição.
function posicoes(mapa, filtro = () => true) {
  const vals = [...mapa].filter(([id, v]) => v > 0 && filtro(id)).map(([, v]) => v).sort((a, b) => b - a);
  const primeira = new Map();
  vals.forEach((v, i) => { if (!primeira.has(v)) primeira.set(v, i + 1); });
  return { de: vals.length, pos: id => (mapa.get(id) > 0 && filtro(id) ? primeira.get(mapa.get(id)) : null) };
}

const categoriaDe = new Map([['fen:BYD/SONG', 'medio']]);
for (const [c, def] of Object.entries(CATEGORIAS)) {
  for (const id of def.ids) {
    if (categoriaDe.has(id)) throw new Error(`Modelo em duas categorias: ${id}`);
    categoriaDe.set(id, c);
  }
}
const naCategoria = c => id => categoriaDe.get(id) === c;
const LISTA_CATS = Object.keys(CATEGORIAS);

// ---------- Referência ----------
const existente = fs.existsSync(SAIDA) ? JSON.parse(fs.readFileSync(SAIDA, 'utf8')) : null;
let tabelas = fenCache ? JSON.parse(fs.readFileSync(fenCache, 'utf8')) : null;
const enderecos = tabelas ? null : await informesPublicados();
const ultimoFen = Object.keys(tabelas || enderecos).sort().at(-1);
const ultimoCompl = arg('--ref') || (cache ? ultimoFen : await ultimoGuia());
const refChave = [ultimoFen, ultimoCompl].sort()[0];
if (existente && existente.referencia === refChave && !forcar) {
  console.log(`Base já atualizada até ${refChave}. Nada a fazer.`);
  process.exit(0);
}
const [refAno, refMes] = separar(refChave);
const janela = [];
for (let i = 11; i >= 0; i--) {
  const d = new Date(Date.UTC(refAno, refMes - 1 - i, 1));
  janela.push({ ano: d.getUTCFullYear(), mes: d.getUTCMonth() + 1, id: chave(d.getUTCFullYear(), d.getUTCMonth() + 1) });
}
if (!tabelas) tabelas = await lerInformes(janela.map(j => j.id), enderecos);

// ---------- Leitura das listas oficiais ----------
const brutos = [];
for (const j of janela) {
  const linhas = lerRanking(await lerMesGuia(j.ano, j.mes));
  if (linhas.length < 100) throw new Error(`Ranking incompleto em ${j.id}: ${linhas.length} linhas`);
  if (!tabelas[j.id]) throw new Error(`Informe da Fenabrave ausente: ${j.id}`);
  brutos.push({ ...j, linhas });
}
const conhecidos = new Set(brutos.flatMap(b => b.linhas.map(l => l.id)));
const idFen = nome => idFenabrave(nome, conhecidos);

function lista(tabela) {
  const mapa = new Map(), nomes = new Map();
  for (const [n, u] of [...tabela.auto, ...tabela.cl]) {
    const id = idFen(n);
    mapa.set(id, (mapa.get(id) || 0) + u);
    if (!nomes.has(id)) nomes.set(id, new Set());
    nomes.get(id).add(n);
  }
  const fim = t => (t.length >= 50 ? t.at(-1)[1] : 0);
  const geral = posicoes(mapa);
  const cats = Object.fromEntries(LISTA_CATS.map(c => [c, posicoes(mapa, naCategoria(c))]));
  return { mapa, nomes, corte: Math.max(fim(tabela.auto), fim(tabela.cl)), corteAuto: fim(tabela.auto), geral, cats };
}

function grupoCanais(total, varejo, direta) {
  const g = { total: lista(total), varejo: lista(varejo), direta: lista(direta), todos: new Map() };
  for (const l of [g.total, g.varejo, g.direta]) {
    for (const [id, ns] of l.nomes) {
      if (!g.todos.has(id)) g.todos.set(id, new Set());
      ns.forEach(n => g.todos.get(id).add(n));
    }
  }
  return g;
}
// Um modelo com mais de um nome na Fenabrave só vale se todos os nomes estiverem na lista.
const completo = (g, l, id) => l.mapa.has(id) && [...(g.todos.get(id) || [])].every(n => l.nomes.get(id).has(n));

function oficializar(mapa, g) {
  const oficiais = new Set();
  for (const [id, u] of g.total.mapa) {
    if (id.startsWith('fen:') || !completo(g, g.total, id)) continue;
    const base = mapa.get(id);
    if (base > 0 && Math.abs(u - base) / base <= TOLERANCIA) { mapa.set(id, u); oficiais.add(id); }
  }
  return oficiais;
}

function canal(g, id, tot) {
  if (!tot) return { v: 0, d: 0, t: 'o' };
  const v = completo(g, g.varejo, id) ? g.varejo.mapa.get(id) : null;
  const d = completo(g, g.direta, id) ? g.direta.mapa.get(id) : null;
  const vazio = { v: null, d: null, t: null };
  if (v != null && d != null) return Math.abs(v + d - tot) / tot > TOLERANCIA ? vazio : { v, d, t: 'o' };
  // Sem as duas listas, a conta só vale quando o total oficial é do mesmo conjunto de versões.
  if (SEM_CALCULO.has(id)) return vazio;
  if (completo(g, g.total, id) && Math.abs(g.total.mapa.get(id) - tot) / tot > TOLERANCIA) return vazio;
  // O valor calculado não pode superar o corte da lista em que o modelo não apareceu.
  if (v != null && v <= tot && tot - v <= g.direta.corteAuto) return { v, d: tot - v, t: 'd' };
  if (d != null && d <= tot && tot - d <= g.varejo.corteAuto) return { v: tot - d, d, t: 'v' };
  return vazio;
}
function posCanal(g, nome, id, cat) {
  const l = g[nome];
  if (!completo(g, l, id) || l.mapa.get(id) < l.corte) return { g: null, c: null };
  return { g: l.geral.pos(id), c: l.cats[cat].pos(id) };
}

// ---------- Meses e períodos ----------
const meses = brutos.map(b => {
  const t = tabelas[b.id];
  const grupo = grupoCanais(t.total, t.varejo, t.direta);
  const mapa = consolidar(b.linhas);
  const oficiais = oficializar(mapa, grupo);
  return { ...b, mapa, grupo, oficiais, geral: posicoes(mapa), cats: Object.fromEntries(LISTA_CATS.map(c => [c, posicoes(mapa, naCategoria(c))])) };
});

function resumo(lista_, grupo) {
  const mapa = new Map();
  for (const x of lista_) for (const [id, v] of x.mapa) mapa.set(id, (mapa.get(id) || 0) + v);
  const oficiais = grupo ? oficializar(mapa, grupo) : new Set();
  return { mapa, oficiais, geral: posicoes(mapa), cats: Object.fromEntries(LISTA_CATS.map(c => [c, posicoes(mapa, naCategoria(c))])), total: [...mapa.values()].reduce((a, b) => a + b, 0) };
}
const tRef = tabelas[refChave];
const grupoAno = grupoCanais(tRef.totalAno, tRef.varejoAno, tRef.diretaAno);
const ano = resumo(meses.filter(m => m.ano === refAno), grupoAno);
const doze = resumo(meses);

const modelos = SISTEMA.map(s => {
  const c = categoriaDe.get(s.id);
  if (!c) throw new Error(`Modelo do painel sem categoria: ${s.id}`);
  if (!ano.mapa.has(s.id) && !doze.mapa.has(s.id)) throw new Error(`Modelo do painel fora da fonte: ${s.id}`);
  const porMes = meses.map(m => {
    const tot = m.mapa.get(s.id) || 0;
    const k = canal(m.grupo, s.id, tot);
    const pv = posCanal(m.grupo, 'varejo', s.id, c), pd = posCanal(m.grupo, 'direta', s.id, c);
    return { ...k, pv, pd };
  });
  const totAno = ano.mapa.get(s.id) || 0;
  let kAno = canal(grupoAno, s.id, totAno);
  if (kAno.v == null) {
    // Fora das listas do acumulado: soma os meses do ano, se todos tiverem a divisão.
    const doAno = porMes.filter((_, i) => meses[i].ano === refAno);
    if (doAno.every(x => x.v != null)) {
      const v = doAno.reduce((a, x) => a + x.v, 0), d = doAno.reduce((a, x) => a + x.d, 0);
      if (totAno && Math.abs(v + d - totAno) / totAno <= TOLERANCIA) kAno = { v, d: totAno - v, t: 's' };
    }
  }
  const pvAno = posCanal(grupoAno, 'varejo', s.id, c), pdAno = posCanal(grupoAno, 'direta', s.id, c);
  // 12 meses: acumulado do ano mais os meses do ano anterior, quando todos têm a divisão.
  const antes = porMes.filter((_, i) => meses[i].ano !== refAno);
  const totDoze = doze.mapa.get(s.id) || 0;
  let kDoze = { v: null, d: null, t: null };
  if (kAno.v != null && antes.every(x => x.v != null)) {
    const v = kAno.v + antes.reduce((a, x) => a + x.v, 0), d = kAno.d + antes.reduce((a, x) => a + x.d, 0);
    if (!totDoze || Math.abs(v + d - totDoze) / totDoze <= TOLERANCIA) {
      kDoze = { v, d: totDoze - v, t: kAno.t === 'o' && antes.every(x => x.t === 'o') ? 'o' : 's' };
    }
  }
  return {
    id: s.id, nome: s.nome, abas: s.abas, categoria: c, nota: s.nota || '', divisao: s.divisao || null,
    un: meses.map(m => m.mapa.get(s.id) || 0),
    geral: meses.map(m => m.geral.pos(s.id)),
    cat: meses.map(m => m.cats[c].pos(s.id)),
    oficial: meses.map(m => m.oficiais.has(s.id)),
    varejo: porMes.map(x => x.v), direta: porMes.map(x => x.d), tipo: porMes.map(x => x.t),
    geralV: porMes.map(x => x.pv.g), catV: porMes.map(x => x.pv.c),
    geralD: porMes.map(x => x.pd.g), catD: porMes.map(x => x.pd.c),
    ano: {
      un: totAno, geral: ano.geral.pos(s.id), cat: ano.cats[c].pos(s.id), oficial: ano.oficiais.has(s.id),
      varejo: kAno.v, direta: kAno.d, tipo: kAno.t, geralV: pvAno.g, catV: pvAno.c, geralD: pdAno.g, catD: pdAno.c
    },
    doze: {
      un: doze.mapa.get(s.id) || 0, geral: doze.geral.pos(s.id), cat: doze.cats[c].pos(s.id),
      oficial: meses.every(m => m.oficiais.has(s.id) || !(m.mapa.get(s.id) > 0)),
      varejo: kDoze.v, direta: kDoze.d, tipo: kDoze.t,
      geralV: null, catV: null, geralD: null, catD: null
    }
  };
});

const contagem = r => Object.fromEntries(LISTA_CATS.map(c => [c, r.cats[c].de]));
const saida = {
  versao: 2,
  coletadoEm: new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date()),
  referencia: refChave,
  fonte: { nome: 'Fenabrave', url: PORTAL },
  complementar: { nome: 'Guia Carros', url: 'https://guiacarros.com.br/mais-vendidos' },
  meses: meses.map(m => ({ id: m.id, rotulo: `${CURTOS[m.mes - 1]}/${String(m.ano).slice(2)}`, total: tabelas[m.id].mercado.mes, modelos: m.geral.de, cats: contagem(m) })),
  periodos: {
    ano: { rotulo: `jan a ${CURTOS[refMes - 1]}/${refAno}`, total: tRef.mercado.ano, modelos: ano.geral.de, cats: contagem(ano) },
    doze: { rotulo: '12 meses', total: meses.reduce((a, m) => a + tabelas[m.id].mercado.mes, 0), modelos: doze.geral.de, cats: contagem(doze) }
  },
  categorias: Object.fromEntries(Object.entries(CATEGORIAS).map(([c, d]) => [c, d.nome])),
  modelos
};
fs.mkdirSync(path.dirname(SAIDA), { recursive: true });
fs.writeFileSync(SAIDA, JSON.stringify(saida) + '\n');
console.log(`Referência ${refChave}: ${modelos.length} modelos do painel, ${doze.geral.de} no mercado em 12 meses.`);
