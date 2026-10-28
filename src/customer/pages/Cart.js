import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../user-panel/pages/Home/Icon'
import { useLanguage } from '../../i18n/LanguageContext'
import { useProducts, formatPrice, formatPackSize, productLink, SHOP_LIST_LINK } from '../../user-panel/pages/Shop/shopHelpers'
import { useCart } from '../CartContext'
import { cartItems, CHECKOUT_LINK, DELIVERY_INFO_LINK } from '../shop'
import { DELIVERY_CHARGE } from '../firebaseConfig'
import '../Customer.scss'

// /cart
const Cart = () => {
  const { tr } = useLanguage()
  const { products, isLoading } = useProducts()
  const { lines, setQty, remove } = useCart()
  const items = cartItems(lines, products)
  const subtotal = items.reduce((total, item) => total + item.amount, 0)

  if (isLoading) return <div className='customer-page'><p className='customer-lead center'>Loading your cart…</p></div>

  if (!items.length) {
    return (
      <div className='customer-page'>
        <div className='customer-card narrow center'>
          <span className='empty-icon'><Icon name='cart' size={40} strokeWidth={1.6} /></span>
          <h1>Your cart is empty</h1>
          <p className='customer-lead'>Fresh mushrooms and our mushroom products are waiting in the shop.</p>
          <Link to={SHOP_LIST_LINK} className='shop-btn solid'>Go to the shop</Link>
        </div>
      </div>
    )
  }

  return (
    <div className='customer-page'>
      <div className='customer-wrap'>
        <h1 className='customer-title'>Your cart</h1>
        <div className='customer-columns'>
          <div className='customer-card'>
            {items.map(({ product, qty, amount }) => (
              <div className='cart-line' key={product.id}>
                <Link to={productLink(product.id)} className='cart-thumb'>
                  <img src={(product.images && product.images[0]) || ''} alt='' />
                </Link>
                <div className='cart-info'>
                  <Link to={productLink(product.id)}><strong>{tr(product.name)}</strong></Link>
                  <span>{formatPackSize(product)}{formatPackSize(product) ? ' · ' : ''}{formatPrice(product.price, product.currency)} each</span>
                  <button type='button' className='link-btn' onClick={() => remove(product.id)}>Remove</button>
                </div>
                <div className='cart-qty'>
                  <div className='qty-stepper small' aria-label='Quantity'>
                    <button type='button' onClick={() => setQty(product.id, qty - 1)} aria-label='Decrease quantity'>−</button>
                    <span aria-live='polite'>{qty}</span>
                    <button type='button' onClick={() => setQty(product.id, qty + 1)} aria-label='Increase quantity'>+</button>
                  </div>
                  <strong>{formatPrice(amount)}</strong>
                </div>
              </div>
            ))}
          </div>

          <aside className='customer-card summary'>
            <h2>Order summary</h2>
            <div className='sum-row'><span>Items</span><strong>{formatPrice(subtotal)}</strong></div>
            <div className='sum-row'><span>Delivery</span><strong>{DELIVERY_CHARGE ? formatPrice(DELIVERY_CHARGE) : 'Free'}</strong></div>
            <p className='customer-fine'><Link to={DELIVERY_INFO_LINK}>See how our delivery charges work</Link></p>
            <div className='sum-row total'><span>Total</span><strong>{formatPrice(subtotal + DELIVERY_CHARGE)}</strong></div>
            <Link to={CHECKOUT_LINK} className='shop-btn solid block'>Checkout</Link>
            <Link to={SHOP_LIST_LINK} className='link-btn center'>Continue shopping</Link>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Cart
