import { X } from 'lucide-react'
const links = ['about', 'services', 'projects', 'altfit', 'digital', 'contact']
export function MobileMenu({ open, onClose }) { return <div className={`mobile-menu ${open ? 'is-open' : ''}`}><button className="icon-btn" onClick={onClose} aria-label="Close menu"><X size={20} /></button><nav>{links.map((link, index) => <a key={link} href={`#${link}`} onClick={onClose}><span>{link}</span><small>{String(index + 1).padStart(2, '0')}</small></a>)}</nav><p>CREATIVE. INNOVATIVE. IMPACTFUL.</p></div> }
