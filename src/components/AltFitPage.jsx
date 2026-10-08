import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Check, Menu, Pause, Play,
  Plus, Search, ShoppingBag, X,
} from 'lucide-react'
import { altfitMedia, altfitServices } from '../data/altfit.js'
import { altfitProducts } from '../data/catalog.js'
import { useCatalogProducts } from '../hooks/useCatalogProducts.js'

const whatsappNumber = '233204986392'

const currencyChoices = ['GHS', 'USD', 'GBP', 'EUR', 'NGN', 'CAD', 'AUD', 'NZD', 'ZAR', 'KES', 'INR', 'JPY', 'AED', 'XOF', 'CHF', 'SGD', 'MYR', 'BRL', 'MXN', 'SAR', 'SEK', 'NOK', 'DKK', 'PLN', 'CNY']
const countryCurrencies = {
  GH: 'GHS', US: 'USD', GB: 'GBP', IE: 'EUR', DE: 'EUR', FR: 'EUR', ES: 'EUR', IT: 'EUR',
  NL: 'EUR', PT: 'EUR', BE: 'EUR', AT: 'EUR', FI: 'EUR', GR: 'EUR', CA: 'CAD', AU: 'AUD',
  NZ: 'NZD', NG: 'NGN', ZA: 'ZAR', KE: 'KES', IN: 'INR', JP: 'JPY', AE: 'AED', CI: 'XOF',
  SN: 'XOF', BF: 'XOF', ML: 'XOF', TG: 'XOF', BJ: 'XOF', NE: 'XOF', CH: 'CHF', SG: 'SGD',
  MY: 'MYR', BR: 'BRL', MX: 'MXN', SA: 'SAR', SE: 'SEK', NO: 'NOK', DK: 'DKK', PL: 'PLN',
  CN: 'CNY', LU: 'EUR', CY: 'EUR', EE: 'EUR', LV: 'EUR', LT: 'EUR', SK: 'EUR', SI: 'EUR',
}

function preferredCurrency() {
  const region = new Intl.Locale(navigator.language || 'en-GH').region
  return countryCurrencies[region] || 'GHS'
}

function formatPrice(amount, currency, rates) {
  const rate = currency === 'GHS' ? 1 : rates[currency]
  if (!rate) return new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS', maximumFractionDigits: 0 }).format(amount)
  const locale = currency === 'GHS' ? 'en-GH' : undefined
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'GHS' ? 0 : 2,
  }).format(amount * rate)
}

const collections = [
  { label: '01 / Core', title: 'Streetwear essentials', image: altfitMedia.campaign[0] },
  { label: '02 / Process', title: 'Made to move differently', image: altfitMedia.campaign[2] },
  { label: '03 / Leopard Gen', title: 'A louder point of view', image: altfitMedia.collection[3] },
]

const lookbookSlides = [...altfitMedia.knitCapCampaign, ...altfitMedia.campaign]

const pathways = [
  ['01', 'Support the brand', 'Help keep the next drop moving.'],
  ['02', 'Become a model', 'Submit yourself for future creative work.'],
  ['03', 'Collaborate as a designer', 'Bring a new perspective into the studio.'],
  ['04', 'Creative collaboration', 'Photographers, artists, stylists, and makers.'],
]

function Button({ children, onClick, type = 'button', variant = 'solid' }) {
  return <button type={type} className={`af-button af-button-${variant}`} onClick={onClick}>{children}<ArrowRight size={15} /></button>
}

