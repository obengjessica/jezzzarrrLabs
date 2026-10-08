import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'

export function useCatalogProducts(store, defaults) {
  const [products, setProducts] = useState(defaults)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!supabase) return

    let active = true
    Promise.all([
      supabase
        .from('products')
        .select('slug, title, description, image_url, price, currency, category, variants')
        .eq('store', store)
        .eq('active', true)
        .order('created_at'),
      supabase
        .from('catalog_settings')
        .select('initialized')
        .eq('store', store)
        .maybeSingle(),
    ]).then(([productsResult, settingsResult]) => {
      if (!active) return
      if (productsResult.error) {
        setError(productsResult.error.message)
        return
      }
      if (settingsResult.error) {
        const settingsTableMissing = settingsResult.error.code === 'PGRST205'
          || settingsResult.error.code === '42P01'
        if (!settingsTableMissing) {
          setError(`Catalog setup needs updating: ${settingsResult.error.message}`)
        } else {
          setError('')
        }
        setProducts(productsResult.data.length
          ? productsResult.data.map((product) => ({
            ...product,
            imageUrl: product.image_url,
            price: Number(product.price),
          }))
          : defaults)
        return
      }

      setError('')
      if (productsResult.data.length) {
        setProducts(productsResult.data.map((product) => ({
          ...product,
          imageUrl: product.image_url,
          price: Number(product.price),
        })))
      } else {
        setProducts(settingsResult.data?.initialized ? [] : defaults)
      }
    })

    return () => { active = false }
  }, [defaults, store])

  return { products, error }
}
