import { assetUrl } from '../lib/content'
import { SITE } from '../lib/site'

/** Tarjeta de un traffic exchange: banner (enlace de referido) + nombre + enlace. */
export default function TeCard({ te }) {
    const linkProps = { target: SITE.linkTarget, rel: SITE.linkRel }
    return (
        <article className="card">
            <a className="card-banner" href={te.url} {...linkProps} tabIndex={-1} aria-hidden="true">
                <img src={assetUrl(te.banner)} alt="" width={468} height={60} loading="lazy" decoding="async" />
            </a>
            <h3 className="card-title">{te.title}</h3>
            <a className="card-link" href={te.url} {...linkProps}>
                Visit site <span aria-hidden="true">→</span>
            </a>
        </article>
    )
}
