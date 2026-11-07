# Marketing Viral

Directorio de **Traffic Exchanges** con diseño oscuro, panel de contenido y despliegue
automático en **GitHub Pages**. Gratis, con URL pública siempre activa y publicación con un
simple `git push`.

> **Web:** https://dannyiwakura.github.io/marketing-viral/  
> El sitio original de Wix Studio 2 queda obsoleto: este proyecto lo replica.

---

## Qué hay aquí

| Ruta | Contenido |
|---|---|
| `src/pages/` | `Home`, `AllTes`, `Top10` |
| `src/components/` | `Header`, `Footer`, `TeCard`, `Seo` |
| `src/lib/analytics.js` | Envío de eventos a Umami (clics en banners) |
| `src/styles/theme.css` | Tokens de marca y escala del diseño |
| `src/styles/app.css` | Layout completo (responsive) |
| `public/data/tes.json` | **El contenido**: las fichas del directorio y las destacadas |
| `public/banners/` | 84 banners de los exchanges (468×60) |
| `public/admin/` | `/admin` → redirección al panel online de Pages CMS |
| `.pages.yml` | Configuración del panel Pages CMS (online, sin OAuth) |
| `design-reference/` | Capturas y mediciones del diseño original (referencia) |
| `DESIGN-NOTES.md` | Especificación de diseño y estado del proyecto |

El sitio es **data-driven**: los contadores ("All 76 traffic exchanges", "Top 10"), los
listados y la portada se calculan a partir de `public/data/tes.json`. No hay
ninguna cifra escrita a mano: si añades o quitas fichas en el CMS, los números cambian solos.

### Modelo de datos

```jsonc
{
  "id": "te-01",                 // te-01..te-76 + fe-01..fe-08
  "title": "EasyHits4U",
  "url": "http://www.easyhits4u.com/?ref=neogeox",
  "rank": 1,
  "banner": "/banners/te-01.gif",
  "featured": false,            // true -> sale en la portada (8 max.)
  "listed": true                // false -> solo portada (los 8 heredados)
}
```

- **ALL TEs** = todas las fichas con `listed: true`, ordenadas por `rank`.
- **TOP 10** = las 10 primeras por `rank`.
- **Portada** = hasta 8 fichas con `featured: true`.

---

## Desarrollo local

```powershell
npm install
npm run dev       # http://127.0.0.1:5173
npm run build     # genera dist/ (y dist/404.html para el routing en GitHub Pages)
npm run preview   # http://127.0.0.1:4173
```

En local la app usa `BASE_PATH = '/'` automáticamente (`src/lib/site.js`), así que las
rutas son `http://127.0.0.1:5173/`, `/all-tes`, `/top-10`.

## Publicado

| | |
|---|---|
| **Web** | **https://dannyiwakura.github.io/marketing-viral/** |
| **Repo** | https://github.com/DannyIwakura/marketing-viral |
| **Hosting** | GitHub Pages (gratis, sin caducidad) |
| **Despliegue** | automático en cada `git push` a `main` (`.github/workflows/deploy.yml`) |

El repositorio ya está creado, el workflow ya ha desplegado y Pages está activado con
*Source: GitHub Actions*. Cada push a `main` (o cada guardado desde el CMS) reconstruye y
publica el sitio en ~1 minuto.

Si algún día cambia el nombre del repo o se usa un dominio propio, actualiza `BASE_PATH` en
`src/lib/site.js` (`'/marketing-viral/'` → `'/'`) y la URL de `public/admin/index.html`
(la redirección al panel de Pages CMS).

## Estadísticas de visitas

El sitio mide las visitas con **Umami Cloud** (plan gratuito): sin cookies, sin datos
personales y sin banner de consentimiento.

| | |
|---|---|
| Panel | https://cloud.umami.is → web "Marketing Viral" |
| Web registrada | `dannyiwakura.github.io` |
| UUID del sitio | en `index.html` (`data-website-id`) — es público |
| Lo que cuenta | páginas vistas, visitas, rutas, países, dispositivos y navegador |
| Eventos | `Banner click` con propiedades `te`, `title`, `from`, `slot` |

