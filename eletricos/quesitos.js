// Os 125 quesitos da comparação de SUVs médios elétricos, agrupados.
// Cada item: [chave, rótulo, tipo, unidade, melhor]
//   tipo: 'n' número, 't' texto, 'e' equipamento (serie, opcional, ausente ou texto com o detalhe)
//   melhor: 'mais' ou 'menos' destaca o melhor valor na comparação lado a lado
window.EV_GRUPOS = [
  { id: 'ident', nome: 'Identificação e mercado', itens: [
    ['marcaModelo', 'Marca e modelo', 't'],
    ['versao', 'Versão', 't'],
    ['anoModelo', 'Ano-modelo', 't'],
    ['origem', 'Origem', 't'],
    ['preco', 'Preço público', 'n', 'R$', 'menos'],
    ['precoCondicao', 'Condição e validade do preço', 't'],
    ['garantiaCarro', 'Garantia do carro', 't'],
    ['garantiaBateria', 'Garantia da bateria', 't'],
    ['concessionarias', 'Concessionárias no Brasil', 'n', '', 'mais'],
    ['fontes', 'Fontes e data', 't']
  ]},
  { id: 'dim', nome: 'Dimensões e capacidades', itens: [
    ['comprimento', 'Comprimento', 'n', 'mm'],
    ['largura', 'Largura', 'n', 'mm'],
    ['larguraRetrovisores', 'Largura com retrovisores', 'n', 'mm'],
    ['altura', 'Altura', 'n', 'mm'],
    ['entreEixos', 'Entre-eixos', 'n', 'mm', 'mais'],
    ['vaoLivre', 'Altura livre do solo', 'n', 'mm', 'mais'],
    ['anguloEntrada', 'Ângulo de entrada', 'n', '°', 'mais'],
    ['anguloSaida', 'Ângulo de saída', 'n', '°', 'mais'],
    ['diametroGiro', 'Diâmetro de giro', 'n', 'm', 'menos'],
    ['portaMalas', 'Porta-malas', 'n', 'L', 'mais'],
    ['portaMalasRebatido', 'Porta-malas com bancos rebatidos', 'n', 'L', 'mais'],
    ['portaMalasDianteiro', 'Porta-malas dianteiro', 'n', 'L', 'mais'],
    ['lugares', 'Lugares', 'n'],
    ['cargaUtil', 'Carga útil', 'n', 'kg', 'mais'],
    ['reboque', 'Capacidade de reboque', 'n', 'kg', 'mais']
  ]},
  { id: 'rodagem', nome: 'Massa e rodagem', itens: [
    ['massa', 'Massa em ordem de marcha', 'n', 'kg', 'menos'],
    ['pesoBruto', 'Peso bruto total', 'n', 'kg'],
    ['cd', 'Coeficiente aerodinâmico (Cd)', 'n', '', 'menos'],
    ['pneus', 'Medida dos pneus', 't'],
    ['rodas', 'Aro e material das rodas', 't'],
    ['estepe', 'Tipo de estepe', 't']
  ]},
  { id: 'motor', nome: 'Motor e desempenho', itens: [
    ['tipoMotor', 'Tipo de motor', 't'],
    ['potenciaMotores', 'Potência de cada motor', 't'],
    ['potenciaTotal', 'Potência total', 'n', 'cv', 'mais'],
    ['torque', 'Torque', 'n', 'Nm', 'mais'],
    ['tracao', 'Tração', 't'],
    ['zeroCem', '0 a 100 km/h', 'n', 's', 'menos'],
    ['retomada60100', 'Retomada de 60 a 100 km/h', 'n', 's', 'menos'],
    ['retomada80120', 'Retomada de 80 a 120 km/h', 'n', 's', 'menos'],
    ['velocidadeMaxima', 'Velocidade máxima', 'n', 'km/h', 'mais'],
    ['modosConducao', 'Modos de condução', 't']
  ]},
  { id: 'bateria', nome: 'Bateria e eficiência', itens: [
    ['capacidadeNominal', 'Capacidade nominal', 'n', 'kWh', 'mais'],
    ['capacidadeUtil', 'Capacidade útil', 'n', 'kWh', 'mais'],
    ['quimica', 'Química', 't'],
    ['tensao', 'Tensão do sistema', 'n', 'V'],
    ['descargaMax', 'Potência máxima de descarga', 'n', 'kW', 'mais'],
    ['consumoInmetro', 'Consumo Inmetro', 'n', 'kWh/100 km', 'menos'],
    ['autonomiaInmetro', 'Autonomia Inmetro', 'n', 'km', 'mais'],
    ['notaPbev', 'Nota no PBEV', 't'],
    ['autonomiaWltp', 'Autonomia WLTP', 'n', 'km', 'mais'],
    ['regenMax', 'Regeneração máxima', 'n', 'kW', 'mais'],
    ['niveisRegen', 'Níveis de regeneração', 't'],
    ['umPedal', 'Condução com um pedal', 'e']
  ]},
  { id: 'recarga', nome: 'Recarga', itens: [
    ['dcMax', 'Potência em corrente contínua', 'n', 'kW', 'mais'],
    ['tempoDc', 'Tempo de recarga rápida', 't'],
    ['acMax', 'Potência em corrente alternada', 'n', 'kW', 'mais'],
    ['tempoAc', 'Tempo de recarga completa', 't'],
    ['conector', 'Padrão do conector', 't'],
    ['carregadorPortatil', 'Carregador portátil incluso', 'e'],
    ['wallbox', 'Wallbox incluso', 'e'],
    ['v2l', 'V2L (alimentar aparelhos externos)', 'e']
  ]},
  { id: 'chassi', nome: 'Chassi e direção', itens: [
    ['suspensaoDianteira', 'Suspensão dianteira', 't'],
    ['suspensaoTraseira', 'Suspensão traseira', 't'],
    ['amortecimentoAdaptativo', 'Amortecimento adaptativo', 'e'],
    ['freios', 'Freios', 't'],
    ['direcao', 'Tipo de direção', 't'],
    ['partidaRampa', 'Assistente de partida em rampa', 'e'],
    ['controleDescida', 'Controle de descida', 'e'],
    ['autoHold', 'Auto hold', 'e']
  ]},
  { id: 'seguranca', nome: 'Segurança', itens: [
    ['airbags', 'Airbags', 'n', '', 'mais'],
    ['crashTest', 'Nota em teste de colisão', 't'],
    ['isofix', 'Isofix', 'e'],
    ['estabilidade', 'Controle de estabilidade e tração', 'e'],
    ['tpms', 'Monitor de pressão dos pneus', 'e'],
    ['alertaFadiga', 'Alerta de fadiga', 'e']
  ]},
  { id: 'adas', nome: 'Assistência à condução', itens: [
    ['nivelAdas', 'Nível de automação declarado', 't'],
    ['acc', 'Piloto automático adaptativo', 'e'],
    ['centralizacaoFaixa', 'Centralização em faixa', 'e'],
    ['frenagemAutonoma', 'Frenagem autônoma', 'e'],
    ['alertaColisao', 'Alerta de colisão frontal', 'e'],
    ['pontoCego', 'Monitor de ponto cego', 'e'],
    ['trafegoCruzado', 'Alerta de tráfego cruzado traseiro', 'e'],
    ['leitorPlacas', 'Leitor de placas', 'e'],
    ['farolAltoAuto', 'Farol alto automático', 'e'],
    ['camera360', 'Câmera 360°', 'e'],
    ['sensoresEstacionamento', 'Sensores de estacionamento', 'e'],
    ['estacionamentoAuto', 'Estacionamento automático', 'e']
  ]},
  { id: 'tec', nome: 'Tecnologia e conectividade', itens: [
    ['telaCentral', 'Tela central', 'n', 'pol', 'mais'],
    ['painelDigital', 'Painel digital', 'n', 'pol', 'mais'],
    ['headUp', 'Head-up display', 'e'],
    ['multimidia', 'Sistema multimídia', 't'],
    ['carplayAndroid', 'Android Auto e Apple CarPlay', 'e'],
    ['vozPortugues', 'Assistente de voz em português', 'e'],
    ['app', 'App com comandos remotos', 'e'],
    ['ota', 'Atualização remota (OTA)', 'e'],
    ['inducao', 'Carregador por indução', 'e'],
    ['usb', 'Portas USB', 't'],
    ['wifi', 'Wi-Fi', 'e'],
    ['chaveDigital', 'Chave digital', 'e'],
    ['som', 'Sistema de som', 't'],
    ['navegacao', 'Navegação nativa', 'e']
  ]},
  { id: 'conforto', nome: 'Conforto', itens: [
    ['arCondicionado', 'Ar-condicionado (zonas)', 't'],
    ['saidasTraseiras', 'Saídas de ar traseiras', 'e'],
    ['filtroAr', 'Filtro de ar da cabine', 't'],
    ['revestimentoBancos', 'Revestimento dos bancos', 't'],
    ['ajusteMotorista', 'Ajuste elétrico do motorista', 'e'],
    ['ajustePassageiro', 'Ajuste elétrico do passageiro', 'e'],
    ['lombar', 'Ajuste lombar', 'e'],
    ['memoria', 'Memória de posição', 'e'],
    ['bancosAquecidos', 'Bancos aquecidos', 'e'],
    ['bancosVentilados', 'Bancos ventilados', 'e'],
    ['massagem', 'Massagem', 'e'],
    ['encostoReclinavel', 'Encosto traseiro reclinável', 'e'],
    ['espacoPernas', 'Espaço para as pernas atrás', 'n', 'mm', 'mais'],
    ['teto', 'Teto solar ou panorâmico', 'e'],
    ['tampaEletrica', 'Tampa do porta-malas elétrica', 'e'],
    ['vidrosAcusticos', 'Vidros acústicos', 'e'],
    ['iluminacaoAmbiente', 'Iluminação ambiente', 'e'],
    ['volanteAquecido', 'Volante aquecido', 'e'],
    ['retrovisoresRebatimento', 'Retrovisores com rebatimento elétrico', 'e']
  ]},
  { id: 'exterior', nome: 'Exterior', itens: [
    ['farois', 'Tipo de faróis', 't'],
    ['lanternas', 'Tipo de lanternas', 't'],
    ['macanetas', 'Maçanetas embutidas', 'e'],
    ['barrasTeto', 'Barras de teto', 'e'],
    ['cores', 'Cores disponíveis', 't']
  ]}
];
