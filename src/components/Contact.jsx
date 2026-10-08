import { useState } from 'react'
import { ArrowRight, Check, Mail, MessageCircle, Phone } from 'lucide-react'
import { Btn, Eyebrow, Reveal } from '../ui/index.js'

const contactEmail = 'jezzzarrr@gmail.com'
const contactPhone = '+233204986392'
const whatsappNumber = contactPhone.replace(/\D/g, '')

export function Contact() {
  const [sent, setSent] = useState(null)

  function submit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const details = [
      `Name: ${formData.get('name')}`,
      `Email: ${formData.get('email')}`,
      `Service: ${formData.get('service')}`,
      `Project description: ${formData.get('description')}`,
    ].join('\n')
    const subject = encodeURIComponent(`Project inquiry from ${formData.get('name')}`)
    setSent({
      email: `mailto:${contactEmail}?subject=${subject}&body=${encodeURIComponent(details)}`,
      whatsapp: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(details)}`,
    })
  }

  return <section className="wrap section contact-grid" id="contact">
    <Reveal>
      <Eyebrow>START A PROJECT</Eyebrow>
      <h2>Let's build<br /><em>something.</em></h2>
      <p className="large-copy">Have an idea? Bring it to the Lab. Tell us what you're building and we'll take it from there.</p>
      <div className="contact-methods">
        <a className="contact-email" href={`mailto:${contactEmail}`}><Mail size={16} />{contactEmail}</a>
        <a href={`tel:${contactPhone}`}><Phone size={16} />Call {contactPhone}</a>
        <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer"><MessageCircle size={16} />WhatsApp us</a>
      </div>
    </Reveal>
    <Reveal delay={120}>
      <form onSubmit={submit}>
        <label>Name<input name="name" required placeholder="Your name" /></label>
        <label>Email<input name="email" required type="email" placeholder="your@email.com" /></label>
        <label>What do you need?<select name="service" required defaultValue=""><option value="" disabled>Select a service</option><option>Tech</option><option>Design</option><option>Media</option><option>Fashion / AltFit</option><option>Digital products</option></select></label>
        <label>Project description<textarea name="description" required minLength="10" placeholder="Tell us about your project..." /></label>
        <Btn type="submit">{sent ? <>Inquiry ready <Check size={14} /></> : <>Prepare Inquiry <ArrowRight size={14} /></>}</Btn>
        {sent && <div className="contact-confirmation" role="status">
          <p>Your message is ready. Send it by email, WhatsApp, or both:</p>
          <a href={sent.email}><Mail size={15} />Send by email</a>
          <a href={sent.whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={15} />Send by WhatsApp</a>
        </div>}
      </form>
    </Reveal>
  </section>
}
