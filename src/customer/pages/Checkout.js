import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import Icon from '../../user-panel/pages/Home/Icon'
import { useLanguage } from '../../i18n/LanguageContext'
import { useProducts, formatPrice, formatPackSize, SHOP_LIST_LINK } from '../../user-panel/pages/Shop/shopHelpers'
import { db, orderNumber } from '../firebase'
import { useCustomer } from '../CustomerContext'
import { useCart } from '../CartContext'
import { cartItems, CART_LINK, CHECKOUT_LINK, LOGIN_LINK, ORDERS_LINK, ADDRESS_LINK, DELIVERY_INFO_LINK } from '../shop'
import { addressOf, addressText, hasAddress, orderAddress } from '../address'
import { useDeliveryZones, deliveryQuote, itemWeight } from '../deliveryService'
import '../Customer.scss'

// /checkout: check the delivery address, see the delivery charge and place the order (pay on delivery)
const Checkout = () => {
  const navigate = useNavigate()
  const { tr } = useLanguage()
  const { products, isLoading: productsLoading } = useProducts()
  const { user, profile, isLoading, saveProfile } = useCustomer()
  const { zones, isLoading: zonesLoading } = useDeliveryZones()
  const { lines, clear } = useCart()
  const items = cartItems(lines, products)
  const subtotal = items.reduce((total, item) => total + item.amount, 0)
  const weight = items.reduce((total, { product, qty }) => total + itemWeight(product, qty), 0)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [placed, setPlaced] = useState(null)

  // Fill in what we already know about the customer
  useEffect(() => {
    if (!profile && !user) return
    setName((current) => current || (profile && profile.name) || (user && user.displayName) || '')
    setPhone((current) => current || ((profile && profile.phone) || (user && user.phoneNumber) || '').replace(/^\+91/, '').trim())
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

  const address = addressOf(profile)
  const saved = hasAddress(profile)
  const quote = deliveryQuote(zones, address.pincode, weight, subtotal)
  const charge = quote.charge || 0
  const total = subtotal + charge

  const placeOrder = async (event) => {
    event.preventDefault()
    setError('')
    const digits = phone.replace(/\D/g, '').slice(-10)
    if (!name.trim()) return setError('Please enter your name.')
    if (digits.length !== 10) return setError('Please enter a 10-digit mobile number so we can call you about the delivery.')
    if (!saved) return setError('Please add your delivery address first.')
    if (quote.paused) return setError(quote.note)
    if (!profile) return setError('Sorry, we could not load your account. Please refresh the page and try again.')

    const customer = { name: name.trim().slice(0, 100), phone: '+91 ' + digits }
    if (user.email) customer.email = user.email

    setBusy(true)
    try {
      const ref = await addDoc(collection(db, 'orders'), {
        customerUid: user.uid,
        customerId: profile.id,
        channel: 'online',
        customer,
        address: orderAddress(address),
        items: items.map(({ product, qty }) => ({
          // A pack size (e.g. a 25 kg bag) is ordered against its product, so the ERP takes size × qty off stock
          productId: String(product.product_id || product.id),
          packId: product.pack_id || null,
          size: Number(product.pack_size) || 1,
          name: tr(product.name) + (formatPackSize(product) ? ` (${formatPackSize(product)})` : ''),
          qty,
          unit: 'pack',
          price: Number(product.price),
        })),
        itemCount: items.reduce((count, item) => count + item.qty, 0),
        subtotal,
        deliveryCharge: charge,
        total,
        note: note.trim().slice(0, 500),
        payment: 'cod',
        status: 'placed',
        source: 'Website',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      // Remember the name and number for next time (not needed for the order itself)
      saveProfile({ name: customer.name, phone: customer.phone }).catch(() => {})
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

  const editAddress = `${ADDRESS_LINK}?next=${CHECKOUT_LINK}`

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
            </div>

            <h3 className='sub-head'>Delivery address</h3>
            {saved ? (
              <div className='address-card'>
                <span className='address-icon'><Icon name='pin' size={20} /></span>
                <div>
                  <p className='address-text'>{addressText(address)}</p>
                  {address.mapUrl ? <a className='map-link' href={address.mapUrl} target='_blank' rel='noreferrer'>Open in Google Maps</a> : null}
                  <Link to={editAddress} className='shop-btn ghost small'>Edit address</Link>
                </div>
              </div>
            ) : (
              <div className='address-card empty'>
                <span className='address-icon'><Icon name='pin' size={20} /></span>
                <div>
                  <p className='address-text'>No delivery address yet.</p>
                  <Link to={editAddress} className='shop-btn solid small'>Add delivery address</Link>
                </div>
              </div>
            )}

            <div className='customer-form grid'>
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
            <div className='sum-row'>
              <span>Delivery</span>
              <strong>{!saved ? '—' : zonesLoading ? '…' : quote.paused ? 'Not available' : charge ? formatPrice(charge) : 'Free'}</strong>
            </div>
            {saved && !zonesLoading && quote.note ? <p className={`delivery-hint ${quote.paused ? 'warn' : ''}`}>{quote.note}</p> : null}
            <p className='customer-fine'><Link to={DELIVERY_INFO_LINK}>See how our delivery charges work</Link></p>
            <div className='sum-row total'><span>Total</span><strong>{formatPrice(total)}</strong></div>
            {error ? <p className='form-error' role='alert'>{error}</p> : null}
            <button type='submit' className='shop-btn solid block' disabled={busy || !saved || quote.paused}>{busy ? 'Placing your order…' : 'Place order'}</button>
            <p className='customer-fine'>By placing this order you agree to our <Link to='/terms-of-service'>Terms of Service</Link>.</p>
            <button type='button' className='link-btn center' onClick={() => navigate(CART_LINK)}>Edit cart</button>
          </aside>
        </form>
      </div>
    </div>
  )
}

export default Checkout
