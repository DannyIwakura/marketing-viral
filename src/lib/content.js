import { useEffect, useState } from 'react'
import { BASE_PATH, SITE } from './site'

/** Resuelve una ruta de contenido (banners, logo) contra la ruta base del sitio. */
export function assetUrl(path) {
    if (!path) return ''
    if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
    return `${BASE_PATH}${String(path).replace(/^\/+/, '')}`
}

/** Carga el contenido desde /public/data/tes.json (lo edita el panel Decap). */
export function useContent() {
    const [state, setState] = useState({ loading: true, error: null, tes: [] })

    useEffect(() => {
        let alive = true
        fetch(assetUrl('data/tes.json'), { cache: 'no-cache' })
            .then((r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`)
                return r.json()
            })
            .then((json) => {
                if (!alive) return
                setState({ loading: false, error: null, tes: Array.isArray(json.tes) ? json.tes : [] })
            })
            .catch((e) => {
                if (!alive) return
                setState({ loading: false, error: e.message, tes: [] })
            })
        return () => {
            alive = false
        }
    }, [])

    return state
}

/** Divide el contenido en las tres vistas del sitio. */
export function selectContent(tes) {
    const byRank = (a, b) => (a.rank ?? 999) - (b.rank ?? 999)
    const listed = tes.filter((t) => t.listed !== false).sort(byRank)
    const featured = tes.filter((t) => t.featured === true).sort(byRank)
    return {
        listed,
        featured: featured.slice(0, SITE.featuredLimit),
        featuredAll: featured,
        top: listed.slice(0, SITE.topSize),
        total: listed.length,
    }
}
