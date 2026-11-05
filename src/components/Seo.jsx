import { useEffect } from 'react'
import { BASE_PATH, SITE } from '../lib/site'

const ORIGIN = 'https://dannyiwakura.github.io'
const CANONICAL_BASE = `${ORIGIN}${BASE_PATH}`

function upsertMeta(attr, key, value) {
    let el = document.head.querySelector(`meta[${attr}="${key}"]`)
    if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
    }
    el.setAttribute('content', value)
}

function upsertCanonical(href) {
    let el = document.head.querySelector('link[rel="canonical"]')
    if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', 'canonical')
        document.head.appendChild(el)
    }
    el.setAttribute('href', href)
}

/** Titulo, descripcion, canonical y Open Graph de la pagina actual. */
export default function Seo({ title, description }) {
    useEffect(() => {
        const fullTitle = title ? `${title} | ${SITE.name}` : SITE.title
        const desc = description || SITE.description
        const path = window.location.pathname.replace(BASE_PATH, '').replace(/^\/+/, '')
        const canonical = CANONICAL_BASE + path

        document.title = fullTitle
        document.querySelector('meta[name="description"]')?.setAttribute('content', desc)
        upsertCanonical(canonical)
        upsertMeta('property', 'og:title', fullTitle)
        upsertMeta('property', 'og:description', desc)
        upsertMeta('property', 'og:url', canonical)
        upsertMeta('property', 'og:image', `${ORIGIN}${BASE_PATH}logo.png`)
        upsertMeta('name', 'twitter:card', 'summary_large_image')
    }, [title, description])

    return null
}