function FormPanel({ type, onClose }) {
  const [emailReady, setEmailReady] = useState(false)
  const [messageLinks, setMessageLinks] = useState(null)
  const isContact = type === 'contact'
  const fields = isContact
    ? [['name', 'Name'], ['email', 'Email']]
    : type === 'support'
    ? [['name', 'Name'], ['email', 'Email'], ['amount', 'Support amount']]
    : type === 'model'
      ? [['name', 'Name'], ['email', 'Email'], ['location', 'Location'], ['social', 'Social handle'], ['portfolio', 'Portfolio link']]
      : [['name', 'Name'], ['email', 'Email'], ['specialty', type === 'designer' ? 'Specialty' : 'Creative field'], ['social', 'Social handle'], ['portfolio', 'Portfolio link']]

  function submit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const details = [...formData.entries()]
      .filter(([, value]) => typeof value === 'string' && value.trim())
      .map(([name, value]) => `${name}: ${value}`)
      .join('\n')
    const subject = encodeURIComponent(`AltFit ${type} from ${formData.get('name') || 'website visitor'}`)
    const body = encodeURIComponent(details)
    const email = `mailto:altfitclothingbrand@gmail.com?subject=${subject}&body=${body}`
    const whatsapp = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`AltFit ${type}\n\n${details}`)}`
    setMessageLinks({ email, whatsapp })
    window.location.href = email
    setEmailReady(true)
  }

  return <div className="af-modal" role="dialog" aria-modal="true" aria-label={`${type} application`}>
    <div className="af-modal-panel">
      <button className="af-close" onClick={onClose} aria-label="Close form"><X size={19} /></button>
      {emailReady ? <div className="af-success"><Check size={28} /><p>Your email draft is ready. Open WhatsApp too to send the same message to our WhatsApp inbox.</p><a className="af-message-link" href={messageLinks.email}>Open email draft</a><a className="af-message-link af-whatsapp-link" href={messageLinks.whatsapp} target="_blank" rel="noreferrer">Send to WhatsApp</a><small>WhatsApp: +{whatsappNumber}</small><Button onClick={onClose}>Close</Button></div> : <>
        <span className="af-kicker">ALTFIT / {type}</span>
        <h2>{isContact ? 'Get in touch.' : type === 'support' ? 'Support the movement.' : 'Let’s make something.'}</h2>
        <p className="af-muted">{isContact ? 'Send a message directly to the AltFit team.' : 'This form is ready to connect to your email or backend service.'}</p>
        <form onSubmit={submit} className="af-form">
          {fields.map(([name, label]) => <label key={name}>{label}<input name={name} required type={name === 'email' ? 'email' : 'text'} /></label>)}
          <label>{isContact ? 'Message' : type === 'support' ? 'Message' : type === 'model' ? 'Short introduction' : 'Collaboration idea'}<textarea name="message" rows="4" required /></label>
          {!isContact && type !== 'support' && <label className="af-upload">Upload {type === 'model' ? 'photos / portfolio' : 'designs'}<input type="file" /></label>}
          {isContact && <p className="af-contact-email">Or email us at <a href="mailto:altfitclothingbrand@gmail.com">altfitclothingbrand@gmail.com</a></p>}
          <Button type="submit">{isContact ? 'Send to email and WhatsApp' : 'Send application'}</Button>
        </form>
      </>}
    </div>
  </div>
}

export function AltFitPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [heroExpanded, setHeroExpanded] = useState(false)
  const [cart, setCart] = useState([])
  const [filter, setFilter] = useState('All')
  const [form, setForm] = useState(null)
  const [query, setQuery] = useState('')
  const [currency, setCurrency] = useState(preferredCurrency)
  const [rates, setRates] = useState({ GHS: 1 })
  const [selectedColors, setSelectedColors] = useState({})
  const [lookbookIndex, setLookbookIndex] = useState(0)
  const [lookbookActive, setLookbookActive] = useState(false)
  const [lookbookDirection, setLookbookDirection] = useState('next')
  const [playingVideos, setPlayingVideos] = useState({})
  const lookbookTouchStart = useRef(null)
  const videoRefs = useRef([])
  const { products: storedProducts, error: catalogError } = useCatalogProducts('altfit', altfitProducts)
  const products = useMemo(() => storedProducts.map((product) => ({
    ...product,
    id: product.slug,
    name: product.title,
    image: product.imageUrl,
    detail: product.description,
    variants: product.variants?.length ? product.variants : undefined,
  })), [storedProducts])
  const filteredProducts = useMemo(() => products.filter((product) => (filter === 'All' || product.category === filter) && (!query || `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase()))), [filter, products, query])
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const setCount = Math.min(
    cart.filter((item) => item.productId === 'leopard-hoodie').reduce((sum, item) => sum + item.quantity, 0),
    cart.filter((item) => item.productId === 'leopard-trouser').reduce((sum, item) => sum + item.quantity, 0),
  )
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartTotal = cartSubtotal - setCount * 100

  useEffect(() => {
    let active = true
    fetch('https://open.er-api.com/v6/latest/GHS')
      .then((response) => {
        if (!response.ok) throw new Error(`Exchange rate request failed (${response.status})`)
        return response.json()
      })
      .then((data) => {
        if (active && data.result === 'success') setRates(data.rates)
      })
      .catch((error) => console.error('Could not load local currency exchange rates:', error))
    return () => { active = false }
  }, [])

  useEffect(() => {
    if (!lookbookActive) return undefined
    const timer = window.setInterval(() => {
      setLookbookDirection('next')
      setLookbookIndex((index) => (index + 1) % lookbookSlides.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [lookbookActive])

  useEffect(() => {
    const targets = document.querySelectorAll('.altfit-page .af-section, .altfit-page .af-lookbook, .altfit-page .af-support, .altfit-page .af-footer')
    if (!('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('af-is-visible'))
      return
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('af-is-visible')
          if (entry.target.classList.contains('af-lookbook')) setLookbookActive(true)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    targets.forEach((target) => {
      target.classList.add('af-reveal-on-scroll')
      observer.observe(target)
    })
    return () => observer.disconnect()
  }, [])

  function getVariant(product, color = selectedColors[product.id]) {
    return product.variants?.find((variant) => variant.name === color) || product.variants?.[0] || null
  }

  function selectProduct(product) {
    setSelectedProduct(product)
    if (product.variants && !selectedColors[product.id]) {
      setSelectedColors((current) => ({ ...current, [product.id]: product.variants[0].name }))
    }
  }

  function addToCart(product, variant = getVariant(product)) {
    const cartId = `${product.id}:${variant?.name || ''}`
    const cartProduct = {
      ...product,
      id: cartId,
      productId: product.id,
      color: variant?.name,
      image: variant?.image || product.image,
    }
    setCart((current) => current.some((item) => item.id === cartId)
      ? current.map((item) => item.id === cartId ? { ...item, quantity: item.quantity + 1 } : item)
      : [...current, { ...cartProduct, quantity: 1 }])
    setCartOpen(true)
  }

  function updateQuantity(id, amount) {
    setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0))
  }

  function moveLookbook(direction) {
    setLookbookDirection(direction > 0 ? 'next' : 'previous')
    setLookbookIndex((index) => (index + direction + lookbookSlides.length) % lookbookSlides.length)
  }

  function showLookbookSlide(index) {
    setLookbookDirection(index >= lookbookIndex ? 'next' : 'previous')
    setLookbookIndex(index)
  }

  function toggleVideo(index) {
    const video = videoRefs.current[index]
    if (!video) return
    if (video.paused) {
      video.play()
        .then(() => setPlayingVideos((current) => ({ ...current, [index]: true })))
        .catch((error) => console.error('Could not play AltFit video:', error))
    } else {
      video.pause()
      setPlayingVideos((current) => ({ ...current, [index]: false }))
    }
  }

  return <main className="altfit-page">
    <header className="af-nav"><a href="#top" className="af-brand"><img src={altfitMedia.logo} alt="AltFit" /></a><nav>{['Shop', 'Collections', 'Models', 'Lookbook', 'Design Lab'].map((item) => <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`}>{item}</a>)}</nav><div className="af-nav-actions"><a className="af-home-button" href="/" aria-label="Go to Jazzzarrr home"><ArrowLeft size={14} /><span>Jazzzarrr Home</span></a><button onClick={() => setSearchOpen(true)} aria-label="Search"><Search size={17} /></button><button onClick={() => setCartOpen(true)} aria-label={`Cart, ${cartCount} items`}><ShoppingBag size={17} /><b>{cartCount}</b></button><button className="af-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={19} /></button></div></header>
    {catalogError && <p className="catalog-error" role="status">The live AltFit catalog could not load: {catalogError}. Showing the starter catalog.</p>}
    {menuOpen && <div className="af-menu"><button className="af-close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button><img src={altfitMedia.logo} alt="AltFit" />{['Shop', 'Collections', 'Models', 'Lookbook', 'Videos', 'Design Lab', 'Support'].map((item) => <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setMenuOpen(false)}>{item}<ArrowDownRight size={18} /></a>)}<small>ALTFIT / CODE YOUR DRIP.</small></div>}
    <section id="top" className="af-hero"><button className="af-hero-image" onClick={() => setHeroExpanded(true)} aria-label="View full AltFit campaign photo"><img src={altfitMedia.hero} alt="AltFit model wearing the collection" /><span className="af-hero-image-hint">View full campaign photo <ArrowUpRight size={14} /></span></button><div className="af-hero-copy"><span className="af-kicker">ALTFIT / 01 — 04</span><h1>CODE YOUR<br /><em>DRIP.</em></h1><p>Modern streetwear.<br />Digital creativity.<br />Personal expression.</p><Button onClick={() => document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' })}>Shop the collection</Button></div><span className="af-scroll">SCROLL TO EXPLORE <ArrowDownRight size={16} /></span></section>
    <section id="collections" className="af-section af-intro"><div><span className="af-kicker">LATEST COLLECTION</span><h2>Built for the <em>bold.</em></h2><p>Each piece is a statement. Designed for those who move different, think different, and dress different.</p><Button variant="outline" onClick={() => document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' })}>View collection</Button></div><div className="af-collection-row">{collections.map((collection) => <article className="af-collection-card" key={collection.title}><img src={collection.image} alt={collection.title} loading="lazy" /><div><span>{collection.label}</span><h3>{collection.title}</h3><a href="#shop">Shop now <ArrowRight size={13} /></a></div></article>)}</div></section>
    <section id="shop" className="af-section"><div className="af-section-head"><div><span className="af-kicker">SHOP ALTFIT</span><h2>Popular right <em>now.</em></h2></div><label className="af-currency-picker">Currency <select value={currency} onChange={(event) => setCurrency(event.target.value)}>{currencyChoices.map((code) => <option key={code} value={code}>{code}</option>)}</select></label></div><p className="af-currency-note">{currency !== 'GHS' && !rates[currency] ? 'Exchange rates are unavailable; prices are shown in Ghana cedis.' : 'Prices converted from Ghana cedis using current exchange rates.'}</p><div className="af-set-offer">Leopard Gen set: hoodie + trouser for {formatPrice(500, currency, rates)}</div><div className="af-filters">{['All', 'T-shirts', 'Hoodies', 'Pants', 'Accessories'].map((item) => <button className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div><div className="af-product-grid">{filteredProducts.map((product) => { const variant = getVariant(product); return <article className="af-product-card" key={product.id}><button className="af-product-image" onClick={() => selectProduct(product)}><img src={variant?.image || product.image} alt={`${product.name}${variant ? ` in ${variant.name}` : ''}`} loading="lazy" /><span>View piece <ArrowUpRight size={14} /></span></button><div className="af-product-meta"><div><h3>{product.name}</h3><p>{product.category} / Available</p><strong>{formatPrice(product.price, currency, rates)}</strong></div><button onClick={() => addToCart(product, variant)} aria-label={`Add ${product.name}${variant ? ` in ${variant.name}` : ''} to cart`}><Plus size={18} /></button></div>{product.variants && <div className="af-color-options" aria-label={`${product.name} available colors`}>{product.variants.map((color) => <button key={color.name} className={`af-color-swatch${variant?.name === color.name ? ' active' : ''}`} style={{ '--af-swatch': color.swatch }} aria-label={`${color.name} color${variant?.name === color.name ? ', selected' : ''}`} aria-pressed={variant?.name === color.name} title={color.name} onClick={() => setSelectedColors((current) => ({ ...current, [product.id]: color.name }))} />)}<span>{variant?.name}</span></div>}</article> })}</div></section>
    <section id="models" className="af-section af-models"><div className="af-section-head"><div><span className="af-kicker">THE FACES OF ALTFIT</span><h2>Real people. <em>Real energy.</em></h2><p>Meet the models and see the people bringing AltFit pieces to life.</p></div><span className="af-model-count">{String(altfitMedia.models.length).padStart(2, '0')} / MODEL ARCHIVE</span></div><div className="af-model-grid">{altfitMedia.models.map((model, index) => <figure key={model.image}><img src={model.image} alt={`${model.name}, AltFit ${model.collection.toLowerCase()} model`} loading="lazy" /><figcaption><span className="af-model-name">{model.name}</span><span className="af-model-collection">{model.collection} / {String(index + 1).padStart(2, '0')}</span></figcaption></figure>)}</div></section>
    <section id="lookbook" className="af-lookbook"><div className="af-lookbook-copy"><span className="af-kicker">THE LOOKBOOK</span><h2>A moving<br /><em>point of view.</em></h2><p>Campaign imagery, process, and pieces in their natural habitat.</p><article className="af-cap-model-feature"><img src={altfitMedia.knitCapModel} alt="AltFit model wearing the burgundy Thunder knit cap" /><div><span>ON MODEL</span><strong>Burgundy Thunder Knit Cap</strong><a href="#shop" onClick={() => setFilter('Accessories')}>Shop Thunder Cap</a></div></article><a className="af-text-link" href="#design-lab">Explore the journal <ArrowRight size={14} /></a></div><div className="af-lookbook-gallery" data-direction={lookbookDirection} onTouchStart={(event) => { lookbookTouchStart.current = event.touches[0].clientX }} onTouchEnd={(event) => { if (lookbookTouchStart.current !== null && Math.abs(event.changedTouches[0].clientX - lookbookTouchStart.current) > 40) moveLookbook(event.changedTouches[0].clientX < lookbookTouchStart.current ? 1 : -1); lookbookTouchStart.current = null }}><div className="af-lookbook-image"><img key={lookbookIndex} src={lookbookSlides[lookbookIndex]} alt={lookbookIndex < altfitMedia.knitCapCampaign.length ? 'AltFit model wearing a Thunder knit cap' : `AltFit lookbook photo ${lookbookIndex - altfitMedia.knitCapCampaign.length + 1}`} /><span className="af-lookbook-caption">{lookbookIndex === 0 ? 'Burgundy Thunder Knit Cap / On model' : lookbookIndex < altfitMedia.knitCapCampaign.length ? 'Thunder Knit Cap / On model' : `AltFit Lookbook / 0${lookbookIndex - altfitMedia.knitCapCampaign.length + 1}`}</span></div><div className="af-lookbook-image second"><img key={(lookbookIndex + 1) % lookbookSlides.length} src={lookbookSlides[(lookbookIndex + 1) % lookbookSlides.length]} alt={(lookbookIndex + 1) % lookbookSlides.length < altfitMedia.knitCapCampaign.length ? 'Next AltFit photo with a model wearing a Thunder knit cap' : `Next AltFit lookbook photo ${(lookbookIndex + 1) % lookbookSlides.length - altfitMedia.knitCapCampaign.length + 1}`} /></div><button className="af-lookbook-arrow previous" aria-label="Previous lookbook image" onClick={() => moveLookbook(-1)}><ArrowLeft size={18} /></button><button className="af-lookbook-arrow next" aria-label="Next lookbook image" onClick={() => moveLookbook(1)}><ArrowRight size={18} /></button><div className="af-lookbook-dots" role="tablist" aria-label="Choose a lookbook image">{lookbookSlides.map((image, index) => <button key={image} role="tab" aria-label={`Show lookbook image ${index + 1}`} aria-selected={lookbookIndex === index} className={lookbookIndex === index ? 'active' : ''} onClick={() => showLookbookSlide(index)} />)}</div></div></section>
    <section id="videos" className="af-section af-video-section"><div className="af-section-head"><div><span className="af-kicker">ALTFIT VISUALS</span><h2>Watch the <em>movement.</em></h2></div></div><div className="af-video-row">{altfitMedia.videos.map((video, index) => <article className="af-video-card" key={video}><video ref={(element) => { videoRefs.current[index] = element }} src={video} muted playsInline preload="metadata" controls onPlay={() => setPlayingVideos((current) => ({ ...current, [index]: true }))} onPause={() => setPlayingVideos((current) => ({ ...current, [index]: false }))} onEnded={() => setPlayingVideos((current) => ({ ...current, [index]: false }))} /><button aria-label={playingVideos[index] ? 'Pause video' : 'Play video'} onClick={() => toggleVideo(index)}>{playingVideos[index] ? <Pause fill="currentColor" size={18} /> : <Play fill="currentColor" size={18} />}</button><span>{index ? 'The Process' : 'AltFit / Packaging Study'}</span></article>)}</div></section>
    <section id="design-lab" className="af-section af-lab"><div className="af-lab-intro"><span className="af-kicker">THE DESIGN LAB / IDEAS INTO IDENTITY</span><h2>Design your <em>drip.</em></h2><p>From first sketch to the final frame, the Design Lab builds the visual world behind each AltFit drop. Explore our creative services or bring your idea into the studio.</p><Button variant="outline" onClick={() => setForm('designer')}>Collaborate with us</Button></div><div className="af-lab-visuals"><img className="af-lab-main-image" src={altfitMedia.collection[1]} alt="AltFit Leopard Gen hoodie design concept" loading="lazy" /><img className="af-lab-detail-image" src={altfitMedia.collection[2]} alt="AltFit Leopard Gen trouser design concept" loading="lazy" /><span className="af-lab-stamp">ALTFIT<br />STUDIO / 01</span></div><div className="af-lab-services"><div className="af-lab-services-head"><span className="af-kicker">WHAT WE MAKE</span><span>CONCEPT / DIRECTION / PRODUCTION</span></div>{altfitServices.map(([title, description], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div><ArrowUpRight size={17} /></article>)}</div></section>
    <section id="support" className="af-support"><div className="af-support-image"><img src={altfitMedia.campaign[3]} alt="AltFit model in the city" loading="lazy" /></div><div className="af-support-copy"><span className="af-kicker">SUPPORT ALTFIT</span><h2>Be part of the <em>movement.</em></h2><p>AltFit is more than a brand. It is a community for people who make, move, and imagine differently.</p><div className="af-pathways">{pathways.map(([number, title, description]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{description}</p><button onClick={() => setForm(title.includes('model') ? 'model' : title.includes('designer') ? 'designer' : title.includes('Support') ? 'support' : 'creative')}>Open pathway <ArrowRight size={13} /></button></article>)}</div></div></section>
    <footer className="af-footer"><img src={altfitMedia.logo} alt="AltFit" /><div><span>CODE YOUR DRIP.</span><small>A fashion arm of JEZZZARRR LABS.</small></div><button type="button" onClick={() => setForm('contact')}>Contact <ArrowRight size={14} /></button></footer>
    {searchOpen && <div className="af-search"><button className="af-close" onClick={() => setSearchOpen(false)} aria-label="Close search"><X /></button><span className="af-kicker">SEARCH ALTFIT</span><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Products, collections, designs" />{query && <div className="af-search-results">{filteredProducts.map((product) => <button key={product.id} onClick={() => { setSelectedProduct(product); setSearchOpen(false) }}>{product.name} <ArrowRight size={14} /></button>)}</div>}</div>}
    {heroExpanded && <div className="af-modal af-hero-modal" role="dialog" aria-modal="true" aria-label="Full AltFit campaign photo" onClick={() => setHeroExpanded(false)}><button className="af-close" onClick={() => setHeroExpanded(false)} aria-label="Close full campaign photo"><X /></button><img src={altfitMedia.hero} alt="AltFit campaign models, including a model wearing a Thunder Cap" /></div>}
    {cartOpen && <div className="af-drawer"><button className="af-close" onClick={() => setCartOpen(false)} aria-label="Close cart"><X /></button><span className="af-kicker">YOUR CART / {cartCount}</span><h2>Selected <em>pieces.</em></h2>{cart.length ? <>{cart.map((item) => <div className="af-cart-item" key={item.id}><img src={item.image} alt="" /><div><h3>{item.name}{item.color ? ` / ${item.color}` : ''}</h3><p>{formatPrice(item.price, currency, rates)} each</p><div><button onClick={() => updateQuantity(item.id, -1)}>-</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)}>+</button></div></div></div>)}{setCount > 0 && <p className="af-set-discount">Leopard Gen set discount: −{formatPrice(setCount * 100, currency, rates)}</p>}<p className="af-cart-total">Total: {formatPrice(cartTotal, currency, rates)}</p><Button onClick={() => setForm('support')}>Continue to enquiry</Button></> : <p className="af-muted">Your saved pieces will appear here.</p>}</div>}
    {selectedProduct && <div className="af-modal" role="dialog" aria-modal="true"><div className="af-product-modal"><button className="af-close" onClick={() => setSelectedProduct(null)} aria-label="Close product"><X /></button><img src={getVariant(selectedProduct)?.image || selectedProduct.image} alt={`${selectedProduct.name}${getVariant(selectedProduct) ? ` in ${getVariant(selectedProduct).name}` : ''}`} /><div><span className="af-kicker">{selectedProduct.category} / Available</span><h2>{selectedProduct.name}</h2><p>{selectedProduct.detail}</p><p className="af-product-price">{formatPrice(selectedProduct.price, currency, rates)}</p>{selectedProduct.variants && <div className="af-modal-colors"><span>Color: <strong>{getVariant(selectedProduct)?.name}</strong></span><div className="af-color-options">{selectedProduct.variants.map((color) => <button key={color.name} className={`af-color-swatch${getVariant(selectedProduct)?.name === color.name ? ' active' : ''}`} style={{ '--af-swatch': color.swatch }} aria-label={`Select ${color.name}`} aria-pressed={getVariant(selectedProduct)?.name === color.name} title={color.name} onClick={() => setSelectedColors((current) => ({ ...current, [selectedProduct.id]: color.name }))} />)}</div></div>}{['leopard-hoodie', 'leopard-trouser'].includes(selectedProduct.id) && <p className="af-muted">Buy one Leopard Gen hoodie and one trouser together for {formatPrice(500, currency, rates)}.</p>}<Button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null) }}>Add to cart</Button></div></div></div>}
    {form && <FormPanel type={form} onClose={() => setForm(null)} />}
  </main>
}
