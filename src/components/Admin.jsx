import { useEffect, useState } from 'react'
import { starterCatalog } from '../data/catalog.js'
import { isSupabaseConfigured, supabase } from '../lib/supabase.js'

const stores = [
  { id: 'ebook', label: 'Digital books' },
  { id: 'altfit', label: 'AltFit products' },
]

const emptyForm = {
  title: '',
  description: '',
  imageUrl: '',
  category: '',
  price: '',
  currency: 'USD',
  variants: '[]',
}

function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function Admin() {
  const [user, setUser] = useState(null)
  const [checkingSession, setCheckingSession] = useState(isSupabaseConfigured)
  const [store, setStore] = useState('ebook')
  const [records, setRecords] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editing, setEditing] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!supabase) return undefined
    let active = true
    supabase.auth.getSession().then(async ({ data, error: sessionError }) => {
      if (!active) return
      if (sessionError) setError(sessionError.message)
      if (data.session) await authorize(data.session.user)
      if (active) setCheckingSession(false)
    })
    return () => { active = false }
  }, [])

  useEffect(() => {
    if (!user || !supabase) return undefined
    let active = true
    supabase
      .from('products')
      .select('*')
      .eq('store', store)
      .order('created_at')
      .then(({ data, error: requestError }) => {
        if (!active) return
        if (requestError) setError(requestError.message)
        else setRecords(data)
      })
    return () => { active = false }
  }, [store, user])

  async function authorize(signedInUser) {
    const { data, error: accessError } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', signedInUser.id)
      .maybeSingle()
    if (accessError) {
      setError(accessError.message)
      return
    }
    if (!data) {
      await supabase.auth.signOut()
      setError('This account is not an admin. Add its user ID to the Supabase admin_users table.')
      return
    }
    setError('')
    setUser(signedInUser)
  }

  async function signIn(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    if (signInError) setError(signInError.message)
    else await authorize(data.user)
    setBusy(false)
  }

  function beginEdit(record) {
    setEditing(record)
    setImageFile(null)
    setForm({
      title: record.title,
      description: record.description || '',
      imageUrl: record.image_url || '',
      category: record.category || '',
      price: String(record.price),
      currency: record.currency,
      variants: JSON.stringify(record.variants || [], null, 2),
    })
    setMessage('')
    setError('')
  }

  function resetForm() {
    setEditing(null)
    setImageFile(null)
    setForm({ ...emptyForm, currency: store === 'altfit' ? 'GHS' : 'USD' })
  }

  async function markCatalogInitialized() {
    const { error: settingsError } = await supabase
      .from('catalog_settings')
      .upsert({ store, initialized: true }, { onConflict: 'store' })
    if (settingsError) throw settingsError
  }

  async function saveProduct(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    setMessage('')

    try {
      if (!form.imageUrl.trim() && !imageFile && !editing?.image_url) {
        throw new Error('Add an image URL or upload a product image.')
      }
      const variants = store === 'altfit' ? JSON.parse(form.variants || '[]') : []
      if (!Array.isArray(variants)) throw new Error('Variants must be a JSON array.')

      let imageUrl = form.imageUrl.trim()
      let imagePath = editing?.image_path || null
      if (imageFile) {
        const safeName = imageFile.name.replace(/[^a-zA-Z0-9._-]/g, '-')
        const uploadedPath = `${store}/${crypto.randomUUID()}-${safeName}`
        const { error: uploadError } = await supabase.storage.from('product-images').upload(uploadedPath, imageFile, { upsert: false })
        if (uploadError) throw uploadError
        imagePath = uploadedPath
        imageUrl = supabase.storage.from('product-images').getPublicUrl(uploadedPath).data.publicUrl
      }

      const record = {
        store,
        slug: slugify(form.title),
        title: form.title.trim(),
        description: form.description.trim(),
        image_url: imageUrl,
        image_path: imagePath,
        category: form.category.trim(),
        price: Number(form.price),
        currency: form.currency.trim().toUpperCase(),
        variants,
      }

      const result = editing
        ? await supabase.from('products').update(record).eq('id', editing.id)
        : await supabase.from('products').insert(record)
      if (result.error) throw result.error
      await markCatalogInitialized()

      if (imageFile && editing?.image_path) {
        const { error: removeImageError } = await supabase.storage.from('product-images').remove([editing.image_path])
        if (removeImageError) console.error('Could not remove replaced product image:', removeImageError)
      }

      resetForm()
      setMessage(editing ? 'Product updated.' : 'Product added.')
      await reloadRecords()
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save the product.')
    } finally {
      setBusy(false)
    }
  }

  async function reloadRecords() {
    const { data, error: requestError } = await supabase
      .from('products')
      .select('*')
      .eq('store', store)
      .order('created_at')
    if (requestError) setError(requestError.message)
    else setRecords(data)
  }

  async function setProductActive(record, active) {
    if (!active && !window.confirm(`Remove "${record.title}" from the live site?`)) return
    setBusy(true)
    setError('')
    const { error: updateError } = await supabase.from('products').update({ active }).eq('id', record.id)
    if (updateError) setError(updateError.message)
    else {
      try {
        await markCatalogInitialized()
        setMessage(active ? 'Product restored to the live site.' : 'Product removed from the live site.')
      } catch (settingsError) {
        setError(`Product status saved, but catalog settings could not be updated: ${settingsError.message}`)
      }
      await reloadRecords()
    }
    setBusy(false)
  }

  async function addStarterCatalog() {
    setBusy(true)
    setError('')
    setMessage('')
    const recordsToInsert = starterCatalog.filter((product) => product.store === store).map((product) => ({
      store: product.store,
      slug: product.slug,
      title: product.title,
      description: product.description,
      image_url: product.imageUrl,
      category: product.category,
      price: product.price,
      currency: product.currency,
      variants: product.variants,
    }))
    const { error: insertError } = await supabase.from('products').upsert(recordsToInsert, { onConflict: 'store,slug', ignoreDuplicates: true })
    if (insertError) setError(insertError.message)
    else {
      try {
        await markCatalogInitialized()
        setMessage('Starter products added. You can edit or remove any of them below.')
      } catch (settingsError) {
        setError(`Starter products were added, but catalog settings could not be updated: ${settingsError.message}`)
      }
      await reloadRecords()
    }
    setBusy(false)
  }

  async function signOut() {
    const { error: signOutError } = await supabase.auth.signOut()
    if (signOutError) setError(signOutError.message)
    else {
      setUser(null)
      setRecords([])
      setMessage('')
    }
  }

  if (!isSupabaseConfigured) return <main className="admin-page">
    <div className="admin-head"><div><span className="eyebrow">OWNER CONSOLE</span><h1>Product dashboard</h1></div><a href="/">Back to site</a></div>
    <p className="admin-notice">Connect a Supabase project to enable shared product management. Add the project URL and publishable/anon key to <code>.env.local</code>, then run the setup SQL in <code>supabase/schema.sql</code>.</p>
  </main>

  if (checkingSession) return <main className="admin-page"><p>Checking admin session…</p></main>

  if (!user) return <main className="admin-page">
    <div className="admin-head"><div><span className="eyebrow">OWNER CONSOLE</span><h1>Product dashboard</h1><p>Sign in with your authorized admin account.</p></div><a href="/">Back to site</a></div>
    <form className="admin-login" onSubmit={signIn}>
      <label>Email<input required type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
      <label>Password<input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>
      <button className="btn" type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
    </form>
    {error && <p className="admin-error" role="alert">{error}</p>}
  </main>

  return <main className="admin-page">
    <div className="admin-head">
      <div><span className="eyebrow">OWNER CONSOLE</span><h1>Product dashboard</h1><p>Changes publish to the Digital Shelf and AltFit shop.</p></div>
      <div className="admin-account"><span>{user.email}</span><button onClick={signOut}>Sign out</button><a href="/">Back to site</a></div>
    </div>
    <div className="admin-tabs">{stores.map((item) => <button className={store === item.id ? 'active' : ''} key={item.id} onClick={() => { setStore(item.id); setRecords([]); resetForm(); setForm({ ...emptyForm, currency: item.id === 'altfit' ? 'GHS' : 'USD' }); setMessage(''); setError('') }}>{item.label}</button>)}</div>
    <div className="admin-toolbar">
      <h2>{stores.find((item) => item.id === store)?.label}</h2>
      <button className="admin-secondary" disabled={busy} onClick={addStarterCatalog}>Add starter catalog</button>
    </div>
    <form className="admin-product-form" onSubmit={saveProduct}>
      <h3>{editing ? 'Edit product' : 'Add a product'}</h3>
      <label>Product name<input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></label>
      <label>Description<textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} rows="3" /></label>
      <div className="admin-form-row">
        <label>Price<input required type="number" min="0" step="0.01" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} /></label>
        <label>Currency<input required minLength="3" maxLength="3" value={form.currency} onChange={(event) => setForm({ ...form, currency: event.target.value })} /></label>
        <label>Category<input value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} placeholder={store === 'altfit' ? 'T-shirts, Pants, Accessories…' : 'Ebooks'} /></label>
      </div>
      <label>Cover or product image URL<input value={form.imageUrl} onChange={(event) => setForm({ ...form, imageUrl: event.target.value })} placeholder="https://…" /></label>
      <label>Or upload an image<input type="file" accept="image/*" onChange={(event) => setImageFile(event.target.files?.[0] || null)} /></label>
      {store === 'altfit' && <label>Color variants (JSON)<textarea value={form.variants} onChange={(event) => setForm({ ...form, variants: event.target.value })} rows="4" /></label>}
      <div className="admin-form-actions"><button className="btn" type="submit" disabled={busy}>{busy ? 'Saving…' : editing ? 'Save changes' : 'Add product'}</button>{editing && <button className="admin-secondary" type="button" onClick={resetForm}>Cancel edit</button>}</div>
    </form>
    {error && <p className="admin-error" role="alert">{error}</p>}
    {message && <p className="admin-success" role="status">{message}</p>}
    <div className="admin-list">
      {records.length ? records.map((record) => <article key={record.id}>
        {record.image_url && <img src={record.image_url} alt="" />}
        <div className="admin-record-info"><b>{record.title}</b><p>{record.description || 'No description yet.'}</p><small>{record.category} · {record.currency} {record.price} · {record.active ? 'Live' : 'Hidden'}</small></div>
        <div className="admin-record-actions">{record.active && <button disabled={busy} onClick={() => beginEdit(record)}>Edit</button>}<button disabled={busy} onClick={() => setProductActive(record, !record.active)}>{record.active ? 'Remove from store' : 'Restore to store'}</button></div>
      </article>) : <p className="muted-copy">No products yet. Add one above or load the starter catalog.</p>}
    </div>
  </main>
}
