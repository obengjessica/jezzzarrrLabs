import { useState } from 'react'
export function Magnetic({ children }) {
  const [point, setPoint] = useState({ x: 0, y: 0 })
  return <span className="magnetic" onMouseMove={(event) => { const box = event.currentTarget.getBoundingClientRect(); setPoint({ x: (event.clientX - box.left - box.width / 2) * .12, y: (event.clientY - box.top - box.height / 2) * .12 }) }} onMouseLeave={() => setPoint({ x: 0, y: 0 })} style={{ transform: `translate(${point.x}px, ${point.y}px)` }}>{children}</span>
}
