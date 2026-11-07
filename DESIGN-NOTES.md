# Marketing Viral — notas de diseño y estado del proyecto

> Documento de traspaso. Contiene **todo lo necesario para continuar sin el preview
> de Wix Studio 2** (el servidor del puerto 3000 ya no está disponible).

---

## 1. Objetivo

Sitio estático con CMS (Pages CMS) desplegado en **GitHub Pages**, que replica el diseño
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
| Menú hamburguesa en móvil | ✅ `src/components/Header.jsx` |
| Panel Pages CMS (`.pages.yml`) | ✅ (online sin OAuth, instalando la GitHub App) |
| `/admin` → redirección a Pages CMS (`public/admin/index.html`) | ✅ (sin panel Decap) |
| Workflow de GitHub Pages (`.github/workflows/deploy.yml`) | ✅ |
| `README.md` con instrucciones de publicación y del CMS | ✅ |
| `npm install` + `npm run build` + verificación visual | ✅ build OK, 8/76/10 tarjetas renderizadas |
| Repositorio git local con commit inicial | ✅ |
| **Publicado en GitHub Pages** | ✅ https://dannyiwakura.github.io/marketing-viral/ |
| Palabra rotativa en el H1 del HOME | ✅ `src/components/RotatingWord.jsx` (ver §3.6) |
| Analítica de visitas (Umami Cloud + clics en banners) | ✅ `index.html`, `src/lib/analytics.js`, `src/components/TeCard.jsx` (ver §10) |
| Iframe en el repo Velo viejo (`dannyiwakura/src/public/embed.js`) | ✅ colocado por el usuario en Wix |

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
| Padding del hero | 64 u arriba y abajo (32 u móvil). Antes 120/56: se redujo para subir el hero |
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
En móvil el menú se colapsa en un **botón hamburguesa** (34×34 px, 3 líneas de 2 px) que abre un
panel desplegable con los items en mayúsculas sobre fondo `base-1` y borde `shade-2`.

**HOME**
1. Hero centrado: badge → H1 (88 % de ancho) → lead (58 %) → botón.
   - Badge: fondo `shade-1`, borde 1 px `shade-2`, radio 16 px, padding 7 u 16 u,
     texto P3 uppercase, ls 0.08em, color `shade-3`. Margen inferior 26 u.
     El número son **todas las fichas del CMS** (directorio + destacados: 84 hoy), calculado en
     tiempo de ejecución; no hay ninguna cifra escrita a mano.
   - Lead: P1, `shade-3`, margen inferior 36 u.
2. Banda `featured` (fondo `shade-1`): eyebrow "Featured this month" (P3 accent-3, ls 0.14em),
   H2 "Eight exchanges to start with" (70 % de ancho), lead P2 (52 % de ancho),
   rejilla con las 8 fichas destacadas y, debajo, un botón pill "View the complete list"
   (`Link` a `/all-tes`, el mismo `.button` del hero, centrado con `.section-cta`:
   margen superior 48 u / 40 u en móvil).
3. "How it works": eyebrow, H2 "Three steps, no cost to start", 3 tarjetas de paso
   (01 Pick an exchange / 02 Register for free / 03 Turn credits into visits) y botón CTA.

**ALL TEs** — eyebrow "The complete list", H1 "All 76 traffic exchanges", lead P2, rejilla de 76 fichas.
**TOP 10** — eyebrow "The shortlist", H1 "The 10 exchanges worth starting with", lead P2, rejilla de 10 fichas.

**Pie** — `© <año> Marketing Viral · A hand-picked directory of traffic exchanges.` centrado, P3 `shade-3`.

### 3.5 Enlaces de los banners

Los banners abren en una **pestaña nueva** (`target="_blank"`) con
`rel="noopener noreferrer"`: el directorio sigue abierto detrás y la página del exchange no
puede manipular esta ventana ni recibe la URL desde la que se llega.

### 3.6 Palabra que rota en el H1 del HOME

