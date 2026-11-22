// SUVs médios 100% elétricos até R$ 300 mil à venda no Brasil. Levantamento de 21/11/2026.
// Porte médio: a partir de 4,40 m. O JAC E-JS4 saiu da lista: a marca confirmou fim de linha e estoque zerado em ago/2026.
//
// Formato das fichas: uma linha por quesito, "chave=valor @fontes".
//   - "comum" vale para todas as versões; cada versão só traz o que muda.
//   - número precedido de "?" é dado a confirmar ou de outro mercado (ver a fonte): aparece marcado e não concorre ao destaque de melhor valor.
//   - equipamento: serie | opcional | ausente | confirmar, com detalhe depois de ":".
//   - em quesitos numéricos, " | " acrescenta contexto. Use "—" se o dado comparável não foi informado.
//   - quesito sem linha = não informado nas fontes consultadas.
(function () {
  const EC = 'https://www.encontracarros.com.br/wp-content/uploads/';
  const AU = 'https://www.autoo.com.br/fotos/';
  const RC = 'https://revistacarro.com.br/wp-content/uploads/2026/09/vw-id4-pro-2027-';
  const BY = 'https://www.byd.com/material/byd-site/br/product/byd-yuan-pro/yuan-2026/';
  const AE = 'https://autoentusiastas.com.br/ae/wp-content/uploads/';

  const LEVANTAMENTO = ['Levantamento Técnico — SUVs Elétricos no Brasil', null, 'arquivo fornecido'];

  window.EV_MODELOS = [
    {
      id: 'omoda-e5', marca: 'Omoda', modelo: 'E5',
      fontes: [
        ['Comprecar (preços do site oficial em 11/11/2026)', 'https://www.comprecar.com.br/blog/?p=2070', '12/11/2026'],
        ['Encontracarros', 'https://www.encontracarros.com.br/omoda-e5-2027-chega-ao-brasil/', '04/11/2026'],
        ['AutoPapo', 'https://autopapo.com.br/noticia/omoda-e5-2027-lancamento/', '04/11/2026'],
        ['GameOverDrive', 'https://gameoverdrive.com.br/omoda-e5-2027-preco-autonomia-versoes/', '05/11/2026'],
        ['Autoentusiastas', 'https://autoentusiastas.com.br/2026/11/omoda-e5-2027-eletrico-precos-versoes-alcance/', '04/11/2026'],
        ['Primo Auto', 'https://primoauto.com.br/novo-omoda-e5-2027-precos-elite-prestige-comparativo', '04/11/2026'],
        ['Autoranking', 'https://autoranking.com.br/omoda-e5-precos-versoes-autonomia-equipamentos/', '05/11/2026'],
        ['Mobiauto', 'https://www.mobiauto.com.br/revista/omoda-e5-2027-fica-ate-r-50-mil-mais-barato-e-melhora-velocidade-de-recarga/11948', '04/11/2026'],
        LEVANTAMENTO
      ],
      alertas: ['O lote de lançamento (R$ 149.990 e R$ 179.990) já foi encerrado.', 'O levantamento não identifica medição de consumo PBEV da linha 2027.'],
      comum: `
anoModelo=2027 @1
origem=Marca chinesa, importado @4
precoCondicao=Tabela no site oficial em 11/11/2026 @1
garantiaCarro=7 anos ou 150.000 km @1
garantiaBateria=8 anos ou 150.000 km @1
comprimento=4545 @2
largura=1830 @2
altura=1580 @2
entreEixos=2630 @1
portaMalas=372 @1
portaMalasDianteiro=32 @2
estepe=Temporário @1
tipoMotor=Síncrono de ímãs permanentes, dianteiro @2
potenciaMotores=1 motor dianteiro, 155 kW @2
potenciaTotal=210 @1
torque=288 @2
tracao=Dianteira @1
zeroCem=7.2 @1
velocidadeMaxima=171 @1
modosConducao=Normal, Eco, Sport @2
v2l=serie @2
conector=Porta única AC e DC @1
suspensaoDianteira=McPherson @2
suspensaoTraseira=Multilink independente @2
freios=Disco nas quatro rodas @2
partidaRampa=serie @2
controleDescida=serie @2
autoHold=serie @2
airbags=7 @2
estabilidade=serie @2
tpms=serie @2
sensoresEstacionamento=serie: dianteiros e traseiros @2
inducao=serie: 50 W com refrigeração @2
carplayAndroid=serie: sem fio @2
chaveDigital=serie: chave presencial @2
usb=Tipo A e tipo C na traseira @1
arCondicionado=Digital automático, 2 zonas @2
saidasTraseiras=serie @1
tampaEletrica=serie: com sensor de presença @2
iluminacaoAmbiente=serie: configurável @2
farois=LED @3
lanternas=LED @1
cores=4 opções @3
vaoLivre=171 @5,6,7
portaMalasRebatido=1079 @5,6,7
lugares=5 @5
cd=0.281 @5
direcao=Pinhão e cremalheira, assistência elétrica na coluna @5
isofix=serie @8
concessionarias=100 | Rede da marca em 25 estados, em julho de 2026 @9
larguraRetrovisores=2102 @9
anguloEntrada=19.7 @9
anguloSaida=24.9 @9
diametroGiro=10.9 @9
reboque=— | Homologação brasileira não informada. Sem capacidade homologada na referência europeia. @9
capacidadeUtil=— | O levantamento só discrimina a capacidade nominal na linha 2027. @9
quimica=LFP @9
tensao=— | Arquitetura de classe 400 V. Tensão nominal de 370 V na referência do pacote de cerca de 61 kWh. Tensão exata da linha 2027 não informada. @9
notaPbev=A (relativa e absoluta) @9
regenMax=?100 | Até 100 kW, referência da plataforma. Sem confirmação para a linha brasileira 2027. @9
niveisRegen=3 níveis ajustáveis @9
umPedal=ausente: sem parada total no modo regenerativo @9
carregadorPortatil=confirmar: inclusão de série não informada @9
wallbox=ausente: sem inclusão de série, sujeito a campanha @9
amortecimentoAdaptativo=ausente: amortecedores passivos @9
crashTest=5 estrelas Euro NCAP e ANCAP (outros mercados). Sem avaliação no Latin NCAP. @9
estacionamentoAuto=ausente @9
headUp=ausente @9
vozPortugues=serie @9
app=serie: Carlinko, com habilitação na concessionária. Climatização, travas, vidros e consulta da bateria e dos pneus. @9
ota=confirmar: ativação no Brasil não confirmada @9
wifi=ausente: sem hotspot integrado @9
navegacao=serie: GPS embarcado @9
filtroAr=Filtro de partículas finas (PM2.5/N95) @9
memoria=ausente @9
encostoReclinavel=ausente: encosto fixo e banco rebatível @9
vidrosAcusticos=serie: para-brisa e laterais dianteiros @9
volanteAquecido=ausente @9
macanetas=ausente: convencionais @9
barrasTeto=ausente: sem barras longitudinais elevadas @9
descargaMax=3.3 @9`,
      versoes: [
        { id: 'elite', nome: 'Elite', dados: `
preco=159990 @1
capacidadeNominal=50.6 @1
autonomiaInmetro=278 @1
dcMax=110 @1
tempoDc=16 min (30% a 80%) @2
acMax=6.6 @1
tempoAc=8 h (10% a 100%) @2
massa=1660 @2
rodas=Liga leve, aro 17 @2
pneus=215/60 R17 @1
telaCentral=12.3 @1
painelDigital=8 @1
revestimentoBancos=Tecido @1
som=6 alto-falantes @1
camera360=ausente: só câmera de ré @1
sensoresEstacionamento=serie: 2 dianteiros e 4 traseiros @1
ajusteMotorista=ausente @1
bancosAquecidos=ausente @1
bancosVentilados=ausente @1
massagem=ausente @1
teto=ausente @1
nivelAdas=Sem pacote ADAS @2
acc=ausente @2
centralizacaoFaixa=ausente @2
frenagemAutonoma=ausente @2
alertaColisao=ausente @2
pontoCego=ausente @2
trafegoCruzado=ausente @2
farolAltoAuto=ausente @2
cargaUtil=425 @5
pesoBruto=2085 @5
multimidia=Tela tátil de 12,3 pol @5,6
alertaFadiga=ausente @5,6
ajustePassageiro=ausente: manual @6
lombar=ausente @5,6
retrovisoresRebatimento=ausente: elétricos e aquecidos, sem rebatimento @5,6
leitorPlacas=ausente: versão sem pacote ADAS @9
consumoInmetro=— | Eficiência declarada de 5,5 km/kWh, equivalente a cerca de 18,2 kWh/100 km. O levantamento não identifica esse valor como medição PBEV da versão. @9
autonomiaWltp=— | O levantamento informa 278 km no Inmetro. Os até 430 km WLTP referem-se à Prestige. @9` },
        { id: 'prestige', nome: 'Prestige', dados: `
preco=184990 @1
capacidadeNominal=60.9 @1
autonomiaInmetro=320 @1
autonomiaWltp=430 @2
dcMax=130 @1
tempoDc=28 min (30% a 80%) @2
acMax=11 @1
tempoAc=7 h (10% a 100%) @2
massa=1742 @2
rodas=Liga leve, aro 18 @2
pneus=215/55 R18 @1
telaCentral=15.6 @1
painelDigital=8.8 @1
revestimentoBancos=Material sintético @1
som=Sony, 8 alto-falantes @2
camera360=serie: visão 540° @2
ajusteMotorista=serie: elétrico @1
ajustePassageiro=serie: elétrico @1
lombar=serie: motorista @1
bancosAquecidos=serie: dianteiros @1
bancosVentilados=serie: dianteiros @1
massagem=serie: motorista, 5 programas @1
teto=serie: solar elétrico, não panorâmico @1
retrovisoresRebatimento=serie @2
nivelAdas=ADAS 2.5 @2
acc=serie: com parada @1
centralizacaoFaixa=serie @1
frenagemAutonoma=serie @1
alertaColisao=serie: frontal @1
pontoCego=serie @1
trafegoCruzado=serie: traseiro @1
farolAltoAuto=serie @1
cargaUtil=518 @5
pesoBruto=2260 @5
multimidia=Tela UHD de 15,6 pol @5,6
alertaFadiga=serie: monitoramento do motorista (DMS) @5,6
leitorPlacas=serie: integrado ao ADAS @9` }
      ],
      fotos: [
        ['Frente', EC + '2026/11/omoda-e5_2027_07.jpg'], ['Dianteira 3/4', EC + '2026/11/omoda-e5_2027.jpg'],
        ['Lateral', EC + '2026/11/omoda-e5_2027_15.jpg'], ['Traseira 3/4', EC + '2026/11/omoda-e5_2027_06.jpg'],
        ['Traseira', EC + '2026/11/omoda-e5_2027_08.jpg'], ['Painel', EC + '2026/11/omoda-e5_2027_10.jpg'],
        ['Instrumentos', EC + '2026/11/omoda-e5_2027_11.jpg'], ['Bancos dianteiros', EC + '2026/11/omoda-e5_2027_12.jpg'],
        ['Bancos traseiros', EC + '2026/11/omoda-e5_2027_13.jpg'], ['Lanterna', EC + '2026/11/omoda-e5_2027_03.jpg'],
        ['Roda', EC + '2026/11/omoda-e5_2027_04.jpg']
      ]
    },
    {
      id: 'ora-5', marca: 'GWM', modelo: 'Ora 5',
      fontes: [
        ['Canal VE (ficha técnica)', 'https://canalve.com.br/ficha-tecnica/gwm/tudo-sobre-ora-5/', 'sem data'],
        ['AutoPapo', 'https://autopapo.com.br/noticia/gwm-ora-5-preco-equipamentos-autonomia/', '24/06/2026'],
        ['AUTOO (lançamento)', 'https://www.autoo.com.br/gwm-lanca-suv-eletrico-ora5-com-preco-de-t-cross-tracker-e-outros-veja-detalhes/', '24/06/2026'],
        ['A Crítica', 'https://acritica.net/automoveis/gwm-lanca-ora-5-suv-eletrico-r-159-mil-autonomia-349-km/', '24/06/2026'],
        ['AUTOO (preço atual)', 'https://www.autoo.com.br/gwm-ora-5-j-custa-r-165990-mas-est-sem-estoque-na-loja-oficial/', '21/11/2026'],
        ['GWM Newhouse (concessionária oficial)', 'https://www.gwmnewhouse.com.br/modelo/ora-5/', 'sem data'],
        ['Car.Blog.BR', 'https://www.car.blog.br/2026/06/gwm-ora-5-suv-eletrico-preco-fotos.html', '24/06/2026'],
        ['AutoHub', 'https://www.autohubcars.com.br/lancamentos-gwm-ora-5', '20/09/2026'],
        LEVANTAMENTO
      ],
      alertas: ['Em 21/11/2026 aparecia sem estoque na loja oficial. Confirme a disponibilidade.'],
      comum: `
anoModelo=2027 @1
origem=China, importado @5
preco=165990 @5
precoCondicao=Anúncio na loja oficial, sem estoque em 21/11/2026 @5
garantiaCarro=5 anos @2
garantiaBateria=8 anos ou 200.000 km @2
comprimento=4471 @1
largura=1833 @1
altura=1641 @1
entreEixos=2720 @1
vaoLivre=175 @2
anguloEntrada=17 @2
anguloSaida=25 @2
portaMalas=362 @1
lugares=5 @1
massa=1685 @1
cd=0.276 @4
pneus=225/60 R18 @4
rodas=Liga leve, aro 18 @2
estepe=Exclusivo para o Brasil, tipo não informado @2
tipoMotor=Elétrico @1
potenciaTotal=204 @1
torque=260 @2
tracao=Dianteira @1
zeroCem=7.7 @1
velocidadeMaxima=170 @1
modosConducao=Eco, Well Being, Normal, Esportivo @1
capacidadeNominal=58.3 @1
quimica=LFP @2
autonomiaInmetro=349 @1
autonomiaWltp=435 @2
dcMax=120 @1
tempoDc=20 min (30% a 80%) @2
acMax=11 @1
tempoAc=8,5 h (0% a 100%) @2
v2l=serie @2,9
suspensaoDianteira=McPherson independente @1
suspensaoTraseira=Multilink independente @1
freios=Discos ventilados na frente, sólidos atrás @1
direcao=Elétrica @1
partidaRampa=serie @1
controleDescida=serie @1
autoHold=serie @1
airbags=6 @1
isofix=serie @1
estabilidade=serie: controle de tração citado @1
tpms=serie @1
nivelAdas=ADAS 2+ @1
acc=serie: com função de curvas @1
centralizacaoFaixa=serie @1
frenagemAutonoma=serie @1
alertaColisao=serie: frontal e traseiro @1
pontoCego=serie @1
trafegoCruzado=serie: traseiro e dianteiro @1
leitorPlacas=serie @1
camera360=serie: 540°, 8 visualizações @1
sensoresEstacionamento=serie: 4 traseiros @1
telaCentral=14.6 @1
painelDigital=10.25 @1
multimidia=GWM Coffee OS3 @1
carplayAndroid=serie: sem fio @1
vozPortugues=serie: mais de 300 comandos com IA; idioma não informado @1
app=serie: My GWM @3
ota=serie @1
inducao=serie: 50 W @1
usb=2 dianteiras (A e C), 1 traseira (C) @1
som=9 alto-falantes, subwoofer, 216 W @2
navegacao=serie: GPS com trânsito ao vivo @1
arCondicionado=Automático @1
saidasTraseiras=serie @1
filtroAr=N95 @1
revestimentoBancos=Couro sintético @1
ajusteMotorista=serie: elétrico @1
ajustePassageiro=serie: elétrico @1
memoria=serie: motorista @1
bancosVentilados=serie: motorista e passageiro @1
teto=serie: panorâmico fixo de 1,65 m², cortina elétrica @2
tampaEletrica=serie @2
iluminacaoAmbiente=serie: configurável @1
retrovisoresRebatimento=serie: automático ao travar @1
farois=Full LED @2
lanternas=Integradas ao vidro traseiro @4
cores=Cinza Zenith, Preto Khalifa, Branco Cristal, Electric Blue @2
potenciaMotores=1 motor dianteiro, 204 cv @6,7
conector=CCS Tipo 2 @6,7
wifi=serie: Wi-Fi compartilhado @6
niveisRegen=Ajustável, quantidade não informada @7,8
descargaMax=6 @2,9
concessionarias=130 | Rede da marca no encerramento de 2025, referência da operação em 2026. @9
portaMalasDianteiro=0 @9
reboque=— | Homologação brasileira não informada. @9
capacidadeUtil=— | O levantamento só discrimina a capacidade nominal. @9
tensao=— | Arquitetura de classe 400 V. Tensão nominal não informada. @9
consumoInmetro=— | Eficiência declarada de 6,0 km/kWh, equivalente a cerca de 16,7 kWh/100 km. Medição de consumo PBEV não identificada no levantamento. @9
notaPbev=A @9
umPedal=serie @9
carregadorPortatil=serie @9
wallbox=serie: incluído na oferta comercial da GWM Brasil @9
amortecimentoAdaptativo=ausente: amortecedores passivos @9
crashTest=Sem avaliação no Euro NCAP e no Latin NCAP @9
alertaFadiga=serie @9
farolAltoAuto=serie @9
estacionamentoAuto=confirmar: item não listado na ficha brasileira @9
headUp=ausente @9
chaveDigital=serie: aplicativo My GWM e chave presencial @9
lombar=confirmar: item não listado na ficha brasileira @9
bancosAquecidos=ausente @9
massagem=ausente @9
encostoReclinavel=ausente: encosto fixo e banco rebatível @9
vidrosAcusticos=confirmar: isolamento acústico não especificado @9
volanteAquecido=ausente @9
macanetas=ausente: convencionais @9
barrasTeto=ausente: sem barras longitudinais elevadas @9`,
      versoes: [{ id: 'unica', nome: 'Versão única', dados: '' }],
      fotos: [
        ['Dianteira 3/4', EC + '2026/06/ORA-5.jpg'], ['Dianteira 3/4 (outra cor)', EC + '2026/06/ORA-3_4-DIANTEIRA.jpeg'],
        ['Lateral', EC + '2026/06/ORA-5_ambientada-2.jpeg'], ['Traseira 3/4', EC + '2026/06/ORA-5_02.jpg'],
        ['Traseira', EC + '2026/06/ORA-5-_traseira.jpg'], ['Painel', EC + '2026/06/ORA-5-PAINEL-02.jpg'],
        ['Volante e telas', EC + '2026/06/ORA-5-PAINEL-04.jpg'], ['Bancos dianteiros', EC + '2026/06/ORA-5-ASSENTOS-03.jpg'],
        ['Bancos traseiros', EC + '2026/06/ORA-5-ASSENTOS-04.jpg'], ['Bancos rebatidos', EC + '2026/06/ORA-5-ASSENTOS-02.jpg'],
        ['Porta-malas', EC + '2026/06/ORA-5-PORTA-MALAS.jpeg'], ['Teto panorâmico', EC + '2026/06/ORA-5-ASSENTOS-01.jpg'],
        ['Lanterna', EC + '2026/06/ORA-5-LANTERNA.jpg.jpeg']
      ]
    },
    {
      id: 'b10', marca: 'Leapmotor', modelo: 'B10 Elétrico',
      fontes: [
        ['AutoPapo', 'https://autopapo.com.br/noticia/leapmotor-b10-chega-por-182-mil/', '07/04/2026'],
        ['AUTOO', 'https://www.autoo.com.br/leapmotor-b10-chega-ao-brasil-com-recarga-em-16-minutos-saiba-mais-sobre-o-suv/', '10/04/2026'],
        ['CNN Brasil', 'https://www.cnnbrasil.com.br/auto/leapmotor-b10-sera-nacional-e-suv-eletrico-parte-de-r-182-990/', '07/04/2026'],
        ['Webmotors (ficha, via resultado de busca)', 'https://www.webmotors.com.br/leapmotor/b10/2026', '21/11/2026'],
        ['AUTOO (Black Friday)', 'https://www.autoo.com.br/black-friday-da-leapmotor-mantm-preos-dos-suvs-mas-oferece-brindes-e-financiamento/', '11/2026'],
        ['Autoentusiastas (uso)', 'https://autoentusiastas.com.br/2026/07/leapmotor-b10-no-uso/', '07/2026'],
        ['Leapmotor Saga (concessionária)', 'https://www.leapmotorsaga.com.br/blog/leapmotor-b10-ficha-tecnica', '28/03/2026'],
        ['Auto+ TV (avaliação)', 'https://www.automaistv.com.br/avaliacao/leapmotor-b10-e-seu-tio-preferido-mas-que-faz-a-piada-do-pave-avaliacao/', '08/06/2026'],
        ['ABC do ABC (avaliação)', 'https://abcdoabc.com.br/leapmotor-b10-2', '28/07/2026'],
        ['Encontracarros (C10 e B10)', 'https://www.encontracarros.com.br/leapmotor-c10-e-b10/', '12/08/2026'],
        LEVANTAMENTO
      ],
      alertas: ['As fontes divergem sobre o ajuste elétrico do banco do motorista. Confira no carro.'],
      comum: `
anoModelo=2026 @2
origem=Stellantis, produção anunciada em Goiana (PE) @1
preco=182990 @5
precoCondicao=Black Friday: sem desconto, com wallbox, seguro ou IPVA de brinde @5
comprimento=4515 @4
largura=1885 @4
altura=1655 @4
entreEixos=2735 @4
portaMalas=405 @1
portaMalasRebatido=1615 @1
portaMalasDianteiro=21.5 @1
rodas=Liga leve, aro 18 @1
tipoMotor=Elétrico traseiro com refrigeração a óleo @1
potenciaMotores=1 motor traseiro, 160 kW @1
potenciaTotal=218 @1
torque=240 @4
tracao=Traseira @1
zeroCem=8 @1
velocidadeMaxima=170 @1
modosConducao=Comfort, Standard, Sport @2
niveisRegen=3 níveis ajustáveis @11
capacidadeNominal=56.2 @1
quimica=LFP @2
autonomiaInmetro=288 @1
autonomiaWltp=361 @3
dcMax=140 @1
tempoDc=16 min (30% a 80%) @1
acMax=11 @1
wallbox=opcional: um dos brindes da Black Friday @5
suspensaoDianteira=McPherson @1
suspensaoTraseira=Multilink independente @1
controleDescida=serie @2
autoHold=serie @2
airbags=7 @1
alertaFadiga=serie @2
nivelAdas=ADAS 2 @2
acc=serie @3
centralizacaoFaixa=serie @1
frenagemAutonoma=serie @2
alertaColisao=serie: frontal e traseiro @1
pontoCego=serie @2
trafegoCruzado=serie: com frenagem @1
telaCentral=14.6 @1
painelDigital=8.8 @1
multimidia=LeapOS, Snapdragon 8155 @2
carplayAndroid=serie: sem fio @2
app=serie: Leap+ @2
ota=serie @1
inducao=serie @2
chaveDigital=serie: smartphone e NFC @2
revestimentoBancos=Tecido com certificação OEKO-TEX @1
ajusteMotorista=confirmar: AutoPapo, ABC do ABC e Encontracarros indicam manual; Autoentusiastas lista elétrico @1,9,10,6
teto=serie: panorâmico de 1,8 m², cortina elétrica @1
farois=Full LED automáticos @1
lanternas=LED integradas @1
macanetas=serie @2
cores=Roxo Aurora, Cinza Tundra, Branco Lunar, Preto Eclipse @1
garantiaBateria=8 anos ou 160.000 km @7
larguraRetrovisores=2110 @6,9
vaoLivre=185 @6,8,9
anguloEntrada=22 @6,9
anguloSaida=28 @6,9
diametroGiro=10.5 @6
lugares=5 @10
cargaUtil=435 @6
massa=1780 @6,8,9
pneus=225/50 R18 na frente, 235/50 R18 atrás @6,9,10
freios=Disco ventilado na frente, disco atrás @6,9
direcao=Elétrica, pinhão e cremalheira @6,9
umPedal=serie @9
tempoAc=3,9 h (30% a 80%) @6,9,10
conector=Type 2 e CCS2 @6,9
carregadorPortatil=serie: T2M2 @10
partidaRampa=serie @10
estabilidade=serie @8,10
tpms=serie @8
farolAltoAuto=serie @8,10
camera360=serie @7,6
sensoresEstacionamento=serie: traseiros @10
vozPortugues=serie: comando de voz; idioma não informado @9
usb=4 portas (2 tipo A, 2 tipo C) @9
wifi=serie: internet 4G a bordo @8,10
navegacao=serie @6,9
arCondicionado=Automático digital, 1 zona @8,6
saidasTraseiras=serie @10
bancosAquecidos=ausente @10
bancosVentilados=ausente @10
garantiaCarro=6 anos @11
concessionarias=?38 | Cerca de 38 pontos de venda da marca em meados de 2026. @11
reboque=?750 | Homologação europeia. Homologação brasileira não informada. @11
estepe=Kit de reparo de pneus @11
capacidadeUtil=— | O levantamento só discrimina a capacidade nominal. @11
tensao=— | Arquitetura de classe 400 V. Tensão nominal não informada. @11
consumoInmetro=— | Eficiência declarada de 5,1 km/kWh, equivalente a cerca de 19,6 kWh/100 km. Medição de consumo PBEV não identificada no levantamento. @11
notaPbev=A @11
v2l=serie @11
descargaMax=3.3 @11
amortecimentoAdaptativo=ausente: amortecedores passivos @11
crashTest=5 estrelas Euro NCAP (novembro de 2025, outro mercado). Adultos 93%, crianças 93%, usuários vulneráveis 84% e assistências 85%. @11
isofix=serie: inclui padrão i-Size @11
leitorPlacas=serie: integrado ao ADAS @11
estacionamentoAuto=confirmar: item não listado na ficha brasileira @11
headUp=ausente @11
som=6 alto-falantes @11
filtroAr=Filtro de partículas @11
ajustePassageiro=ausente: ajuste manual @11
lombar=confirmar: item não listado na versão brasileira @11
memoria=ausente @11
massagem=ausente @11
encostoReclinavel=confirmar: banco rebatível, reclinação não listada @11
tampaEletrica=ausente @11
vidrosAcusticos=confirmar: isolamento acústico não especificado @11
iluminacaoAmbiente=confirmar: item não listado na versão brasileira @11
volanteAquecido=ausente @11
retrovisoresRebatimento=confirmar: ajuste elétrico e aquecimento presentes, rebatimento não listado @11
barrasTeto=ausente: versão BEV básica @11`,
      versoes: [{ id: 'unica', nome: 'Versão única', dados: '' }],
      fotos: [
        ['Dianteira 3/4', AE + '2026/07/AE-Leapmotor-B10-7699.jpg'], ['Frente', AE + '2026/07/AE-Leapmotor-B10-7701.jpg'],
        ['Lateral', AE + '2026/07/AE-Leapmotor-B10-7702.jpg'], ['Traseira 3/4', AE + '2026/07/AE-Leapmotor-B10-7706.jpg'],
        ['Traseira', AE + '2026/07/AE-Leapmotor-B10-7705.jpg'], ['Painel', AE + '2026/07/AE-Leapmotor-B10-7726.jpg'],
        ['Volante e tela', AE + '2026/07/AE-Leapmotor-B10-7727.jpg'], ['Bancos dianteiros', AE + '2026/07/AE-Leapmotor-B10-7718-800x450.jpg'],
        ['Bancos traseiros', AE + '2026/07/AE-Leapmotor-B10-7723-800x450.jpg'], ['Porta-malas', AU + '2026/4/1280_960/leapmotor_b10_2026_1_10042026_89504_1280_960.jpg'],
        ['Teto panorâmico', EC + '2025/11/leapmotor-b10_11.jpg'], ['Roda', AE + '2026/07/AE-Leapmotor-B10-7717.jpg']
      ]
    },
    {
      id: 'ex5', marca: 'Geely', modelo: 'EX5',
      fontes: [
        ['Ficha técnica Geely Brasil (PDF)', 'https://static.autoforce.com/plugins/files/clientes/geely-brasil/produtos/ws/ficha-tecnica-geely-ex5.pdf', 'sem data'],
        ['Webmotors (reajuste de preços)', 'https://www.webmotors.com.br/wm1/noticias/geely-aumenta-precos-ex2-ex5', '2026'],
        ['Recarregados', 'https://recarregados.com/blog/geely-ex5-review-brasil', '05/10/2026'],
        ['Canal VE (Pro)', 'https://canalve.com.br/ficha-tecnica/geely/tudo-sobre-ex5-pro/', 'sem data'],
        ['Canal VE (Max)', 'https://canalve.com.br/ficha-tecnica/geely/tudo-sobre-ex5-max/', 'sem data'],
        ['Vrum', 'https://www.vrum.com.br/avaliacoes/2025/07/7213430-geely-ex5-chega-ao-brasil-com-bom-pacote-de-equipamentos-e-preco-competitivo.html', '31/07/2025'],
        ['Autoentusiastas (primeiras impressões)', 'https://autoentusiastas.com.br/2025/07/geely-ex5-primeiras-impressoes/', '30/07/2025'],
        ['Canaltech (teste)', 'https://canaltech.com.br/carros/teste-geely-ex5-e-suv-com-jeitao-de-chines-e-dna-de-volvo/', '30/07/2025'],
        ['Verificar Auto', 'https://verificarauto.com.br/carros-eletricos/geely-ex5/', 'sem data'],
        LEVANTAMENTO
      ],
      alertas: ['O bônus de R$ 10 mil na versão Pro valia até 31/10/2026, sem renovação encontrada.', 'A nota 5 estrelas é do Euro NCAP, para o carro vendido na Europa.'],
      comum: `
anoModelo=2026 @4
origem=China @3
precoCondicao=Tabela após reajuste @2
garantiaCarro=6 anos ou 150.000 km @1
garantiaBateria=8 anos ou 150.000 km @1
concessionarias=43 @3
comprimento=4615 @1
largura=1901 @1
altura=1670 @1
entreEixos=2750 @1
vaoLivre=173 @1
portaMalas=461 @1
portaMalasRebatido=1877 @1
lugares=5 @4
cd=0.262 @6
estepe=Sem estepe, kit de reparo @1
tipoMotor=Síncrono de ímã permanente @1
potenciaMotores=1 motor dianteiro @1
potenciaTotal=218 @1
torque=320 @1
tracao=Dianteira @1
velocidadeMaxima=180 @1
modosConducao=Eco, Padrão, Sport @1
capacidadeNominal=60.22 @1
quimica=LFP (Short Blade) @1
dcMax=100 @1
tempoDc=20 min (30% a 80%) @1
acMax=11 @1
tempoAc=6,1 h (10% a 100%) @1
niveisRegen=4 níveis @1
v2l=serie: também V2V, até 6 kW @1,10
suspensaoDianteira=McPherson @1
suspensaoTraseira=Multilink @1
freios=A disco nas quatro rodas @1
direcao=Elétrica @1
partidaRampa=serie @4
controleDescida=serie @1
autoHold=serie @1
airbags=6 @1
crashTest=5 estrelas Euro NCAP (outro mercado) @6
isofix=serie @4
estabilidade=serie @1
tpms=serie @1
camera360=serie: 540° @1
telaCentral=15.4 @1
painelDigital=10.2 @1
multimidia=Flyme Auto @1
carplayAndroid=serie: Apple CarPlay e Android Auto @1
vozPortugues=serie: assistente Olá Geely @1
app=serie @4
ota=serie @1
inducao=serie: 15 W @1
usb=4 portas (2 tipo A, 2 tipo C) @1
wifi=serie: Wi-Fi e 4G @1
chaveDigital=serie: keyless @1
navegacao=serie: nativa por satélite @1
arCondicionado=Automático @1
saidasTraseiras=serie @1
filtroAr=N95 @1
revestimentoBancos=Couro @4
ajusteMotorista=serie: elétrico, 6 vias, entrada e saída ativa @1
bancosVentilados=serie: dianteiros @1
encostoReclinavel=serie: 30° e 35° @1
retrovisoresRebatimento=serie: elétricos e aquecidos @4
farois=Full LED automáticos @1
lanternas=LED @1
macanetas=serie: retráteis automáticas @1
cores=Preto Carbon, Branco Storm, Cinza Ash, Prata Moon @1
conector=CCS2 @9
wallbox=opcional: bônus de pré-venda ou financiamento @7,3
diametroGiro=?10.8 | Referência da plataforma GEA/Galaxy E5. Medida brasileira não informada. @10
portaMalasDianteiro=0 @10
cargaUtil=?415 | Valor aproximado de referência internacional. Carga útil brasileira não discriminada. @10
reboque=?750 | Homologação internacional. Homologação brasileira não informada. @10
pesoBruto=?2180 | Valor aproximado de referência internacional. PBT brasileiro não informado. @10
capacidadeUtil=— | O levantamento só discrimina a capacidade nominal. @10
tensao=— | Arquitetura de classe 400 V. Tensão nominal não informada. @10
notaPbev=A @10
umPedal=ausente: sem parada total no modo regenerativo @10
carregadorPortatil=confirmar: ofertado em campanhas de lançamento, inclusão de série não indicada @10
amortecimentoAdaptativo=ausente: amortecedores passivos @10
estacionamentoAuto=ausente @10
lombar=confirmar: ajuste específico não listado na ficha brasileira @10
vidrosAcusticos=confirmar: isolamento acústico não especificado @10
volanteAquecido=confirmar: item não listado na ficha brasileira @10
descargaMax=3.3 @10`,
      versoes: [
        { id: 'pro', nome: 'Pro', dados: `
preco=207800 @2
massa=1715 @1
pneus=225/55 R18 @1
rodas=Aro 18 @1
zeroCem=6.9 @1
autonomiaInmetro=413 @1
consumoInmetro=11.7 @3
ajustePassageiro=ausente @1
massagem=ausente @1
nivelAdas=Sem pacote ADAS, piloto automático comum @1
acc=ausente @1
centralizacaoFaixa=ausente @1
frenagemAutonoma=ausente @1
alertaColisao=ausente @1
pontoCego=ausente @1
trafegoCruzado=ausente @1
leitorPlacas=ausente @1
farolAltoAuto=ausente @1
sensoresEstacionamento=serie: só traseiros @1
headUp=ausente @1
som=6 alto-falantes @1
teto=ausente @1
tampaEletrica=ausente @1
iluminacaoAmbiente=ausente: só iluminação interna em LED @1
autonomiaWltp=?430 | Homologação internacional da versão com rodas de 18 pol. @10
alertaFadiga=ausente: sem monitor de fadiga de série @10
memoria=ausente @10
bancosAquecidos=ausente @10` },
        { id: 'max', nome: 'Max', dados: `
preco=227800 @2
massa=1765 @1
pneus=235/50 R19 @1
rodas=Aro 19 @1
zeroCem=7.1 @1
autonomiaInmetro=349 @1
consumoInmetro=14.2 @3
ajustePassageiro=serie: elétrico, 4 vias, apoio de pernas elétrico @1
massagem=serie: dianteiros, 6 modos @1
nivelAdas=Pacote ADAS com 14 funções @1
acc=serie @1
centralizacaoFaixa=serie @1
frenagemAutonoma=serie @1
alertaColisao=serie: mitigação frontal e traseira @1
pontoCego=serie @1
trafegoCruzado=serie: com frenagem @1
leitorPlacas=serie @1
farolAltoAuto=serie @1
alertaFadiga=serie @5
sensoresEstacionamento=serie: dianteiros e traseiros @1
headUp=serie: 13,8 pol @1
som=Flyme Premium, 16 alto-falantes @1
teto=serie: panorâmico, cortina elétrica @1
tampaEletrica=serie @1
iluminacaoAmbiente=serie: 256 cores @1
bancosAquecidos=serie: dianteiros @7,8
autonomiaWltp=?410 | Homologação internacional da versão com rodas de 19 pol. @10
memoria=serie: motorista, com entrada e saída ativa @10
barrasTeto=serie: longitudinais integradas @10` }
      ],
      fotos: [
        ['Dianteira 3/4', AE + '2025/07/CAPA-1.jpg'], ['Dianteira 3/4 (branco)', EC + '2025/06/geely-ex5-2026.jpg'],
        ['Frente', AE + '2025/07/AE-Geely-EX5-divulgacao-7-1.jpg'], ['Traseira 3/4', AE + '2025/07/AE-Geely-EX5-divulgacao-2-1.jpg'],
        ['Traseira', AE + '2025/07/AE-Geely-EX5-divulgacao-8-scaled-e1753734284374.jpg'], ['Painel', AE + '2025/07/AE-Geely-EX5-divulgacao-3-1.jpg'],
        ['Interior claro', EC + '2025/06/geely-ex5-2026-04.jpg'], ['Bancos dianteiros', AE + '2025/07/AE-Geely-EX5-divulgacao-4-1-scaled-e1753734686629.jpg'],
        ['Bancos traseiros (com gaveta)', AE + '2025/07/AE-Geely-EX5-divulgacao-5-1.jpg'], ['Porta-malas', AE + '2025/07/AE-Geely-EX5-divulgacao-6-1-800x450.jpg'],
        ['Fundo do porta-malas', AE + '2025/07/AE-Geely-EX5-divulgacao-17-800x450.jpg'], ['Roda', AE + '2025/07/AE-Geely-EX5-divulgacao-10-scaled-e1753734905183.jpg']
      ]
    },
    {
      id: 'c10', marca: 'Leapmotor', modelo: 'C10 Elétrico',
      fontes: [
        ['Ficha técnica do C10 BEV (PDF)', 'https://carroscomcamanzi.com.br/wp-content/uploads/2025/11/Ficha-Tecnica-Leapmotor-C10-BEV-Eletrico.pdf', '10/2025'],
        ['AUTOO (Black Friday)', 'https://www.autoo.com.br/black-friday-da-leapmotor-mantm-preos-dos-suvs-mas-oferece-brindes-e-financiamento/', '11/2026'],
        ['Canal VE (ficha)', 'https://canalve.com.br/ficha-tecnica/leapmotor/tudo-sobre-c10/', 'sem data'],
        ['Canal VE (garantia)', 'https://canalve.com.br/leapmotor-amplia-garantia-carros-seis-anos/', '22/09/2026'],
        ['Encontracarros', 'https://www.encontracarros.com.br/leapmotor-c10-e-lancado-no-brasil-por-r-189-990/', '04/11/2025'],
        ['Autos Segredos', 'https://www.autossegredos.com.br/lancamentos/leapmotor-c10-2026-chega-com-precos-entre-189-990-bev-e-r-199-990-reev/', '04/11/2025'],
        ['Encontracarros (C10 e B10)', 'https://www.encontracarros.com.br/leapmotor-c10-e-b10/', '12/08/2026'],
        ['Carwow Espanha (outro mercado)', 'https://www.carwow.es/leapmotor/c10/caracteristicas-tecnicas', 'sem data'],
        ['CarExpert Austrália (outro mercado)', 'https://www.carexpert.com.au/leapmotor/c10/2024/style/features-and-specs', 'sem data'],
        ['Auto-Data (outro mercado)', 'https://www.auto-data.net/es/leapmotor-c10-69.9-kwh-218hp-bev-55063', 'sem data'],
        LEVANTAMENTO
      ],
      alertas: ['As fotos de bancos e porta-malas são da versão híbrida REEV.'],
      comum: `
anoModelo=2027 @2
origem=China, marca do grupo Stellantis @5
preco=214990 @2
precoCondicao=Black Friday: sem desconto, com wallbox, seguro ou IPVA de brinde @2
garantiaCarro=6 anos ou 150.000 km @4
garantiaBateria=8 anos @4
concessionarias=36 @6
comprimento=4739 @1
largura=1900 @1
larguraRetrovisores=2128 @1
altura=1680 @1
entreEixos=2825 @1
vaoLivre=180 @1
anguloEntrada=17 @1
anguloSaida=23 @1
diametroGiro=11.2 @1
portaMalas=465 @1
portaMalasRebatido=1410 @5
portaMalasDianteiro=32 @1
lugares=5 @3
cargaUtil=453 @1
massa=2007 @1
pneus=245/45 R20 @1
rodas=Liga leve, aro 20 @1
tipoMotor=Síncrono com ímã permanente, traseiro @1
potenciaMotores=1 motor traseiro, 160 kW @1
potenciaTotal=218 @1
torque=320 @1
tracao=Traseira @1
zeroCem=8.3 @1
velocidadeMaxima=170 @1
capacidadeNominal=69.9 @1
quimica=LFP @1
tensao=400 @1
autonomiaInmetro=338 @1
autonomiaWltp=420 @1
dcMax=84 @1
tempoDc=30 min (30% a 80%) @1
acMax=11 @1
tempoAc=3,9 h (30% a 80%) @1
conector=Type 2 e CCS2 @1
wallbox=opcional: um dos brindes da Black Friday @2
v2l=serie @1
suspensaoDianteira=McPherson independente @1
suspensaoTraseira=Multibraço independente @1
freios=Discos ventilados nas quatro rodas @1
direcao=Elétrica @1
partidaRampa=serie @3
controleDescida=serie @3
autoHold=serie @3
airbags=7 @1
isofix=serie @3
estabilidade=serie @3
tpms=serie @3
alertaFadiga=serie: com câmera @1
nivelAdas=ADAS 2 (Leap Pilot) @1
acc=serie: com assistência em engarrafamentos @1
centralizacaoFaixa=serie @1
frenagemAutonoma=serie @1
alertaColisao=serie: frontal e traseiro @3
pontoCego=serie @1
trafegoCruzado=serie: traseiro, com frenagem @1
leitorPlacas=serie @1
farolAltoAuto=serie @1
camera360=serie: com chassi transparente @1
sensoresEstacionamento=serie: dianteiros e traseiros @3
telaCentral=14.6 @1
painelDigital=10.25 @5
multimidia=Leap One, Leapmotor OS 4.0 @1
app=serie: controles remotos e rotinas @1
ota=serie @1
inducao=serie @1
usb=Disponíveis, quantidade não informada @3
wifi=serie: internet 4G a bordo @5
chaveDigital=serie: smartphone e NFC @1
som=Theater Sound 7.1, 840 W, 12 alto-falantes @1
navegacao=serie @5
arCondicionado=Digital, 2 zonas @1
saidasTraseiras=serie @1
filtroAr=Detecção de poluentes @1
revestimentoBancos=Premium com certificação OEKO-TEX @1
ajusteMotorista=serie: elétrico @1
ajustePassageiro=serie: elétrico @3
lombar=serie: motorista @3
memoria=serie: bancos e retrovisores @1
bancosAquecidos=serie: dianteiros @1
bancosVentilados=serie: dianteiros @1
encostoReclinavel=serie @3
teto=serie: panorâmico Sky View de 2,1 m² @1
tampaEletrica=serie: com ajuste de altura @1
iluminacaoAmbiente=serie: Smart Light @1
retrovisoresRebatimento=serie @3
farois=Full LED @1
lanternas=Interligadas, com barra luminosa @6
macanetas=serie @6
cores=Cinza Noturno, Cinza Tundra, Preto Eclipse, Branco Alvorada, Verde Boreal @1
reboque=?1500 @8
pesoBruto=?2460 @8,9,10
estepe=Kit de reparo na Espanha; Brasil não informado @8
capacidadeUtil=?69.9 @9
niveisRegen=Ajustável, quantidade não informada @8,9
crashTest=5 estrelas Euro NCAP 2024 (outro mercado) @8,9
carregadorPortatil=serie: T2M2 @7
carplayAndroid=confirmar: listado na Espanha; ficha brasileira não cita @8
espacoPernas=?951 @9
volanteAquecido=confirmar: aquecido na versão Design da Espanha @8
barrasTeto=confirmar: longitudinais na versão da Espanha @8
cd=?0.29 | Valor aproximado de referência internacional. Medida brasileira não informada. @11
modosConducao=Conforto (Relaxado), Padrão, Esportivo e Personalizado @11
consumoInmetro=— | Eficiência declarada de 4,8 km/kWh, equivalente a cerca de 20,8 kWh/100 km. Medição de consumo PBEV não identificada no levantamento. @11
notaPbev=A @11
umPedal=serie: modo configurável @11
amortecimentoAdaptativo=ausente: amortecedores passivos @11
estacionamentoAuto=ausente @11
headUp=ausente @11
vozPortugues=serie: comandos do LeapOS @11
massagem=ausente @11
vidrosAcusticos=confirmar: isolamento acústico não especificado @11
descargaMax=3.3 @11`,
      versoes: [{ id: 'bev', nome: 'Elétrico (BEV)', dados: '' }],
      fotos: [
        ['Dianteira 3/4', EC + '2025/11/leapmotor-c10_01.jpg'], ['Frente', EC + '2026/08/leapmotor-c10_18.jpg'],
        ['Lateral', EC + '2025/11/leapmotor-c10_02.jpg'], ['Traseira 3/4', EC + '2025/11/leapmotor-c10_03.jpg'],
        ['Traseira', EC + '2025/11/leapmotor-c10_14.jpg'], ['Painel', EC + '2025/11/leapmotor-c10_09.jpg'],
        ['Volante e tela', EC + '2025/11/leapmotor-c10_06.jpg'], ['Bancos dianteiros (versão REEV)', EC + '2026/08/leapmotor-c10_reev-02.jpg'],
        ['Porta-malas (versão REEV)', EC + '2026/08/leapmotor-c10_reev-04.jpg'], ['Porta-malas dianteiro', EC + '2025/11/leapmotor-c10_10.jpg'],
        ['Tomada de recarga', EC + '2025/11/leapmotor-c10_15.jpg']
      ]
    },
    {
      id: 'mg-s5', marca: 'MG', modelo: 'S5',
      fontes: [
        ['Eletricos.app (cadastro)', 'https://www.eletricos.app/marca/mg/s5-ev/2026', '18/11/2026'],
        ['Encontracarros', 'https://www.encontracarros.com.br/mg-s5-versoes-precos-e-equipamentos/', '30/12/2025'],
        ['Auto+ TV', 'https://www.automaistv.com.br/novidades/mg-s5-chega-com-duas-versoes-com-mais-de-200-cv-abaixo-dos-r-200-mil/', '20/11/2025'],
        ['O Antagonista', 'https://oantagonista.com.br/ladooa/carros/mg-s5-desafia-sedas-caros-com-pacote-completo-e-preco-muito-mais-justo/', '17/12/2025'],
        ['Eletricos.app (Luxury)', 'https://www.eletricos.app/veiculo/mg-s5-ev-luxury-2026', 'sem data'],
        ['Verificar Auto', 'https://verificarauto.com.br/mg-s5-preco-ficha-tecnica-vale-a-pena/', '26/03/2026'],
        ['MobiEV', 'https://mobiev.com.br/modelo/mg-s5/', '09/10/2026'],
        ['CNN Brasil', 'https://www.cnnbrasil.com.br/blogs/jorge-moraes/auto/suv-s5-eletrico-sera-feito-pela-inglesa-mg-no-ceara-ao-lado-do-mg4-urban/', '20/06/2026'],
        ['Autos Segredos', 'https://www.autossegredos.com.br/marcas/mg/mg-s5-ev-e-o-suv-eletrico-escolhido-para-reestreia-no-brasil/', '12/07/2025'],
        ['CarExpert Austrália (outro mercado)', 'https://www.carexpert.com.au/car-reviews/2026-mg-s5-ev-review', '07/03/2026'],
        ['Paultan Malásia (outro mercado)', 'https://paultan.org/research/compare/mg-s5/com-2026-vs-lux-2026/', '11/2026'],
        ['Wikipedia (MGS5 EV)', 'https://en.wikipedia.org/wiki/MGS5_EV', '08/11/2026'],
        LEVANTAMENTO,
        ['MG Motor Brasil (ficha técnica)', 'https://www.mgmotoroficial.com.br/pdfs/mgs5-ficha.pdf', 'consultada em 21/11/2026']
      ],
      alertas: ['Um anúncio de concessionária mostra a Luxury por R$ 219.800. Vale negociar.', 'As fontes divergem sobre a química da bateria e sobre as funções de faixa e leitura de placas da Comfort.'],
      comum: `
anoModelo=2026 @1
precoCondicao=Preço de tabela sugerido @1
garantiaCarro=7 anos ou 150.000 km @2
garantiaBateria=8 anos ou 160.000 km @2
comprimento=4476 @2
largura=1849 @14
altura=1620 @2
entreEixos=2730 @2
portaMalas=453 @2
portaMalasRebatido=1440 @3
lugares=5 @2
tipoMotor=Elétrico traseiro, 1 marcha @5
potenciaMotores=1 motor traseiro @2
potenciaTotal=205 @5
torque=350 @2
tracao=Traseira @3
velocidadeMaxima=170 @14
capacidadeNominal=64 @6,7,2,8
autonomiaInmetro=351 @1
autonomiaWltp=480 @4
dcMax=150 @5
tempoDc=35 min (30% a 80%) @5
acMax=11 @1
carregadorPortatil=serie: 3,4 kW, brinde de lançamento @2
wallbox=serie: 7 kW, brinde de lançamento @2
suspensaoDianteira=Independente @2
suspensaoTraseira=Independente @2
direcao=Assistida @4
partidaRampa=serie @4
isofix=serie @4
estabilidade=serie @4
tpms=serie @4
sensoresEstacionamento=serie: com câmera de ré @4
telaCentral=12.8 @2
painelDigital=10.25 @2
carplayAndroid=serie: sem fio @4
app=serie: iSMART @4
chaveDigital=serie: Digital Key @4
arCondicionado=Digital @4
revestimentoBancos=Couro sintético com tecido @2
farois=Full LED @2
lanternas=LED com barra conectada @2
origem=China; montagem em Horizonte (CE) anunciada @8
vaoLivre=145 | Sem carga. Com carga, 136 mm. @14
reboque=?750 @10
estepe=Kit de reparo de pneus @14
modosConducao=Divergem: Eco, Normal, Sport ou Normal, Sport, Comfort, Neve, Personalizado @6,9
capacidadeUtil=62.1 @7
quimica=A confirmar: Verificar Auto diz LFP; Wikipedia diz NMC @6,12
tensao=395 @14
umPedal=serie @8
tempoAc=Cerca de 9 h (0% a 100%, wallbox de 7,4 kW) @6
conector=CCS2 em DC; tipo AC não informado @6
freios=ABS com EBD; tipo de disco não informado @9
crashTest=5 estrelas Euro NCAP 2025 (outro mercado) @8,10
multimidia=Tela de 12,8 pol, Android Auto e CarPlay sem fio @6,2
usb=2 USB-C na frente e 1 atrás @14
navegacao=serie: nativa @9
saidasTraseiras=serie @14
ajustePassageiro=confirmar: manual na Austrália e na Malásia @10,11
barrasTeto=serie: rack de teto @14
cores=Branco pérola, metálicas e vermelho MG (lista incompleta) @6
descargaMax=?2.2 | Referência da plataforma MG MSP. A ficha brasileira confirma V2L, sem indicar a potência. @13
concessionarias=24 | Rede da marca no início da operação, no fim de 2025. O levantamento cita meta de 70 lojas ao longo de 2026. @13
diametroGiro=?10.5 | Referência global da plataforma MSP. Medida brasileira não informada. @13
portaMalasDianteiro=0 @13
cd=?0.27 | Referência global. Medida brasileira não informada. @13
consumoInmetro=— | Estimativa de 17,7 kWh/100 km pela divisão de 62,1 kWh úteis por 351 km de autonomia Inmetro. @13
notaPbev=A @13
niveisRegen=3 níveis (Baixo, Médio e Alto), mais os modos Adaptativo e um pedal @13
amortecimentoAdaptativo=ausente: amortecedores passivos @13
controleDescida=confirmar: item não listado na ficha brasileira @13
autoHold=serie @13,14
estacionamentoAuto=ausente @13
headUp=ausente @13
vozPortugues=serie @13
wifi=serie: hotspot integrado ao MG iSMART @13
filtroAr=Filtro PM2.5 @13
massagem=ausente @13
encostoReclinavel=ausente: encosto fixo, bipartido e rebatível @13
vidrosAcusticos=confirmar: isolamento acústico não especificado @13
macanetas=ausente: convencionais @13`,
      versoes: [
        { id: 'comfort', nome: 'Comfort', dados: `
preco=218800 @1
zeroCem=6.3 @1
airbags=6 @2
massa=1705 @13,14
rodas=Liga leve, aro 17 @14
ajusteMotorista=ausente: manual @4
som=4 alto-falantes @4
camera360=ausente @4
nivelAdas=ACC, frenagem autônoma e assistentes de faixa @14
acc=serie @14
inducao=ausente @2
teto=ausente @2
tampaEletrica=ausente @2
v2l=serie @13,14
ota=confirmar: fonte não separa versões @6
centralizacaoFaixa=confirmar: Encontracarros e Verificar Auto indicam ausência; Autos Segredos cita @2,6,9
frenagemAutonoma=serie @14
alertaColisao=serie: alerta frontal @14
pontoCego=ausente @14
trafegoCruzado=ausente @14
leitorPlacas=confirmar: Encontracarros e Verificar Auto indicam ausência; Autos Segredos cita @2,6,9
retrovisoresRebatimento=ausente @14
pneus=215/60 R17 @13,14
bancosVentilados=ausente @14
lombar=ausente @13
memoria=ausente @13
bancosAquecidos=ausente @13
volanteAquecido=ausente @13,14
iluminacaoAmbiente=confirmar: item não listado de série na Comfort @13
alertaFadiga=ausente: monitoramento da atenção exclusivo da Luxury @14
farolAltoAuto=serie: controle inteligente de farol alto (IHC) @13,14` },
        { id: 'luxury', nome: 'Luxury', dados: `
preco=238800 @1
zeroCem=6.3 @2,6,8
airbags=7 @2
massa=1755 @13,14
rodas=Liga leve, aro 18 @14
ajusteMotorista=serie: elétrico, 6 posições @4
som=6 alto-falantes @4
nivelAdas=ADAS 2 (MG Pilot, 16 funções) @2
acc=serie @2
centralizacaoFaixa=serie @4
frenagemAutonoma=serie @5
alertaColisao=serie: frontal @4
pontoCego=serie @4
trafegoCruzado=serie: traseiro @4
camera360=serie @4
inducao=serie @2
teto=serie: panorâmico @4
tampaEletrica=serie: abertura sem as mãos @4
v2l=serie @13,14
ota=serie @5
leitorPlacas=serie @9
bancosAquecidos=serie: dianteiros @8,9
lombar=confirmar: motorista, na versão da Austrália @10
memoria=confirmar: item não listado na ficha brasileira @13,14
retrovisoresRebatimento=serie: automático @14
volanteAquecido=serie @13,14
pneus=225/55 R18 @13,14
bancosVentilados=serie: dianteiros @14
alertaFadiga=serie: monitoramento da atenção do motorista (DAW) @13,14
farolAltoAuto=serie: controle inteligente de farol alto (IHC) @13,14` }
      ],
      fotos: [
        ['Dianteira 3/4', EC + '2025/12/mg-s5-2026_03.jpg'], ['Frente', EC + '2025/12/mg-s5-2026_02.jpg'],
        ['Lateral', EC + '2025/12/mg-s5-2026_06.jpg'], ['Traseira 3/4', EC + '2025/12/mg-s5-2026_07.jpg'],
        ['Traseira', EC + '2025/12/mg-s5-2026_08.jpg'], ['Painel', EC + '2025/12/mg-s5-interior_02.jpg'],
        ['Volante e telas', EC + '2025/12/mg-s5-interior_06.jpg'], ['Bancos dianteiros', EC + '2025/12/mg-s5-interior_04.jpg'],
        ['Bancos traseiros', EC + '2025/12/mg-s5-interior_03.jpg'], ['Porta-malas', EC + '2025/12/mg-s5-interior_05.jpg']
      ]
    },
    {
      id: 't5', marca: 'BAIC', modelo: 'Arcfox T5',
      fontes: [
        ['AutoPapo', 'https://autopapo.com.br/noticia/baic-arcfox-t5-lancamento/', '12/11/2026'],
        ['AUTOO', 'https://www.autoo.com.br/baic-arcfox-t5-estreia-por-r-219990-e-oferece-porte-de-suv-grande/', '12/11/2026'],
        ['Mecânica Online', 'https://mecanicaonline.com.br/2026/11/baic-estreia-no-brasil-com-arcfox-t1-de-r-129-900-e-t5-max-eletrico-por-r-219-990/', '15/11/2026'],
        ['Canaltech', 'https://canaltech.com.br/carros/rival-eletrico-da-byd-chega-ao-brasil-veja-quanto-custa-o-baic-arcfox-t5/', '12/11/2026'],
        ['Vrum', 'https://www.vrum.com.br/mercado/2026/11/7537146-baic-anuncia-arcfox-t5-como-tesla-model-y-que-brasileiro-podera-comprar.html', '11/11/2026'],
        ['Encontracarros', 'https://www.encontracarros.com.br/baic-arcfox-t5/', '12/11/2026'],
        ['CNN Brasil', 'https://www.cnnbrasil.com.br/auto/baic-arcfox-t5-chega-por-r-219-990-com-252-cv-e-autonomia-de-362-km/', '11/11/2026'],
        ['Autos Segredos', 'https://www.autossegredos.com.br/marcas/baic/baic-arcfox-t5-preco-brasil-219990/', '11/11/2026'],
        ['Carros com Camanzi', 'https://carroscomcamanzi.com.br/baic-arcfox-t5-e-mais-um-suv-eletrico-que-estreia-por-r-220-mil/', '13/11/2026'],
        ['Wikipedia (Arcfox αT5, China)', 'https://en.wikipedia.org/wiki/Arcfox_%CE%B1T5', '09/10/2026'],
        LEVANTAMENTO
      ],
      alertas: ['Em pré-venda: o preço vale para as primeiras 50 unidades ou até o fim de 2026.', 'Marca nova no Brasil. Confira rede, peças e assistência na sua região.', 'Parte das fotos é do modelo chinês.'],
      comum: `
anoModelo=2027 @6
origem=Marca chinesa, produção no Brasil não informada @2
preco=219990 @1
precoCondicao=Pré-venda: 50 unidades ou até o fim de 2026, bônus de até R$ 8 mil @2
concessionarias=50 @5
comprimento=4760 @3
largura=1936 @3
altura=1650 @3
entreEixos=2845 @3
portaMalas=400 @1
portaMalasRebatido=1546 @6
lugares=5 @2
massa=?1975 @1
pneus=235/55 R19 @6
rodas=Aro 19 @1
tipoMotor=Síncrono de ímãs permanentes, dianteiro @6
potenciaMotores=1 motor dianteiro, 185 kW @3
potenciaTotal=252 @1
torque=320 @3
tracao=Dianteira @1
zeroCem=8.8 @2
velocidadeMaxima=180 @3
capacidadeNominal=64.8 @1
quimica=LFP @3
tensao=800 @4
autonomiaInmetro=362 @1
dcMax=210 @3
tempoDc=18 min (30% a 80%) na fonte original. O levantamento informa menos de 17 min na mesma faixa. @3,11
carregadorPortatil=serie: de emergência, na pré-venda @3
wallbox=serie: 6,6 kW, na pré-venda @3
v2l=serie: também V2V @3
suspensaoDianteira=McPherson @1
suspensaoTraseira=Multilink @1
freios=Discos ventilados nas quatro rodas @1
nivelAdas=ADAS 2.5 @4
acc=serie @3
centralizacaoFaixa=serie @3
frenagemAutonoma=serie @3
alertaColisao=serie: frontal @3
trafegoCruzado=serie: traseiro @7
camera360=serie: 540° @1
telaCentral=15.6 @2
headUp=serie: 22,8 pol, no lugar do painel de instrumentos @4
multimidia=Snapdragon 8155 @6
carplayAndroid=serie: sem fio @7
app=serie @6
inducao=serie @5
som=Hi-Fi, 18 alto-falantes @2
arCondicionado=2 zonas @1
revestimentoBancos=Couro @6
ajusteMotorista=serie: elétrico @1
ajustePassageiro=serie: elétrico @1
bancosAquecidos=serie: dianteiros @1
bancosVentilados=serie: dianteiros @1
massagem=serie: dianteiros @1
teto=serie: panorâmico de 1,68 m², cortina elétrica @3
tampaEletrica=serie @1
retrovisoresRebatimento=serie: com memória @6
farois=LED @4
lanternas=Faixa horizontal interligada @4
macanetas=serie: externas embutidas @1
cores=Cinza Mineral, Preto Obsidiana, Branco Lunas @7
cd=?0.243 @10
crashTest=5 estrelas C-NCAP 2021, versão chinesa (outro mercado) @10
iluminacaoAmbiente=serie @9
garantiaCarro=6 anos ou 150.000 km @11
garantiaBateria=8 anos ou 150.000 km @11
vaoLivre=180 @11
portaMalasDianteiro=0 @11
reboque=— | Homologação brasileira não informada. @11
estepe=Kit de reparo de pneus @11
modosConducao=Eco, Comfort, Sport e Personalizado. Modo Neve/baixa aderência citado em algumas configurações da linha. @11
capacidadeUtil=— | O levantamento só discrimina a capacidade nominal. @11
consumoInmetro=— | Eficiência declarada de 5,6 km/kWh, equivalente a cerca de 17,9 kWh/100 km. Medição de consumo PBEV não identificada no levantamento. @11
notaPbev=A @11
autonomiaWltp=— | O levantamento informa 362 km no Inmetro e cita até 660 km no CLTC, ciclo chinês. @11
niveisRegen=Ajustável pela central, quantidade não informada @11
umPedal=serie: modo configurável @11
acMax=6.6 @11
tempoAc=Cerca de 10 a 11 h (0% a 100%, 6,6 kW) @11
conector=Tipo 2 (AC) e CCS2 (DC) @11
amortecimentoAdaptativo=ausente: amortecedores passivos @11
direcao=Elétrica progressiva (EPS) @11
partidaRampa=serie @11
controleDescida=serie @11
autoHold=serie @11
airbags=6 | Frontais, laterais e de cortina @11
isofix=serie @11
estabilidade=serie: ESC e TCS @11
tpms=serie @11
alertaFadiga=serie @11
pontoCego=serie @11
leitorPlacas=confirmar: ativação não confirmada na ficha brasileira @11
farolAltoAuto=serie @11
sensoresEstacionamento=serie: dianteiros e traseiros @11
estacionamentoAuto=serie: semiautomático @11
painelDigital=— | Sem painel de instrumentos convencional. Função assumida pelo HUD de 22,8 pol. @11
vozPortugues=confirmar: interface localizada, comandos em português não confirmados @11
ota=serie @11
usb=USB-A e USB-C na frente e atrás @11
wifi=confirmar: hotspot integrado não confirmado @11
chaveDigital=serie: smartphone via Bluetooth e chave presencial @11
navegacao=serie @11
saidasTraseiras=serie @11
filtroAr=Ionizador e filtro de partículas finas @11
lombar=serie: bancos dianteiros @11
memoria=serie: banco do motorista @11
encostoReclinavel=confirmar: encosto bipartido e rebatível, reclinação não confirmada @11
vidrosAcusticos=confirmar: isolamento acústico não especificado @11
volanteAquecido=confirmar: item não listado na ficha brasileira @11
barrasTeto=ausente: sem barras longitudinais elevadas @11
descargaMax=— | O levantamento cita 3,3 kW como valor típico, sem potência publicada no catálogo brasileiro. @11`,
      versoes: [{ id: 'max', nome: 'Max', dados: '' }],
      fotos: [
        ['Dianteira 3/4', EC + '2026/11/baic-arcfox-t5-2027-04.jpg'], ['Dianteira 3/4 (estúdio)', EC + '2026/11/baic-arcfox-t5-2027-02.jpg'],
        ['Lateral', EC + '2026/11/baic-arcfox-t5-2027-06.jpg'], ['Lateral (outra cor)', EC + '2026/11/baic-arcfox-t5_02.jpg'],
        ['Traseira 3/4', EC + '2026/11/baic-arcfox-t5-2027-05.jpg'], ['Painel', EC + '2026/11/baic-arcfox-t5-2027-07.jpg'],
        ['Cabine', EC + '2026/11/baic-arcfox-t5_06.jpg'], ['Bancos dianteiros', EC + '2026/11/baic-arcfox-t5_09.jpg'],
        ['Bancos rebatidos', EC + '2026/11/baic-arcfox-t5_07.jpg'], ['Porta-malas', EC + '2026/11/baic-arcfox-t5_08.jpg']
      ]
    },
    {
      id: 'captiva', marca: 'Chevrolet', modelo: 'Captiva EV',
      fontes: [
        ['AutoPapo', 'https://autopapo.com.br/noticia/chevrolet-captiva-ev-premier-destaca-pelo-espaco-interno-e-estilo/', '04/10/2026'],
        ['Autoentusiastas', 'https://autoentusiastas.com.br/2026/02/chevrolet-captiva-ev/', '10/02/2026'],
        ['Canal VE (ficha)', 'https://canalve.com.br/ficha-tecnica/chevrolet/tudo-sobre-captiva-ev/', 'sem data'],
        ['Encontracarros', 'https://www.encontracarros.com.br/chevrolet-captiva-ev-2026-chega-ao-brasil/', '18/11/2025'],
        ['DGABC (teste)', 'https://www.dgabc.com.br/Noticia/4345913/teste-chevrolet-captiva-ev-nao-surpreende-mas-agrada-bastante', '09/09/2026'],
        ['O Povo (teste)', 'https://www.opovo.com.br/noticias/veiculos/2026/02/10/o-povo-testou-o-chevrolet-captiva-suv-eletrico-com-dna-urbano.html', '10/02/2026'],
        ['Carro.blog.br (ficha)', 'https://carro.blog.br/ficha-tecnica/chevrolet/chevrolet-captiva-ev/chevrolet-captiva-ev-2026/chevrolet-captiva-ev-2026-autonomia-urbana-e-rodar-silencioso-fazem-o-suv-eletrico-facil-de-conviver', 'sem data'],
        ['Carros na Web (ficha)', 'https://www.carrosnaweb.com.br/fichadetalhe.asp?codigo=41578', 'sem data'],
        ['Elétricos Brasil', 'https://www.eletricos.app/veiculo/chevrolet-captiva-ev-premier-60-kwh-2026', '05/11/2026'],
        ['AUTOO', 'https://www.autoo.com.br/captiva-ev-promete-mais-espaco-por-menos-que-rivais-veja-o-que-mudou/', '03/02/2026'],
        LEVANTAMENTO
      ],
      alertas: ['As fontes divergem sobre carregador por indução e aquecimento do banco. Confira no carro.'],
      comum: `
anoModelo=2026 @3
origem=China, montagem em Horizonte (CE) @1
preco=219990 @1
precoCondicao=Preço de lista; houve promoção anterior de R$ 199.990 @5
garantiaCarro=3 anos ou 100.000 km @2
garantiaBateria=8 anos ou 160.000 km @2
concessionarias=380 @2
comprimento=4745 @1
largura=1890 @1
larguraRetrovisores=2140 @1
altura=1675 @2
entreEixos=2800 @1
vaoLivre=160 @2
portaMalas=403 @1
lugares=5 @1
cargaUtil=460 @2
massa=1800 @1
pneus=235/55 R18 @2
rodas=Liga de alumínio, aro 18 @2
estepe=Temporário 135/80 R17 @2
tipoMotor=Síncrono @2
potenciaMotores=1 motor dianteiro @1
potenciaTotal=201 @1
torque=310 @1
tracao=Dianteira @1
zeroCem=9.9 @1
velocidadeMaxima=150 @2
modosConducao=Eco+, Eco, Padrão, Sport @6
capacidadeNominal=60 @1
quimica=LFP @2
autonomiaInmetro=304 @1
niveisRegen=3 (Max, Padrão, Min) @6
dcMax=120 @2
tempoDc=30 min (30% a 80%) @2
acMax=6.6 @2
carregadorPortatil=serie @3
suspensaoDianteira=McPherson @2
suspensaoTraseira=Multibraço independente @2
freios=Disco ventilado na frente, disco atrás @2
direcao=Elétrica @2
autoHold=serie @1
airbags=6 @2
isofix=serie @2
tpms=serie @2
nivelAdas=Chevrolet Intelligent Driving, nível não informado @4
acc=serie @2
centralizacaoFaixa=serie @2
frenagemAutonoma=serie @2
alertaColisao=serie: com pedestres e ciclistas @2
pontoCego=ausente @4
trafegoCruzado=ausente @4
farolAltoAuto=serie: adaptativo @2
camera360=serie @2
sensoresEstacionamento=serie: traseiros, com frenagem @2
telaCentral=15.6 @1
painelDigital=8.8 @1
carplayAndroid=serie: com cabo @1
app=serie: MyChevrolet Charging @3
inducao=confirmar: AutoPapo cita; Autoentusiastas e DGABC dizem que é só um berço @1,2,5
usb=USB-A e USB-C, na frente e atrás @2
chaveDigital=serie: chave presencial @2
arCondicionado=Digital automático, zona única @2
revestimentoBancos=Sintético imitando couro @2
ajusteMotorista=serie: elétrico @1
ajustePassageiro=ausente: manual @2
lombar=serie: motorista @7
bancosAquecidos=confirmar: Carro.blog.br cita no motorista; Encontracarros e DGABC dizem que não tem @7,4,5
bancosVentilados=ausente @4
massagem=ausente @5
encostoReclinavel=serie: bipartido 70:30, até 30° @2
teto=serie: panorâmico elétrico @2
tampaEletrica=serie: botão ou gesto @2
vidrosAcusticos=serie: vidro com tratamento acústico @3
iluminacaoAmbiente=serie: LED @4
retrovisoresRebatimento=serie: automático @6
farois=Full LED @2
lanternas=Full LED @2
macanetas=ausente: convencionais @2
cores=Branco Lençóis, Cinza Diamantina, Azul Búzios, Dourado Jeri @4
consumoInmetro=?19.6 | O levantamento indica eficiência de 5,1 km/kWh, equivalente a cerca de 19,6 kWh/100 km. Medição PBEV não identificada. @8,9,11
cd=0.277 @8
partidaRampa=serie @8,9,7
estabilidade=serie @8,9,7
estacionamentoAuto=serie: semiautomático @8,7
multimidia=Tela vertical de 15,6 pol com espelhamento @8,10
wifi=serie: roteador Wi-Fi @8,7
navegacao=serie: GPS @7
saidasTraseiras=serie @8,9,7
barrasTeto=serie: longitudinais @8
diametroGiro=?11.2 | Estimativa baseada na plataforma. Medida brasileira não divulgada. @11
portaMalasRebatido=— | Volume brasileiro não divulgado. O Wuling Starlight S chinês tem referência de 1.768 L até o teto. @11
portaMalasDianteiro=0 @11
reboque=— | Reboque não homologado nem recomendado pela fabricante no Brasil. @11
capacidadeUtil=— | O levantamento só discrimina a capacidade nominal. @11
tensao=— | Arquitetura de classe 400 V. Tensão nominal não informada. @11
notaPbev=A @11
autonomiaWltp=— | O levantamento informa 304 km no Inmetro. Os 510 km CLTC são do Wuling Starlight S chinês. @11
umPedal=ausente: sem parada total no modo regenerativo @11
tempoAc=Cerca de 9 a 10 h (0% a 100%, 6,6 kW). A GM indica cerca de 8 h entre 20% e 100%. @11
conector=Tipo 2 (AC) e CCS2 (DC) @11
wallbox=ausente: sem inclusão de série, sujeito a campanha ou venda como acessório @11
v2l=ausente: sem saída V2L homologada de série no Brasil @11
amortecimentoAdaptativo=ausente: amortecedores passivos @11
controleDescida=ausente @11
crashTest=Sem avaliação no Latin NCAP e no Euro NCAP @11
alertaFadiga=confirmar: item não listado na ficha brasileira @11
leitorPlacas=confirmar: item não listado na ficha brasileira @11
headUp=ausente @11
vozPortugues=ausente: comandos de voz via Apple CarPlay ou Android Auto @11
ota=confirmar: ativação no Brasil não confirmada @11
som=6 alto-falantes @11
filtroAr=Filtro de partículas @11
memoria=ausente @11
volanteAquecido=ausente @11`,
      versoes: [{ id: 'premier', nome: 'Premier', dados: '' }],
      fotos: [
        ['Dianteira 3/4', EC + '2025/11/chevrolet-captiva-ev-2026_03.jpg'], ['Dianteira 3/4 (outra cor)', AE + '2026/02/AE-Chevrolet-Captiva-EV-2324-e1770679679791.jpg'],
        ['Frente (detalhe)', EC + '2025/11/chevrolet-captiva-ev-2026_08.jpg'], ['Lateral', AE + '2026/02/AE-Chevrolet-Captiva-EV-2322-CAPA.jpg'],
        ['Traseira 3/4', EC + '2025/11/chevrolet-captiva-ev-2026_02.jpg'], ['Traseira', AU + '2026/2/1280_960/captiva1_03022026_88610_1280_960.jpg'],
        ['Painel', EC + '2025/11/chevrolet-captiva-ev-2026_04.jpg'], ['Volante e telas', EC + '2025/11/chevrolet-captiva-ev-2026_06.jpg'],
        ['Bancos dianteiros', AE + '2026/02/AE-Chevrolet-Captiva-EV-2408-800x450.jpg'], ['Bancos traseiros', AE + '2026/02/AE-Chevrolet-Captiva-EV-2411-800x450.jpg'],
        ['Porta-malas', AE + '2026/02/AE-Chevrolet-Captiva-EV-2412-800x450.jpg'], ['Porta-malas dianteiro', AE + '2026/02/AE-Chevrolet-Captiva-EV-2420-800x450.jpg'],
        ['Câmera 360°', EC + '2025/11/chevrolet-captiva-ev-2026_05.jpg'], ['Roda', AE + '2026/02/AE-Chevrolet-Captiva-EV-2419-800x450.jpg']
      ]
    },
    {
      id: 'aion-v', marca: 'GAC', modelo: 'Aion V',
      fontes: [
        ['DGABC (teste)', 'https://www.dgabc.com.br/Noticia/4342070/teste-como-anda-o-belo-suv-eletrico-gac-aion-v-de-rs-219-990-', '19/08/2026'],
        ['Encontracarros', 'https://www.encontracarros.com.br/gac-aion-v/', '12/07/2025'],
        ['Autoentusiastas', 'https://autoentusiastas.com.br/2026/04/gac-aion-v-equilibrio-tecnico-e-maturidade-no-uso/', '07/04/2026'],
        ['Verificar Auto', 'https://verificarauto.com.br/carros-eletricos/gac-aion-v/', 'sem data'],
        ['Tabela Carros', 'https://tabelacarros.com/post/gac-aion-v-luxo-espaco-e-autonomia-de-480-km-reais', '11/04/2026'],
        ['iCarros e Webmotors (ficha, via resultado de busca)', 'https://www.webmotors.com.br/gac/aion-v/2026', '21/11/2026'],
        ['Carros na Web (ficha)', 'https://www.carrosnaweb.com.br/fichadetalhe.asp?codigo=44285', 'sem data'],
        ['Ficha Completa', 'https://www.fichacompleta.com.br/en/carros/gac/aion-v-elite-2026', 'sem data'],
        ['CarExpert Austrália (outro mercado)', 'https://www.carexpert.com.au/gac/aion-v/2026/luxury/features-and-specs', 'sem data'],
        LEVANTAMENTO
      ],
      alertas: ['As fontes divergem sobre conexão sem fio de CarPlay e Android Auto. Teste com seu celular.'],
      comum: `
anoModelo=2026 @3
origem=China @1
preco=219990 @1
precoCondicao=Preço público; lançamento foi R$ 214.990 @1
garantiaCarro=5 anos @4
garantiaBateria=8 anos ou 150.000 km @4
comprimento=4605 @6
largura=1876 @6
altura=1686 @6
entreEixos=2775 @6
vaoLivre=150 @3
portaMalas=427 @1
massa=1920 @1
lugares=5 @4
cd=0.278 @3
pneus=225/45 R19 @3
rodas=Liga de alumínio, aro 19 @1
estepe=Temporário, sob o assoalho @2
tipoMotor=Síncrono, dianteiro @3
potenciaMotores=1 motor dianteiro @1
potenciaTotal=204 @1
torque=240 @5
tracao=Dianteira @1
zeroCem=7.9 @1
velocidadeMaxima=160 @1
modosConducao=Eco, Normal, Sport @3
capacidadeNominal=75.3 @1
quimica=LFP @1
autonomiaInmetro=389 @1
niveisRegen=3 níveis @3
umPedal=serie: no nível intermediário @3
dcMax=180 @1
tempoDc=16 min (30% a 80%) @1
acMax=6.6 @2
tempoAc=8,5 h (30% a 80%, tomada 220 V) @2
conector=CCS2 @4
v2l=serie @2
suspensaoDianteira=McPherson independente @1
suspensaoTraseira=Eixo de torção @1
freios=Disco nas quatro rodas @5
direcao=Elétrica @3
partidaRampa=serie @2
controleDescida=serie @2
autoHold=serie @2
airbags=6 @4
isofix=serie @2
estabilidade=serie @2
tpms=serie @2
nivelAdas=ADAS com ACC, centralização e frenagem @2
acc=serie: com Stop and Go @2
centralizacaoFaixa=serie @2
frenagemAutonoma=serie @1
alertaColisao=serie: frontal e traseira @2
pontoCego=serie @1
trafegoCruzado=serie @1
farolAltoAuto=serie @2
camera360=serie @1
sensoresEstacionamento=serie: dianteiros e traseiros @1
telaCentral=14.6 @1
painelDigital=8.88 @2
headUp=confirmar: citado só pelo Verificar Auto @4
multimidia=Tela de 14,6 pol com Wi-Fi e OTA @2
carplayAndroid=confirmar: DGABC diz CarPlay com fio e Android Auto sem fio; outras fontes divergem @1,2,4,5
vozPortugues=confirmar: menus em português; uma fonte diz comandos de voz só em inglês @2,5
ota=serie @1
usb=Dianteiras A e C, traseira A @2
wifi=serie @1
chaveDigital=serie: keyless @2
som=9 alto-falantes @1
navegacao=serie @2
arCondicionado=Automático digital, 2 zonas @2
saidasTraseiras=serie @2
filtroAr=PM2.5 @2
revestimentoBancos=Couro sintético @3
ajusteMotorista=serie: elétrico, 6 posições @2
ajustePassageiro=serie: elétrico, 4 posições @2
memoria=serie: bancos dianteiros @2
bancosAquecidos=serie: dianteiros @2
bancosVentilados=serie: dianteiros @1
massagem=serie: dianteiros, 8 pontos @2
encostoReclinavel=serie: até 137° @2
teto=serie: panorâmico fixo, cortina elétrica @2
tampaEletrica=serie: abertura por aproximação @2
vidrosAcusticos=serie: para-brisa e dianteiros @2
iluminacaoAmbiente=serie @2
retrovisoresRebatimento=serie: com memória @2
farois=Full LED @2
lanternas=LED verticais @1
macanetas=serie: elétricas retráteis @2
barrasTeto=serie @2
anguloEntrada=19 @7,8
anguloSaida=27 @7,8
diametroGiro=11.2 @7,8
portaMalasRebatido=?978 @9
tensao=?366.5 @9
consumoInmetro=?19.2 | O levantamento indica eficiência de 5,2 km/kWh, equivalente a cerca de 19,2 kWh/100 km. Medição PBEV não identificada. @7,10
autonomiaWltp=?510 @9
crashTest=5 estrelas Euro NCAP 2025 (outro mercado) @7,8
alertaFadiga=serie @7,8
leitorPlacas=serie @7,8
app=serie: comandos e informações do veículo @7,8
inducao=serie @7,8
volanteAquecido=confirmar: aquecido na versão da Austrália @9
concessionarias=— | Cerca de 80 a 90 pontos de venda da marca em novembro de 2026. @10
portaMalasDianteiro=0 @10
reboque=— | Homologação brasileira não informada. @10
capacidadeUtil=— | O levantamento só discrimina a capacidade nominal. @10
notaPbev=A @10
carregadorPortatil=confirmar: ofertado em campanhas e no kit de lançamento, conforme lote @10
wallbox=ausente: sem inclusão permanente de série, sujeito a campanha @10
amortecimentoAdaptativo=ausente: amortecedores passivos @10
estacionamentoAuto=ausente @10
lombar=serie: bancos dianteiros @10
cores=Branco, Preto, Cinza, Prata e Laranja, conforme catálogo e acabamento @10
descargaMax=3.3 @10`,
      versoes: [{ id: 'elite', nome: 'Elite', dados: '' }],
      fotos: [
        ['Dianteira 3/4', AE + '2026/04/AE-GAC-Aion-V-4-de-46.jpg'], ['Frente', AE + '2026/04/AE-GAC-Aion-V-5-de-46.jpg'],
        ['Lateral', AE + '2026/04/AE-GAC-Aion-V-1-de-46.jpg'], ['Traseira 3/4', AE + '2026/04/AE-GAC-Aion-V-8-de-46.jpg'],
        ['Traseira', AE + '2026/04/AE-GAC-Aion-V-7-de-46.jpg'], ['Painel', AE + '2026/04/AE-GAC-Aion-V-24-de-46.jpg'],
        ['Painel (interior caramelo)', EC + '2025/07/gac-aion-v_12.jpg'], ['Bancos dianteiros', EC + '2025/07/gac-aion-v_11.jpg'],
        ['Bancos traseiros', EC + '2025/07/gac-aion-v_10.jpg'], ['Porta-malas', EC + '2025/07/gac-aion-v_03.jpg'],
        ['Console e geladeira', EC + '2025/07/gac-aion-v_13.jpg'], ['Roda', AE + '2026/04/AE-GAC-Aion-V-9-de-46.jpg']
      ]
    },
    {
      id: 'yuan-plus', marca: 'BYD', modelo: 'Yuan Plus',
      fontes: [
        ['Ficha técnica BYD Brasil (PDF, revisada em 09/07/2026)', 'https://www.byd.com/material/__CN/byd-site/br/fichas-tecnicas-2026/update-13-07-2026/07-13-2026---ficha-txiunica/BYD_YuanPlusAWD_V2.pdf', '09/07/2026'],
        ['Site BYD Brasil', 'https://www.byd.com/br/car/yuan-plus.html', '2026'],
        ['AutoPapo', 'https://autopapo.com.br/noticia/byd-renova-yuan-plus-com-tracao-integral-e-desempenho-aprimorado/', '08/04/2026'],
        ['AUTOO', 'https://www.autoo.com.br/byd-yuan-plus-2027-veja-preco-pecas-consumo-e-equipamentos-do-suv/', '08/04/2026'],
        ['Canal VE (ficha)', 'https://canalve.com.br/ficha-tecnica/byd/tudo-sobre-yuan-plus-2027/', 'sem data'],
        ['Recarregados', 'https://recarregados.com/blog/byd-yuan-plus-awd-review-brasil', '03/10/2026'],
        ['JK Carros', 'https://jkcarros.com.br/byd-yuan-plus-awd-2027-pcd-preco-tco/', '02/09/2026'],
        ['Auto+ TV', 'https://www.automaistv.com.br/novidades/byd-yuan-plus-ganha-tracao-awd-e-0-a-100-km-h-de-porsche/', '06/04/2026'],
        ['Wikipedia (Atto 3, outro mercado)', 'https://en.wikipedia.org/wiki/BYD_Atto_3', 'sem data'],
        LEVANTAMENTO
      ],
      alertas: ['O aquecimento dos bancos aparece no site da BYD, mas não na ficha técnica de julho.'],
      comum: `
anoModelo=2027 @3
origem=China @2
preco=269990 @3
precoCondicao=Preço sugerido @3
garantiaCarro=6 anos ou 200.000 km @1
garantiaBateria=8 anos ou 200.000 km @1
concessionarias=211 @3
comprimento=4455 @5
largura=1875 @5
altura=1615 @5
entreEixos=2720 @5
vaoLivre=170 @1
portaMalas=490 @1
portaMalasDianteiro=101 @1
lugares=5 @1
massa=1990 @1
pesoBruto=2520 @1
pneus=215/55 R18 @1
rodas=Liga leve, aro 18 @4
estepe=Sem estepe, kit de reparo @1
tipoMotor=Dois motores, um por eixo @5
potenciaMotores=2 motores, um em cada eixo @5
potenciaTotal=449 @1
torque=560 @1
tracao=Integral (AWD) @1
zeroCem=3.9 @1
velocidadeMaxima=200 @1
modosConducao=Eco, Normal, Sport, Neve @1
capacidadeNominal=74.88 @1
quimica=LFP (Blade) @1
consumoInmetro=16.1 @1
autonomiaInmetro=378 @1
dcMax=205 @1
tempoDc=20 min (20% a 80%) @2
acMax=11 @1
wallbox=opcional: 11 kW @2
v2l=serie: VTOL @1
suspensaoDianteira=McPherson @1
suspensaoTraseira=Multilink @1
freios=Discos ventilados nas quatro rodas @1
direcao=Elétrica (C-EPS) @1
partidaRampa=serie @1
controleDescida=serie @1
airbags=7 @1
isofix=serie @1
estabilidade=serie: VDC @1
tpms=serie: direto @1
nivelAdas=ADAS 2 @1
acc=serie @1
centralizacaoFaixa=serie @1
frenagemAutonoma=serie @1
alertaColisao=serie: frontal e traseira @1
pontoCego=serie @1
trafegoCruzado=serie: traseiro e dianteiro, com frenagem @1
leitorPlacas=serie @1
farolAltoAuto=serie @1
camera360=serie @1
sensoresEstacionamento=serie: 2 dianteiros e 4 traseiros @1
telaCentral=15.6 @1
painelDigital=8.8 @1
headUp=serie @1
multimidia=Google Automotive Services @1
carplayAndroid=serie @1
vozPortugues=serie: comandos de voz; idioma não informado @1
ota=serie @1
inducao=serie: 50 W com ventilação @1
usb=4 portas (2 na frente, 2 atrás; A e C) @1
chaveDigital=serie: chave presencial @1
som=8 alto-falantes @1
arCondicionado=2 zonas @1
saidasTraseiras=serie @1
filtroAr=PM2.5 @1
revestimentoBancos=Couro ecológico premium @1
ajusteMotorista=serie: elétrico, 6 direções @1
ajustePassageiro=serie: elétrico, 6 direções @1
lombar=serie: motorista @1
bancosAquecidos=confirmar: citado no site da BYD; ausente da ficha de julho @2,1
bancosVentilados=serie: dianteiros @1
teto=serie: solar panorâmico @1
tampaEletrica=serie @1
vidrosAcusticos=serie: laterais dianteiros laminados @1
iluminacaoAmbiente=serie: multicores @1
retrovisoresRebatimento=serie @1
farois=LED, com ajuste automático de altura @1
lanternas=LED @1
cores=Obsidian Black, Time Grey, Skiing White @1
portaMalasRebatido=?1360 @9
tensao=?800 @9
conector=Type 2 e CCS2 no Atto 3 europeu; Brasil não informado @9
crashTest=5 estrelas Euro NCAP 2022, Atto 3 europeu (outro mercado) @9
navegacao=serie: Google, com Maps e Waze @6,7,8`,
      versoes: [{ id: 'awd', nome: 'AWD', dados: `
descargaMax=— | O levantamento cita de 2,2 a 3,3 kW conforme o adaptador e a tensão, sem discriminar a potência do AWD. @10
reboque=— | Homologação brasileira não indicada. Os 750 kg citados são do Atto 3 internacional, e a BYD não recomenda reboque no Brasil segundo o levantamento. @10
retomada80120=4.2 | Medição de pista da Quatro Rodas, julho de 2026, conforme o levantamento. @10
capacidadeUtil=?74.9 | O levantamento indica 74,9 kWh úteis, praticamente o mesmo valor da capacidade nominal publicada. Capacidade líquida a confirmar. @10
notaPbev=A @10
autonomiaWltp=— | O levantamento informa 378 km no Inmetro para o AWD. Os 420 km WLTP referem-se ao FWD. @10
niveisRegen=2 níveis (Padrão e Alto) @10
umPedal=ausente: sem parada total no modo regenerativo @10
tempoAc=Cerca de 7,5 h (0% a 100%, 11 kW) @10
carregadorPortatil=serie @10
amortecimentoAdaptativo=ausente: amortecedores passivos @10
autoHold=serie @10
estacionamentoAuto=ausente @10
app=serie: BYD App, com climatização, travamento, localização e consulta da bateria @10
wifi=serie: conectividade 4G/Wi-Fi do sistema ICS @10
memoria=ausente @10
massagem=ausente @10
encostoReclinavel=ausente: encosto fixo, bipartido e rebatível @10
volanteAquecido=ausente @10
macanetas=ausente: convencionais @10
barrasTeto=serie: longitudinais integradas @10` }],
      fotos: [
        ['Frente', AU + '2026/4/1280_960/byd991_08042026_89459_1280_960.jpg'], ['Dianteira 3/4', AU + '2026/4/1280_960/byd-1_06042026_89430_1280_960.jpg'],
        ['Dianteira 3/4 (estúdio)', EC + '2026/03/byd-yuan-plus_2027.jpg'], ['Traseira', AU + '2026/4/1280_960/byd55_08042026_89462_1280_960.jpg'],
        ['Traseira (estúdio)', EC + '2026/03/byd-yuan-plus_2027_02.jpg'], ['Painel', AU + '2026/4/1280_960/byd92_08042026_89463_1280_960.jpg'],
        ['Cabine', BY + 'byd-yuan-plus-interior-26-banner-5-2.webp'], ['Bancos dianteiros', BY + 'interior-sub-banner-conforto.webp'],
        ['Bancos traseiros', AU + '2026/4/1280_960/byd_yuan-plus-ev_2027_1_08042026_89458_1280_960.jpg'],
        ['Porta-malas', BY + 'byd-yuan-plus-sub-porta-malas-pack-2.webp'], ['Roda', AU + '2026/4/1280_960/byd_yuan-plus-ev_2027_1_08042026_89461_1280_960.jpg']
      ]
    },
    {
      id: 'id4', marca: 'Volkswagen', modelo: 'ID.4',
      fontes: [
        ['Autoentusiastas (ficha da VW do Brasil)', 'https://autoentusiastas.com.br/2026/09/novo-vw-id-4-preco-ousado-e-o-peso-do-logotipo/', '07/09/2026'],
        ['AutoPapo', 'https://autopapo.com.br/noticia/volkswagen-id-4-chega-por-r-299-990-e-e-a-primeira-ameaca-real-aos-carros-chineses/', '06/09/2026'],
        ['Revista Carro', 'https://revistacarro.com.br/vw-id-4-2027-chega-ao-brasil-com-286-cv-por-r-299-mil/', '09/2026'],
        ['Canal VE', 'https://canalve.com.br/volkswagen-primeiro-100-eletrico-marca-brasil/', '08/09/2026'],
        ['Jornal do Comércio', 'https://www.jornaldocomercio.com/colunas/automotor/2026/09/1264454-volkswagen-id-4-volta-ao-brasil-agora-como-produto-de-venda-em-loja-foto-principal.html', '24/09/2026'],
        ['Tribuna PR', 'https://www.tribunapr.com.br/noticias/automoveis/novo-volkswagen-id4-pro-2027-preco-especificacoes-brasil/', '08/09/2026'],
        ['Mundo do Automóvel para PCD', 'https://mundodoautomovelparapcd.com.br/volkswagen-id4-pro-2027-lancamento/', '06/09/2026'],
        ['Guru dos Carros', 'https://gurudoscarros.com.br/2026/09/05/volkswagen-id4-chega-outubro-brasil-299990/', '05/09/2026'],
        ['Wikipedia (ID.4, outros mercados)', 'https://en.wikipedia.org/wiki/Volkswagen_ID.4', 'sem data'],
        LEVANTAMENTO
      ],
      alertas: ['Os pesos publicados repetem números de outras linhas da ficha e não fecham na conta. Confirme com a VW.'],
      comum: `
anoModelo=2027 @3
origem=Importado da Alemanha @1
preco=299990 @2
precoCondicao=Preço público, vendas desde outubro @2
garantiaCarro=3 anos sem limite de km @1
garantiaBateria=8 anos ou 160.000 km @1
comprimento=4584 @1
largura=1852 @1
larguraRetrovisores=2108 @1
altura=1634 @1
entreEixos=2771 @1
vaoLivre=163 @1
diametroGiro=10.3 @1
portaMalas=533 @1
lugares=5 @3
cargaUtil=?533 @1
reboque=1000 @1
massa=?2108 @1
pesoBruto=?2771 @1
cd=0.28 @1
pneus=235/55 R19 na frente, 255/50 R19 atrás @1
rodas=Liga leve, 8J x 19 pol @1
tipoMotor=Elétrico traseiro APP550 @1
potenciaMotores=1 motor traseiro, 286 cv @1
potenciaTotal=286 @1
torque=545 @5
tracao=Traseira @1
zeroCem=6.7 @1
velocidadeMaxima=180 @1
modosConducao=Eco, Normal, Sport, Individual @1
capacidadeNominal=84 @1
capacidadeUtil=79 @1
quimica=Íons de lítio @1
autonomiaInmetro=389 @1
dcMax=185 @1
tempoDc=25 min (10% a 80%) na fonte original. O levantamento informa cerca de 28 min na mesma faixa. @1,10
acMax=11 @1
conector=Tipo 2 e CCS @1
suspensaoDianteira=McPherson com barra antirrolagem @1
suspensaoTraseira=Multibraço com barra antirrolagem @1
freios=Discos ventilados na frente, tambores atrás @1
direcao=Eletroassistida, indexada à velocidade @1
airbags=7 @1
alertaFadiga=serie: Emergency Assist @2
nivelAdas=ACC, permanência em faixa e Emergency Assist @1
acc=serie: com Stop&Go @1
centralizacaoFaixa=serie @1
frenagemAutonoma=serie: pedestres e ciclistas @1
pontoCego=serie @1
trafegoCruzado=serie @3
farolAltoAuto=serie @3
camera360=serie @1
estacionamentoAuto=serie: Park Assist Plus com memória @1
telaCentral=12.9 @1
painelDigital=5.3 @2
multimidia=Navegação nativa e comando de voz IDA @4
carplayAndroid=serie: sem fio @1
vozPortugues=serie: assistente IDA; idioma não informado @4
inducao=serie @1
usb=4 portas USB-C @2
chaveDigital=serie: acesso e partida sem chave @1
navegacao=serie @4
arCondicionado=Climatronic, 3 zonas @1
revestimentoBancos=Microfibra sintética, 71% reciclada @3
ajusteMotorista=serie: elétrico, ergoActive @1
ajustePassageiro=serie: elétrico, ergoActive @1
memoria=serie: dianteiros @1
bancosAquecidos=serie: dianteiros @1
massagem=serie: dianteiros, 3 programas @2
teto=serie: panorâmico de vidro @1
iluminacaoAmbiente=serie: 30 cores @1
farois=LED Matrix IQ.Light @3
lanternas=IQ.Light com elementos 3D @5
barrasTeto=serie: longitudinais, 75 kg @1
cores=Costa Azul com teto Preto Piano, Preto Granadilho @3
portaMalasRebatido=?1575 @9
niveisRegen=Modos D e B em outros mercados; quantidade não informada @9
ota=confirmar: citado em outros mercados @9
tampaEletrica=serie: Easy Open, sensor sob o para-choque @6,7
macanetas=serie: embutidas e iluminadas @6,7,8
concessionarias=— | Cerca de 465 a 500 concessionárias da marca. A estrutura habilitada para a linha ID. concentra-se nas principais cidades. @10
anguloEntrada=?16 | Valor aproximado de referência europeia do ID.4 Pro. @10
anguloSaida=?19 | Valor aproximado de referência europeia do ID.4 Pro. @10
portaMalasDianteiro=0 @10
estepe=Kit de reparo de pneus @10
tensao=— | Arquitetura de classe 400 V, com referência aproximada de 350 a 360 V nominais na plataforma MEB. @10
consumoInmetro=— | Estimativa de 20,3 kWh/100 km pela divisão de cerca de 79 kWh úteis por 389 km de autonomia Inmetro. @10
notaPbev=A @10
autonomiaWltp=550 | Até 550 km @10
regenMax=?100 | Até cerca de 100 kW, referência da plataforma MEB. Valor brasileiro não detalhado. @10
umPedal=ausente: modo B intensifica a regeneração sem imobilizar o carro @10
tempoAc=Cerca de 8 h (0% a 100%, 11 kW) @10
carregadorPortatil=confirmar: inclusão conforme pacote de entrega da concessionária @10
wallbox=ausente: sem inclusão de série, sujeito a campanha ou venda como acessório @10
v2l=ausente @10
amortecimentoAdaptativo=ausente: sem amortecedores eletrônicos DCC de série no Brasil @10
partidaRampa=serie @10
controleDescida=ausente @10
autoHold=serie @10
crashTest=5 estrelas Euro NCAP (outro mercado). Adultos 93%, crianças 89%, usuários vulneráveis 76% e assistências 85%. Sem avaliação no Latin NCAP. @10
isofix=serie: bancos traseiros e do passageiro dianteiro, com Top Tether @10
estabilidade=serie: ESC e ASR/TCS @10
tpms=serie: controle de perda de pressão @10
alertaColisao=serie: Front Assist com AEB, monitoramento de pedestres e ciclistas @10
leitorPlacas=confirmar: ativação não confirmada na ficha brasileira @10
sensoresEstacionamento=serie: dianteiros e traseiros, integrados ao assistente de estacionamento @10
headUp=ausente @10
app=ausente: comandos remotos por aplicativo da VW sem serviço ativo no Brasil @10
wifi=ausente: conexão à internet via smartphone @10
som=7 alto-falantes @10
saidasTraseiras=serie: Climatronic de 3 zonas @10
filtroAr=Air Care Climatronic, filtro de partículas finas e alérgenos @10
lombar=serie: elétrico nos bancos dianteiros ergoActive @10
bancosVentilados=ausente @10
encostoReclinavel=ausente: encosto fixo, bipartido e rebatível @10
vidrosAcusticos=serie: para-brisa acústico. Laterais dianteiros laminados citados no pacote europeu. @10
volanteAquecido=confirmar: item não listado na ficha brasileira @10
retrovisoresRebatimento=serie: elétricos e aquecidos @10`,
      versoes: [{ id: 'pro', nome: 'Pro', dados: '' }],
      fotos: [
        ['Dianteira 3/4', AU + '2026/9/1280_960/volkswagen-id4-2027-1_91860_1280_960.jpg'], ['Dianteira 3/4 (estúdio)', AE + '2026/09/AE-VW-ID-4-19.jpg'],
        ['Lateral', AE + '2026/09/AE-VW-ID-4-17.jpg'], ['Traseira 3/4', AU + '2026/9/1280_960/volkswagen-id4-2027-1_91861_1280_960.jpg'],
        ['Painel', AE + '2026/09/AE-VW-ID-4-21-800x450.jpg'], ['Volante e tela', AU + '2026/9/1280_960/volkswagen-id4-2027-1_91864_1280_960.jpg'],
        ['Instrumentos', AE + '2026/09/AE-VW-ID-4-7.jpg'], ['Bancos dianteiros', AE + '2026/09/AE-VW-ID-4-4-800x450.jpg'],
        ['Bancos traseiros', AE + '2026/09/AE-VW-ID-4-5-800x450.jpg'], ['Teto panorâmico', AE + '2026/09/AE-VW-ID-4-13.jpg'],
        ['Tomada de recarga', AE + '2026/09/AE-VW-ID-4-12.jpg'], ['Farol', AU + '2026/9/1280_960/volkswagen-id4-2027-1_91862_1280_960.jpg'],
        ['Lanterna', AU + '2026/9/1280_960/volkswagen-id4-2027-1_91863_1280_960.jpg'], ['Roda', RC + '1-ed.jpg']
      ]
    }
  ];
})();
