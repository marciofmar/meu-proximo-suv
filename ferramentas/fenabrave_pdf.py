"""Lê os informes mensais da Fenabrave e grava as tabelas de modelos em JSON.

Uso: python ferramentas/fenabrave_pdf.py saida.json 2026-10=arquivo.pdf [2026-09=outro.pdf ...]
Requer: pip install pypdf
"""
import json
import logging
import re
import sys

from pypdf import PdfReader

logging.getLogger("pypdf").setLevel(logging.ERROR)

MESES = {"janeiro": 1, "fevereiro": 2, "março": 3, "marco": 3, "abril": 4, "maio": 5, "junho": 6,
         "julho": 7, "agosto": 8, "setembro": 9, "outubro": 10, "novembro": 11, "dezembro": 12}
ABREV = {"jan": 1, "fev": 2, "mar": 3, "abr": 4, "mai": 5, "jun": 6, "jul": 7, "ago": 8, "set": 9, "out": 10, "nov": 11, "dez": 12}
TABELAS = [
    ("totalAno", r"Ranking dos emplacamentos acumulados at"),
    ("total", r"Ranking dos emplacamentos em"),
    ("diretaAno", r"Modelos mais emplac\. venda direta acumulado"),
    ("varejoAno", r"Modelos mais emplac\. venda varejo acumulado"),
    ("direta", r"Modelos mais emplacados venda direta"),
    ("varejo", r"Modelos mais emplacados venda varejo"),
]
LINHA = re.compile(r"(\d+)º\s+([A-Z0-9][^\n]*?/[^\n]*?)\s+([\d.]+)\s*$", re.M)
PERIODO = re.compile(r"Ranking dos emplacamentos em\s+([A-Za-zçÇ]+)/(\d{4})")


def linhas(texto):
    return [[m.group(2).strip(), int(m.group(3).replace(".", ""))] for m in LINHA.finditer(texto)]


def ler(arquivo, esperado):
    paginas = [(p.extract_text() or "") for p in PdfReader(arquivo).pages[:40]]
    periodo = next((PERIODO.search(t) for t in paginas if PERIODO.search(t)), None)
    if not periodo:
        raise ValueError(f"{arquivo}: período não encontrado")
    nome = periodo.group(1).lower()
    mes = MESES.get(nome) or ABREV.get(nome[:3])
    achado = f"{periodo.group(2)}-{mes:02d}"
    if achado != esperado:
        raise ValueError(f"{arquivo}: traz {achado}, esperado {esperado}")

    resumo = re.search(r"A \+ B\s+([\d.]+)\s+[\d.]+\s+([\d.]+)", paginas[0])
    if not resumo:
        raise ValueError(f"{arquivo}: total do mercado não encontrado")
    saida = {"mercado": {"mes": int(resumo.group(1).replace(".", "")), "ano": int(resumo.group(2).replace(".", ""))}}
    for chave, titulo in TABELAS:
        pagina = next((t for t in paginas if re.search(titulo, t)), None)
        if pagina is None:
            raise ValueError(f"{arquivo}: tabela {chave} não encontrada")
        partes = re.split(r"COMERCIAIS LEVES", pagina, maxsplit=1)
        if len(partes) != 2:
            raise ValueError(f"{arquivo}: tabela {chave} sem comerciais leves")
        saida[chave] = {"auto": linhas(partes[0]), "cl": linhas(partes[1])}
        if len(saida[chave]["auto"]) < 20:
            raise ValueError(f"{arquivo}: tabela {chave} incompleta")
    return saida


def main():
    destino, *pares = sys.argv[1:]
    dados = {}
    for par in pares:
        mes, arquivo = par.split("=", 1)
        dados[mes] = ler(arquivo, mes)
    with open(destino, "w", encoding="utf-8") as f:
        json.dump(dados, f, ensure_ascii=False)
    print(f"{len(dados)} informes lidos")


if __name__ == "__main__":
    main()