El titular es `Real traffic for your <palabra>, from one place.` y la palabra cambia cada 2 s
entre `offers, services, products, referrals, blog, website` (`src/components/RotatingWord.jsx`).

- **Animación:** rueda vertical. La palabra que sale sube y se desvanece (340 ms) mientras la
  nueva entra desde abajo (420 ms), con `overflow: hidden` en `.rotator-window`.
- **Ancho:** se mide el ancho real de cada palabra ya con la fuente cargada y se anima
  (`transition: width 420ms`) para que el resto de la frase se desplace en vez de dar un salto.
- **Color:** lila de acento `--accent-3` (#B9A6FF).
- **La coma viaja con la palabra** (prop `suffix`): va dentro de la misma caja, así nunca se
  queda huérfana al final de la línea.
- **Saltos de línea fijos:** como el ancho de la palabra cambia, la rotura natural del titular
  bailaría de una palabra a otra. Por eso hay dos `<br>` invisibles:
  - `.hero-break` (tras "your") está siempre activo → línea 1 = "Real traffic for your".
  - `.hero-break-tail` (antes de "from") solo en ≤1023 px, donde "palabra, from one place." no
    cabe en un renglón → el titular ocupa 3 líneas en móvil y 2 en escritorio, siempre las mismas.
- **`display: inline-grid`** en `.rotator` (no `inline-block`): con `overflow: hidden` en el hijo,
  un `inline-block` alinea su borde inferior con la línea base y el renglón crecía 15 px.
- **Accesibilidad:** el H1 lleva un `sr-only` con la frase completa (todas las palabras) y la
  versión animada va en `aria-hidden`. Con `prefers-reduced-motion: reduce` no hay animación ni
  intervalo: se queda fija en "offers,".
- Verificado con Playwright a 320, 390, 600, 768, 900, 1024, 1280, 1440 y 1920 px: altura del H1,
  posición del lead y del botón constantes en todo el ciclo, sin desbordes ni errores de consola.

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

## 5. CMS (Pages CMS) — hecho

- Panel online: **https://app.pagescms.org/DannyIwakura/marketing-viral** (requiere la
  GitHub App *Pages CMS* instalada solo en ese repo).
- Configuración: `.pages.yml` (colección `Traffic Exchanges` sobre `public/data/tes.json`,
  banners en `public/banners`).
- Campos por ficha: `id`, `title`, `url`, `rank` (number), `banner` (image),
  `featured` (boolean), `listed` (boolean, por defecto true).
- Cada guardado = commit → GitHub Pages redespliega.
- `public/admin/index.html` ya **no es un panel**: es una página `noindex` que redirige a
  Pages CMS (meta refresh + `location.replace`, con enlace de rescate). GitHub Pages no
  permite redirecciones 301.
- El antiguo panel Decap (`public/admin/config.yml`, `npm run cms`) se eliminó por no usarse;
  sigue en el historial de git si alguna vez hiciera falta.

---

## 6. Despliegue (GitHub Pages) — hecho

| | |
|---|---|
| Web | https://dannyiwakura.github.io/marketing-viral/ |
| Repo | https://github.com/DannyIwakura/marketing-viral |
| Remote local | `origin` → `https://github.com/DannyIwakura/marketing-viral.git` (rama `main`) |
| Pages | activado con *Source: GitHub Actions* (`build_type: workflow`) |

Cada `git push` a `main` dispara `.github/workflows/deploy.yml` y publica en ~1 minuto.
`scripts/postbuild.mjs` copia `dist/index.html` → `dist/404.html` para que el routing en
cliente (`/all-tes`, `/top-10`) sobreviva a un refresco directo.

Si cambia el repo o se usa dominio propio: `BASE_PATH` en `src/lib/site.js` (`'/'`) y
`site_url` en `public/admin/config.yml`.

---

## 7. Iframe en el sitio Wix viejo (fase posterior, requiere decisión)

