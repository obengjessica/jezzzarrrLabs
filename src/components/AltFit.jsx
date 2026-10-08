import { Btn, Eyebrow, Reveal } from '../ui/index.js'
import { images } from '../data/media.js'
export function AltFit() 
{ 
    return <section className="altfit" id="altfit"><div className="altfit-image"><img src={images.fashion} alt="AltFit fashion collection" /></div><Reveal className="altfit-copy"><img className="altfit-logo" src={images.altfitLogo} alt="AltFit logo" /><Eyebrow>A FASHION LABEL FROM JEZZZARRR LABS</Eyebrow><h2>CODE YOUR<br /><em>DRIP.</em></h2><p>Modern streetwear. Digital creativity. Personal expression.</p><Btn href="/altfit">Explore AltFit</Btn></Reveal>
    </section>
 }
