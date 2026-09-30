# Prévias em arquivo único com os 3 idiomas dentro (27/09).
# Motivo: o painel do chat só enxerga o arquivo aberto, então o seletor de idioma não pode abrir outro arquivo (dava 404).
# Cada prévia é uma "casca" com a página dentro de um iframe; trocar o idioma troca o conteúdo do iframe, sem sair do arquivo.
# Imagens, mapa e JavaScript, que são iguais nos 3 idiomas, vão uma vez só no arquivo.
# Uso: python3 build_preview_3idiomas.py <dist> <pasta de saída> [sufixo do nome, ex.: -27-09]
import sys, os, re, json, subprocess, tempfile

dist, outdir = sys.argv[1], sys.argv[2]
suffix = sys.argv[3] if len(sys.argv) > 3 else ''
here = os.path.dirname(os.path.abspath(__file__))
LANGS = ['en', 'es', 'pt']
NAMES = {'en': f'borespot-previa{suffix}.html', 'es': f'borespot-previa-es{suffix}.html', 'pt': f'borespot-previa-pt{suffix}.html'}

# 1) Uma página completa por idioma (mesmo processo das prévias de antes)
pages = {}
with tempfile.TemporaryDirectory() as tmp:
    for l in LANGS:
        p = os.path.join(tmp, l + '.html')
        subprocess.run([sys.executable, os.path.join(here, 'build_preview.py'), dist, l, p], check=True, stdout=subprocess.DEVNULL)
        pages[l] = open(p, encoding='utf-8').read()

# 2) Dentro da casca, o clique num idioma avisa a casca em vez de abrir outro arquivo
HOOK = ("<script>(function(){if(window.parent===window)return;"
        "addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[hreflang][lang]');if(!a)return;"
        "var l=a.getAttribute('hreflang');if(!/^(en|es|pt)$/.test(l))return;"
        "e.preventDefault();e.stopImmediatePropagation();parent.postMessage({bsLang:l},'*');},true);})();</script>")
for l in LANGS:
    pages[l] = pages[l].replace('<head>', '<head>' + HOOK, 1)

# 3) Pedaços grandes e iguais nos 3 idiomas (imagens, mapa, JavaScript) vão uma vez só
pieces, index = [], {}
def token(chunk):
    if chunk not in index:
        index[chunk] = len(pieces); pieces.append(chunk)
    return '\u0000' + str(index[chunk]) + '\u0000'
pat = re.compile(r'data:[a-z]+/[a-z0-9.+-]+;base64,[A-Za-z0-9+/=]{2000,}|<script>window\.__bsMap=Promise\.resolve\(.*?\);</script>|<script type="module">.*?</script>', re.S)
variants = {l: pat.sub(lambda m: token(m.group(0)), pages[l]) for l in LANGS}

def js_json(obj):
    return json.dumps(obj, ensure_ascii=False).replace('</', '<\\/').replace('\u2028', '\\u2028').replace('\u2029', '\\u2029')

for start in LANGS:
    shell = f"""<!doctype html>
<html lang="{start}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>Bore Spot · prévia</title>
<style>html,body{{margin:0;height:100%;background:#03102B;overflow:hidden}}#page{{position:fixed;inset:0;width:100%;height:100%;border:0;display:block}}</style>
</head>
<body>
<iframe id="page" title="Bore Spot"></iframe>
<script type="application/json" id="bs-pieces">{js_json(pieces)}</script>
<script type="application/json" id="bs-pages">{js_json(variants)}</script>
<script>
(function () {{
  var pieces = JSON.parse(document.getElementById('bs-pieces').textContent);
  var pages = JSON.parse(document.getElementById('bs-pages').textContent);
  var frame = document.getElementById('page');
  function show(l) {{
    frame.srcdoc = pages[l].replace(/\\u0000(\\d+)\\u0000/g, function (m, i) {{ return pieces[+i]; }});
    document.documentElement.lang = l;
    try {{ frame.focus(); }} catch (e) {{}}
  }}
  addEventListener('message', function (e) {{
    if (e.source === frame.contentWindow && e.data && pages[e.data.bsLang]) show(e.data.bsLang);
  }});
  frame.addEventListener('load', function () {{ try {{ frame.contentWindow.focus(); }} catch (e) {{}} }});
  show('{start}');
}})();
</script>
</body>
</html>
"""
    out = os.path.join(outdir, NAMES[start])
    open(out, 'w', encoding='utf-8').write(shell)
    print(out, round(len(shell.encode()) / 1024), 'KB')
