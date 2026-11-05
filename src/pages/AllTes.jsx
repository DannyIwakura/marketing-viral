import Seo from '../components/Seo'
import TeCard from '../components/TeCard'
import { selectContent, useContent } from '../lib/content'

export default function AllTes() {
    const { loading, error, tes } = useContent()
    const { listed, total } = selectContent(tes)

    return (
        <>
            <Seo
                title="All TEs"
                description={`All ${total || 76} traffic exchanges. Every banner is a live referral link: click one, register free and start sending visitors to your pages.`}
            />

            <section className="section page-head">
                <div className="container">
                    <p className="eyebrow">The complete list</p>
                    <h1 className="page-title">All {total || 76} traffic exchanges</h1>
                    <p className="page-lead">
                        Every banner below is a live referral link. Click one, register free and start sending visitors to
                        your pages.
                    </p>

                    {loading && <p className="state">Loading exchanges…</p>}
                    {error && <p className="state state-error">Could not load the directory: {error}</p>}

                    <div className="grid">
                        {listed.map((te) => (
                            <TeCard key={te.id || te.url} te={te} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
