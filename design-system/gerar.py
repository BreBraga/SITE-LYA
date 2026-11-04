"""Gera index.html do design system a partir de README.md, tokens.json e components/.

Uso: python gerar.py   (rode de novo sempre que editar um README ou o tokens.json)
"""
import html
import json
import os
import re

AQUI = os.path.dirname(os.path.abspath(__file__))


def ler(caminho):
    with open(os.path.join(AQUI, caminho), encoding="utf-8") as f:
        return f.read()


# ---------- markdown simples (o que os READMEs usam) ----------
def inline(t):
    t = html.escape(t, quote=False)
    t = re.sub(r"`([^`]+)`", r"<code>\1</code>", t)
    t = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", t)
    t = re.sub(r"(?<![\w*])\*([^*]+)\*(?!\w)", r"<em>\1</em>", t)
    return t


def md(texto, pular_h1=False):
    linhas = texto.splitlines()
    out, i = [], 0
    while i < len(linhas):
        l = linhas[i]
        if not l.strip():
            i += 1
            continue
        if l.startswith("```"):
            bloco = []
            i += 1
            while i < len(linhas) and not linhas[i].startswith("```"):
                bloco.append(linhas[i])
                i += 1
            out.append("<pre><code>" + html.escape("\n".join(bloco)) + "</code></pre>")
            i += 1
            continue
        m = re.match(r"(#{1,4}) (.*)", l)
        if m:
            nivel = len(m.group(1))
            if not (pular_h1 and nivel == 1):
                n = min(nivel + 1, 5)
                slug = re.sub(r"[^a-z0-9]+", "-", m.group(2).lower()).strip("-")
                out.append(f'<h{n} id="{slug}">{inline(m.group(2))}</h{n}>')
            i += 1
            continue
        if l.startswith("|"):
            linhas_t = []
            while i < len(linhas) and linhas[i].startswith("|"):
                linhas_t.append([c.strip() for c in linhas[i].strip("|").split("|")])
                i += 1
            cab, corpo = linhas_t[0], [r for r in linhas_t[1:] if not re.match(r"^-+$", r[0].replace(" ", ""))]
            out.append("<table><thead><tr>" + "".join(f"<th>{inline(c)}</th>" for c in cab) + "</tr></thead><tbody>"
                       + "".join("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>" for r in corpo)
                       + "</tbody></table>")
            continue
        if re.match(r"(- |\d+\. )", l):
            tag = "ol" if re.match(r"\d+\. ", l) else "ul"
            itens = []
            while i < len(linhas) and (re.match(r"(- |\d+\. )", linhas[i]) or linhas[i].startswith("  ")):
                if linhas[i].startswith("  ") and itens:
                    itens[-1] += " " + linhas[i].strip()
                else:
                    itens.append(re.sub(r"^(- |\d+\. )", "", linhas[i]))
                i += 1
            out.append(f"<{tag}>" + "".join(f"<li>{inline(x)}</li>" for x in itens) + f"</{tag}>")
            continue
        par = []
        while i < len(linhas) and linhas[i].strip() and not re.match(r"(#|\||- |\d+\. |```)", linhas[i]):
            par.append(linhas[i])
            i += 1
        out.append("<p>" + inline(" ".join(par)) + "</p>")
    return "\n".join(out)


# ---------- dados ----------
tokens = json.loads(ler("tokens.json"))
readme = ler("README.md")


def gerar_tokens_css():
    """tokens.json -> tokens.css (variáveis CSS e uma classe por estilo de texto)."""
    def valor(t):
        return t["value"] if isinstance(t["value"], str) else list(t["value"].values())[0]
    tema = tokens["color"]["themes"][0]["id"]
    o = ["/* Lya Cartomante — generated from tokens.json */", f':root, [data-theme="{tema}"] {{']
    o += [f"  --{t['name']}: {valor(t)};" for t in tokens["color"]["tokens"] + tokens["shadow"]["tokens"]]
    o += ["}", ":root {"]
    o += [f"  --{t['name']}: {t['value']};" for t in tokens["spacing"]["tokens"] + tokens["radius"]["tokens"]]
    o += [f"  --font-{k}: {v};" for k, v in tokens["type"]["families"].items()] + ["}"]
    for g in tokens["type"]["groups"]:
        for s in g["styles"]:
            r = [f"font-family: var(--font-{g['family']})", f"font-size: {s['fontSize']}",
                 f"line-height: {s['lineHeight']}", f"font-weight: {s['fontWeight']}"]
            if "letterSpacing" in s:
                r.append(f"letter-spacing: {s['letterSpacing']}")
            o.append(f".{s['name']} {{ " + "; ".join(r) + "; }")
    with open(os.path.join(AQUI, "tokens.css"), "w", encoding="utf-8") as f:
        f.write("\n".join(o) + "\n")