**Hallazgo importante:** en el repo Velo (`E:\MArketing Viral\wixsites\dannyiwakura`),
`src/public/` **no** son ficheros estáticos servidos en el dominio del sitio: son módulos
JS que se importan desde el código de las páginas (`import { x } from 'public/x'`). Por eso
no se puede añadir un `embed.js` que se ejecute solo: Wix no lo sirve como asset público.

Las páginas son stubs (`src/pages/HOME.bozxl.js`, `ALL TEs.uf9h2.js`, `TOP 10.jihu9.js`,
`masterPage.js`), con el diseño real en el editor. Opciones:

| Opción | Cómo | Pros | Contras |
|---|---|---|---|
| **A. Editor de Wix (recomendada)** | En cada página: *Add → Embed → Embed a site* → `https://dannyiwakura.github.io/marketing-viral/`, estirar a pantalla completa, *Send to back*, ocultar cabecera/pie y publicar | La barra de direcciones sigue en `neogamesforo.wixsite.com/dannyiwakura`; 10 min por página | Manual, en el editor |
| **B. Solo código** | `src/backend/http-functions.js` que devuelva HTML con el iframe + redirección desde las páginas a `/_functions/embed` | 100 % por CLI, sin tocar el editor | La URL pasa a `.../dannyiwakura/_functions/embed`; hay que registrar el flow `site` (cli-site-old) y **publicar** |
| **C. No tocar nada** | El sitio viejo sigue online con su diseño antiguo | Cero riesgo | Diseño viejo y enlaces duplicados |

Recomendación: **A** si se quiere conservar exactamente la URL; **C** si lo único que
importa es que la URL siga viva (ya lo está).

Notas para la opción B: el flow `site` no está registrado en la CLI 1.2.8 (`npx wix --help`
solo muestra `origami`); hay que apuntar el flow global `site` a `src-2KWKO27P.js` de
`@wix/cli-site-old` (parche temporal de `FLOWS_REGISTRY` en
`node_modules/@wix/cli/build/index.js`, restaurar después). Mapeo de rutas del sitio viejo:
`/blank` = HOME, `/blank-1` = ALL TEs, `/blank-2` = TOP 10.

**Solo publicar en Wix con aprobación explícita del usuario.**

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

---

## 10. Analítica de visitas (Umami Cloud) — hecho

Implementado el 2026-11-05. Herramienta: **Umami Cloud**, plan Hobby gratuito (100.000
eventos/mes, 1 web, 6 meses de histórico). Sin cookies, sin datos personales y sin banner
de consentimiento.

| Pieza | Dónde | Qué hace |
|---|---|---|
| `data-website-id` + script | `index.html` (`<head>`) | tracker `https://cloud.umami.is/script.js` |
| `data-domains="dannyiwakura.github.io"` | `index.html` | el preview local (`127.0.0.1`) no cuenta visitas |
| `data-do-not-track="true"` | `index.html` | respeta la señal DNT del navegador |
| `window.mvBeforeSend` | `index.html` | (1) `?notrack=1` / `?track=1` excluye tus visitas; (2) quita la barra final de la URL para que `/all-tes` y `/all-tes/` no cuenten como dos páginas |
| `trackEvent()` | `src/lib/analytics.js` | envoltura segura: si el tracker no cargó (adblock), no hace nada y el clic sigue igual |
| `onClick` en los enlaces | `src/components/TeCard.jsx` | evento `Banner click` con `te`, `title`, `from` y `slot` |

El evento se dispara **antes** de abrir la pestaña nueva (`target="_blank"`), sin
`preventDefault` ni esperas: el enlace se comporta exactamente igual que antes.

Umami detecta solo los cambios de ruta de la SPA, así que no hay que programar las páginas
vistas: Home → All TEs → Top 10 se contabilizan sin tocar nada.

**Limitación estructural:** el sitio vive dentro de un iframe de Wix (`sandbox` con
`allow-scripts allow-same-origin`), así que `document.referrer` dentro del iframe es siempre
`https://neogamesforo.wixsite.com/`. Los referrers reales solo se ven en el Analytics de Wix
(gratis). Los bloqueadores de anuncios hacen que las cifras sean un mínimo, no un censo.
