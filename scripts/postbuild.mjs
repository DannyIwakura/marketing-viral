// Postbuild de GitHub Pages.
//
// 1) Copia index.html a las carpetas de ruta (all-tes/, top-10/): Pages sirve
//    esos ficheros con HTTP 200, asi que los enlaces directos no caen en un 404
//    y los buscadores pueden indexarlos.
// 2) Copia index.html a 404.html para cualquier otra ruta.
// 3) Genera robots.txt y sitemap.xml con URLs absolutas.
//
// Al copiar a una subcarpeta hay que subir un nivel las rutas relativas que
// genera Vite (base './'): ./assets/... -> ../assets/...
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const SITE_URL = 'https://dannyiwakura.github.io/marketing-viral/'
const ROUTES = ['all-tes', 'top-10']

const dist = resolve(process.cwd(), 'dist')
const index = resolve(dist, 'index.html')

if (!existsSync(index)) {
    console.warn('postbuild: no se encontro dist/index.html')
    process.exit(0)
}

const html = readFileSync(index, 'utf8')
const upOneLevel = (source) => source.replace(/(href|src)="\.\//g, '$1="../')

copyFileSync(index, resolve(dist, '404.html'))

for (const route of ROUTES) {
    const dir = resolve(dist, route)
    mkdirSync(dir, { recursive: true })
    writeFileSync(resolve(dir, 'index.html'), upOneLevel(html))
}

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${['', ...ROUTES].map((r) => `    <url><loc>${SITE_URL}${r}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`
writeFileSync(resolve(dist, 'sitemap.xml'), sitemap)
writeFileSync(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}sitemap.xml\n`)

console.log(`postbuild: 404.html, ${ROUTES.map((r) => `${r}/index.html`).join(', ')}, sitemap.xml y robots.txt`)
