# Marketing Viral — notas de diseño y estado del proyecto

> Documento de traspaso. Contiene **todo lo necesario para continuar sin el preview
> de Wix Studio 2** (el servidor del puerto 3000 ya no está disponible).

---

## 1. Objetivo

Sitio estático con CMS (Decap) desplegado en **GitHub Pages**, que replica el diseño
oscuro SaaS del antiguo Wix Studio 2. El sitio viejo de Wix (`neogamesforo.wixsite.com/dannyiwakura`)
permanece online y mostrará un **iframe** del sitio nuevo para que los Traffic Exchanges
no se quejen de la URL.

- Dominio/nombre: **Marketing Viral** (se conserva).
- Directorio: **76 Traffic Exchanges** con sus banners 468×60 intactos.
- 8 destacados heredados de la portada del sitio viejo → en total **84 fichas** en el CMS.

## 2. Estado del trabajo

| Pieza | Estado |
|---|---|
| Datos (84 fichas) + 84 banners descargados | ✅ `public/data/tes.json`, `public/banners/` |
| Logo (wordmark 3600×708) | ✅ `public/logo.png` |
| Scaffold Vite + React + React Router | ✅ `package.json`, `vite.config.js`, `index.html` |
| Componentes y páginas (Home / All TEs / Top 10) | ✅ `src/components`, `src/pages` |
| Tokens de marca (`theme.css`) | ✅ |
| **CSS de layout completo (`app.css`)** | ✅ escrito con la spec de este documento |
| Panel Decap (`public/admin/index.html` + `config.yml`) | ⬜ pendiente |
| Workflow de GitHub Pages (`.github/workflows/deploy.yml`) | ⬜ pendiente |
| `README.md` con instrucciones de push/OAuth | ⬜ pendiente |
| `npm install` + `npm run build` + verificación visual | ⬜ pendiente |
| Iframe en el repo Velo viejo (`dannyiwakura/src/public/embed.js`) | ⬜ pendiente (requiere URL pública viva) |

Referencias guardadas en `design-reference/`:

- `screenshot-home.png`, `screenshot-all-tes.png`, `screenshot-top-10.png` — capturas del diseño original.
- `probe-computed-desktop.txt`, `probe-computed-elements.txt`, `probe-dom-structure.txt` — estilos computados del preview.
- `extract-content.mjs` — script que regenera `public/data/tes.json` y descarga los banners.
- `preview-dom.json` — volcado del DOM del preview (76 títulos + enlaces + banners).

---

## 3. Especificación del diseño (medida en el preview a 1440 px)

El diseño original escala con el viewport: **unidad de referencia = 1265 px de ancho**.
Por eso todo se expresa como `calc(var(--u) * N)`, donde `--u` es el factor de escala.

- Escritorio: `--u = min(100vw, 1920px) / 1265`
- Móvil (≤1023 px): `--u = min(100vw, 700px) / 390`  (tokens de móvil abajo)

### 3.1 Colores

| Token | Valor | Uso |
|---|---|---|
| base-1 | `#0B0D12` | fondo de página, tarjetas TE |
| base-2 | `#F2F4F8` | texto principal, color de botón |
| shade-1 | `#121722` | banda de destacados, tarjetas de "How it works" |
| shade-2 | `#2A3140` | bordes de tarjeta |
| shade-3 | `#A9B3C6` | texto secundario (párrafos, badge, nav) |
| accent-1 | `#6C4CF5` | fondo de botón |
| accent-2 | `#8A6FFF` | — |
| accent-3 | `#B9A6FF` | eyebrows, enlaces "Visit site", números de paso |
| accent-4 | `#211A3B` | — |

### 3.2 Tipografía

- Display (títulos): **Space Grotesk** (sustituye a Wix Madefor Display v2).
- Texto: **Inter** (sustituye a Wix Madefor Text v2).
- Tamaños (unidades de diseño → px a 1440 con `--u = 1.1265`):

