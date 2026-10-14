import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../user-panel/pages/Home/Icon'
import { useLanguage } from '../i18n/LanguageContext'
import { comingSoonLink } from '../user-panel/pages/Shop/shopHelpers'
import { useCart } from './CartContext'
import { canOrderOnline, CHECKOUT_LINK } from './shop'

// Add to cart and Buy now for one product.
// When online ordering is off, or the product has no price yet, they lead to the
// "coming soon" page with WhatsApp and phone ordering, as before.
const BuyButtons = ({ product, quantity = 1, disabled = false }) => {
  const navigate = useNavigate()
  const { tr } = useLanguage()
  const { add } = useCart()

  if (!canOrderOnline(product)) {
    return (
      <>
        <Link to={comingSoonLink(product, 'cart')} className={`shop-btn ghost ${disabled ? 'disabled' : ''}`}>
          <Icon name='cart' size={18} /> Add to cart
        </Link>
        <Link to={comingSoonLink(product, 'buy')} className={`shop-btn solid ${disabled ? 'disabled' : ''}`}>Buy now</Link>
      </>
    )
  }

  return (
    <>
      <button type='button' className='shop-btn ghost' onClick={() => add(product.id, quantity, tr(product.name))}>
        <Icon name='cart' size={18} /> Add to cart
      </button>
      <button type='button' className='shop-btn solid' onClick={() => { add(product.id, quantity); navigate(CHECKOUT_LINK) }}>
        Buy now
      </button>
    </>
  )
}

export default BuyButtons
