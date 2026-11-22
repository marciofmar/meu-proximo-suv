// Liga os nomes usados nos informes da Fenabrave aos registros do ranking completo.
import { ALIASES } from './emplacamentos-config.mjs';

const MARCAS = { VW: 'volkswagen', GM: 'chevrolet', 'CAOA CHERY': 'chery', 'M.BENZ': 'mercedes-benz', 'LAND ROVER': 'land-rover', 'CAOA CHANGAN': 'caoa-changan' };

const DIRETOS = {
  'BYD/ATTO 2': 'byd/atto-2-dm-i-novo',
  // Até ago/2026 a Fenabrave somava Song Plus e Song Pro em "BYD/SONG".
  'BYD/SONG': 'fen:BYD/SONG',
  // "BYD/YUAN" soma Yuan Pro e Yuan Plus; fica no registro de maior volume só para as posições por canal.
  'BYD/YUAN': 'byd/yuan-pro',
  'BMW/320I': 'bmw/série-3',
  'CAOA CHANGAN/CS55': 'caoa-changan/cs55-novo',
  'CAOA CHANGAN/CS75': 'changan/cs75',
  'CAOA CHANGAN/UNIT-T': 'changan/uni-t',
  'CAOA CHERY/TIGGO 9': 'caoa-chery/tiggo-9-novo',
  'CITROEN/C3 AIRCROSS': 'citroen/aircross',
  'FORD/F150': 'ford/f-150',
  'GEELY/EX5 EM-I': 'geely/ex5',
  'GM/CAPTIVA': 'chevrolet/captiva',
  'GM/SPARK': 'chevrolet/spark-euv',
  'GWM/HAVAL H7': 'gwm/haval-h7-novo',
  'GWM/ORA 03': 'gwm/ora-03',
  'GWM/ORA 05': 'gwm/ora-05',
  'HONDA/CITY HATCH': 'honda/city',
  'IVECO/DAILY': 'iveco/daily-chassi',
  'IVECO/DAILY 30-130': 'iveco/daily-chassi',
  'IVECO/DAILY 35-180': 'iveco/daily-chassi',
  'IVECO/DAILY 35S14': 'iveco/daily-chassi',
  'IVECO/DAILY 42S14': 'iveco/daily-chassi',
  'IVECO/DAILY 5516': 'iveco/daily-chassi',
  'KIA/K2500': 'kia/bongo',
  'KIA/UK2500': 'kia/bongo',
  'M.BENZ/SPRINTER 315': 'mercedes-benz/sprinter',
  'M.BENZ/SPRINTER 317': 'mercedes-benz/sprinter',
  'M.BENZ/SPRINTER 417': 'mercedes-benz/sprinter',
  'OMODA JAECOO/JAECOO 5': 'jaecoo/5',
  'OMODA JAECOO/JAECOO 7': 'jaecoo/7',
  'OMODA JAECOO/OMODA 5': 'omoda/5',
  'OMODA JAECOO/OMODA 7': 'omoda/7',
  'OMODA JAECOO/OMODA E5': 'omoda/e5',
  'PEUGEOT/BOXER': 'peugeot/boxer-cargo',
  'PEUGEOT/PARTNER': 'peugeot/partner-rapid',
  'RENAULT/OROCH': 'renault/duster-oroch',
  'TOYOTA/YARIS HB': 'toyota/yaris',
  'VW TRUCK E BUS/EXPRESS': 'volkswagen/delivery-express'
};

const slug = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function idFenabrave(nome, conhecidos) {
  if (DIRETOS[nome]) return DIRETOS[nome];
  const [marca, ...resto] = nome.split('/');
  const base = `${MARCAS[marca] || slug(marca)}/${slug(resto.join('/'))}`;
  for (const c of [base, `${base}-novo`]) {
    if (conhecidos.has(c)) return ALIASES[c] || c;
  }
  return `fen:${nome}`;
}
