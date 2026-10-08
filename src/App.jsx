import './App.css'
import './hero-layout.css'
import './digital-contact.css'
import './admin-dashboard.css'
import './site-motion.css'
import { useState } from 'react'
import { About } from './components/About.jsx'
import { Admin } from './components/Admin.jsx'
import { AltFitBubble } from './components/AltFitBubble.jsx'
import { AltFit } from './components/AltFit.jsx'
import { AltFitPage } from './components/AltFitPage.jsx'
import { AutoMusic } from './components/AutoMusic.jsx'
import { Contact } from './components/Contact.jsx'
import { Digital } from './components/Digital.jsx'
import { Footer } from './components/Footer.jsx'
import { Hero } from './components/Hero.jsx'
import { Marquee } from './components/Marquee.jsx'
import { MobileMenu } from './components/MobileMenu.jsx'
import { Navbar } from './components/Navbar.jsx'
import { Projects } from './components/Projects.jsx'
import { ProjectDetail } from './components/ProjectDetail.jsx'
import { SiteOpening } from './components/SiteOpening.jsx'
import { Services } from './components/Services.jsx'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  if (window.location.pathname === '/admin') return <Admin />
  if (window.location.pathname === '/altfit') return <><AltFitPage /><AltFitBubble page="altfit" /><AutoMusic /><SiteOpening /></>
  return <><div className="site"><Navbar onMenu={() => setMenuOpen(true)} /><MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} /><main><Hero /><Marquee /><About /><Services /><Projects onSelect={setSelectedProject} /><AltFit /><Digital /><Contact /></main><Footer /><ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} /></div><AltFitBubble /><AutoMusic /><SiteOpening /></>
}

export default App
