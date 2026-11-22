// Aba de SUVs elétricos: filtros, cartões, ficha completa, galeria e comparação lado a lado.
(function () {
  'use strict';

  const GRUPOS = window.EV_GRUPOS;
  const ITENS = GRUPOS.flatMap(g => g.itens);
  const ITEM = Object.fromEntries(ITENS.map(i => [i[0], i]));
  const CHAVE = 'ev-comparador-v1';
  const MAX_COMPARA = 4;
  const ANGULOS = ['Frente', 'Dianteira 3/4', 'Lateral', 'Traseira 3/4', 'Traseira', 'Painel', 'Bancos dianteiros', 'Bancos traseiros', 'Porta-malas'];
  const CREDITOS = { 'encontracarros.com.br': 'Encontracarros', 'autoo.com.br': 'AUTOO', 'revistacarro.com.br': 'Revista Carro', 'byd.com': 'BYD Brasil', 'autoentusiastas.com.br': 'Autoentusiastas' };
  const FILTROS = [
    { k: 'preco', nome: 'Preço máximo', campo: 'preco', tipo: 'max', min: 150000, max: 300000, passo: 5000, un: 'R$' },
    { k: 'autonomia', nome: 'Autonomia Inmetro mínima', campo: 'autonomiaInmetro', tipo: 'min', min: 0, max: 420, passo: 10, un: 'km' },
    { k: 'portaMalas', nome: 'Porta-malas mínimo', campo: 'portaMalas', tipo: 'min', min: 0, max: 540, passo: 10, un: 'L' },
    { k: 'comprimento', nome: 'Comprimento máximo', campo: 'comprimento', tipo: 'max', min: 4400, max: 4800, passo: 10, un: 'mm' },
    { k: 'largura', nome: 'Largura máxima', campo: 'largura', tipo: 'max', min: 1820, max: 1940, passo: 5, un: 'mm' }
  ];
  const EQUIP = [
    ['acc', 'Piloto automático adaptativo'], ['frenagemAutonoma', 'Frenagem autônoma'], ['pontoCego', 'Monitor de ponto cego'],
    ['camera360', 'Câmera 360°'], ['ajusteMotorista', 'Banco do motorista elétrico'], ['lombar', 'Ajuste lombar'],
    ['bancosVentilados', 'Bancos ventilados'], ['bancosAquecidos', 'Bancos aquecidos'], ['massagem', 'Massagem'],
    ['teto', 'Teto solar ou panorâmico'], ['tampaEletrica', 'Porta-malas elétrico'], ['headUp', 'Head-up display'],
    ['inducao', 'Carregador por indução'], ['v2l', 'V2L']
  ];
  const ORDENS = {
    preco: ['Menor preço', c => num(c, 'preco'), 1], autonomia: ['Maior autonomia', c => num(c, 'autonomiaInmetro'), -1],
    potencia: ['Maior potência', c => num(c, 'potenciaTotal'), -1], portaMalas: ['Maior porta-malas', c => num(c, 'portaMalas'), -1],
    recarga: ['Recarga mais rápida', c => num(c, 'dcMax'), -1], zero: ['Melhor 0 a 100 km/h', c => num(c, 'zeroCem'), 1],
    entreEixos: ['Maior entre-eixos', c => num(c, 'entreEixos'), -1]
  };

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtN = (n, d = 3) => new Intl.NumberFormat('pt-BR', { maximumFractionDigits: d }).format(n);
  const reais = n => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(n);
  const $ = id => document.getElementById(id);

  function lerLinhas(texto) {
    const saida = {};
    (texto || '').split('\n').forEach(linha => {
      const i = linha.indexOf('=');
      if (i < 1) return;
      const k = linha.slice(0, i).trim();
      const m = linha.slice(i + 1).match(/^(.*) @([\d,]+)\s*$/);
      if (!m) return;
      let v = m[1].trim(), conf = false, detalhe = '';
      if (ITEM[k] && ITEM[k][2] === 'n') {
        [v, detalhe = ''] = v.split(' | ');
        if (v[0] === '?') { conf = true; v = v.slice(1); }
        v = v === '—' ? null : Number(v);
      }
      saida[k] = { v, s: m[2].split(',').map(Number), conf, detalhe };
    });
    return saida;
  }

  const CARROS = window.EV_MODELOS.flatMap(m => {
    const base = lerLinhas(m.comum);
    return m.versoes.map(ver => {
      const d = { ...base, ...lerLinhas(ver.dados) };
      d.marcaModelo = { v: `${m.marca} ${m.modelo}`, s: [] };
      d.versao = { v: ver.nome, s: [] };
      return { id: `${m.id}:${ver.id}`, m, ver, d, nome: `${m.marca} ${m.modelo}`, curto: ver.nome === 'Versão única' ? m.modelo : `${m.modelo} ${ver.nome}` };
    });
  });
  const carro = id => CARROS.find(c => c.id === id);
  const num = (c, k) => (c.d[k] && typeof c.d[k].v === 'number' ? c.d[k].v : null);
  const temDado = (c, [k]) => k === 'fontes' || c.d[k]?.v != null;

  const padrao = () => ({ ...Object.fromEntries(FILTROS.map(f => [f.k, f.tipo === 'max' ? f.max : f.min])), tracao: '', eq: [], busca: '', ordem: 'preco', sel: [] });
  let estado = padrao();
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE) || 'null');
    if (salvo && typeof salvo === 'object') {
      estado = { ...estado, ...salvo, eq: Array.isArray(salvo.eq) ? salvo.eq : [], sel: Array.isArray(salvo.sel) ? salvo.sel.filter(carro).slice(0, MAX_COMPARA) : [] };
      if (!ORDENS[estado.ordem]) estado.ordem = 'preco';
    }
  } catch (_) { /* navegador sem armazenamento */ }
  const salvar = () => { try { localStorage.setItem(CHAVE, JSON.stringify(estado)); } catch (_) { /* sem armazenamento */ } };

  const temEquip = (c, k) => !!c.d[k] && /^(serie|opcional)/.test(String(c.d[k].v));

  function passa(c) {
    for (const f of FILTROS) {
      const ativo = f.tipo === 'max' ? estado[f.k] < f.max : estado[f.k] > f.min;
      if (!ativo) continue;
      const v = num(c, f.campo);
      if (v === null || (f.tipo === 'max' ? v > estado[f.k] : v < estado[f.k])) return false;
    }
    if (estado.tracao && !String(c.d.tracao?.v || '').startsWith(estado.tracao)) return false;
    if (estado.eq.some(k => !temEquip(c, k))) return false;
    const q = estado.busca.trim().toLowerCase();
    return !q || `${c.nome} ${c.ver.nome}`.toLowerCase().includes(q);
  }

  function lista() {
    const [, val, dir] = ORDENS[estado.ordem];
    return CARROS.filter(passa).sort((a, b) => {
      const x = val(a), y = val(b);
      if (x === null) return 1;
      if (y === null) return -1;
      return (x - y) * dir || num(a, 'preco') - num(b, 'preco');
    });
  }

  function linkFontes(c, cel) {
    if (!cel || !cel.s || !cel.s.length) return '';
    return cel.s.map(n => {
      const f = c.m.fontes[n - 1];
      if (!f) return '';
      const titulo = esc(`${f[0]} (${f[2]})`);
      return f[1]
        ? `<a class="ev-src" href="${esc(f[1])}" target="_blank" rel="noopener noreferrer" title="${titulo}" aria-label="Fonte: ${esc(f[0])}">[${n}]</a>`
        : `<span class="ev-src" title="${titulo}" aria-label="Fonte: ${esc(f[0])}">[${n}]</span>`;
    }).join('');
  }

  function textoPuro(c, k) {
    if (k === 'fontes') return c.id;
    const cel = c.d[k];
    if (!cel) return '';
    return `${cel.v ?? ''}${cel.conf ? '?' : ''}${cel.detalhe ? ' | ' + cel.detalhe : ''}`;
  }

  function valor(c, k) {
    const it = ITEM[k];
    if (k === 'fontes') {
      return linkFontes(c, { s: c.m.fontes.map((_, i) => i + 1) });
    }
    const cel = c.d[k];
    if (!cel) return '<span class="ev-na">Não informado</span>';
    const src = linkFontes(c, cel);
    if (it[2] === 'n') {
      const t = cel.v === null ? '<span class="ev-na">Não informado</span>'
        : esc(it[3] === 'R$' ? reais(cel.v) : `${fmtN(cel.v)}${it[3] === '°' ? '°' : it[3] ? ' ' + it[3] : ''}`);
      return `${t}${cel.conf ? ' <span class="ev-conf">a confirmar</span>' : ''}${cel.detalhe ? `<br>${esc(cel.detalhe)}` : ''}${src}`;
    }
    if (it[2] === 'e') {
      const [st, ...resto] = String(cel.v).split(':');
      const det = resto.join(':').trim();
      const cfg = { serie: ['ev-sim', '✓', 'De série'], opcional: ['ev-opc', '○', 'Opcional'], ausente: ['ev-nao', '✕', 'Não tem'], confirmar: ['ev-conf', '?', 'A confirmar'] }[st];
      if (!cfg) return esc(cel.v) + src;
      return `<span class="${cfg[0]}">${cfg[1]} ${cfg[2]}</span>${det ? `<br>${esc(det)}` : ''}${src}`;
    }
    return esc(cel.v) + src;
  }

  const hostCredito = url => {
    try {
      const h = new URL(url).hostname.replace(/^www\./, '');
      return CREDITOS[h] || h;
    } catch (_) { return 'fonte'; }
  };
  const imagem = (url, alt, lazy = true) => `<img src="${esc(url)}" alt="${esc(alt)}" ${lazy ? 'loading="lazy"' : ''} decoding="async" referrerpolicy="no-referrer" onerror="this.outerHTML='<span class=&quot;ev-semfoto&quot;>Foto indisponível na fonte</span>'">`;

  function fotoDoAngulo(c, ang) {
    const i = c.m.fotos.findIndex(f => f[0] === ang);
    if (i >= 0) return i;
    return c.m.fotos.findIndex(f => f[0].startsWith(ang + ' ('));
  }

  // ---------- Painel principal ----------
  function montarFiltros() {
    $('evFiltrosCorpo').innerHTML = FILTROS.map(f => `<div class="ev-campo"><label for="evf_${f.k}">${esc(f.nome)}<output id="evo_${f.k}"></output></label><input type="range" id="evf_${f.k}" data-evf="${f.k}" min="${f.min}" max="${f.max}" step="${f.passo}" value="${estado[f.k]}"></div>`).join('') +
      `<div class="ev-campo"><label for="evTracao">Tração</label><select id="evTracao" data-evs="tracao"><option value="">Todas</option><option value="Dianteira">Dianteira</option><option value="Traseira">Traseira</option><option value="Integral">Integral</option></select></div>` +
      `<div class="ev-campo"><span class="ev-rot">Precisa ter</span><div class="ev-checks">${EQUIP.map(([k, n]) => `<label><input type="checkbox" data-eve="${k}" ${estado.eq.includes(k) ? 'checked' : ''}> ${esc(n)}</label>`).join('')}</div></div>` +
      `<button class="btn sm ev-limpar" data-ev="limpar">Limpar filtros</button>`;
    $('evTracao').value = estado.tracao;
    $('evOrdem').innerHTML = Object.entries(ORDENS).map(([k, o]) => `<option value="${k}">${esc(o[0])}</option>`).join('');
    $('evOrdem').value = estado.ordem;
    $('evBusca').value = estado.busca;
    FILTROS.forEach(atualizaSaida);
    if (window.matchMedia('(max-width: 860px)').matches) $('evFiltros').open = false;
  }

  function atualizaSaida(f) {
    const v = estado[f.k];
    const inativo = f.tipo === 'max' ? v >= f.max : v <= f.min;
    $('evo_' + f.k).textContent = inativo ? 'Sem limite' : f.un === 'R$' ? reais(v) : `${fmtN(v)} ${f.un}`;
  }

  const metrica = (t, r) => `<div><strong>${esc(t)}</strong><span>${esc(r)}</span></div>`;
  const nOuTraco = (c, k, un) => { const v = num(c, k); return v === null ? '—' : `${fmtN(v)}${un ? ' ' + un : ''}`; };

  // ---------- Carrossel de fotos dos cartões ----------
  const fotoCard = {};
  let ultimoDeslize = 0;
  const textoFoto = (c, i) => `${c.m.fotos[i][0]} · ${i + 1}/${c.m.fotos.length}`;

  function carrossel(c) {
    const i = fotoCard[c.id] || 0;
    const f = c.m.fotos[i];
    return `<div class="ev-carrossel" data-carro="${esc(c.id)}" role="group" aria-roledescription="carrossel" aria-label="Fotos de ${esc(c.nome)} ${esc(c.ver.nome)}">
      <button class="ev-foto" data-ev="galeria" data-id="${esc(c.id)}" data-foto="${i}" aria-label="Ampliar foto: ${esc(f[0])}">${imagem(f[1], `${c.nome}: ${f[0]}`)}</button>
      <button class="ev-carseta esq" data-ev="cardpasso" data-id="${esc(c.id)}" data-p="-1" aria-label="Foto anterior de ${esc(c.curto)}">‹</button>
      <button class="ev-carseta dir" data-ev="cardpasso" data-id="${esc(c.id)}" data-p="1" aria-label="Próxima foto de ${esc(c.curto)}">›</button>
      <span class="ev-carinfo" aria-live="polite">${esc(textoFoto(c, i))}</span>
    </div>`;
  }

  function preCarregar(url) {
    const im = new Image();
    im.referrerPolicy = 'no-referrer';
    im.src = url;
    return im;
  }

  function moverCard(id, passo) {
    const c = carro(id);
    const caixa = document.querySelector(`.ev-carrossel[data-carro="${id}"]`);
    if (!c || !caixa) return;
    const qtd = c.m.fotos.length;
    const i = ((fotoCard[id] || 0) + passo + qtd) % qtd;
    const f = c.m.fotos[i];
    fotoCard[id] = i;
    caixa.querySelector('.ev-carinfo').textContent = textoFoto(c, i);
    const botao = caixa.querySelector('.ev-foto');
    botao.dataset.foto = i;
    botao.setAttribute('aria-label', `Ampliar foto: ${f[0]}`);
    // Troca só depois de carregar, para a foto anterior não sumir enquanto a nova chega.
    const nova = preCarregar(f[1]);
    nova.onload = nova.onerror = () => { if (fotoCard[id] === i) botao.innerHTML = imagem(f[1], `${c.nome}: ${f[0]}`, false); };
    preCarregar(c.m.fotos[(i + passo + qtd) % qtd][1]);
  }

  function cartao(c) {
    const sel = estado.sel.includes(c.id);
    const cond = c.m.alertas[0];
    return `<article class="ev-card ${sel ? 'sel' : ''}">
      ${carrossel(c)}
      <div class="ev-corpo">
        <div><div class="ev-marca">${esc(c.m.marca)}</div><h3>${esc(c.m.modelo)} · ${esc(c.ver.nome)}</h3></div>
        <div class="ev-preco">${reais(num(c, 'preco'))}</div>
        <div class="ev-mets">
          ${metrica(nOuTraco(c, 'autonomiaInmetro', 'km'), 'Inmetro')}
          ${metrica(nOuTraco(c, 'capacidadeNominal', 'kWh'), 'Bateria')}
          ${metrica(nOuTraco(c, 'potenciaTotal', 'cv'), 'Potência')}
          ${metrica(nOuTraco(c, 'dcMax', 'kW'), 'Recarga DC')}
          ${metrica(nOuTraco(c, 'portaMalas', 'L'), 'Porta-malas')}
          ${metrica(nOuTraco(c, 'zeroCem', 's'), '0 a 100')}
        </div>
        ${cond ? `<div class="ev-tagalerta">⚠ ${esc(cond)}</div>` : ''}
        <div class="ev-acoes">
          <button class="btn sm soft" data-ev="ficha" data-id="${esc(c.id)}">Ver ficha</button>
          <button class="btn sm ${sel ? 'active' : ''}" data-ev="alternar" data-id="${esc(c.id)}" aria-pressed="${sel}">${sel ? '✓ Selecionado' : '＋ Comparar'}</button>
        </div>
      </div>
    </article>`;
  }

  function desenhar() {
    salvar();
    const r = lista();
    $('evTitulo').textContent = r.length === 1 ? '1 versão encontrada' : `${r.length} versões encontradas`;
    $('evCards').innerHTML = r.length ? r.map(cartao).join('') : '<div class="ev-vazio"><strong>Nenhuma versão atende a todos os filtros.</strong><br>Remova uma exigência para ver mais opções.</div>';
    $('evResumoFiltrado').textContent = r.length;
    desenharBandeja();
  }

  function desenharBandeja() {
    const b = $('evBandeja');
    b.hidden = estado.sel.length === 0;
    if (b.hidden) return;
    $('evMini').innerHTML = estado.sel.map(id => { const c = carro(id); return imagem(c.m.fotos[0][1], c.curto); }).join('');
    $('evComparar').textContent = estado.sel.length < 2 ? 'Escolha mais 1' : `Comparar ${estado.sel.length}`;
    $('evComparar').disabled = estado.sel.length < 2;
  }

  function alternar(id) {
    if (estado.sel.includes(id)) estado.sel = estado.sel.filter(x => x !== id);
    else if (estado.sel.length >= MAX_COMPARA) { aviso(`Compare até ${MAX_COMPARA} versões por vez.`); return; }
    else estado.sel = [...estado.sel, id];
    desenhar();
  }

  function aviso(msg) {
    const t = $('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.remove('hidden');
    clearTimeout(aviso.t);
    aviso.t = setTimeout(() => t.classList.add('hidden'), 2700);
  }

  // ---------- Ficha ----------
  let fichaAtual = null;
  function abrirFicha(id, foto = 0) {
    const c = carro(id);
    fichaAtual = { id, foto };
    const sel = estado.sel.includes(id);
    const f = c.m.fotos[foto];
    const preenchidos = ITENS.filter(i => temDado(c, i)).length;
    $('evDialogoTitulo').textContent = `${c.nome} · ${c.ver.nome}`;
    $('evDialogoSub').textContent = `${reais(num(c, 'preco'))} · ${preenchidos} de ${ITENS.length} quesitos com dado`;
    const corpo = $('evDialogoCorpo');
    corpo.classList.remove('ev-semrolagem');
    corpo.innerHTML = `<div class="ev-galeria">
        <div><button class="ev-foto" data-ev="luz" data-id="${esc(id)}" data-foto="${foto}" aria-label="Ampliar foto: ${esc(f[0])}">${imagem(f[1], `${c.nome}: ${f[0]}`, false)}</button>
        <p class="ev-credito">${esc(f[0])} · Foto de divulgação via ${esc(hostCredito(f[1]))}. Cor e versão podem diferir.</p></div>
        <div class="ev-tiras">${c.m.fotos.map((x, i) => `<button class="${i === foto ? 'on' : ''}" data-ev="trocafoto" data-foto="${i}" aria-label="Foto: ${esc(x[0])}">${imagem(x[1], '')}<span>${esc(x[0])}</span></button>`).join('')}</div>
      </div>
      <div style="display:flex;gap:7px;margin-bottom:12px"><button class="btn sm ${sel ? 'active' : ''}" data-ev="alternarFicha" data-id="${esc(id)}">${sel ? '✓ Na comparação' : '＋ Adicionar à comparação'}</button></div>
      ${c.m.alertas.length ? `<ul class="ev-alertas">${c.m.alertas.map(a => `<li>${esc(a)}</li>`).join('')}</ul>` : ''}
      ${GRUPOS.map((g, n) => {
        const com = g.itens.filter(i => temDado(c, i)).length;
        return `<details class="ev-grupo" ${n < 2 ? 'open' : ''}><summary>${esc(g.nome)} <small>(${com} de ${g.itens.length})</small></summary>${g.itens.map(i => `<div class="ev-kv"><div>${esc(i[1])}</div><div>${valor(c, i[0])}</div></div>`).join('')}</details>`;
      }).join('')}
      <details class="ev-grupo"><summary>Fontes consultadas</summary><ol class="ev-fontes">${c.m.fontes.map(([nome, url, data]) => `<li>${url ? `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(nome)}</a>` : esc(nome)} · ${esc(data)}</li>`).join('')}</ol></details>`;
    abrirDialogo();
    corpo.scrollTop = 0;
  }

  function trocaFoto(i) {
    if (!fichaAtual) return;
    const c = carro(fichaAtual.id);
    const f = c.m.fotos[i];
    fichaAtual.foto = i;
    const area = document.querySelector('#evDialogoCorpo .ev-galeria > div');
    area.innerHTML = `<button class="ev-foto" data-ev="luz" data-id="${esc(c.id)}" data-foto="${i}" aria-label="Ampliar foto: ${esc(f[0])}">${imagem(f[1], `${c.nome}: ${f[0]}`, false)}</button><p class="ev-credito">${esc(f[0])} · Foto de divulgação via ${esc(hostCredito(f[1]))}. Cor e versão podem diferir.</p>`;
    document.querySelectorAll('#evDialogoCorpo .ev-tiras button').forEach((b, n) => b.classList.toggle('on', n === i));
  }

  function abrirDialogo() {
    const d = $('evDialogo');
    if (!d.open) d.showModal();
  }

  // ---------- Comparação lado a lado ----------
  const cmp = { soDif: false, angulo: 'Dianteira 3/4', fechados: new Set() };

  function abrirComparacao() {
    fichaAtual = null;
    const cars = estado.sel.map(carro);
    if (cars.length < 2) { $('evDialogo').close(); return; }
    $('evDialogoTitulo').textContent = 'Comparação lado a lado';
    $('evDialogoSub').textContent = `${cars.length} versões · verde indica o melhor valor numérico`;
    const corpo = $('evDialogoCorpo');
    corpo.classList.add('ev-semrolagem');
    const scrollAnterior = corpo.querySelector('.ev-cmpscroll');
    const pos = scrollAnterior ? [scrollAnterior.scrollLeft, scrollAnterior.scrollTop] : [0, 0];
    const fora = CARROS.filter(c => !estado.sel.includes(c.id));
    let totalLinhas = 0;

    const blocos = GRUPOS.map(g => {
      const linhas = g.itens.filter(i => {
        if (i[0] === 'marcaModelo' || i[0] === 'versao') return false;
        if (!cmp.soDif) return true;
        return new Set(cars.map(c => textoPuro(c, i[0]))).size > 1 && i[0] !== 'fontes';
      });
      if (!linhas.length) return '';
      totalLinhas += linhas.length;
      const fechado = cmp.fechados.has(g.id);
      const corpoGrupo = fechado ? '' : linhas.map(i => {
        let melhor = null;
        if (i[2] === 'n' && i[4]) {
          const vals = cars.map(c => (c.d[i[0]] && !c.d[i[0]].conf ? c.d[i[0]].v : null)).filter(v => v !== null);
          if (vals.length > 1 && new Set(vals).size > 1) melhor = i[4] === 'mais' ? Math.max(...vals) : Math.min(...vals);
        }
        return `<tr><th scope="row">${esc(i[1])}</th>${cars.map(c => {
          const cel = c.d[i[0]];
          const m = melhor !== null && cel && !cel.conf && cel.v === melhor;
          return `<td class="${m ? 'melhor' : ''}">${valor(c, i[0])}</td>`;
        }).join('')}</tr>`;
      }).join('');
      return `<tbody><tr class="ev-gh"><th colspan="${cars.length + 1}"><button data-ev="grupo" data-g="${g.id}" aria-expanded="${!fechado}">${fechado ? '▸' : '▾'} ${esc(g.nome)} (${linhas.length})</button></th></tr>${corpoGrupo}</tbody>`;
    }).join('');

    corpo.innerHTML = `<div class="ev-cmpctl">
        <label><input type="checkbox" data-evc="dif" ${cmp.soDif ? 'checked' : ''}> Mostrar só o que muda</label>
        ${cars.length < MAX_COMPARA ? `<select data-evc="add" aria-label="Adicionar versão à comparação"><option value="">＋ Adicionar versão</option>${fora.map(c => `<option value="${esc(c.id)}">${esc(c.nome)} · ${esc(c.ver.nome)}</option>`).join('')}</select>` : ''}
        <small style="color:var(--muted)">${totalLinhas} quesitos</small>
      </div>
      <div class="ev-angulos" role="group" aria-label="Ângulo da foto">${ANGULOS.map(a => `<button class="${a === cmp.angulo ? 'on' : ''}" data-ev="angulo" data-a="${esc(a)}">${esc(a)}</button>`).join('')}</div>
      <div class="ev-cmpscroll"><table class="ev-cmp" style="--n:${cars.length}">
        <colgroup><col class="ev-c0">${cars.map(() => '<col>').join('')}</colgroup>
        <thead><tr><th scope="col">Quesito</th>${cars.map(c => `<th scope="col"><button class="ev-tira" data-ev="tirar" data-id="${esc(c.id)}" aria-label="Tirar ${esc(c.curto)} da comparação">×</button><strong>${esc(c.nome)}</strong><span>${esc(c.ver.nome)} · ${reais(num(c, 'preco'))}</span></th>`).join('')}</tr></thead>
        <tbody><tr><th scope="row">Foto: ${esc(cmp.angulo)}</th>${cars.map(c => {
          const i = fotoDoAngulo(c, cmp.angulo);
          if (i < 0) return '<td class="ev-fcel"><div class="ev-foto" style="cursor:default"><span class="ev-semfoto">Sem foto deste ângulo</span></div></td>';
          const f = c.m.fotos[i];
          return `<td class="ev-fcel"><button class="ev-foto" data-ev="luz" data-id="${esc(c.id)}" data-foto="${i}" aria-label="Ampliar ${esc(c.curto)}: ${esc(f[0])}">${imagem(f[1], `${c.nome}: ${f[0]}`)}</button></td>`;
        }).join('')}</tr></tbody>
        ${blocos || `<tbody><tr><td colspan="${cars.length + 1}">Nenhuma diferença entre as versões escolhidas.</td></tr></tbody>`}
      </table></div>`;
    abrirDialogo();
    const novo = corpo.querySelector('.ev-cmpscroll');
    novo.scrollLeft = pos[0];
    novo.scrollTop = pos[1];
  }

  // ---------- Foto ampliada ----------
  let luz = null;
  function abrirLuz(id, i) {
    const c = carro(id);
    const n = c.m.fotos.length;
    i = (i + n) % n;
    luz = { id, i };
    const f = c.m.fotos[i];
    $('evLuzTitulo').textContent = `${c.nome} · ${f[0]}`;
    $('evLuzImg').innerHTML = `${imagem(f[1], `${c.nome}: ${f[0]}`, false)}<button class="ev-seta esq" data-ev="luzpasso" data-p="-1" aria-label="Foto anterior">‹</button><button class="ev-seta dir" data-ev="luzpasso" data-p="1" aria-label="Próxima foto">›</button>`;
    $('evLuzPe').textContent = `${i + 1} de ${n} · Foto de divulgação via ${hostCredito(f[1])}. Cor e versão podem diferir.`;
    const d = $('evLuz');
    if (!d.open) d.showModal();
  }

  // ---------- Abas ----------
  let montado = false;
  function mudarAba(aba, gravar = true) {
    document.body.dataset.aba = aba;
    document.querySelectorAll('.abas button').forEach(b => b.setAttribute('aria-selected', String(b.dataset.aba === aba)));
    document.title = { eletricos: 'Meu próximo SUV · Elétricos até R$ 300 mil', emplacamentos: 'Meu próximo SUV · Emplacamentos' }[aba] || 'Meu próximo SUV · Laboratório de escolha PHEV 2027';
    if (aba === 'eletricos' && !montado) { montado = true; montarFiltros(); desenhar(); }
    if (aba === 'emplacamentos' && window.EMP) window.EMP.mostrar();
    if (gravar) history.replaceState(null, '', aba === 'hibridos' ? location.pathname + location.search : `#${aba}`);
  }

  // ---------- Eventos ----------
  document.addEventListener('click', e => {
    const aba = e.target.closest('.abas [data-aba]');
    if (aba) { mudarAba(aba.dataset.aba); return; }
    const alvo = e.target.closest('[data-ev]');
    if (!alvo) {
      if (e.target === $('evDialogo')) $('evDialogo').close();
      return;
    }
    const { ev, id } = alvo.dataset;
    switch (ev) {
      case 'ficha': abrirFicha(id); break;
      case 'galeria':
        if (Date.now() - ultimoDeslize > 400) abrirFicha(id, +alvo.dataset.foto || 0);
        break;
      case 'cardpasso': moverCard(id, +alvo.dataset.p); break;
      case 'alternar': alternar(id); break;
      case 'alternarFicha': alternar(id); abrirFicha(id, fichaAtual ? fichaAtual.foto : 0); break;
      case 'trocafoto': trocaFoto(+alvo.dataset.foto); break;
      case 'luz': abrirLuz(id, +alvo.dataset.foto); break;
      case 'luzpasso': if (luz) abrirLuz(luz.id, luz.i + (+alvo.dataset.p)); break;
      case 'fecharLuz': $('evLuz').close(); break;
      case 'fechar': $('evDialogo').close(); break;
      case 'comparar': abrirComparacao(); break;
      case 'limparSel': estado.sel = []; desenhar(); break;
      case 'tirar':
        estado.sel = estado.sel.filter(x => x !== id);
        desenhar();
        if (estado.sel.length < 2) $('evDialogo').close(); else abrirComparacao();
        break;
      case 'angulo': cmp.angulo = alvo.dataset.a; abrirComparacao(); break;
      case 'grupo':
        if (cmp.fechados.has(alvo.dataset.g)) cmp.fechados.delete(alvo.dataset.g); else cmp.fechados.add(alvo.dataset.g);
        abrirComparacao();
        break;
      case 'limpar': {
        const sel = estado.sel;
        estado = { ...padrao(), sel, ordem: estado.ordem };
        FILTROS.forEach(f => { $('evf_' + f.k).value = estado[f.k]; atualizaSaida(f); });
        $('evTracao').value = '';
        $('evBusca').value = '';
        document.querySelectorAll('[data-eve]').forEach(x => { x.checked = false; });
        desenhar();
        break;
      }
    }
  });

  document.addEventListener('input', e => {
    const t = e.target;
    if (t.dataset.evf) {
      estado[t.dataset.evf] = +t.value;
      atualizaSaida(FILTROS.find(f => f.k === t.dataset.evf));
      desenhar();
    } else if (t.id === 'evBusca') { estado.busca = t.value; desenhar(); }
  });

  document.addEventListener('change', e => {
    const t = e.target;
    if (t.dataset.evs) { estado[t.dataset.evs] = t.value; desenhar(); }
    else if (t.dataset.eve) {
      estado.eq = t.checked ? [...estado.eq, t.dataset.eve] : estado.eq.filter(k => k !== t.dataset.eve);
      desenhar();
    } else if (t.id === 'evOrdem') { estado.ordem = t.value; desenhar(); }
    else if (t.dataset.evc === 'dif') { cmp.soDif = t.checked; abrirComparacao(); }
    else if (t.dataset.evc === 'add' && t.value) { estado.sel = [...estado.sel, t.value]; desenhar(); abrirComparacao(); }
  });

  let toque = null;
  $('evCards').addEventListener('touchstart', e => {
    const caixa = e.target.closest('.ev-carrossel');
    toque = caixa && e.touches.length === 1 ? { id: caixa.dataset.carro, x: e.touches[0].clientX, y: e.touches[0].clientY } : null;
  }, { passive: true });
  $('evCards').addEventListener('touchend', e => {
    if (!toque) return;
    const dx = e.changedTouches[0].clientX - toque.x, dy = e.changedTouches[0].clientY - toque.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      ultimoDeslize = Date.now();
      moverCard(toque.id, dx < 0 ? 1 : -1);
    }
    toque = null;
  }, { passive: true });
  $('evCards').addEventListener('keydown', e => {
    const caixa = e.target.closest('.ev-carrossel');
    if (!caixa || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return;
    e.preventDefault();
    moverCard(caixa.dataset.carro, e.key === 'ArrowRight' ? 1 : -1);
  });

  document.addEventListener('keydown', e => {
    if (!$('evLuz').open || !luz) return;
    if (e.key === 'ArrowLeft') abrirLuz(luz.id, luz.i - 1);
    if (e.key === 'ArrowRight') abrirLuz(luz.id, luz.i + 1);
  });

  const abaDoHash = () => ({ '#eletricos': 'eletricos', '#emplacamentos': 'emplacamentos' }[location.hash] || 'hibridos');
  window.addEventListener('hashchange', () => mudarAba(abaDoHash(), false));

  $('evResumoModelos').textContent = window.EV_MODELOS.length;
  $('evResumoVersoes').textContent = CARROS.length;
  $('evResumoQuesitos').textContent = ITENS.length;
  $('evResumoFiltrado').textContent = CARROS.length;
  mudarAba(abaDoHash(), false);
})();
