import { FileText } from 'lucide-react'
import { Btn, Eyebrow, Reveal } from '../ui/index.js'
import { digitalBooks } from '../data/catalog.js'
import { useCatalogProducts } from '../hooks/useCatalogProducts.js'

export function Digital() {
  const { products: books, error } = useCatalogProducts('ebook', digitalBooks)

  return <section className="band" id="digital">
    <div className="wrap digital-grid">
      <Reveal>
        <div className="ebook-shelf">
          {books.map((book) => <article className="ebook-product" key={book.title}>
            <img className="ebook-cover" src={book.imageUrl} alt={`${book.title} ebook cover`} />
            <div className="ebook-product-info">
              <h3>{book.title}</h3>
              <p>{book.description}</p>
              <div className="ebook-meta"><b>{new Intl.NumberFormat('en-US', { style: 'currency', currency: book.currency || 'USD' }).format(book.price)}</b><Btn href="#contact" variant="outline">Ask about this book</Btn></div>
            </div>
          </article>)}
        </div>
        {error && <p className="catalog-error" role="status">The live book list could not load: {error}. Showing the starter catalog.</p>}
      </Reveal>
      <Reveal delay={120}>
        <Eyebrow>THE DIGITAL SHELF</Eyebrow>
        <h2>Ideas you can take <em>with you.</em></h2>
        <p className="large-copy">Ebooks, templates, and guides built from the same craft behind our client work.</p>
        <div className="tag-list">{['Templates', 'Guides', 'Ebooks', 'More coming soon'].map((item) => <span key={item}><FileText size={13} />{item}</span>)}</div>
      </Reveal>
    </div>
  </section>
}
