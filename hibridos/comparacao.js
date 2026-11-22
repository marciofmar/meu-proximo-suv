(function () {
  'use strict';

  const groups = [
    ['mercado', 'Identificação e mercado', [
      ['Preço anunciado', 'price', 'money', 'less'],
      ['Diferença simulada vs. seu usado', 'difference', 'money', 'less'],
      ['Condição do preço', 'priceStatus'],
      ['Garantia informada', 'warranty'],
      ['Garantia da bateria', 'batteryWarranty'],
      ['Rede de atendimento', 'network'],
      ['Fonte geral', 'source', 'link']
    ]],
    ['dimensoes', 'Dimensões, capacidades e rodagem', [
      ['Comprimento', 'length', 'mm', 'less'],
      ['Largura', 'width', 'mm', 'less'],
      ['Altura', 'height', 'mm', 'less'],
      ['Entre-eixos', 'wheelbase', 'mm', 'more'],
      ['Altura livre do solo', 'clearance', 'mm', 'more'],
      ['Porta-malas', 'trunk', 'L', 'more'],
      ['Lugares', 'lugares', 'spec'],
      ['Massa em ordem de marcha', 'massa', 'spec', null, 'kg'],
      ['Peso bruto total', 'pbt', 'spec', null, 'kg'],
      ['Carga útil', 'cargaUtil', 'spec', 'more', 'kg'],
      ['Capacidade de reboque', 'reboque', 'spec', null, 'kg'],
      ['Ângulo de entrada', 'anguloEntrada', 'spec', 'more', '°'],
      ['Ângulo de saída', 'anguloSaida', 'spec', 'more', '°'],
      ['Tanque de combustível', 'tanque', 'spec', null, 'L'],
      ['Suspensão', 'suspension'],
      ['Pneus', 'tire'],
      ['Tipo de estepe', 'estepe', 'spec']
    ]],
    ['motor', 'Conjunto híbrido e desempenho', [
      ['Arquitetura', 'energy'],
      ['Combustível', 'fuel'],
      ['Motor flex', 'flex', 'bool'],
      ['Tração', 'drive'],
      ['Tração integral', 'awd', 'bool'],
      ['Transmissão', 'gearbox'],
      ['Motor a combustão', 'motorICE', 'cv'],
      ['Motor elétrico', 'motorElectric', 'cv'],
      ['Dados do conjunto propulsor', 'motorDetail'],
      ['Potência combinada declarada', 'potenciaCombinada', 'spec', 'more', 'cv'],
      ['Torque combinado declarado', 'torqueCombinado', 'spec', 'more', 'Nm'],
      ['0 a 100 km/h declarado', 'zeroCem', 'spec', 'less', 's'],
      ['Retomada de 60 a 100 km/h declarada', 'retomada60100', 'spec', 'less', 's'],
      ['Retomada de 80 a 120 km/h declarada', 'retomada80120', 'spec', 'less', 's'],
      ['Velocidade máxima', 'velocidadeMaxima', 'spec', null, 'km/h'],
      ['O motor a combustão traciona as rodas?', 'direct'],
      ['Perda de força com bateria baixa', 'riskLowSoc'],
      ['Evidência de desempenho com bateria baixa', 'riskEvidence'],
      ['Retomadas com bateria baixa', 'lowSocPassing'],
      ['Conclusão de serra', 'lowSocVerdict'],
      ['Teste independente', 'lowSocSource', 'link']
    ]],
    ['consumo', 'Consumo e autonomia', [
      ['Autonomia elétrica Inmetro', 'range', 'km', 'more'],
      ['Gasolina na cidade (PBEV)', 'gasCidade', 'pbev', 'more', 'km/L'],
      ['Gasolina na estrada (PBEV)', 'gasEstrada', 'pbev', 'more', 'km/L'],
      ['Etanol na cidade (PBEV)', 'etaCidade', 'pbev', 'more', 'km/L'],
      ['Etanol na estrada (PBEV)', 'etaEstrada', 'pbev', 'more', 'km/L'],
      ['Consumo energético (PBEV)', 'energia', 'pbev', 'less', 'MJ/km'],
      ['Classe PBEV (categoria / geral)', 'classe', 'pbev']
    ]],
    ['recarga', 'Bateria e recarga', [
      ['Capacidade nominal da bateria', 'kwh', 'kWh', 'more'],
      ['Capacidade útil da bateria', 'kwhUseful', 'kWh', 'more'],
      ['Química da bateria', 'battery'],
      ['Tensão nominal da bateria', 'tensao', 'spec', null, 'V'],
      ['Arrefecimento da bateria', 'batteryThermal'],
      ['Gerenciamento da bateria', 'batteryBMS'],
      ['Potência de recarga AC', 'ac', 'kW', 'more'],
      ['Aceita recarga DC', 'dc', 'bool'],
      ['Potência de recarga DC', 'dc', 'kW', 'more'],
      ['Conectores de recarga', 'conector', 'spec'],
      ['Tempo de recarga AC', 'tempoAc', 'spec'],
      ['Tempo de recarga DC', 'tempoDc', 'spec'],
      ['V2L (alimentar aparelhos externos)', 'v2l', 'spec'],
      ['Proteção da bateria', 'batteryProtection'],
      ['Laudo independente da versão', 'batteryIndependent']
    ]],
    ['seguranca', 'Segurança e assistência à condução', [
      ['Airbags', 'airbags', '', 'more'],
      ['Teste de colisão e protocolo', 'crashTest'],
      ['Frenagem autônoma', 'aeb', 'bool'],
      ['Frenagem para pedestres e ciclistas', 'AEB pedestres/ciclistas', 'adas'],
      ['Piloto automático adaptativo', 'acc', 'bool'],
      ['ACC com Stop & Go', 'ACC stop-go', 'adas'],
      ['Centralização em faixa', 'Centralização faixa', 'adas'],
      ['Assistência de faixa', 'Alerta / assistente faixa', 'adas'],
      ['Monitor de ponto cego', 'Ponto cego', 'adas'],
      ['Frenagem de tráfego cruzado', 'Tráfego cruzado freia', 'adas'],
      ['Câmera panorâmica', 'camera360', 'bool'],
      ['Descrição da câmera panorâmica', 'Câmera 360', 'adas'],
      ['Sensores de estacionamento', 'Sensores dianteiros/traseiros', 'adas'],
      ['Isofix', 'ISOFIX', 'adas'],
      ['Fonte do pacote de assistência', 'Fonte', 'adasLink']
    ]],
    ['conforto', 'Tecnologia e conforto', [
      ['Head-up display (HUD)', 'headUp', 'hud'],
      ['Tela central', 'telaCentral', 'spec', null, 'pol'],
      ['Painel de instrumentos', 'painelDigital', 'spec', null, 'pol'],
      ['Apple CarPlay', 'Apple CarPlay', 'adas'],
      ['Android Auto', 'Android Auto', 'adas'],
      ['Atualização remota (OTA)', 'OTA', 'adas'],
      ['Aplicativo com comandos remotos', 'Apps remotos', 'adas'],
      ['Chave digital', 'Chave digital', 'adas'],
      ['Sistema de som', 'audio'],
      ['Alto-falantes', 'speakers', '', 'more'],
      ['Banco do motorista elétrico', 'ajusteMotorista', 'bool'],
      ['Ajuste lombar', 'lombar', 'bool'],
      ['Aquecimento dos bancos', 'bancosAquecidos', 'bool'],
      ['Massagem nos bancos', 'massagem', 'bool'],
      ['Tampa do porta-malas elétrica', 'tampaEletrica', 'bool'],
      ['Carregador por indução', 'inducao', 'bool'],
      ['Saídas de ar traseiras', 'rearAC'],
      ['Ventilação dos bancos', 'seatVent'],
      ['Memória dos bancos', 'seatMemory'],
      ['Teto solar ou panorâmico', 'sunroof']
    ]]
  ];

  const view = { differences: false, angle: 'Dianteira 3/4', closed: new Set() };
  const units = new Set(['mm', 'L', 'cv', 'km', 'kWh', 'kW']);
  const numberFormat = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 3 });

  function field(model, key, type) {
    if (type === 'spec' || type === 'pbev') {
      const [source, values] = window.PHEV_TECNICA[model.id]?.[type] ?? [];
      const value = values?.[key];
      return { value: value ?? (key.startsWith('eta') && model.features.flex === false ? 'Não se aplica' : null), source: value == null ? null : source };
    }
    if (key === 'difference') return { value: model.price == null ? null : model.price - state.usedValue };
    if (type === 'bool') {
      const [source, spec] = window.PHEV_TECNICA[model.id]?.spec ?? [];
      return { value: model.features[key], source: typeof spec?.[key] === 'boolean' ? source : null };
    }
    if (key === 'dc' && model.features.dc === false) return { value: 'Não aceita recarga DC' };
    if (type === 'adas' || type === 'adasLink') return { value: model.adas?.[key] };
    return { value: model[key], source: type === 'hud' ? model.headUpSource : null };
  }

  function display({ value, source }, type, unit) {
    let label = 'Não informado';
    if (type === 'link' || type === 'adasLink') return value ? urlLink(value, 'Abrir fonte') : label;
    if (value != null && value !== '') {
      if (typeof value === 'boolean') label = value ? 'Sim' : 'Não';
      else if (typeof value === 'number') {
        const suffix = unit || (units.has(type) ? type : '');
        label = type === 'money' ? money(value) : numberFormat.format(value) + (suffix ? ' ' + suffix : '');
      } else label = value;
    }
    return esc(label) + (source ? ` <small class="hybrid-compare-source">${urlLink(source, 'Fonte')}</small>` : '');
  }

  function block(members, [id, title, rows]) {
    const entries = rows.map(row => [row, members.map(m => field(m, row[1], row[2]))])
      .filter(([, cells]) => !view.differences || new Set(cells.map(c => c.value ?? null)).size > 1);
    if (!entries.length) return '';
    const closed = view.closed.has(id);
    const content = entries.map(([[label, key, type, direction, unit], cells]) => {
      const numbers = cells.map(c => c.value).filter(Number.isFinite);
      const best = direction && new Set(numbers).size > 1 ? (direction === 'less' ? Math.min(...numbers) : Math.max(...numbers)) : null;
      return `<tr><th scope="row">${esc(label)}</th>${cells.map(c => {
        const big = (key === 'width' || key === 'height') && c.value > REFERENCE[key];
        return `<td class="${best !== null && c.value === best ? 'good' : ''} ${big ? 'big' : ''}">${display(c, type, unit)}</td>`;
      }).join('')}</tr>`;
    }).join('');
    return `<tbody><tr class="hybrid-compare-group"><th scope="rowgroup" colspan="${members.length + 1}"><button class="btn sm soft" data-action="compareGroup" data-key="${id}" aria-expanded="${!closed}">${closed ? '▸' : '▾'} ${esc(title)} · ${entries.length}</button></th></tr>${closed ? '' : content}</tbody>`;
  }

  function show() {
    const members = state.compared.map(id => MODELS.find(m => m.id === id)).filter(Boolean);
    if (members.length < 2) return flash('Selecione pelo menos 2 carros para comparação.');
    const previous = el('modalBody').querySelector('.compareScroll');
    const control = currentModal?.type === 'compare' ? document.activeElement?.dataset : null;
    const scroll = previous ? [previous.scrollLeft, previous.scrollTop] : null;
    currentModal = { type: 'compare' };
    el('modalTitle').textContent = 'Comparação lado a lado';
    el('modalSub').textContent = `${members.length} versões · verde indica o melhor valor numérico`;
    const gallery = window.PHEV_GALERIA;
    const options = MODELS.filter(m => !state.compared.includes(m.id))
      .map(m => `<option value="${m.id}">${esc(m.name)}</option>`).join('');
    const header = `<thead><tr><th scope="col">Critério</th>${members.map(m => `<th scope="col"><strong>${esc(m.brand)} ${esc(m.model)}</strong><br><span class="subtle">${esc(m.version)}</span><br><button class="btn sm danger" data-action="compareToggle" data-id="${m.id}">Remover</button></th>`).join('')}</tr></thead>`;
    el('modalBody').innerHTML = `<div class="hybrid-compare-tools">
      <label><input type="checkbox" data-setting="compareDifferences" ${view.differences ? 'checked' : ''}> Mostrar só o que muda</label>
      ${members.length < 4 ? `<select data-setting="compareAdd" aria-label="Adicionar versão à comparação"><option value="">＋ Adicionar versão</option>${options}</select>` : ''}
      </div><div class="hybrid-compare-angles" role="group" aria-label="Ângulo das fotos">
        ${gallery.angles.map((angle, i) => `<button class="btn sm soft" data-action="compareAngle" data-angle="${i}" aria-pressed="${view.angle === angle}">${esc(angle)}</button>`).join('')}
      </div>
      <div class="compareScroll"><table class="compareTable">${header}
        <tbody><tr><th scope="row">Foto · ${esc(view.angle)}</th>${members.map(m => gallery.compareCell(m, view.angle)).join('')}</tr></tbody>
        ${groups.map(group => block(members, group)).join('')}
      </table></div>`;
    el('modalOverlay').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (scroll) el('modalBody').querySelector('.compareScroll').scrollTo(...scroll);
    if (control?.action === 'compareAngle') el('modalBody').querySelector('[data-action="compareAngle"][aria-pressed="true"]')?.focus({ preventScroll: true });
    if (control?.action === 'compareGroup') el('modalBody').querySelector(`[data-action="compareGroup"][data-key="${CSS.escape(control.key)}"]`)?.focus({ preventScroll: true });
    if (control?.setting === 'compareDifferences') el('modalBody').querySelector('[data-setting="compareDifferences"]')?.focus({ preventScroll: true });
  }

  function detail(model) {
    return groups.map(([id, title, rows]) => `<details class="hybrid-spec-group" ${id === 'dimensoes' ? 'open' : ''}>
      <summary>${esc(title)}</summary>
      ${rows.map(([label, key, type, , unit]) => `<div class="kv"><div class="k">${esc(label)}</div><div class="v">${display(field(model, key, type), type, unit)}</div></div>`).join('')}
    </details>`).join('');
  }

  window.PHEV_COMPARACAO = { view, show, detail };
})();
