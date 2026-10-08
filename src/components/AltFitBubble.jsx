import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

const greetings = {
  home: [
    'Chale, akwaaba!',
    'Need a service?',
    'How far na?',
    'Website or web app?',
    'My fave is back here!',
  ],
  altfit: [
    'Happy you’re here!',
    'Are you buying me?',
    'What’s up for today?',
  ],
}

export function AltFitBubble({ page = 'home' }) {
  const [greetingIndex, setGreetingIndex] = useState(0)
  const isAltFit = page === 'altfit'
  const messages = greetings[page] || greetings.home
  const label = isAltFit ? 'ALTFIT' : 'JEZZZARRR ACTIVE'

  useEffect(() => {
    const interval = window.setInterval(() => {
      setGreetingIndex((index) => (index + 1) % messages.length)
    }, 3600)
    return () => window.clearInterval(interval)
  }, [messages.length])

  return <a
    className={`altfit-bubble${isAltFit ? ' altfit-bubble-altfit' : ' altfit-bubble-home'}`}
    href={isAltFit ? '/' : '/altfit'}
    aria-label={isAltFit ? 'Go back to Jezzzarrr Labs' : 'Explore AltFit fashion'}
  >
    <span className="altfit-bubble-label">{label}</span>
    <strong key={`${page}-${greetingIndex}`} className="altfit-bubble-greeting" aria-live="polite">
      {messages[greetingIndex]}
    </strong>
    <ArrowUpRight size={14} aria-hidden="true" />
  </a>
}
