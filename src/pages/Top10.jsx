import Seo from '../components/Seo'
import TeCard from '../components/TeCard'
import { selectContent, useContent } from '../lib/content'

export default function Top10() {
    const { loading, error, tes } = useContent()
    const { top, total } = selectContent(tes)

    return (
        <>
            <Seo
                title="Top 10"
                description={`The ${top.length || 10} exchanges worth starting with. Our ranking of the ${total || 76} exchanges in the directory.`}
            />

            <section className="section page-head">
                <div className="container">
                    <p className="eyebrow">The shortlist</p>
                    <h1 className="page-title">The {top.length || 10} exchanges worth starting with</h1>
                    <p className="page-lead">
                        Our ranking of the {total || 76} exchanges in the directory. Every banner is a live referral link, so
                        you can register and start sending visitors right away.
                    </p>

                    {loading && <p className="state">Loading exchanges…</p>}
                    {error && <p className="state state-error">Could not load the directory: {error}</p>}

                    <div className="grid">
                        {top.map((te) => (
                            <TeCard key={te.id || te.url} te={te} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
