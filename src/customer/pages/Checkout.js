import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import Icon from '../../user-panel/pages/Home/Icon'
import { useLanguage } from '../../i18n/LanguageContext'
import { useProducts, formatPrice, formatPackSize, SHOP_LIST_LINK } from '../../user-panel/pages/Shop/shopHelpers'
import { db, orderNumber } from '../firebase'
import { useCustomer } from '../CustomerContext'
import { useCart } from '../CartContext'
import { cartItems, CART_LINK, CHECKOUT_LINK, LOGIN_LINK, ORDERS_LINK } from '../shop'
import { DELIVERY_CHARGE } from '../firebaseConfig'
import '../Customer.scss'

const EMPTY_ADDRESS = { line1: '', line2: '', landmark: '', city: '', pincode: '' }

// /checkout: delivery details and place the order (pay on delivery)
const Checkout = () => {
  const navigate = useNavigate()
  const { tr } = useLanguage()
  const { products, isLoading: productsLoading } = useProducts()
  const { user, profile, isLoading, saveProfile } = useCustomer()
  const { lines, clear } = useCart()
  const items = cartItems(lines, products)
  const subtotal = items.reduce((total, item) => total + item.amount, 0)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState(EMPTY_ADDRESS)
  const [note, setNote] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [placed, setPlaced] = useState(null)

  // Fill in what we already know about the customer
  useEffect(() => {
    if (!profile && !user) return
    setName((current) => current || (profile && profile.name) || (user && user.displayName) || '')
    setPhone((current) => current || ((profile && profile.phone) || (user && user.phoneNumber) || '').replace(/^\+91/, '').trim())
    const saved = profile && profile.addresses && profile.addresses[0]
    if (saved) setAddress((current) => (current.line1 ? current : { ...EMPTY_ADDRESS, ...saved }))
  }, [profile, user])

  if (placed) {
    return (
      <div className='customer-page'>
        <div className='customer-card narrow center'>
          <span className='empty-icon ok'><Icon name='check' size={40} strokeWidth={2.4} /></span>
          <h1>Thank you! Your order is placed</h1>
          <p className='customer-lead'>Order number <strong>{orderNumber(placed)}</strong>. We'll call you on +91 {phone} to confirm the delivery time. You pay by cash or UPI when it arrives.</p>
          <div className='button-row'>
            <Link to={ORDERS_LINK} className='shop-btn solid'>See my orders</Link>
            <Link to={SHOP_LIST_LINK} className='shop-btn ghost'>Continue shopping</Link>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading || productsLoading) return <div className='customer-page'><p className='customer-lead center'>Loading…</p></div>
  if (!user) return <Navigate to={`${LOGIN_LINK}?next=${CHECKOUT_LINK}`} replace />
  if (!items.length) return <Navigate to={CART_LINK} replace />

  const setField = (key) => (event) => setAddress({ ...address, [key]: event.target.value })

  const placeOrder = async (event) => {
    event.preventDefault()
    setError('')
    const digits = phone.replace(/\D/g, '').slice(-10)
    if (!name.trim()) return setError('Please enter your name.')
    if (digits.length !== 10) return setError('Please enter a 10-digit mobile number so we can call you about the delivery.')
    if (!address.line1.trim() || !address.city.trim()) return setError('Please enter your house name or number, street and town.')
    if (!/^\d{6}$/.test(address.pincode.trim())) return setError('Please enter the 6-digit PIN code.')
    if (!profile) return setError('Sorry, we could not load your account. Please refresh the page and try again.')

    const cleanAddress = Object.fromEntries(Object.entries(address).map(([key, value]) => [key, String(value || '').trim().slice(0, 200)]))
    const customer = { name: name.trim().slice(0, 100), phone: '+91 ' + digits }
    if (user.email) customer.email = user.email

    setBusy(true)
    try {
      const ref = await addDoc(collection(db, 'orders'), {
        customerUid: user.uid,
        customerId: profile.id,
        channel: 'online',
        customer,
        address: cleanAddress,
        items: items.map(({ product, qty }) => ({
          productId: String(product.id),
          name: tr(product.name) + (formatPackSize(product) ? ` (${formatPackSize(product)})` : ''),
          qty,
          unit: 'pack',
          price: Number(product.price),
        })),
        itemCount: items.reduce((total, item) => total + item.qty, 0),
        subtotal,
        deliveryCharge: DELIVERY_CHARGE,
        total: subtotal + DELIVERY_CHARGE,
        note: note.trim().slice(0, 500),
        payment: 'cod',
        status: 'placed',
        source: 'Website',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      // Remember the details for next time (not needed for the order itself)
      saveProfile({ name: customer.name, phone: customer.phone, addresses: [cleanAddress] }).catch(() => {})
      // Show the thank-you screen before emptying the cart, or the empty cart would send them to /cart
      setPlaced(ref.id)
      clear()
      window.scrollTo(0, 0)
    } catch (e) {
      console.error(e)
      setError('Sorry, the order could not be placed. Please check your internet connection and try again.')
    }
    setBusy(false)
  }

  return (
    <div className='customer-page'>
      <div className='customer-wrap'>
        <h1 className='customer-title'>Checkout</h1>
        <form className='customer-columns' onSubmit={placeOrder}>
          <div className='customer-card'>
            <h2>Delivery details</h2>
            <div className='customer-form grid'>
              <label>Full name<input type='text' autoComplete='name' value={name} onChange={(e) => setName(e.target.value)} /></label>
              <label>
                Mobile number
                <div className='phone-field'><span>+91</span><input type='tel' inputMode='numeric' autoComplete='tel-national' value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
              </label>
              <label className='wide'>House name / number and street<input type='text' autoComplete='address-line1' value={address.line1} onChange={setField('line1')} /></label>
              <label className='wide'>Area or locality (optional)<input type='text' autoComplete='address-line2' value={address.line2} onChange={setField('line2')} /></label>
              <label>Landmark (optional)<input type='text' value={address.landmark} onChange={setField('landmark')} /></label>
              <label>Town / city<input type='text' autoComplete='address-level2' value={address.city} onChange={setField('city')} /></label>
              <label>PIN code<input type='text' inputMode='numeric' autoComplete='postal-code' maxLength={6} value={address.pincode} onChange={setField('pincode')} /></label>
              <label className='wide'>Note for us (optional)<textarea rows={2} placeholder='Delivery time, gate code…' value={note} onChange={(e) => setNote(e.target.value)} /></label>
            </div>
            <div className='pay-note'>
              <Icon name='truck' size={22} />
              <div><strong>Pay on delivery</strong><span>Cash or UPI when your order arrives. We'll call to confirm before we deliver.</span></div>
            </div>
          </div>

          <aside className='customer-card summary'>
            <h2>Your order</h2>
            {items.map(({ product, qty, amount }) => (
              <div className='sum-row item' key={product.id}><span>{qty} × {tr(product.name)}</span><strong>{formatPrice(amount)}</strong></div>
            ))}
            <div className='sum-row'><span>Delivery</span><strong>{DELIVERY_CHARGE ? formatPrice(DELIVERY_CHARGE) : 'Free'}</strong></div>
            <div className='sum-row total'><span>Total</span><strong>{formatPrice(subtotal + DELIVERY_CHARGE)}</strong></div>
            {error ? <p className='form-error' role='alert'>{error}</p> : null}
            <button type='submit' className='shop-btn solid block' disabled={busy}>{busy ? 'Placing your order…' : 'Place order'}</button>
            <p className='customer-fine'>By placing this order you agree to our <Link to='/terms-of-service'>Terms of Service</Link>.</p>
            <button type='button' className='link-btn center' onClick={() => navigate(CART_LINK)}>Edit cart</button>
          </aside>
        </form>
      </div>
    </div>
  )
}

export default Checkout
