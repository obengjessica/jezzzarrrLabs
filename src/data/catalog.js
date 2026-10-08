import { altfitMedia } from './altfit.js'
import { images } from './media.js'

export const digitalBooks = [
  {
    slug: 'clothing-brand-2026',
    title: 'How to Start Your First Clothing Brand in 2026',
    imageUrl: images.ebookCover,
    description: 'A practical guide to taking your clothing brand from idea to launch.',
    price: 9.99,
    currency: 'USD',
    category: 'Ebooks',
  },
  {
    slug: 'code-better',
    title: 'Code Better',
    imageUrl: '/code-better-cover.svg',
    description: 'Build clearer, more thoughtful software with better habits.',
    price: 10.99,
    currency: 'USD',
    category: 'Ebooks',
  },
  {
    slug: 'begin-forex-today',
    title: 'Begin Forex Today',
    imageUrl: '/begin-forex-today-cover.svg',
    description: 'A beginner-friendly introduction to forex trading from J-Trading.',
    price: 15.99,
    currency: 'USD',
    category: 'Ebooks',
  },
]

export const altfitProducts = [
  { slug: 'dont-care-tee', title: "Don't Care", category: 'T-shirts', imageUrl: altfitMedia.products[0], description: 'A relaxed AltFit essential with a graphic point of view.', price: 200, currency: 'GHS', variants: [] },
  { slug: 'gem-jeans', title: 'Gem Jeans', category: 'Pants', imageUrl: altfitMedia.products[1], description: 'A considered denim silhouette made for everyday movement.', price: 500, currency: 'GHS', variants: [] },
  { slug: 'pretty-damn-top', title: 'Pretty Damn', category: 'T-shirts', imageUrl: altfitMedia.products[2], description: 'Oversized proportions, monochrome attitude.', price: 200, currency: 'GHS', variants: [] },
  { slug: 'leopard-hoodie', title: 'Leopard Gen Hoodie', category: 'Hoodies', imageUrl: altfitMedia.collection[0], description: 'A graphic statement from the Leopard Gen series.', price: 300, currency: 'GHS', variants: [] },
  { slug: 'leopard-trouser', title: 'Leopard Gen Trouser Pant', category: 'Pants', imageUrl: altfitMedia.collection[2], description: 'Utility-minded tailoring with a distinct AltFit edge.', price: 300, currency: 'GHS', variants: [] },
  { slug: 'soft-girl-era', title: 'Soft Girl Era', category: 'T-shirts', imageUrl: altfitMedia.extras.softGirlEra[0].image, description: 'The Soft Girl Era graphic in a relaxed everyday fit.', price: 120, currency: 'GHS', variants: altfitMedia.extras.softGirlEra },
  { slug: 'thunder-cap', title: 'Thunder Cap', category: 'Accessories', imageUrl: altfitMedia.extras.thunderCap[0].image, description: 'The Thunder Cap is available in multiple colors.', price: 180, currency: 'GHS', variants: altfitMedia.extras.thunderCap },
]

export const starterCatalog = [
  ...digitalBooks.map((book) => ({ ...book, store: 'ebook', variants: [] })),
  ...altfitProducts.map((product) => ({ ...product, store: 'altfit' })),
]
