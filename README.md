# Marketing Viral

Directorio de **Traffic Exchanges** con diseño oscuro, panel de contenido (Decap CMS) y
despliegue automático en **GitHub Pages**. Gratis, con URL pública siempre activa y
publicación con un simple `git push`.

> El sitio original de Wix Studio 2 queda obsoleto: este proyecto lo replica.

---

## Qué hay aquí

| Ruta | Contenido |
|---|---|
| `src/pages/` | `Home`, `AllTes`, `Top10` |
| `src/components/` | `Header`, `Footer`, `TeCard`, `Seo` |
| `src/styles/theme.css` | Tokens de marca y escala del diseño |
| `src/styles/app.css` | Layout completo (responsive) |
| `public/data/tes.json` | **El contenido**: 84 fichas (76 del directorio + 8 destacados) |
| `public/banners/` | 84 banners de los exchanges (468×60) |
| `public/admin/` | Panel Decap CMS (`/admin`) |
| `design-reference/` | Capturas y mediciones del diseño original (referencia) |
| `DESIGN-NOTES.md` | Especificación de diseño y estado del proyecto |

El sitio es **data-driven**: los contadores ("All 76 traffic exchanges", "Top 10"), los
listados y la portada se calculan a partir de `public/data/tes.json`.

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

- **ALL TEs** = todas las fichas con `listed: true` (76), ordenadas por `rank`.
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

## Publicar en GitHub Pages

1. Crear el repositorio **DannyIwakura/marketing-viral** (público) en GitHub.
2. Enlazar y subir:

```powershell
git remote add origin https://github.com/DannyIwakura/marketing-viral.git
git push -u origin main
```

3. En el repositorio: **Settings → Pages → Build and deployment → Source: `GitHub Actions`**.
4. El workflow `.github/workflows/deploy.yml` publica en
   `https://dannyiwakura.github.io/marketing-viral/` en cada push a `main`.

Si el repo o el dominio cambian, actualiza `BASE_PATH` en `src/lib/site.js`:

- repositorio de Pages → `'/marketing-viral/'`
- dominio propio en la raíz → `'/'`

## Editar el contenido

### Opción A — en local (sin OAuth, funciona hoy)

```powershell
npm run cms        # npx decap-server
```

Abre `http://localhost:8080/admin/`, edita las fichas y guarda: Decap crea el commit.
Después `git push` y la web se actualiza.

### Opción B — panel online en `/admin`

Requiere (una sola vez):

1. Crear una **GitHub OAuth App**:
   - Homepage URL: `https://dannyiwakura.github.io/marketing-viral/`
   - Authorization callback URL: `https://dannyiwakura.github.io/marketing-viral/admin/`
2. Desplegar un **proxy OAuth gratuito** para Decap (Netlify o Vercel, plan free) y
   apuntar `base_url` a él. Guía: https://decapcms.org/docs/github-backend/
3. En `public/admin/config.yml`: poner `client_id`, `base_url` y `local_backend: false`.

---

## Iframe en el sitio Wix viejo

El sitio `https://neogamesforo.wixsite.com/dannyiwakura` se mantiene online y mostrará un
iframe del sitio nuevo para que los exchanges no protesten por la URL:

- `/blank` → `/`
- `/blank-1` → `/all-tes`
- `/blank-2` → `/top-10`

Los banners usan `target="_top"` + `rel="noreferrer"`: la visita al exchange es una
navegación normal a pantalla completa y no se filtra el dominio del sitio nuevo.

Detalle de la implementación: `DESIGN-NOTES.md` (§7).

## Licencia / notas

Contenido y banners pertenecen a sus respectivos exchanges; los enlaces son de referido.