gerar_tokens_css()

GRUPOS = [("Marca", ["Marca", "Leque"]), ("Ações", ["Botao", "BotaoFlutuante"]), ("Navegação", ["Topo", "Intencao"]),
          ("Texto", ["TituloSecao"]), ("Preços e promoções", ["Arcano", "CartaDoMes", "Promocao"]),
          ("Conteúdo", ["Passos", "Depoimento", "Duvidas"])]


def altura(comp):
    linha1 = ler(f"components/{comp}/preview.html").splitlines()[0]
    return int(re.search(r"height=(\d+)", linha1).group(1))


# ---------- seções ----------
def secao_cores():
    cards = []
    for t in tokens["color"]["tokens"]:
        v = t["value"] if isinstance(t["value"], str) else list(t["value"].values())[0]
        cards.append(f'<div class="cor"><div class="cor__amostra" style="background:{v}"></div>'
                     f'<div class="cor__info"><strong>{t["name"]}</strong><code>{v}</code><p>{inline(t["usage"])}</p></div></div>')
    return '<div class="cores">' + "".join(cards) + "</div>"


def secao_tipo():
    fam = tokens["type"]["families"]
    blocos = []
    for g in tokens["type"]["groups"]:
        linhas = []
        for s in g["styles"]:
            tam = s["fontSize"]
            vis = tam if not tam.endswith("rem") or float(tam[:-3]) <= 3.6 else "3.6rem"
            estilo = (f'font-family:{html.escape(fam[g["family"]])};font-size:{vis};line-height:{s["lineHeight"]};'
                      f'font-weight:{s["fontWeight"]};letter-spacing:{s.get("letterSpacing", "normal")}')
            if s["name"] in ("formato", "selo"):
                estilo += ";text-transform:uppercase"
            linhas.append(f'<div class="tipo"><div class="tipo__meta"><strong>{s["name"]}</strong>'
                          f'<code>{tam} · {s["lineHeight"]} · {s["fontWeight"]}</code></div>'
                          f'<div class="tipo__amostra" style="{estilo}">{html.escape(s["sample"])}</div>'
                          f'<p class="tipo__uso">{inline(s["usage"])}</p></div>')
        blocos.append(f'<h3>{g["name"]} <small>{html.escape(fam[g["family"]])}</small></h3>' + "".join(linhas))
    return "".join(blocos)


def secao_lista(familia, desenho):
    linhas = []
    for t in tokens[familia]["tokens"]:
        linhas.append(f'<tr><td>{desenho(t["value"])}</td><td><strong>{t["name"]}</strong></td>'
                      f'<td><code>{html.escape(t["value"])}</code></td><td>{inline(t["usage"])}</td></tr>')
    return '<table class="tokens"><tbody>' + "".join(linhas) + "</tbody></table>"


def barra(v):
    return f'<span class="barra" style="width:min({v},240px)"></span>'


def canto(v):
    return f'<span class="canto" style="border-radius:{v}"></span>'


def sombra(v):
    return f'<span class="sombra" style="box-shadow:{v}"></span>'


def secao_componentes():
    partes = []
    for grupo, comps in GRUPOS:
        partes.append(f'<h3 class="grupo">{grupo}</h3>')
        for c in comps:
            guia = md(ler(f"components/{c}/README.md"), pular_h1=True)
            partes.append(f'<article class="comp" id="c-{c}"><h4>{c}</h4>'
                          f'<iframe src="components/{c}/preview.html" style="height:{altura(c)}px" loading="lazy" title="Preview de {c}"></iframe>'
                          f'<div class="guia">{guia}</div></article>')
    return "".join(partes)


