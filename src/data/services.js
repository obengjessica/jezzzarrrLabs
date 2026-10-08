import { Code2, PenTool, Camera, Shirt } from 'lucide-react'
import { images } from './media.js'

export const services = [
  { id: 'tech', number: '01', title: 'Tech', icon: Code2, image: images.tech, description: 'Modern, scalable products built to work as hard as the brand behind them.', items: ['Web development', 'Web app development', 'Mobile app development', 'Digital experiences'] },
  { id: 'design', number: '02', title: 'Design', icon: PenTool, image: images.design, description: 'Visual identity and interface design that gives ideas a consistent face.', items: ['Graphic design', 'UI/UX design', 'Brand design', 'Visual identity'] },
  { id: 'media', number: '03', title: 'Media', icon: Camera, image: images.media, description: 'Photography and film that capture a brand the way it deserves to be seen.', items: ['Photography', 'Video editing', 'Media production', 'Drone flying'] },
  { id: 'fashion', number: '04', title: 'Fashion', icon: Shirt, image: images.fashion, description: 'Streetwear and apparel concepts led by AltFit, our fashion arm.', items: ['AltFit', 'Apparel concepts', 'Creative direction'] },
]
