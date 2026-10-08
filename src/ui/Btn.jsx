import { ArrowRight } from 'lucide-react'
import { Magnetic } from './Magnetic.jsx'

export function Btn({ children, href, variant = 'gold', type = 'button', ...props }) {
  const Component = href ? 'a' : 'button'
  const outline = variant === 'outline'
  return <Magnetic><Component href={href} type={href ? undefined : type} className={`btn ${outline ? 'btn-outline' : ''}`} {...props}>{children}<ArrowRight size={14} /></Component></Magnetic>
}
