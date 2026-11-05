import { useLocation } from 'react-router-dom'
import { trackEvent } from '../lib/analytics'
import { assetUrl } from '../lib/content'
import { SITE } from '../lib/site'

/** Tarjeta de un traffic exchange: banner (enlace de referido) + nombre + enlace. */
export default function TeCard({ te }) {
    const { pathname } = useLocation()
    const linkProps = { target: SITE.linkTarget, rel: SITE.linkRel }

    // Un evento por clic. No se intercepta el enlace: sigue abriendo en pestana
    // nueva y el evento sale en paralelo.
    // La ruta se normaliza: /all-tes y /all-tes/ son la misma pagina.
    const from = pathname.replace(/\/+$/, '') || '/'
    const onClick = (slot) => () =>
        trackEvent('Banner click', {
            te: String(te.id ?? te.url ?? ''),
            title: String(te.title ?? ''),
            from,
            slot,
        })

    return (
        <article className="card">
            <a
                className="card-banner"
                href={te.url}
                onClick={onClick('banner')}
                {...linkProps}
                tabIndex={-1}
                aria-hidden="true"
            >
                <img src={assetUrl(te.banner)} alt="" width={468} height={60} loading="lazy" decoding="async" />
            </a>
            <h3 className="card-title">{te.title}</h3>
            <a className="card-link" href={te.url} onClick={onClick('link')} {...linkProps}>
                Visit site <span aria-hidden="true">→</span>
            </a>
        </article>
    )
}