| Token | Escritorio | Móvil | Peso / estilo | Color |
|---|---|---|---|---|
| H1 (hero) | 76 | 38 | 700, ls -0.03em, lh 1.02 / 1.05 | base-2 |
| H2 (secciones) | 46 | 30 | 700, ls -0.02em, lh 1.1 / 1.12 | base-2 |
| H3 (nº de paso) | 28 | 21 | 600, ls -0.01em | accent-3 |
| H4 (título de paso) | 22 | 19 | 600, lh 1.25 | base-2 |
| H5 (título de tarjeta) | 18 | 17 | 600, lh 1.3 | base-2 |
| P1 (lead del hero) | 19 | 17 | 400, lh 1.6 | shade-3 |
| P2 (lead de sección, texto de paso) | 16 | 15 | 500, lh 1.55 | shade-3 |
| P3 (eyebrow / "Visit site") | 14 | 13 | 400, lh 1.5 | accent-3 / shade-3 |

### 3.3 Layout

| Elemento | Valor |
|---|---|
| Contenedor | max-width 1920 px, padding lateral 60 u (20 u en móvil) |
| Padding de sección | 96 u arriba y abajo (56 u móvil) |
| Padding del hero | 120 u (56 u móvil) |
| Cabecera ALL TEs | padding-top 96 u, padding-bottom 48 u; la rejilla arranca con 72 u |
| Rejilla de TEs | 2 columnas, gap 20 u (14 u móvil); 1 columna en móvil |
| Rejilla de pasos | 3 columnas, gap 24 u (14 u móvil); 1 columna en móvil |
| Tarjeta TE | padding 16 u (14 u móvil), borde 1 px `shade-2`, radio 16 px, fondo `base-1` |
| Banner en tarjeta | `width: 100%; height: auto` (conserva la proporción original) |
| Título de tarjeta | margen inferior 8 u |
| Tarjeta de paso | fondo `shade-1`, radio 16 px, padding 28 u (24 u móvil), sin borde |
| Botón | fondo `accent-1`, texto `base-2`, radio 100 u, padding 14 u 28 u, fuente P2 |
| Botón CTA de "How it works" | centrado, margen superior 48 u |

### 3.4 Secciones

**Cabecera:** logo a la izquierda (172 px a 1440; 126 px en móvil), menú a la derecha.
Items en P2 (500), `shade-3`, `text-transform: capitalize` → "Home, All TEs, Top 10, Featured, How It Works".
Separación 20 u entre etiquetas (padding-inline 10 u por enlace). Margen derecho ~15 u, logo con margen izquierdo ~25 u.
En móvil el menú se mantiene en línea (fuente del diseño: ancho de menú 8.78 % del viewport, hamburger oculto).

**HOME**
1. Hero centrado: badge → H1 (88 % de ancho) → lead (58 %) → botón.
   - Badge: fondo `shade-1`, borde 1 px `shade-2`, radio 16 px, padding 7 u 16 u,
     texto P3 uppercase, ls 0.08em, color `shade-3`. Margen inferior 26 u.
   - Lead: P1, `shade-3`, margen inferior 36 u.
2. Banda `featured` (fondo `shade-1`): eyebrow "Featured this month" (P3 accent-3, ls 0.14em),
   H2 "Eight exchanges to start with" (70 % de ancho), lead P2 (52 % de ancho),
   rejilla con las 8 fichas destacadas.
3. "How it works": eyebrow, H2 "Three steps, no cost to start", 3 tarjetas de paso
   (01 Pick an exchange / 02 Register for free / 03 Turn credits into visits) y botón CTA.

**ALL TEs** — eyebrow "The complete list", H1 "All 76 traffic exchanges", lead P2, rejilla de 76 fichas.
**TOP 10** — eyebrow "The shortlist", H1 "The 10 exchanges worth starting with", lead P2, rejilla de 10 fichas.

**Pie** — `© <año> Marketing Viral · A hand-picked directory of traffic exchanges.` centrado, P3 `shade-3`.

### 3.5 Enlaces de los banners

Los banners abren en la ventana principal (`target="_top"`) con `rel="noreferrer"`:
la visita al exchange es una navegación normal y no se filtra el dominio del sitio nuevo.

---

## 4. Modelo de datos (`public/data/tes.json`)

```jsonc
{
  "tes": [
    {
      "id": "te-01",          // te-01..te-76 (directorio) + fe-01..fe-08 (destacados)
      "title": "EasyHits4U",
      "url": "http://www.easyhits4u.com/?ref=neogeox",
      "rank": 1,              // posición en el directorio
      "banner": "/banners/te-01.gif",
      "featured": false,      // true → sale en la portada (máx. 8)
      "listed": true          // false → solo aparece en portada (los 8 heredados)
    }
  ]
}
```

