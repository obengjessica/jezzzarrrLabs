import { ArrowUpRight, Menu } from 'lucide-react'
import { Btn } from '../ui/index.js'
import { theme } from '../lib/theme.js'
import { images } from '../data/media.js'
const links = ['about', 'services', 'projects', 'altfit', 'digital', 'contact']
export function Navbar({ onMenu }) { return <header className="navbar"><a className="brand" href="#hero"><img src={images.logo} alt="Jezzzarrr Labs" /></a><nav>{links.map((link) => <a key={link} href={`#${link}`}>{link}</a>)}</nav><div className="nav-actions"><a className="altfit-nav-button" href="/altfit" aria-label="Go to AltFit"><span>AltFit</span><ArrowUpRight size={14} aria-hidden="true" /></a><Btn href="#contact">Start a Project</Btn><button className="icon-btn mobile-only" onClick={onMenu} aria-label="Open menu"><Menu size={19} /></button></div><span className="nav-accent" style={{ background: theme.gold }} /></header> }
