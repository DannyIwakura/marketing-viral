import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { assetUrl } from '../lib/content'

const NAV = [
    { label: 'Home', to: '/' },
    { label: 'All TEs', to: '/all-tes' },
    { label: 'Top 10', to: '/top-10' },
    { label: 'Featured', to: '/#featured' },
    { label: 'How It Works', to: '/#how-it-works' },
]

export default function Header() {
    const [open, setOpen] = useState(false)
    const { pathname, hash } = useLocation()

    // Cierra el menu movil al navegar.
    useEffect(() => {
        setOpen(false)
    }, [pathname, hash])

    return (
        <header className="header">
            <div className="header-inner">
                <Link className="brand" to="/" aria-label="Marketing Viral — home">
                    <img className="brand-logo" src={assetUrl('logo.png')} alt="Marketing Viral" width={3600} height={708} />
                </Link>

                <button
                    className="nav-toggle"
                    type="button"
                    aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                >
                    <span />
                    <span />
                    <span />
                </button>

                <nav className={open ? 'nav nav-open' : 'nav'} aria-label="Main navigation">
                    {NAV.map((item) =>
                        item.to.includes('#') ? (
                            <Link className="nav-link" key={item.label} to={item.to}>
                                {item.label}
                            </Link>
                        ) : (
                            <NavLink
                                className="nav-link"
                                key={item.label}
                                to={item.to}
                                end={item.to === '/'}
                            >
                                {item.label}
                            </NavLink>
                        ),
                    )}
                </nav>
            </div>
        </header>
    )
}
