# Gera a prévia em arquivo único (JS embutido, imagens em data URI) a partir do build do Astro.
# Uso: python3 build_preview.py <dist> <lang> <saida.html>
import sys, re, base64, os, mimetypes
dist, lang, out = sys.argv[1], sys.argv[2], sys.argv[3]
html = open(os.path.join(dist, lang, 'index.html'), encoding='utf-8').read()

def inline_script(m):
    src = m.group(1)
    js = open(os.path.join(dist, src.lstrip('/')), encoding='utf-8').read()
    return '<script type="module">' + js.replace('</script>', '<\\/script>') + '</script>'
html = re.sub(r'<script type="module" src="([^"]+)"></script>', inline_script, html)

# Tira srcset/sizes e as <source> do celular: a prévia usa só a imagem principal
html = re.sub(r'\s(?:srcset|sizes)="[^"]*"', '', html)
html = re.sub(r'<source[^>]*>', '', html)

cache = {}
def data_uri(path):
    p = os.path.join(dist, path.lstrip('/'))
    if path not in cache:
        mt = mimetypes.guess_type(p)[0] or ('image/webp' if p.endswith('.webp') else 'application/octet-stream')
        cache[path] = f'data:{mt};base64,' + base64.b64encode(open(p, 'rb').read()).decode()
    return cache[path]
html = re.sub(r'(src|href)="(/(?:img/[^"]+|favicon\.png))"', lambda m: f'{m.group(1)}="{data_uri(m.group(2))}"', html)
html = re.sub(r'url\((/img/[^)]+)\)', lambda m: f'url({data_uri(m.group(1))})', html)
# Mapa real da intro: embute o JSON (a prévia abre como arquivo e não consegue baixar /intro/miami-map.json)
mp = os.path.join(dist, 'intro', 'miami-map.json')
if os.path.exists(mp):
    mj = open(mp, encoding='utf-8').read().replace('</', '<\\/')
    html = html.replace('<head>', '<head><script>window.__bsMap=Promise.resolve(' + mj + ');</script>', 1)
# Seletores de idioma: na prévia, levam para a prévia do outro idioma (arquivos na mesma pasta)
PREV = {'en': 'borespot-previa.html', 'es': 'borespot-previa-es.html', 'pt': 'borespot-previa-pt.html'}
for l, fname in PREV.items():
    html = html.replace(f'href="/{l}/"', f'href="{fname}"').replace(f'href="/{l}"', f'href="{fname}"')
open(out, 'w', encoding='utf-8').write(html)
print(out, round(len(html)/1024), 'KB')
