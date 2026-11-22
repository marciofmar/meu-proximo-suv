# Meu próximo SUV

**Acesse:** https://marciofmar.github.io/meu-proximo-suv/

Painel interativo para comparar SUVs até R$ 300 mil, em duas abas: híbridos plug-in 2027 e SUVs médios 100% elétricos.

## Aba de híbridos

Você define o que é indispensável, veta o que não aceita, ajusta os pesos de cada critério e chega a poucos finalistas. A referência de comparação é um BYD Song Plus DM-i 2023.

A cada mudança de filtro, um pop-up mostra os modelos que saíram ou entraram e o dado que justificou cada mudança.

## Aba de elétricos (`#eletricos`)

11 modelos e 14 versões à venda no Brasil em 21/11/2026, com 125 quesitos por versão, galeria por ângulo, filtros e comparação lado a lado de até 4 versões.

- `eletricos/quesitos.js`: lista e grupos dos quesitos.
- `eletricos/dados.js`: fichas, fontes e fotos. Cada linha traz a fonte; dado ausente aparece como "Não informado".
- `eletricos/app.js` e `eletricos/estilo.css`: interface da aba.

## Como funciona

- Página estática em `index.html` e na pasta `eletricos/`, sem dependências nem build.
- As escolhas ficam salvas só no navegador de quem usa (`localStorage`). O botão "Salvar minhas escolhas" exporta as preferências.
- Dados dos híbridos importados da pesquisa de 11/10/2026 e revisados em 14/11/2026. As imagens e os links de fonte apontam para os sites de origem.

## Como rodar no computador

Sirva a pasta com qualquer servidor estático, por exemplo:

```bash
npx serve .
```

## Publicação

O site é servido pelo GitHub Pages a partir da raiz da branch `main`. Todo push na `main` republica o site em um ou dois minutos.
