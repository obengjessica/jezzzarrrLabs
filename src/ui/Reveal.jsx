import { useEffect, useRef, useState } from 'react'
import { ease } from '../lib/theme.js'

export function Reveal({ children, delay = 0, className = '', style = {} }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold: 0.12 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(22px)', transition: `opacity .7s ${ease} ${delay}ms, transform .7s ${ease} ${delay}ms`, ...style }}>{children}</div>
}