**Clics en banners:** cada clic en un banner o en su enlace "Visit site" genera un evento
`Banner click` con el `id` y el título del exchange, la ruta desde la que se pulsó
(`/`, `/all-tes`, `/top-10`) y el tipo de enlace (`banner` o `link`). En el panel:
*Events → Banner click → Properties*. Con eso se puede crear un *goal* de tipo evento para
ver el porcentaje de visitas que acaba pulsando un banner.

**Limitaciones (importantes):**

- El sitio se sirve dentro de un iframe de Wix, así que **todos los referrers se ven como
  `wixsite.com`**. Para saber de dónde viene la gente (qué exchange, foro o red) hay que
  mirar el **Analytics de Wix**, que es gratis y sí ve la página de entrada real.
- Los bloqueadores de anuncios cortan el script: las cifras son un **mínimo**, no un censo.
- El plan gratuito guarda **6 meses** de histórico y admite 100.000 eventos al mes. Ojo: cada
  propiedad de un evento cuenta aparte, así que un clic en un banner (1 evento + 4
  propiedades) consume 5. Exporta en CSV si quieres conservar los datos.
- En el plan gratuito no hay filtros de IP, así que tus propias visitas cuentan. Ábrelo una
  vez con `?notrack=1` para dejar de contarlas en tu navegador:
  `https://dannyiwakura.github.io/marketing-viral/?notrack=1` (`?track=1` lo revierte).
- El UUID es público (va en el HTML): alguien podría enviar visitas falsas. Es una
  molestia, no un riesgo.

**Dónde tocarlo:**

- Script y UUID: `index.html` (cabecera `<head>`).
- Eventos: `src/components/TeCard.jsx` (llama a `src/lib/analytics.js`).
- `data-domains` deja fuera el preview local: las visitas de `127.0.0.1` no se cuentan.

---

## Editar el contenido

El CMS es **Pages CMS**, online y sin instalar nada. Se entra por
**https://app.pagescms.org/DannyIwakura/marketing-viral** o, más corto, por
**https://dannyiwakura.github.io/marketing-viral/admin**, que redirige allí.

1. Entra en **https://app.pagescms.org** y accede con GitHub.
2. Instala la GitHub App **Pages CMS** solo en el repo `DannyIwakura/marketing-viral`.
3. Abre el repositorio: verás la colección **Traffic Exchanges** con todas las fichas.
   Puedes añadir una ficha nueva, subir el banner, marcar *Destacado en portada* (máx. 8)
   y guardar. El cambio se commitea y la web se actualiza sola.

La configuración está en `.pages.yml`. El antiguo panel Decap (`public/admin/config.yml`)
se eliminó: si algún día hiciera falta, sigue disponible en el historial de git.

---

## Iframe en el sitio Wix viejo (pendiente de decisión)

El sitio `https://neogamesforo.wixsite.com/dannyiwakura` sigue online (comprobado, HTTP 200)
y su URL no se pierde. Para que además muestre el sitio nuevo dentro, hay tres caminos
(detalle en `DESIGN-NOTES.md` §7):

- **A. Editor de Wix (recomendada):** *Add → Embed → Embed a site* →
  `https://dannyiwakura.github.io/marketing-viral/`, a pantalla completa y publicar.
  Conserva la barra de direcciones en el dominio de Wix.
- **B. Solo código:** función HTTP de Velo que devuelve el iframe (la URL pasa a
  `.../_functions/embed`) — requiere publicar en Wix.
- **C. No tocar nada:** la URL vieja sigue viva con el diseño antiguo.

> En el repo Velo, `src/public/` son módulos importables, **no** ficheros estáticos
> públicos: por eso un `embed.js` suelto no se ejecuta solo.

Los banners usan `target="_blank"` + `rel="noopener noreferrer"`: la visita al exchange se
abre en una pestaña nueva y el directorio sigue abierto detrás.

## Licencia / notas

Contenido y banners pertenecen a sus respectivos exchanges; los enlaces son de referido.
