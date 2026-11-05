// Construye el contenido del sitio estatico:
//  - 76 fichas del directorio (preview del diseño: título, link, banner)
//  -  8 fichas destacadas (lista de la portada del sitio viejo)
// Descarga los banners a public/banners y escribe public/data/tes.json (formato Decap).
import fs from "node:fs"
import path from "node:path"

const PROJ = "E:/MArketing Viral/wixsites/marketing-viral"
const TMP = "C:/Users/PC/AppData/Local/Temp/opencode"

// Los 8 destacados que ya usaba el diseño en la portada (del sitio viejo)
const FEATURED = [
  { title: 'Traffic Crusader', media: 'f63c26_eefe909e07c54e93af136e1da4bac162~mv2.webp', url: 'https://trafficcrusader.com/?rid=288' },
  { title: 'Steal Traffic', media: 'f63c26_0422d6fbfe814e8e8f495552dc5ef220~mv2.gif', url: 'https://steal-traffic.com/?rid=292' },
  { title: 'Azteca Traffic Power', media: 'f63c26_0adee88d48334a3bbb66d9ee0c198629~mv2.png', url: 'https://aztecatrafficpower.com/?rid=31' },
  { title: 'Mysterious Scotland Traffic', media: 'f63c26_993f7e267ec74ff7b789c9e106b2615a~mv2.gif', url: 'https://mysteriousscotlandtraffic.com/?rid=10630' },
  { title: 'Big Trucker TE', media: 'f63c26_1cb83ef15cd04cb68ae291a01f30c2ec~mv2.gif', url: 'https://bigtruckerte.com/?rid=393' },
  { title: 'Beautiencutie Hits', media: 'f63c26_e71e62f618c94c1c8b4dff7149880049~mv2.gif', url: 'https://beautiencutiehits.com/?rid=85' },
  { title: 'Traffic Reations', media: 'f63c26_df74fa842a9f489cad6b1202b5a1ad38~mv2.png', url: 'https://trafficreations.com/?rid=142' },
  { title: 'My Traffic Partners', media: 'f63c26_62df4d2412dc4f71a9263d9baf16627a~mv2.png', url: 'https://mytrafficpartners.com/index.php?r=dannyiwakura' },
]

const dom = JSON.parse(fs.readFileSync(`${TMP}/preview-dom.json`, 'utf8'))
const titles = dom.h3.slice(1) // el primero es el título de la página
const media = dom.imgs.filter((s) => !s.includes('419842d2641a4eeb9d8f405ffdceac56')) // quita el logo
const links = []
for (const l of dom.links) if (links[links.length - 1] !== l) links.push(l) // deduplica consecutivos

console.log(`titulos:${titles.length} banners:${media.length} links:${links.length}`)
const n = Math.min(titles.length, media.length, links.length)

const tes = []
for (let i = 0; i < n; i++) {
  const mediaId = (media[i].match(/media\/([^/]+)/) || [])[1]
  tes.push({
    id: `te-${String(i + 1).padStart(2, '0')}`,
    title: titles[i],
    url: links[i],
    rank: i + 1,
    banner: '',
    media: mediaId,
    featured: false,
    listed: true,
  })
}

// highlighted: se anaden al final del listado (no inflan el directorio completo)
FEATURED.forEach((f, i) => {
  tes.push({
    id: `fe-${String(i + 1).padStart(2, '0')}`,
    title: f.title,
    url: f.url,
    rank: 100 + i + 1,
    banner: '',
    media: f.media,
    featured: true,
    listed: false,
  })
})

// descarga de banners
const dir = path.join(PROJ, 'public/banners')
fs.mkdirSync(dir, { recursive: true })
let ok = 0, fail = 0
for (const t of tes) {
  const ext = (t.media.match(/\.(\w+)$/) || [])[1] || 'png'
  const file = `${t.id}.${ext}`
  t.banner = `/banners/${file}`
  const dest = path.join(dir, file)
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) { ok++; continue }
  const url = `https://static.wixstatic.com/media/${t.media}`
  try {
    const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
    if (!r.ok) throw new Error('HTTP ' + r.status)
    fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer()))
    ok++
  } catch (e) {
    fail++
    console.log('FALLO', t.id, t.media, e.message)
    t.banner = ''
  }
}
console.log(`banners: ${ok} ok, ${fail} fallos`)

const out = {
  tes: tes.map(({ id, title, url, rank, banner, featured, listed }) => ({ id, title, url, rank, banner, featured, listed })),
}
fs.mkdirSync(path.join(PROJ, 'public/data'), { recursive: true })
fs.writeFileSync(path.join(PROJ, 'public/data/tes.json'), JSON.stringify(out, null, 1) + '\n')
console.log(`escrito public/data/tes.json: ${out.tes.length} fichas | listadas ${out.tes.filter((t) => t.listed).length} | destacadas ${out.tes.filter((t) => t.featured).length}`)
console.log('muestra:', out.tes.slice(0, 3).map((t) => `${t.rank}. ${t.title}`).join(' | '))
