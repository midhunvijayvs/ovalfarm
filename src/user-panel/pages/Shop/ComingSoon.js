import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Shop.scss'
import Icon from '../Home/Icon'
import { useLanguage } from '../../../i18n/LanguageContext'
import { useProduct, formatPackSize, SHOP_LIST_LINK } from './shopHelpers'
import { SITE_INFO } from '../../../siteInfo'

// /shop/coming-soon?action=cart|buy&product=<id>
// Shown for Add to cart and Buy now until online ordering is ready.
const ComingSoon = () => {
  const { search } = useLocation()
  const navigate = useNavigate()
  const { tr } = useLanguage()
  const params = new URLSearchParams(search)
  const action = params.get('action') === 'buy' ? 'buy' : 'cart'
  const { product } = useProduct(params.get('product'))

  const productName = product ? tr(product.name) : ''
  const packSize = product ? formatPackSize(product) : ''
  const whatsappLink = product
    ? `https://wa.me/91${SITE_INFO.phone}?text=${encodeURIComponent(`Hi Oval Farms, I would like to order ${productName}${packSize ? ` (${packSize})` : ''}.`)}`
    : SITE_INFO.whatsappLink

  return (
    <div className='shop-page'>
      <section className='coming-soon'>
        <div className='coming-soon-art' aria-hidden='true'>
          <span className='cs-ring' />
          <span className='cs-ring two' />
          <span className='cs-icon'><Icon name={action === 'buy' ? 'box' : 'cart'} size={44} strokeWidth={1.6} /></span>
          <span className='cs-tool'><Icon name='tools' size={22} /></span>
        </div>

        <span className='eyebrow'>Coming soon</span>
        <h1>Online {action === 'buy' ? 'checkout' : 'cart'} is on its way</h1>
        <p>
          We are building a simple way to order and pay right here on our website.
          Until it is ready, we are happy to take your order on WhatsApp or by phone.
        </p>

        {product ? (
          <div className='coming-soon-product'>
            <img src={product.images && product.images[0]} alt='' />
            <div>
              <strong>{productName}</strong>
              {packSize ? <span>{packSize}</span> : null}
            </div>
          </div>
        ) : null}

        <div className='coming-soon-actions'>
          <a href={whatsappLink} target='_blank' rel='noreferrer' className='shop-btn solid'>
            Order on WhatsApp
          </a>
          <a href={SITE_INFO.phoneLink} className='shop-btn ghost'>Call {SITE_INFO.phoneDisplay}</a>
        </div>

        <div className='coming-soon-links'>
          <button type='button' onClick={() => navigate(-1)}>
            <Icon name='arrowLeft' size={16} strokeWidth={2.2} /> Go back
          </button>
          <Link to={SHOP_LIST_LINK}>Continue shopping</Link>
        </div>
      </section>
    </div>
  )
}

export default ComingSoon
