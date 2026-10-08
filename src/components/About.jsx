import { Eyebrow, Reveal } from '../ui/index.js'
import { images } from '../data/media.js'
export function About() { 
    return <section className="band" id="about">
        <div className="wrap about-grid">
            <Reveal>
                <Eyebrow>ABOUT THE LAB</Eyebrow>
                <h2>Ideas start <em>here.</em></h2>
                <img className="about-image" src={images.design} alt="Design workspace" /></Reveal><Reveal delay={120}>
                    <p className="large-copy">Jezzzarrr Labs brings together technology, design, media, and fashion to transform ideas into digital experiences, creative products, and powerful brands.</p>
                    <p className="muted-copy">We operate as <strong>04</strong> disciplines under one lab, each with its own craft and the same outcome: work that looks intentional and holds up under scrutiny.</p>
                    <div className="stat-grid">{['Products & platforms', 'Identity & interface', 'Photo & film', 'AltFit & apparel'].map((item, index) => <div key={item}><b>0{index + 1}</b><span>{item}</span></div>)}</div>
            </Reveal>
        </div>
    </section> 
}
