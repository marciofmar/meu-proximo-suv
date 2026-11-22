// Leitura do ranking mensal de emplacamentos (automóveis e comerciais leves) do Guia Carros.
const NOMES = ['janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

export const urlMes = (ano, mes) => `https://guiacarros.com.br/mais-vendidos/${ano}/${NOMES[mes - 1]}`;

const texto = s => s
  .replace(/&amp;/g, '&').replace(/&#0?39;|&apos;/g, "'").replace(/&quot;/g, '"')
  .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

// Devolve [{ id, marca, modelo, unidades, posicao }] na ordem da página.
export function lerRanking(html) {
  const saida = [];
  const linha = /<tr\b[^>]*data-marca="[^"]*"[^>]*>([\s\S]*?)<\/tr>/g;
  for (const [, c] of html.matchAll(linha)) {
    const pos = c.match(/mv-pos[^>]*>\s*(\d+)/);
    const href = c.match(/href="https:\/\/guiacarros\.com\.br\/catalogo\/([^"]+)"/);
    const nome = c.match(/mv-modelo-txt"[^>]*>\s*<small>([\s\S]*?)<\/small>\s*<strong>([\s\S]*?)<\/strong>/);
    const un = c.match(/mv-unid"[^>]*>\s*<strong>([\d.]+)/);
    if (!pos || !nome || !un) throw new Error('Linha do ranking em formato inesperado');
    const marca = texto(nome[1]), modelo = texto(nome[2]);
    saida.push({
      id: href ? href[1] : `${marca}/${modelo}`.toLowerCase().replace(/\s+/g, '-'),
      marca, modelo, unidades: Number(un[1].replace(/\./g, '')), posicao: Number(pos[1])
    });
  }
  return saida;
}
