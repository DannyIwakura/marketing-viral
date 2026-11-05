import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import RotatingWord from '../components/RotatingWord'
import TeCard from '../components/TeCard'
import { selectContent, useContent } from '../lib/content'

// Palabras que rotan en el titular del hero.
const ROTATING_WORDS = ['offers', 'services', 'products', 'referrals', 'blog', 'website']

const STEPS = [
    {
        n: '01',
        title: 'Pick an exchange',
        text: 'Browse the featured exchanges and open the ones that fit your niche. Every banner here is a link I use myself.',
    },
    {
        n: '02',
        title: 'Register for free',
        text: 'Sign up with the banner and start collecting credits the same day. No purchase and no card required.',
    },
    {
        n: '03',
        title: 'Turn credits into visits',
        text: 'Spend your credits on visits to your site, your banners or your affiliate links, and keep the ones that convert.',
    },
]

const WORDS = { 1: 'One', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five', 6: 'Six', 7: 'Seven', 8: 'Eight', 9: 'Nine', 10: 'Ten' }
const countWord = (n) => WORDS[n] ?? String(n)

export default function Home() {
    const { loading, error, tes } = useContent()
    const { listed, featured, total } = selectContent(tes)

    return (
        <>
            <Seo
                title=""
                description="A hand-picked directory of the traffic exchanges that send real visitors. Pick one, register free and start driving traffic to your offers."
            />

            <section className="section hero">
                <div className="container hero-inner">
                    <p className="badge">{total || 76} traffic exchanges · hand-picked</p>
                    <h1 className="hero-title">
                        <span className="sr-only">
                            Real traffic for your offers, services, products, referrals, blog and website, from one place.
                        </span>
                        <span aria-hidden="true">
                            Real traffic for your{' '}
                            <br className="hero-break" />
                            <RotatingWord words={ROTATING_WORDS} interval={2000} suffix="," />{' '}
                            <br className="hero-break-tail" />
                            from one place.
                        </span>
                    </h1>
                    <p className="hero-lead">
                        A hand-picked directory of the traffic exchanges I use every day. Pick one, register free, and start
                        sending real visitors to your pages.
                    </p>
                    <Link className="button" to="/#featured">
                        See the featured exchanges
                    </Link>
                </div>
            </section>

            <section className="section section-alt" id="featured">
                <div className="container">
                    <p className="eyebrow">Featured this month</p>
                    <h2 className="section-title">{countWord(featured.length)} exchanges to start with</h2>
                    <p className="section-lead">Every banner is a live referral link. Click one and you are in.</p>

                    {loading && <p className="state">Loading exchanges…</p>}
                    {error && <p className="state state-error">Could not load the directory: {error}</p>}

                    <div className="grid">
                        {featured.map((te) => (
                            <TeCard key={te.id || te.url} te={te} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="section" id="how-it-works">
                <div className="container">
                    <p className="eyebrow">How it works</p>
                    <h2 className="section-title">Three steps, no cost to start</h2>

                    <div className="steps">
                        {STEPS.map((s) => (
                            <article className="step" key={s.n}>
                                <p className="step-num">{s.n}</p>
                                <h3 className="step-title">{s.title}</h3>
                                <p className="step-text">{s.text}</p>
                            </article>
                        ))}
                    </div>

                    <div className="section-cta">
                        <Link className="button" to="/#featured">
                            Start with the featured {featured.length}
                        </Link>
                    </div>
                </div>
            </section>

            <p className="sr-only">The directory lists {listed.length} traffic exchanges in total.</p>
        </>
    )
}
