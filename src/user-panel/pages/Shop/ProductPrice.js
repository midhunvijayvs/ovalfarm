import React from 'react'
import './Shop.scss'
import { formatPrice, discountPercent } from './shopHelpers'

// Shows "₹60", or "₹54 ₹60 10% off" when the price is below the MRP,
// or "Price on request" when no price is set yet.
const ProductPrice = ({ product, large = false }) => {
  if (product.price === null || product.price === undefined) {
    return <span className={`product-price on-request ${large ? 'large' : ''}`}>Price on request</span>
  }
  const discount = discountPercent(product)
  return (
    <span className={`product-price ${large ? 'large' : ''}`}>
      <strong>{formatPrice(product.price, product.currency)}</strong>
      {discount > 0 ? (
        <>
          <s>{formatPrice(product.mrp, product.currency)}</s>
          <em>{discount}% off</em>
        </>
      ) : null}
    </span>
  )
}

export default ProductPrice