- `listed: true` → 76 fichas del directorio (ALL TEs y TOP 10).
- `listed: false, featured: true` → las 8 de la portada antigua (NO están entre las 76).
- TOP 10 = los 10 primeros `listed` por `rank`.
- Contadores y textos se calculan desde los datos (nada escrito a mano).

---

## 5. CMS (Decap) — pendiente de crear

- `public/admin/index.html`: carga `https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js`.
- `public/admin/config.yml`: backend `github`, rama `main`,
  colección `tes` tipo `json-file` sobre `public/data/tes.json`,
  `media_folder: public/banners`, `public_folder: /banners`.
- Campos por ficha: `title`, `url`, `rank` (number), `banner` (image), `featured` (boolean),
  `listed` (boolean, por defecto true).
- Cada guardado = commit → GitHub Pages redespliega.
- Requiere una **GitHub OAuth App** del usuario:
  - Homepage URL: `https://dannyiwakura.github.io/marketing-viral/`
  - Authorization callback URL: `https://dannyiwakura.github.io/marketing-viral/admin/`
  - El `client_id` va en `config.yml` (`backend: github` + `base_url`).

---

## 6. Despliegue (GitHub Pages) — pasos pendientes

1. Crear el repo `DannyIwakura/marketing-viral` (público).
2. `git remote add origin https://github.com/DannyIwakura/marketing-viral.git`
3. `git push -u origin main`
4. Workflow `.github/workflows/deploy.yml`:
   `actions/checkout@v4` → `actions/setup-node@v4` (node 20) → `npm ci` → `npm run build` →
   `actions/upload-pages-artifact@v3` → `actions/deploy-pages@v4`
   (permisos: `contents: read`, `pages: write`, `id-token: write`).
5. En el repo: **Settings → Pages → Source: GitHub Actions**.
6. La URL será `https://dannyiwakura.github.io/marketing-viral/`.
   `BASE_PATH` (`src/lib/site.js`) debe coincidir con esa ruta; si se cambia el repo o se usa
   dominio propio, poner `BASE_PATH = '/'`.
7. `scripts/postbuild.mjs` ya copia `dist/index.html` → `dist/404.html` para que el routing
   en cliente sobreviva a los refrescos en GitHub Pages.

---

## 7. Iframe en el sitio Wix viejo (fase posterior)

- Repo clonado en `E:\MArketing Viral\wixsites\dannyiwakura` (Wix CLI / Velo, `uiVersion: "118"`).
- `src/pages/*.js` son stubs; el diseño real vive en el editor, así que el iframe va en
  `src/public/embed.js` + CSS, publicado con `wix site publish` (flow `site` = `cli-site-old`).
- Mapeo de rutas: `/blank` → `/`, `/blank-1` → `/all-tes`, `/blank-2` → `/top-10`.
- **Solo publicar con aprobación explícita del usuario.**
- El flow `site` no está registrado en la CLI 1.2.8 (`npx wix --help` solo muestra `origami`);
  hay que apuntar el flow global `site` a `src-2KWKO27P.js` de `@wix/cli-site-old`
  (parche temporal de `FLOWS_REGISTRY` en `node_modules/@wix/cli/build/index.js`, restaurar después).

---

## 8. Comandos útiles

```powershell
# sitio estático
cd "E:\MArketing Viral\wixsites\marketing-viral"
npm install
npm run dev        # http://127.0.0.1:5173
npm run build      # genera dist/ (+ 404.html)
npm run preview    # http://127.0.0.1:4173

# regenerar los datos y los banners desde el sitio viejo
cd "C:\Users\PC\AppData\Local\Temp\opencode"; node build-content.mjs
# (copia archivada en design-reference/extract-content.mjs)
```

## 9. Datos de contexto

- Sitio viejo: `https://neogamesforo.wixsite.com/dannyiwakura` (editor clásico, `published: true`).
- Sitio Studio 2 (abandonado): `7038f781-a44d-44d4-aed7-89e8aca554ab` — **ya no hace falta**.
- Colección Wix Data del Studio 2 (solo como referencia): `TrafficExchanges` (76 items con
  `title`, `link`, `rank`, `banner`). El sitio viejo **no tiene CMS**: sus fichas están fijas en el editor.
- La portada del sitio viejo tenía 10 exchanges y el TOP 10 estaba vacío ("Our top 10 will be available soon..").
- Banners servidos por `https://static.wixstatic.com/media/<mediaId>`.
