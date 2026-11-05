import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import AllTes from './pages/AllTes'
import Top10 from './pages/Top10'
import { SITE } from './lib/site'

/** Actualiza el titulo y la descripcion en cada ruta. */
function Seo({ title, description }) {
    useEffect(() => {
        document.title = title ? `${title} | ${SITE.name}` : SITE.title
        const meta = document.querySelector('meta[name="description"]')
        if (meta && description) meta.setAttribute('content', description)
    }, [title, description])
    return null
}

/** Scroll al ancla (#featured, #how-it-works) o al inicio en cada navegacion. */
function ScrollManager() {
    const { pathname, hash } = useLocation()

    useEffect(() => {
        if (hash) {
            const el = document.querySelector(hash)
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                return
            }
        }
        window.scrollTo({ top: 0 })
    }, [pathname, hash])

    return null
}

export default function App() {
    return (
        <div className="site">
            <ScrollManager />
            <Header />
            <main className="site-main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/all-tes" element={<AllTes />} />
                    <Route path="/top-10" element={<Top10 />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}
