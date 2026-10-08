import { useEffect, useState } from 'react'
import { ArrowDown, AudioLines, SkipForward } from 'lucide-react'
import openingImage from '../assets/opening.jpeg'

const openingStorageKey = 'jezzzarrr-opening-seen'

export function SiteOpening() {
  const [isOpen, setIsOpen] = useState(() => !sessionStorage.getItem(openingStorageKey))
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    if (!isOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [isOpen])

  useEffect(() => {
    if (!isLeaving) return undefined
    const timeout = window.setTimeout(() => setIsOpen(false), 850)
    return () => window.clearTimeout(timeout)
  }, [isLeaving])

  useEffect(() => {
    if (isOpen) return undefined
    document.body.classList.add('site-entering')
    const timeout = window.setTimeout(() => document.body.classList.remove('site-entering'), 1850)
    return () => window.clearTimeout(timeout)
  }, [isOpen])

  function enterSite(withMusic) {
    sessionStorage.setItem(openingStorageKey, 'true')
    if (withMusic) window.dispatchEvent(new Event('jezzzarrr:play-opening-track'))
    setIsLeaving(true)
  }

  if (!isOpen) return null

  return <div className={`site-opening${isLeaving ? ' is-leaving' : ''}`} role="dialog" aria-modal="true" aria-label="Welcome to Jezzzarrr Labs">
    <div className="site-opening-backdrop" style={{ backgroundImage: `url("${openingImage}")` }} />
    <div className="site-opening-frame">
      <div className="site-opening-poster-wrap">
        <img className="site-opening-poster" src={openingImage} alt="Welcome to Jezzzarrr Labs — building ideas into digital experiences" />
      </div>
    </div>
    <span className="site-opening-orbit site-opening-orbit-one" aria-hidden="true" />
    <span className="site-opening-orbit site-opening-orbit-two" aria-hidden="true" />
    <button className="site-opening-skip" type="button" onClick={() => enterSite(false)}>
      Skip intro <SkipForward size={15} />
    </button>
    <button className="site-opening-enter" type="button" onClick={() => enterSite(true)}>
      <span className="site-opening-enter-icon"><AudioLines size={17} /></span>
      <span><strong>Enter with B4 B4</strong><small>Step inside Jezzzarrr Labs</small></span>
      <ArrowDown className="site-opening-enter-arrow" size={18} />
    </button>
  </div>
}
