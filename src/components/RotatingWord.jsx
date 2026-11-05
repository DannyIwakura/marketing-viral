import { useEffect, useRef, useState } from 'react'

/** Respeta la preferencia del sistema de reducir movimiento. */
function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(false)

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        const update = () => setReduced(mq.matches)
        update()
        mq.addEventListener('change', update)
        return () => mq.removeEventListener('change', update)
    }, [])

    return reduced
}

/**
 * Palabra que rota dentro de un titular, tipo rueda: la actual sube y sale por
 * arriba mientras la siguiente entra desde abajo.
 *
 * El ancho se mide con la fuente ya cargada y se anima, para que el resto de la
 * frase se desplace suavemente en vez de dar un salto al cambiar de palabra.
 *
 * `suffix` (por ejemplo una coma) viaja dentro de la misma caja que la palabra:
 * asi nunca se queda sola al final del titular.
 */
export default function RotatingWord({ words, interval = 2000, suffix = '' }) {
    const reduced = usePrefersReducedMotion()
    const [index, setIndex] = useState(0)
    const [prev, setPrev] = useState(null)
    const [widths, setWidths] = useState([])
    const measureRef = useRef(null)
    const lastIndex = useRef(0)

    // Cambia de palabra cada `interval` ms (nunca con "reducir movimiento").
    useEffect(() => {
        if (reduced || words.length < 2) return
        const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
        return () => window.clearInterval(id)
    }, [reduced, interval, words.length])

    // Guarda la palabra que sale para animarla y la retira al terminar.
    useEffect(() => {
        if (index === lastIndex.current) return
        setPrev(lastIndex.current)
        lastIndex.current = index
        const id = window.setTimeout(() => setPrev(null), 460)
        return () => window.clearTimeout(id)
    }, [index])

    // Mide el ancho real de cada palabra (y lo repite al cambiar el viewport o
    // cuando la fuente termina de cargar).
    useEffect(() => {
        const measure = () => {
            const nodes = measureRef.current?.children
            if (!nodes || !nodes.length) return
            setWidths(Array.from(nodes, (node) => node.getBoundingClientRect().width))
        }

        measure()
        window.addEventListener('resize', measure)
        document.fonts?.ready.then(measure).catch(() => {})

        return () => window.removeEventListener('resize', measure)
    }, [])

    const width = widths[index] ? `${widths[index]}px` : undefined

    return (
        <span className="rotator">
            <span className="rotator-measure" ref={measureRef} aria-hidden="true">
                {words.map((word) => (
                    <span key={word}>
                        {word}
                        {suffix}
                    </span>
                ))}
            </span>

            <span className="rotator-window" style={width ? { width } : undefined} aria-hidden="true">
                {prev !== null && (
                    <span className="rotator-word rotator-word--out" key={`out-${index}`}>
                        {words[prev]}
                        {suffix}
                    </span>
                )}
                <span className="rotator-word rotator-word--in" key={`in-${index}`}>
                    {words[index]}
                    {suffix}
                </span>
            </span>
        </span>
    )
}
