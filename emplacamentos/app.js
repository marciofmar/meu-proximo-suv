// Aba de emplacamentos: tabelas e gráficos só dos modelos do painel, por total, varejo e venda direta.
(function () {
  'use strict';

  const URL_DADOS = './emplacamentos/dados.json';
  const CORES = ['var(--s1)', 'var(--s2)', 'var(--s3)', 'var(--s4)', 'var(--s5)', 'var(--s6)'];
  const MAX_LINHAS = CORES.length;
  const BASE_VARIACAO = 30; // abaixo disso no mês anterior, a variação percentual não diz nada
  const TIPOS = { h: 'híbrido', e: 'elétrico', he: 'elétrico e híbrido' };
  const METRICAS = { un: 'Emplacamentos', geral: 'Posição geral', cat: 'Posição na categoria' };
  const CANAIS = { total: 'Total', varejo: 'Varejo', direta: 'Venda direta' };
  const NO_CANAL = { varejo: 'no varejo', direta: 'na venda direta' };
  const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const raiz = document.getElementById('painelEmplacamentos');
  const estado = { escopo: 'todos', periodo: 'mes', mes: '', canal: 'total', metrica: 'un', ordem: { k: 'total', dir: -1 }, sel: [], cor: {} };
  let D = null, montado = false, carregando = null, mesHover = null;

  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const n = v => new Intl.NumberFormat('pt-BR').format(v);
  const pct = (v, d = 1) => new Intl.NumberFormat('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
  const pos = v => (v == null ? '—' : `${v}º`);
  const ult = () => D.meses.length - 1;
  const rotuloRef = () => D.meses[ult()].rotulo;
  const indiceMes = () => estado.mes ? D.meses.findIndex(m => m.id === estado.mes) : ult();
  const nomeMes = id => {
    const [ano, mes] = id.split('-');
    const nome = MESES[Number(mes) - 1];
    return `${nome[0].toUpperCase()}${nome.slice(1)} de ${ano}`;
  };
  const dataBr = iso => iso.split('-').reverse().join('/');

  const noEscopo = m => estado.escopo === 'todos' || m.abas.includes(estado.escopo === 'hibridos' ? 'h' : 'e');
  const lista = () => D.modelos.filter(noEscopo);

  function serie(m, k = estado.metrica, c = estado.canal) {
    if (c === 'varejo') return { un: m.varejo, geral: m.geralV, cat: m.catV }[k];
    if (c === 'direta') return { un: m.direta, geral: m.geralD, cat: m.catD }[k];
    return m[k];
  }
  const totalComplementar = (m, i) => m.evolucaoTotal?.meses[D.meses[i]?.id];
  const faltaRegistro = (m, i) => m.un[i] === 0 && totalComplementar(m, i) > 0;

  function pontosEvolucao(m) {
    const { canal, metrica } = estado;
    return serie(m, metrica, canal).map((valor, i) => {
      const extra = canal === 'total' && metrica === 'un' ? totalComplementar(m, i) : null;
      if (extra != null) return { valor: extra, fonte: m.evolucaoTotal.fonte };
      if (m.un[i] === 0) return { valor: null, motivo: 'Sem registro separado no ranking' };
      if (valor != null) return { valor };
      return { valor: null, motivo: metrica === 'un' || serie(m, 'un', canal)[i] == null
        ? 'Sem dado publicado para o canal' : 'Sem posição publicada' };
    });
  }

  function bloco(m, p = estado.periodo, c = estado.canal) {
    if (p === 'mes') {
      const i = indiceMes();
      if (faltaRegistro(m, i)) return { un: null, geral: null, cat: null };
      return { un: serie(m, 'un', c)[i], geral: serie(m, 'geral', c)[i], cat: serie(m, 'cat', c)[i] };
    }
    const x = m[p];
    if (c === 'varejo') return { un: x.varejo, geral: x.geralV, cat: x.catV };
    if (c === 'direta') return { un: x.direta, geral: x.geralD, cat: x.catD };
    return { un: x.un, geral: x.geral, cat: x.cat };
  }
  function canaisDe(m, p = estado.periodo) {
    if (p === 'mes') {
      const i = indiceMes();
      if (faltaRegistro(m, i)) return { total: null, varejo: null, direta: null };
      return { total: m.un[i], varejo: m.varejo[i], direta: m.direta[i], tipo: m.tipo[i], oficial: m.oficial[i] };
    }
    const x = m[p];
    return { total: x.un, varejo: x.varejo, direta: x.direta, tipo: x.tipo, oficial: x.oficial };
  }
  function base(p = estado.periodo) {
    return p === 'mes' ? D.meses[indiceMes()] : D.periodos[p];
  }
  const rotuloPeriodo = p => (p === 'mes' ? nomeMes(base(p).id) : p === 'ano' ? D.periodos.ano.rotulo : `12 meses até ${rotuloRef()}`);
  const nomeCat = c => D.categorias[c];

  function variacao(m) {
    const s = serie(m, 'un');
    const i = indiceMes();
    if (faltaRegistro(m, i) || faltaRegistro(m, i - 1)) return null;
    const a = s[i - 1], b = s[i];
    return a != null && b != null && a >= BASE_VARIACAO ? (b - a) / a * 100 : null;
  }

  function ordenar(arr) {
    const { k, dir } = estado.ordem;
    const val = m => {
      const c = canaisDe(m);
      if (k === 'nome') return m.nome;
      if (k === 'var') return variacao(m);
      if (k === 'pdir') return c.direta != null && c.total ? c.direta / c.total : null;
      if (k === 'geral' || k === 'cat') return bloco(m)[k];
      return c[k];
    };
    return [...arr].sort((a, b) => {
      const x = val(a), y = val(b);
      if (x == null && y == null) return a.nome.localeCompare(b.nome, 'pt-BR');
      if (x == null) return 1;
      if (y == null) return -1;
      if (typeof x === 'string') return x.localeCompare(y, 'pt-BR') * dir;
      return (x - y) * dir || a.nome.localeCompare(b.nome, 'pt-BR');
    });
  }

  // ---------- Seleção de séries: a cor acompanha o modelo enquanto ele estiver no gráfico ----------
  function atribuirCor(id) {
    if (estado.cor[id] != null) return;
    const usadas = new Set(estado.sel.filter(x => x !== id).map(x => estado.cor[x]));
    estado.cor[id] = CORES.findIndex((_, i) => !usadas.has(i));
  }
  function ajustarSelecao() {
    const validos = new Set(lista().map(m => m.id));
    estado.sel = estado.sel.filter(id => validos.has(id));
    Object.keys(estado.cor).forEach(id => { if (!estado.sel.includes(id)) delete estado.cor[id]; });
    if (!estado.sel.length) {
      estado.sel = [...lista()].sort((a, b) => b.ano.un - a.ano.un).slice(0, 4).map(m => m.id);
      estado.sel.forEach(atribuirCor);
    }
  }

  // ---------- Estrutura ----------
  function seg(grupo, opcoes, atual) {
    return opcoes.map(([v, r]) => `<button data-em="${grupo}" data-v="${v}" aria-pressed="${v === atual}">${esc(r)}</button>`).join('');
  }

  function estrutura() {
    raiz.innerHTML = `
      <div class="em-filtros">
        <div class="em-seg" role="group" aria-label="Modelos" id="emEscopo"></div>
        <div class="em-seg" role="group" aria-label="Período" id="emPeriodo"></div>
        <select id="emMes" data-emc="mes" aria-label="Mês de referência"></select>
        <div class="em-seg" role="group" aria-label="Canal de venda" id="emCanal"></div>
        <div class="em-atualiza"><span id="emStatus" class="em-status" role="status"></span><button id="emAtualizar" class="btn sm primary" data-em="atualizar">↻ Atualizar emplacamentos</button></div>
      </div>
      <div class="em-cards" id="emResumo"></div>
      <section class="em-bloco"><h2 id="emTitBarras"></h2><p class="em-sub" id="emSubBarras"></p><div class="em-barras" id="emBarras"></div><p class="em-sub em-semdado" id="emSemDado"></p></section>
      <section class="em-bloco">
        <div class="em-cab"><div><h2 id="emTitLinha"></h2></div><div class="em-seg" role="group" aria-label="Medida" id="emMetrica"></div></div>
        <div class="em-chips" id="emChips"></div>
        <ul class="em-notas em-notas-linha" id="emNotasLinha" hidden></ul>
        <div class="em-linha" id="emLinha"></div>
      </section>
      <section class="em-bloco"><h2 id="emTitTabela"></h2><p class="em-sub">Toque no título de uma coluna para ordenar. As posições acompanham o canal escolhido acima. <span id="emComparacao"></span></p><div class="em-rolagem"><table class="em-tabela" id="emTabela"></table></div><ul class="em-notas" id="emNotas"></ul></section>
      <section class="em-bloco"><h2 id="emTitMensal"></h2><p class="em-sub">Mesmos números do gráfico de evolução, mês a mês.</p><div class="em-rolagem"><table class="em-tabela" id="emMensal"></table></div><ul class="em-notas" id="emNotasMensal" hidden></ul></section>
      <details class="em-metodo"><summary>Como os números são calculados</summary><ul id="emMetodo"></ul></details>
      <div class="em-tip" id="emTip" hidden></div>`;
  }

  // ---------- Desenho ----------
  function atualizarOpcoesMes() {
    if (!D.meses.some(m => m.id === estado.mes)) estado.mes = '';
    const ultimo = D.meses[ult()];
    const anteriores = D.meses.slice(0, -1).reverse();
    const seletor = $('emMes');
    seletor.innerHTML = `<option value="">${esc(nomeMes(ultimo.id))} (mais recente)</option>` +
      anteriores.map(m => `<option value="${esc(m.id)}">${esc(nomeMes(m.id))}</option>`).join('');
    seletor.value = estado.mes;
  }

  function desenhar() {
    ajustarSelecao();
    $('emEscopo').innerHTML = seg('escopo', [['todos', 'Todos'], ['hibridos', 'Híbridos'], ['eletricos', 'Elétricos']], estado.escopo);
    $('emPeriodo').innerHTML = seg('periodo', [['mes', 'Mensal'], ['ano', `Ano ${D.referencia.slice(0, 4)}`], ['doze', '12 meses']], estado.periodo);
    $('emMes').hidden = estado.periodo !== 'mes';
    $('emCanal').innerHTML = seg('canal', Object.entries(CANAIS), estado.canal);
    $('emMetrica').innerHTML = seg('metrica', Object.entries(METRICAS), estado.metrica);
    desenharResumo();
    desenharBarras();
    desenharChips();
    desenharLinha();
    desenharTabela();
    desenharMensal();
    desenharMetodo();
  }

  function desenharResumo() {
    const b = base(), L = lista(), c = estado.canal;
    const comDado = L.filter(m => bloco(m).un != null);
    const soma = comDado.reduce((s, m) => s + bloco(m).un, 0);
    const lider = [...comDado].sort((x, y) => bloco(y).un - bloco(x).un)[0];
    const lb = lider ? bloco(lider) : { un: 0, geral: null };
    const rotPos = c === 'total' ? `de ${n(b.modelos)} modelos leves` : (lb.geral ? `entre os veículos leves ${NO_CANAL[c]}` : 'sem posição publicada');
    const rotSoma = c === 'total' ? `${pct(soma / b.total * 100)}% do mercado` : `${comDado.length} de ${L.length} modelos com dado`;
    $('emResumo').innerHTML = `
      <div class="em-card"><small>Mais emplacado do painel${c === 'total' ? '' : ` ${NO_CANAL[c]}`}</small><strong>${esc(lider ? lider.nome : '—')}</strong><span>${n(lb.un)} unidades</span></div>
      <div class="em-card"><small>Melhor posição geral</small><strong>${pos(lb.geral)}</strong><span>${esc(rotPos)}</span></div>
      <div class="em-card"><small>Modelos do painel somados</small><strong>${n(soma)}</strong><span>${esc(rotSoma)}</span></div>
      <div class="em-card"><small>Mercado de veículos leves</small><strong>${n(b.total)}</strong><span>${esc(rotuloPeriodo(estado.periodo))} · Fenabrave</span></div>`;
  }

  const textoPos = (v, de, canal) => (canal === 'total' ? `${pos(v)} de ${n(de)}` : v == null ? 'fora do top 50' : `${pos(v)} ${NO_CANAL[canal]}`);

  function desenharBarras() {
    const c = estado.canal, b = base();
    const todos = lista();
    const L = todos.filter(m => bloco(m).un != null).sort((x, y) => bloco(y).un - bloco(x).un);
    const sem = todos.filter(m => bloco(m).un == null).map(m => m.nome).sort((x, y) => x.localeCompare(y, 'pt-BR'));
    const max = Math.max(1, ...L.map(m => bloco(m).un));
    $('emTitBarras').textContent = `${CANAIS[c]} por modelo · ${rotuloPeriodo(estado.periodo)}`;
    $('emSubBarras').textContent = 'Só os modelos do painel, do maior para o menor.';
    $('emBarras').innerHTML = L.map(m => {
      const x = bloco(m);
      const tip = `<strong>${esc(m.nome)}</strong><div>${esc(CANAIS[c])}<em>${n(x.un)}</em></div><div>Geral<em>${esc(textoPos(x.geral, b.modelos, c))}</em></div><div>${esc(nomeCat(m.categoria))}<em>${esc(textoPos(x.cat, b.cats[m.categoria], c))}</em></div>`;
      return `<div class="em-barra" tabindex="0" data-tip="${esc(tip)}" aria-label="${esc(m.nome)}: ${n(x.un)} emplacamentos, geral ${esc(textoPos(x.geral, b.modelos, c))}, em ${esc(nomeCat(m.categoria))} ${esc(textoPos(x.cat, b.cats[m.categoria], c))}"><span>${esc(m.nome)}</span><span class="em-trilho"><i style="width:${(x.un / max * 100).toFixed(2)}%"></i></span><b>${n(x.un)}</b></div>`;
    }).join('');
    $('emSemDado').textContent = sem.length ? `Sem dados para este recorte: ${sem.join(', ')}.` : '';
  }

  function desenharChips() {
    const fora = lista().filter(m => !estado.sel.includes(m.id)).sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    $('emChips').innerHTML = estado.sel.map(id => {
      const m = D.modelos.find(x => x.id === id);
      return `<button class="em-chip" data-em="tirar" data-id="${esc(id)}" aria-label="Tirar ${esc(m.nome)} do gráfico"><i style="background:${CORES[estado.cor[id]]}"></i>${esc(m.nome)}<span>×</span></button>`;
    }).join('') + (estado.sel.length < MAX_LINHAS && fora.length
      ? `<select data-emc="add" aria-label="Adicionar modelo ao gráfico"><option value="">＋ Adicionar modelo</option>${fora.map(m => `<option value="${esc(m.id)}">${esc(m.nome)}</option>`).join('')}</select>` : '');
  }

  function passoBonito(v) {
    const p = 10 ** Math.floor(Math.log10(Math.max(v, 1)));
    const r = v / p;
    return (r <= 1 ? 1 : r <= 2 ? 2 : r <= 2.5 ? 2.5 : r <= 5 ? 5 : 10) * p;
  }

  function notaFonte(m) {
    const { fonte, url, meses } = m.evolucaoTotal;
    const ids = D.meses.filter(x => Object.hasOwn(meses, x.id)).map(x => x.rotulo);
    if (!ids.length) return '';
    const periodo = ids.length === 1 ? ids[0] : `${ids[0]} a ${ids.at(-1)}`;
    return `Volume total de ${esc(m.nome)} em ${esc(periodo)} segundo a <a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(fonte)}</a>. As posições e os canais seguem os rankings do painel.`;
  }

  let grafico = null;
  function desenharLinha() {
    const caixa = $('emLinha');
    const W = Math.max(280, caixa.clientWidth || 700);
    const celular = W < 560;
    const H = celular ? 250 : 320;
    const k = estado.metrica;
    $('emTitLinha').textContent = `Evolução em 12 meses · ${CANAIS[estado.canal]}`;
    const series = estado.sel.map(id => {
      const m = D.modelos.find(x => x.id === id);
      const pontos = pontosEvolucao(m);
      return { m, pontos, v: pontos.map(p => p.valor), cor: CORES[estado.cor[id]] };
    });
    const vals = series.flatMap(s => s.v).filter(v => v != null);
    const notas = series.flatMap(({ m, pontos }) => {
      const linhas = [];
      if (pontos.some(p => p.fonte)) linhas.push(notaFonte(m));
      const cobertura = pontos.filter(p => p.valor != null).length;
      if (cobertura < pontos.length) {
        const motivos = [...new Set(pontos.filter(p => p.motivo).map(p => p.motivo.toLowerCase()))];
        linhas.push(`<strong>${esc(m.nome)}</strong> tem dados em ${cobertura} de ${pontos.length} meses. Lacunas: ${esc(motivos.join(' ou '))}.`);
      }
      if (m.nota) linhas.push(`<strong>${esc(m.nome)}</strong>. ${esc(m.nota)}`);
      return linhas;
    });
    const aviso = $('emNotasLinha');
    aviso.hidden = !notas.length;
    aviso.innerHTML = notas.map(t => `<li>${t}</li>`).join('');
    if (!vals.length) {
      caixa.innerHTML = '<p class="em-sub">Nenhum dos modelos selecionados tem dados para esta medida e canal no período.</p>';
      grafico = null;
      esconderTip();
      return;
    }
    const rotulosDiretos = !celular && series.length <= 4;
    const M = { l: celular ? 42 : 52, r: rotulosDiretos ? 136 : 12, t: 12, b: 26 };
    const qtd = D.meses.length;
    const x = i => M.l + i * (W - M.l - M.r) / (qtd - 1);
    let y, ticks;
    if (k === 'un') {
      const passo = passoBonito(Math.max(1, ...vals) / 4);
      const topo = Math.ceil(Math.max(1, ...vals) / passo) * passo;
      ticks = []; for (let t = 0; t <= topo + 1e-6; t += passo) ticks.push(t);
      y = v => H - M.b - (v / topo) * (H - M.t - M.b);
    } else {
      const maior = Math.max(2, ...vals);
      const passo = Math.max(1, Math.ceil(passoBonito(maior / 4)));
      const fundo = Math.ceil(maior / passo) * passo;
      ticks = [1]; for (let t = passo; t <= fundo; t += passo) if (t !== 1) ticks.push(t);
      y = v => M.t + ((v - 1) / (fundo - 1)) * (H - M.t - M.b);
    }
    const fmtEixo = t => (k === 'un' ? (t >= 1000 ? `${n(t / 1000)} mil` : n(t)) : `${t}º`);
    const cadaX = celular ? 3 : 1;
    let svg = `<svg viewBox="0 0 ${W} ${H}" height="${H}" tabindex="0" role="img" aria-label="${esc(METRICAS[k])}, ${esc(CANAIS[estado.canal])}, em 12 meses: ${esc(series.map(s => s.m.nome).join(', '))}. Use as setas para percorrer os meses. Os valores também estão na tabela mês a mês.">`;
    ticks.forEach(t => {
      svg += `<line x1="${M.l}" x2="${W - M.r}" y1="${y(t).toFixed(1)}" y2="${y(t).toFixed(1)}" stroke="${t === 0 ? 'var(--eixo)' : 'var(--grade)'}"/><text x="${M.l - 7}" y="${(y(t) + 3.5).toFixed(1)}" text-anchor="end">${fmtEixo(t)}</text>`;
    });
    D.meses.forEach((me, i) => {
      if ((qtd - 1 - i) % cadaX === 0) svg += `<text x="${x(i).toFixed(1)}" y="${H - 8}" text-anchor="${i === qtd - 1 ? 'end' : i === 0 ? 'start' : 'middle'}">${esc(me.rotulo)}</text>`;
    });
    series.forEach(s => {
      const conecta = (a, b) => a?.valor != null && b?.valor != null && a.fonte === b.fonte;
      let d = '';
      s.v.forEach((v, i) => {
        if (v == null) return;
        d += `${conecta(s.pontos[i - 1], s.pontos[i]) ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`;
      });
      if (d) svg += `<path d="${d}" fill="none" stroke="${s.cor}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`;
      s.v.forEach((v, i) => {
        if (v != null && !conecta(s.pontos[i - 1], s.pontos[i]) && !conecta(s.pontos[i], s.pontos[i + 1])) svg += `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="3" fill="${s.cor}"/>`;
      });
    });
    if (rotulosDiretos) {
      const fim = series.map(s => {
        let i = qtd - 1;
        while (i >= 0 && s.v[i] == null) i--;
        return i < 0 ? null : { s, i, py: y(s.v[i]) };
      }).filter(Boolean).sort((a, b) => a.py - b.py);
      let ant = -99;
      fim.forEach(f => {
        f.ty = Math.max(f.py + 4, ant + 14);
        ant = f.ty;
        svg += `<circle cx="${x(f.i).toFixed(1)}" cy="${f.py.toFixed(1)}" r="4" fill="${f.s.cor}" stroke="#fff" stroke-width="2"/><text class="rot" x="${(W - M.r + 8).toFixed(1)}" y="${f.ty.toFixed(1)}">${esc(f.s.m.nome.length > 20 ? f.s.m.nome.slice(0, 19) + '…' : f.s.m.nome)}</text>`;
      });
    }
    svg += `<g id="emCruz"></g></svg>`;
    caixa.innerHTML = svg;
    grafico = { x, y, M, H, W, series, k, qtd };
    mesHover = null;
  }

  function marcarMes(i, evento) {
    if (!grafico) return;
    const { x, y, M, H, series, k } = grafico;
    mesHover = i;
    let g = `<line x1="${x(i).toFixed(1)}" x2="${x(i).toFixed(1)}" y1="${M.t}" y2="${H - M.b}" stroke="var(--eixo)"/>`;
    series.forEach(s => {
      const v = s.v[i];
      if (v == null) return;
      g += `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="5" fill="${s.cor}" stroke="#fff" stroke-width="2"/>`;
    });
    $('emCruz').innerHTML = g;
    const linhas = [...series].sort((a, b) => {
      const p = s => s.v[i] ?? (k === 'un' ? -1 : 9999);
      return k === 'un' ? p(b) - p(a) : p(a) - p(b);
    }).map(s => {
      const v = s.v[i];
      const { motivo, fonte } = s.pontos[i];
      const t = v == null ? motivo : k === 'un' ? n(v) : pos(v);
      return `<div><i style="background:${s.cor}"></i>${esc(s.m.nome)}${fonte ? ' (ABVE)' : ''}<em>${esc(t)}</em></div>`;
    }).join('');
    const caixa = $('emLinha').getBoundingClientRect();
    const escala = caixa.width / grafico.W;
    mostrarTip(`<strong>${esc(D.meses[i].rotulo)} · ${esc(CANAIS[estado.canal])}</strong>${linhas}`, evento ? evento.clientX : caixa.left + x(i) * escala, evento ? evento.clientY : caixa.top + 40);
  }

  function mostrarTip(html, cx, cy) {
    const t = $('emTip');
    t.innerHTML = html;
    t.hidden = false;
    const r = t.getBoundingClientRect();
    let px = cx + 14, py = cy + 12;
    if (px + r.width > innerWidth - 6) px = cx - r.width - 14;
    if (px < 6) px = 6;
    if (py + r.height > innerHeight - 6) py = cy - r.height - 10;
    t.style.left = `${px}px`;
    t.style.top = `${Math.max(6, py)}px`;
  }
  function esconderTip() {
    if ($('emTip')) $('emTip').hidden = true;
    if ($('emCruz')) $('emCruz').innerHTML = '';
    mesHover = null;
  }

  function celulaCanal(v, calculado) {
    if (v == null) return '<td class="em-nd">—</td>';
    return `<td>${n(v)}${calculado ? '<small>calculado</small>' : ''}</td>`;
  }

  function celulaPos(v, de, rotuloCat, temValor) {
    const c = estado.canal;
    if (!temValor) return '<td class="em-nd">—</td>';
    if (c === 'total') return `<td>${pos(v)}<small>de ${n(de)}${rotuloCat ? ` ${esc(rotuloCat)}` : ''}</small></td>`;
    if (v == null) return '<td class="em-nd">—<small>fora do top 50</small></td>';
    return `<td>${pos(v)}<small>${NO_CANAL[c]}${rotuloCat ? ` · ${esc(rotuloCat)}` : ''}</small></td>`;
  }

  function desenharTabela() {
    const b = base(), L = ordenar(lista());
    const { k, dir } = estado.ordem;
    const col = (id, r) => `<th scope="col" aria-sort="${k === id ? (dir > 0 ? 'ascending' : 'descending') : 'none'}"><button data-em="ordem" data-k="${id}">${esc(r)}${k === id ? (dir > 0 ? ' ▲' : ' ▼') : ''}</button></th>`;
    const mes = estado.periodo === 'mes';
    const i = indiceMes(), anterior = D.meses[i - 1];
    const sufixo = estado.canal === 'total' ? '' : ` (${CANAIS[estado.canal].toLowerCase()})`;
    $('emTitTabela').textContent = `Colocação dos modelos · ${rotuloPeriodo(estado.periodo)}`;
    $('emComparacao').textContent = mes ? (anterior ? `Variação em relação a ${nomeMes(anterior.id).toLowerCase()}.` : 'O mês anterior está fora da base disponível.') : '';
    $('emTabela').innerHTML = `<thead><tr>${col('nome', 'Modelo')}${col('total', 'Total')}${col('varejo', 'Varejo')}${col('direta', 'Venda direta')}${col('pdir', '% direta')}${mes ? col('var', `Var. no mês${sufixo}`) : ''}${col('geral', `Geral${sufixo}`)}${col('cat', `Categoria${sufixo}`)}</tr></thead><tbody>${L.map(m => {
      const c = canaisDe(m), x = bloco(m), v = mes ? variacao(m) : null;
      const s = serie(m, 'un');
      const recente = mes && !faltaRegistro(m, i - 1) && s[i] >= BASE_VARIACAO && (s[i - 1] == null || s[i - 1] < BASE_VARIACAO) && m.un[i - 1] < BASE_VARIACAO;
      const varTxt = v == null ? (recente ? 'novo' : '<span class="em-nd">—</span>') : `${v >= 0 ? '▲' : '▼'} ${pct(Math.abs(v), 0)}%`;
      const pDir = c.direta != null && c.total ? `${pct(c.direta / c.total * 100, 0)}%` : '<span class="em-nd">—</span>';
      const total = c.total == null ? '<td class="em-nd">—<small>sem registro separado</small></td>' : `<td>${n(c.total)}<small>${c.oficial ? 'Fenabrave' : 'complementar'}</small></td>`;
      return `<tr><th scope="row">${esc(m.nome)}${m.nota || m.evolucaoTotal ? ' *' : ''}<small>${esc(TIPOS[m.abas])}</small></th>${total}${celulaCanal(c.varejo, c.tipo === 'v' || c.tipo === 's')}${celulaCanal(c.direta, c.tipo === 'd' || c.tipo === 's')}<td>${pDir}</td>${mes ? `<td>${varTxt}</td>` : ''}${celulaPos(x.geral, b.modelos, '', x.un != null)}${celulaPos(x.cat, b.cats[m.categoria], nomeCat(m.categoria), x.un != null)}</tr>`;
    }).join('')}</tbody>`;
    const vistos = new Set();
    const notas = L.filter(m => m.nota).map(m => {
      const ref = mes ? D.meses[i] : D.meses[ult()];
      const par = m.divisao && m.divisao.ref === ref.id ? ` Em ${ref.rotulo}: ${n(m.divisao.ele)} elétricos e ${n(m.divisao.hib)} híbridos (ABVE).` : '';
      return `${m.nome}: ${m.nota}${par}`;
    }).filter(t => !vistos.has(t) && vistos.add(t));
    $('emNotas').innerHTML = notas.map(t => `<li>* ${esc(t)}</li>`).join('') + L.filter(m => m.evolucaoTotal).map(m =>
      `<li>* ${esc(m.nome)}. Esta tabela usa os registros identificados nos rankings e os acumulados podem ser parciais. Consulte o volume da ABVE Data na tabela mês a mês, selecionando Total e Emplacamentos.</li>`).join('');
  }

  function desenharMensal() {
    const k = estado.metrica;
    const L = [...lista()].sort((a, b) => b.ano.un - a.ano.un);
    $('emTitMensal').textContent = `${METRICAS[k]} mês a mês · ${CANAIS[estado.canal]}`;
    $('emMensal').innerHTML = `<thead><tr><th scope="col">Modelo</th>${D.meses.map(x => `<th scope="col">${esc(x.rotulo)}</th>`).join('')}</tr></thead><tbody>${L.map(m => `<tr><th scope="row">${esc(m.nome)}</th>${pontosEvolucao(m).map(({ valor, fonte, motivo }, i) => {
      if (valor == null) return `<td class="em-nd" title="${esc(motivo)}"><span aria-hidden="true">—</span><span class="aria-only">${esc(motivo)}</span></td>`;
      return `<td title="${esc(fonte || D.meses[i].rotulo)}">${k === 'un' ? n(valor) : pos(valor)}${fonte ? '<small>ABVE</small>' : ''}</td>`;
    }).join('')}</tr>`).join('')}</tbody>`;
    const notas = estado.canal === 'total' && k === 'un' ? L.filter(m => m.evolucaoTotal).map(notaFonte).filter(Boolean) : [];
    $('emNotasMensal').hidden = !notas.length;
    $('emNotasMensal').innerHTML = notas.map(t => `<li>${t}</li>`).join('');
  }

  function desenharMetodo() {
    $('emMetodo').innerHTML = `
      <li>Fonte principal: <a href="${esc(D.fonte.url)}" target="_blank" rel="noopener noreferrer">informes mensais da ${esc(D.fonte.nome)}</a>. Dados até ${esc(rotuloRef())}, coletados em ${esc(dataBr(D.coletadoEm))}.</li>
      <li>Os informes listam por modelo só os 50 automóveis e os 50 comerciais leves mais emplacados em cada tabela. Os modelos fora dessas listas usam o <a href="${esc(D.complementar.url)}" target="_blank" rel="noopener noreferrer">ranking completo do ${esc(D.complementar.nome)}</a> e aparecem como “complementar”.</li>
      <li>Venda direta é a nota fiscal emitida pelo fabricante, comum em frotistas e locadoras. As demais são varejo, segundo a definição da Fenabrave.</li>
      <li>“Calculado” indica que o modelo apareceu em só uma das listas de canal e o outro valor é o total menos esse número. Sem nenhuma das duas, a divisão não é publicada e aparece “—”.</li>
      <li>A posição geral total compara o modelo com todos os veículos leves. Por canal, a posição só existe para quem está entre os 50 mais emplacados daquele canal.</li>
      <li>Categorias por comprimento: SUV compacto até 4,39 m, médio de 4,40 a 4,79 m e grande a partir de 4,80 m. Fiat Fastback e Citroën Basalt contam como compactos. A classificação é deste painel.</li>
      <li>Quando versões elétricas e híbridas têm o mesmo nome na fonte, o número e a posição valem para o conjunto. Até agosto de 2026, a Fenabrave somava Song Plus e Song Pro, então esses dois só têm divisão por canal a partir de setembro.</li>
      <li>Modelos com o mesmo volume dividem a mesma posição. A variação aparece como “novo” quando o modelo teve menos de ${BASE_VARIACAO} unidades no mês anterior.</li>`;
  }

  // ---------- Dados ----------
  function dadosValidos(x) {
    return x && x.versao === 2 && Array.isArray(x.meses) && x.meses.length === 12 && Array.isArray(x.modelos) && x.modelos.length > 0 && x.periodos && x.categorias;
  }
  async function buscar(semCache) {
    const url = semCache ? `${URL_DADOS}?t=${Date.now()}` : URL_DADOS;
    const r = await fetch(url, { cache: semCache ? 'no-store' : 'no-cache' });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const x = await r.json();
    if (!dadosValidos(x)) throw new Error('Arquivo em formato inesperado');
    return x;
  }
  function textoStatus() {
    const hoje = new Date();
    const anterior = new Date(hoje.getFullYear(), hoje.getMonth() - 1, 1);
    const chave = `${anterior.getFullYear()}-${String(anterior.getMonth() + 1).padStart(2, '0')}`;
    const espera = D.referencia < chave ? ` · aguardando o informe de ${MESES[anterior.getMonth()]}` : '';
    return `Dados até ${rotuloRef()} · coleta em ${dataBr(D.coletadoEm)}${espera}`;
  }

  async function atualizar() {
    const b = $('emAtualizar'), s = $('emStatus');
    b.disabled = true;
    b.textContent = 'Verificando…';
    try {
      const novo = await buscar(true);
      const mudou = novo.referencia !== D.referencia || novo.coletadoEm !== D.coletadoEm;
      const refAntes = D.referencia;
      D = novo;
      if (mudou) { atualizarOpcoesMes(); desenhar(); }
      s.textContent = !mudou ? `Você já tem os dados mais recentes: até ${rotuloRef()}.`
        : novo.referencia !== refAntes ? `Atualizado: agora com dados até ${rotuloRef()}.` : `Atualizado: ${textoStatus()}.`;
    } catch (_) {
      s.textContent = `Não foi possível verificar agora. Mantidos os dados até ${rotuloRef()}.`;
    } finally {
      b.disabled = false;
      b.textContent = '↻ Atualizar emplacamentos';
    }
  }

  async function mostrar() {
    if (montado) { desenharLinha(); return; }
    if (carregando) return carregando;
    raiz.innerHTML = '<div class="em-carrega">Carregando emplacamentos…</div>';
    carregando = buscar(false).then(x => {
      D = x;
      montado = true;
      estrutura();
      atualizarOpcoesMes();
      desenhar();
      $('emStatus').textContent = textoStatus();
      new ResizeObserver(() => { if (document.body.dataset.aba === 'emplacamentos') desenharLinha(); }).observe($('emLinha').parentElement);
    }).catch(() => {
      raiz.innerHTML = '<div class="em-carrega">Não foi possível carregar os emplacamentos. <button class="btn sm" data-em="recarregar">Tentar de novo</button></div>';
    }).finally(() => { carregando = null; });
    return carregando;
  }

  // ---------- Eventos ----------
  raiz.addEventListener('click', e => {
    const a = e.target.closest('[data-em]');
    if (!a) return;
    const acao = a.dataset.em;
    if (acao === 'recarregar') { mostrar(); return; }
    if (acao === 'atualizar') { atualizar(); return; }
    if (acao === 'escopo' || acao === 'periodo' || acao === 'metrica' || acao === 'canal') {
      estado[acao] = a.dataset.v;
      if (acao === 'periodo' && a.dataset.v !== 'mes' && estado.ordem.k === 'var') estado.ordem = { k: 'total', dir: -1 };
      if (acao === 'canal') estado.ordem = { k: a.dataset.v, dir: -1 };
      desenhar();
    } else if (acao === 'tirar') {
      estado.sel = estado.sel.filter(x => x !== a.dataset.id);
      delete estado.cor[a.dataset.id];
      if (!estado.sel.length) { const resto = lista().find(m => m.id !== a.dataset.id); estado.sel = [resto.id]; atribuirCor(resto.id); }
      desenharChips(); desenharLinha();
    } else if (acao === 'ordem') {
      const k = a.dataset.k;
      if (estado.ordem.k === k) estado.ordem.dir *= -1;
      else estado.ordem = { k, dir: k === 'nome' || k === 'geral' || k === 'cat' ? 1 : -1 };
      desenharTabela();
    }
  });
  raiz.addEventListener('change', e => {
    if (e.target.dataset.emc === 'mes') {
      estado.mes = e.target.value;
      desenharResumo(); desenharBarras(); desenharTabela();
    } else if (e.target.dataset.emc === 'add' && e.target.value) {
      estado.sel = [...estado.sel, e.target.value];
      atribuirCor(e.target.value);
      desenharChips(); desenharLinha();
    }
  });
  raiz.addEventListener('pointermove', e => {
    const svg = e.target.closest('.em-linha svg');
    if (svg && grafico) {
      const r = svg.getBoundingClientRect();
      const px = (e.clientX - r.left) * (grafico.W / r.width);
      const passo = (grafico.W - grafico.M.l - grafico.M.r) / (grafico.qtd - 1);
      marcarMes(Math.max(0, Math.min(grafico.qtd - 1, Math.round((px - grafico.M.l) / passo))), e);
      return;
    }
    const b = e.target.closest('.em-barra');
    if (b) mostrarTip(b.dataset.tip, e.clientX, e.clientY);
    else if ($('emTip') && !$('emTip').hidden) esconderTip();
  });
  raiz.addEventListener('pointerleave', esconderTip);
  raiz.addEventListener('focusin', e => {
    const b = e.target.closest('.em-barra');
    if (b && b.matches(':focus-visible')) { const r = b.getBoundingClientRect(); mostrarTip(b.dataset.tip, r.left + 60, r.bottom); }
  });
  raiz.addEventListener('focusout', esconderTip);
  raiz.addEventListener('keydown', e => {
    if (!e.target.closest('.em-linha svg') || !grafico) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const d = e.key === 'ArrowRight' ? 1 : -1;
      marcarMes(mesHover == null ? (d > 0 ? 0 : grafico.qtd - 1) : Math.max(0, Math.min(grafico.qtd - 1, mesHover + d)));
    } else if (e.key === 'Escape') esconderTip();
  });

  window.EMP = { mostrar };
})();
