import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '../Home/Icon'
import { useLanguage } from '../../../i18n/LanguageContext'
import ProductPrice from './ProductPrice'
import { productLink, formatPackSize } from './shopHelpers'
import BuyButtons from '../../../customer/BuyButtons'

// One product tile, used on the shop list, the product page and the home page.
// "compact" hides the Add to cart / Buy now buttons (used on the home page).
const ProductCard = ({ product, compact = false }) => {
  const { tr } = useLanguage()
  const link = productLink(product.id)
  const packSize = formatPackSize(product)
  const image = (product.images && product.images[0]) || ''

  return (
    <article className={`product-tile ${compact ? 'compact' : ''} ${product.in_stock === false ? 'sold-out' : ''}`}>
      <Link to={link} className='product-tile-image' tabIndex={-1} aria-hidden='true'>
        <img src={image} alt='' loading='lazy' />
        {product.badge ? <span className='product-tile-badge'>{tr(product.badge)}</span> : null}
        {product.in_stock === false ? <span className='product-tile-stock'>Out of stock</span> : null}
      </Link>

      <div className='product-tile-body'>
        {packSize ? <span className='product-tile-size'>{packSize}</span> : null}
        <h3><Link to={link}>{tr(product.name)}</Link></h3>
        <p>{tr(product.short_description)}</p>

        <div className='product-tile-footer'>
          <ProductPrice product={product} />
          {compact ? (
            <Link to={link} className='product-tile-more'>
              View <Icon name='arrow' size={16} strokeWidth={2.2} />
            </Link>
          ) : null}
        </div>

        {!compact ? (
          <div className='product-tile-actions'>
            <BuyButtons product={product} />
          </div>
        ) : null}
      </div>
    </article>
  )
}

export default ProductCard
