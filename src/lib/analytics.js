// Analitica del sitio: Umami Cloud (ver index.html).
//
// El tracker se carga con `defer` y puede no existir (adblock, DNT o el
// navegador del preview, que esta excluido con data-domains). Por eso todo
// pasa por aqui: si no esta, no se hace nada y la pagina sigue funcionando.

/**
 * Envia un evento a Umami.
 * @param {string} name  Nombre del evento (max. 50 caracteres).
 * @param {Record<string, string>} [data]  Propiedades del evento.
 */
export function trackEvent(name, data) {
    const umami = typeof window !== 'undefined' ? window.umami : null
    if (!umami || typeof umami.track !== 'function') return
    try {
        umami.track(name, data)
    } catch {
        // La analitica nunca debe romper un clic.
    }
}