def secao_assets():
    partes = []
    for grupo in ["Cartas", "Icones"]:
        nota = md(ler(f"assets/{grupo}/README.md"), pular_h1=True)
        arquivos = sorted(f for f in os.listdir(os.path.join(AQUI, "assets", grupo)) if f.endswith(".svg"))
        grade = "".join(f'<figure class="asset asset--{grupo.lower()}"><img src="assets/{grupo}/{f}" alt=""><figcaption>{f}</figcaption></figure>'
                        for f in arquivos)
        partes.append(f'<h3>{grupo}</h3><div class="assets">{grade}</div><div class="guia">{nota}</div>')
    return "".join(partes)


nav_comp = "".join(f'<a href="#c-{c}">{c}</a>' for _, cs in GRUPOS for c in cs)

pagina = f"""<!DOCTYPE html>
<html lang="pt-BR" data-theme="padrao">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Lya Cartomante · Design system</title>
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/bundle.css">
<style>
  body {{ background: var(--nevoa); color: var(--tinta); }}
  .ds {{ display: grid; grid-template-columns: 240px 1fr; min-height: 100vh; }}
  .ds-nav {{ position: sticky; top: 0; height: 100vh; overflow-y: auto; padding: 1.6rem 1.2rem;
            background: var(--noite); color: var(--pergaminho); font-size: .92rem; }}
  .ds-nav .marca {{ margin-bottom: 1.6rem; }}
  .ds-nav p {{ font-family: var(--font-display); letter-spacing: .2em; font-size: .78rem; color: var(--lavanda); margin: 1.4rem 0 .4rem; }}
  .ds-nav a:not(.marca) {{ display: block; padding: .28rem 0; text-decoration: none; color: var(--pergaminho-mudo); }}
  .ds-nav a:not(.marca):hover {{ color: var(--vela); }}
  .ds-main {{ padding: 2.4rem clamp(1.2rem, 4vw, 3.5rem) 6rem; max-width: 1080px; }}
  .capa {{ width: 100%; height: 288px; border: 0; border-radius: var(--raio); display: block; margin-bottom: 3rem; background: var(--nevoa);
          box-shadow: 0 0 0 1px var(--linha); }}
  .ds-main h2 {{ font-family: var(--font-display); font-weight: 600; font-size: 2.6rem; color: var(--ameixa); margin: 4rem 0 1.2rem; }}
  .ds-main h3 {{ font-family: var(--font-display); font-weight: 600; font-size: 1.7rem; color: var(--ameixa); margin: 2.6rem 0 1rem; }}
  .ds-main h3 small {{ font-family: var(--font-corpo); font-weight: 400; font-size: .85rem; color: var(--tinta-muda); margin-left: .6rem; }}
  .ds-main h4 {{ font-family: var(--font-display); font-weight: 600; font-size: 1.4rem; color: var(--ameixa); margin: 0 0 .8rem; }}
  .ds-main p, .ds-main li {{ color: var(--tinta-suave); max-width: 72ch; }}
  .ds-main p + p {{ margin-top: .8rem; }}
  .ds-main ul, .ds-main ol {{ padding-left: 1.2rem; margin: .6rem 0 1rem; }}
  .ds-main li {{ margin: .3rem 0; }}
  .ds-main strong {{ color: var(--tinta); }}
  .ds-main code {{ font-family: ui-monospace, Consolas, monospace; font-size: .85em; background: var(--branco); padding: .05em .35em;
                  border-radius: var(--raio-cupom); color: var(--ameixa); border: 1px solid var(--linha); }}
  .ds-main pre {{ background: var(--noite); color: var(--pergaminho); padding: 1rem 1.2rem; border-radius: var(--raio-item); overflow-x: auto; }}
  .ds-main pre code {{ background: none; border: 0; color: inherit; padding: 0; }}
  .ds-main table {{ border-collapse: collapse; width: 100%; margin: 1rem 0; font-size: .95rem; }}
  .ds-main th, .ds-main td {{ text-align: left; padding: .6rem .7rem; border-bottom: 1px solid var(--linha); vertical-align: top; color: var(--tinta-suave); }}
  .ds-main th {{ color: var(--ameixa); font-weight: 700; }}
  .livro h3 {{ margin-top: 2.2rem; }}
  .cores {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 1rem; }}
  .cor {{ background: var(--branco); border-radius: var(--raio-item); overflow: hidden; border: 1px solid var(--linha); }}
  .cor__amostra {{ height: 84px; border-bottom: 1px solid var(--linha); }}
  .cor__info {{ padding: .8rem .9rem 1rem; display: grid; gap: .25rem; }}
  .cor__info p {{ font-size: .85rem; line-height: 1.45; margin-top: .3rem; }}
  .tipo {{ padding: 1.2rem 0; border-bottom: 1px solid var(--linha); display: grid; gap: .5rem; }}
  .tipo__meta {{ display: flex; gap: 1rem; align-items: baseline; }}
  .tipo__amostra {{ color: var(--ameixa); overflow-wrap: anywhere; }}
  .tipo__uso {{ font-size: .88rem; }}
  .tokens td:first-child {{ width: 260px; }}
  .barra {{ display: block; height: 14px; background: var(--toalha); border-radius: 3px; }}
  .canto {{ display: block; width: 64px; height: 48px; background: var(--lavanda); border: 1px solid var(--toalha); }}
  .sombra {{ display: block; width: 90px; height: 56px; background: var(--pergaminho); border-radius: var(--raio-item); margin: .6rem 0 1.4rem; }}
  .grupo {{ border-top: 1px solid var(--linha); padding-top: 2rem; }}
  .comp {{ margin: 0 0 3rem; }}
  .comp iframe {{ width: 100%; border: 0; border-radius: var(--raio); display: block; background: var(--branco);
                 box-shadow: 0 0 0 1px var(--linha); margin-bottom: 1.2rem; }}
  .guia {{ max-width: 760px; }}
  .assets {{ display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem; }}
  .asset {{ margin: 0; background: var(--branco); border: 1px solid var(--linha); border-radius: var(--raio-item); padding: 1rem; text-align: center; }}
  .asset img {{ width: 72px; height: 72px; margin: 0 auto .5rem; }}
  .asset--cartas img {{ width: 120px; height: 200px; }}
  .asset figcaption {{ font-size: .8rem; color: var(--tinta-muda); }}
  @media (max-width: 860px) {{ .ds {{ grid-template-columns: 1fr; }} .ds-nav {{ position: static; height: auto; }} }}
</style>
</head>
<body>
<div class="ds">
  <nav class="ds-nav" aria-label="Design system">
    <a class="marca" href="#topo"><span class="marca__nome">Lya</span><span class="marca__oficio">cartomante</span></a>
    <p>Fundamentos</p>
    <a href="#livro">Livro da marca</a><a href="#cores">Cores</a><a href="#tipografia">Tipografia</a>
    <a href="#espaco">Espaço</a><a href="#raios">Raios</a><a href="#sombras">Sombras</a>
    <p>Componentes</p>{nav_comp}
    <p>Arquivos</p><a href="#assets">Assets</a>
  </nav>
  <main class="ds-main" id="topo">
    <iframe class="capa" src="components/Cover/preview.html" title="Capa do design system"></iframe>
    <section class="livro" id="livro"><h2>Livro da marca</h2>{md(readme)}</section>
    <section id="cores"><h2>Cores</h2>{secao_cores()}</section>
    <section id="tipografia"><h2>Tipografia</h2>{secao_tipo()}</section>
    <section id="espaco"><h2>Espaço</h2>{secao_lista("spacing", barra)}</section>
    <section id="raios"><h2>Raios</h2>{secao_lista("radius", canto)}</section>
    <section id="sombras"><h2>Sombras</h2>{secao_lista("shadow", sombra)}</section>
    <section id="componentes"><h2>Componentes</h2>{secao_componentes()}</section>
    <section id="assets"><h2>Assets</h2>{secao_assets()}</section>
  </main>
</div>
</body>
</html>
"""

with open(os.path.join(AQUI, "index.html"), "w", encoding="utf-8") as f:
    f.write(pagina)
print("index.html gerado")
