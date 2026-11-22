// Regras da aba de emplacamentos: nomes duplicados na fonte, categorias e modelos do painel.

// A fonte às vezes separa o mesmo carro em dois registros. Somamos no registro principal.
export const ALIASES = {
  'gwm/haval-h6-gt': 'gwm/haval-h6',
  'toyota/yaris-cross-novo': 'toyota/yaris-cross',
  'gwm/haval-h9-novo': 'gwm/haval-h9',
  'jaecoo/5-novo': 'jaecoo/5',
  'citroën/c3-aircross': 'citroen/aircross',
  'geely/ex5-em-i-novo': 'geely/ex5',
  'volvo/es90-novo': 'volvo/es90',
  'mercedes-amg/sl-roadster-novo': 'mercedes-amg/sl-roadster',
  'aston-martin/valhalla-novo': 'aston-martin/valhalla'
};

// Categoria pelo comprimento: compacto até 4,39 m, médio de 4,40 a 4,79 m, grande a partir de 4,80 m.
// Exceção: Fastback e Basalt ficam nos compactos, por derivarem de plataformas compactas.
export const CATEGORIAS = {
  compacto: {
    nome: 'SUVs compactos',
    ids: ['volkswagen/t-cross', 'volkswagen/tera', 'volkswagen/nivus', 'hyundai/creta', 'chevrolet/tracker', 'chevrolet/sonic',
      'fiat/pulse', 'fiat/fastback', 'jeep/renegade', 'jeep/avenger', 'honda/hr-v', 'honda/wr-v', 'toyota/yaris-cross', 'nissan/kait',
      'nissan/kicks', 'chery/tiggo-5x', 'renault/kardian', 'renault/duster', 'citroen/basalt', 'citroen/aircross', 'peugeot/2008',
      'byd/yuan-pro', 'byd/atto-2-dm-i-novo', 'gac/gs3', 'chevrolet/spark-euv', 'volvo/ex30', 'hyundai/kona', 'kia/stonic', 'mini/aceman',
      'jaecoo/5', 'suzuki/vitara', 'suzuki/jimny-sierra', 'ford/bronco', 'land-rover/evoque', 'renault/megane-e-tech', 'chevrolet/bolt-euv']
  },
  medio: {
    nome: 'SUVs médios',
    ids: ['gwm/haval-h6', 'jeep/compass', 'chery/tiggo-7', 'byd/song-pro', 'toyota/corolla-cross', 'omoda/5', 'byd/song-plus',
      'jaecoo/7', 'volkswagen/taos', 'geely/ex5', 'jeep/commander', 'leapmotor/c10', 'renault/boreal', 'ford/territory', 'changan/uni-t',
      'chery/tiggo-8', 'mitsubishi/eclipse-cross', 'byd/yuan-plus', 'leapmotor/b10', 'gwm/ora-05', 'mg/s5', 'chevrolet/captiva', 'gac/aion-v',
      'gac/aion-y', 'volkswagen/id-4', 'omoda/e5', 'baic/arcfox-t5-novo', 'omoda/7', 'jetour/s06', 'jetour/t1', 'jetour/t2', 'caoa-changan/cs55-novo',
      'volkswagen/tiguan', 'toyota/rav4', 'changan/cs75', 'gac/gs4', 'gac/hyptec-ht', 'gwm/wey-07', 'gwm/tank-300',
      'chevrolet/equinox', 'mitsubishi/outlander', 'kia/sportage', 'kia/niro', 'kia/ev5', 'hyundai/tucson', 'hyundai/ioniq-5', 'honda/cr-v', 'honda/zr-v',
      'renault/koleos', 'peugeot/3008', 'subaru/forester', 'neta/x', 'zeekr/x', 'zeekr/7x', 'toyota/bz4x', 'ford/mustang-mach-e', 'mini/countryman',
      'bmw/x1', 'bmw/x2', 'bmw/x3', 'bmw/x4', 'bmw/ix1', 'bmw/ix2', 'bmw/ix3', 'mercedes-benz/gla', 'mercedes-benz/glb', 'mercedes-benz/glc',
      'mercedes-benz/glc-coupe', 'mercedes-benz/eqa', 'mercedes-benz/eqb', 'audi/q3', 'audi/q3-sportback', 'audi/q5', 'audi/q5-sportback', 'audi/s-q5',
      'audi/q6-e-tron', 'audi/sq6-e-tron', 'volvo/xc40', 'volvo/xc60', 'volvo/ex40', 'volvo/ec40', 'lexus/nx', 'lexus/ux', 'porsche/macan',
      'land-rover/discovery-sport', 'jetour/s08-novo']
  },
  grande: {
    nome: 'SUVs grandes',
    ids: ['caoa-chery/tiggo-9-novo', 'gwm/haval-h7-novo', 'toyota/hilux-sw4', 'gwm/haval-h9', 'gwm/tank-400-novo', 'chevrolet/trailblazer', 'chevrolet/blazer', 'mitsubishi/pajero-sport',
      'byd/sealion-7', 'byd/tan', 'denza/b5', 'denza/d9-novo', 'gac/gs9', 'kia/sorento', 'kia/ev9', 'hyundai/palisade', 'jeep/grand-cherokee', 'jeep/wrangler',
      'bmw/x5', 'bmw/x6', 'bmw/x7', 'bmw/ix', 'mercedes-benz/gle', 'mercedes-benz/gle-coupe', 'mercedes-benz/gls', 'mercedes-benz/classe-g',
      'audi/q7', 'audi/q8', 'audi/rs-q8', 'audi/q8-e-tron', 'audi/e-tron', 'volvo/xc90', 'volvo/ex90', 'lexus/rx', 'lexus/rz', 'porsche/cayenne',
      'land-rover/defender', 'land-rover/discovery', 'land-rover/range-rover', 'land-rover/range-rover-sport', 'land-rover/range-rover-velar',
      'changan/avatr-11', 'lotus/eletre-novo', 'mg/im6-novo', 'lamborghini/urus', 'ferrari/purosangue', 'aston-martin/dbx', 'rolls-royce/cullinan']
  }
};

