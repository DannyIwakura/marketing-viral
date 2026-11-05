import { useEffect } from 'react'
import { SITE } from '../lib/site'

/** Titulo y descripcion de la pagina actual. */
export default function Seo({ title, description }) {
    useEffect(() => {
        document.title = title ? `${title} | ${SITE.name}` : SITE.title
        const meta = document.querySelector('meta[name="description"]')
        if (meta && description) meta.setAttribute('content', description)
    }, [title, description])
    return null
}
