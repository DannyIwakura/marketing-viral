// Configuracion del sitio.
//
// BASE_PATH: la ruta en la que se publica el sitio.
//   - GitHub Pages en  https://dannyiwakura.github.io/marketing-viral/  -> '/marketing-viral/'
//   - Dominio propio (raiz)                                             -> '/'
//   - En local (localhost / 127.0.0.1) se usa '/' automaticamente para poder
//     previsualizar sin tocar nada.
// El build de Vite usa base: './', asi que los assets funcionan en cualquier ruta.
const isLocal =
    typeof window !== 'undefined' && /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname)

export const BASE_PATH = isLocal ? '/' : '/marketing-viral/'

export const SITE = {
    name: 'Marketing Viral',
    title: 'Marketing Viral — real traffic from the exchanges that work',
    description:
        'A hand-picked directory of the traffic exchanges that send real visitors. Pick one, register free and start driving traffic to your offers.',

    // Los banners abren en una pestaña nueva. rel="noopener noreferrer" evita
    // que la pagina del exchange pueda manipular esta ventana (tabnabbing) y no
    // le pasa la URL desde la que se llega.
    linkTarget: '_blank',
    linkRel: 'noopener noreferrer',

    // Cuantos destacados se muestran en portada.
    featuredLimit: 8,

    // Cuantas fichas forman el TOP 10.
    topSize: 10,
}
