# Meu próximo SUV

**Acesse:** https://marciofmar.github.io/meu-proximo-suv/

Painel interativo para comparar SUVs híbridos plug-in 2027 até R$ 300 mil. Você define o que é indispensável, veta o que não aceita, ajusta os pesos de cada critério e chega a poucos finalistas. A referência de comparação é um BYD Song Plus DM-i 2023.

A cada mudança de filtro, um pop-up mostra os modelos que saíram ou entraram e o dado que justificou cada mudança.

## Como funciona

- Um único arquivo, `index.html`, sem dependências nem build.
- As escolhas ficam salvas só no navegador de quem usa (`localStorage`). O botão "Salvar minhas escolhas" exporta as preferências.
- Dados importados da pesquisa de 11/10/2026. As imagens e os links de fonte apontam para os sites de origem.

## Como rodar no computador

Abra `index.html` no navegador, ou sirva a pasta com qualquer servidor estático, por exemplo:

```bash
npx serve .
```

## Publicação

O site é servido pelo GitHub Pages a partir da raiz da branch `main`. Todo push na `main` republica o site em um ou dois minutos.