// h = aba de híbridos, e = aba de elétricos.
const COMBINADO = 'A fonte soma as versões elétrica e híbrida deste modelo.';
const TODAS = 'Inclui todas as motorizações vendidas com este nome.';
export const SISTEMA = [
  { id: 'gwm/haval-h6', nome: 'GWM Haval H6', abas: 'h', nota: 'Inclui todas as motorizações e o H6 GT.' },
  { id: 'byd/song-pro', nome: 'BYD Song Pro', abas: 'h' },
  { id: 'chery/tiggo-7', nome: 'Caoa Chery Tiggo 7', abas: 'h', nota: TODAS },
  { id: 'byd/song-plus', nome: 'BYD Song Plus', abas: 'h' },
  { id: 'jaecoo/7', nome: 'Jaecoo 7', abas: 'h', nota: TODAS },
  { id: 'chery/tiggo-8', nome: 'Caoa Chery Tiggo 8', abas: 'h', nota: TODAS },
  { id: 'byd/atto-2-dm-i-novo', nome: 'BYD Atto 2 DM-i', abas: 'h' },
  { id: 'omoda/7', nome: 'Omoda 7', abas: 'h' },
  { id: 'gwm/haval-h7-novo', nome: 'GWM Haval H7', abas: 'h' },
  { id: 'caoa-changan/cs55-novo', nome: 'Caoa Changan CS55', abas: 'h' },
  { id: 'caoa-chery/tiggo-9-novo', nome: 'Caoa Chery Tiggo 9', abas: 'h' },
  { id: 'jetour/s06', nome: 'Jetour S06', abas: 'h' },
  { id: 'jetour/t1', nome: 'Jetour T1', abas: 'h' },
  { id: 'jetour/t2', nome: 'Jetour T2', abas: 'h' },
  { id: 'geely/ex5', nome: 'Geely EX5', abas: 'he', nota: COMBINADO, divisao: { ref: '2026-10', ele: 418, hib: 1238 } },
  { id: 'leapmotor/c10', nome: 'Leapmotor C10', abas: 'he', nota: COMBINADO, divisao: { ref: '2026-10', ele: 196, hib: 937 } },
  { id: 'leapmotor/b10', nome: 'Leapmotor B10', abas: 'he', nota: COMBINADO, divisao: { ref: '2026-10', ele: 379, hib: 37 } },
  { id: 'omoda/e5', nome: 'Omoda E5', abas: 'e' },
  { id: 'gwm/ora-05', nome: 'GWM Ora 5', abas: 'e' },
  { id: 'mg/s5', nome: 'MG S5', abas: 'e' },
  { id: 'baic/arcfox-t5-novo', nome: 'BAIC Arcfox T5', abas: 'e' },
  { id: 'chevrolet/captiva', nome: 'Chevrolet Captiva', abas: 'e' },
  { id: 'gac/aion-v', nome: 'GAC Aion V', abas: 'e' },
  { id: 'byd/yuan-plus', nome: 'BYD Yuan Plus', abas: 'e' },
  { id: 'volkswagen/id-4', nome: 'Volkswagen ID.4', abas: 'e' }
];
