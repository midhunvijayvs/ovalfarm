import { shopIsOnline } from './firebase'

// A product can go in the cart when online ordering is switched on, it has a price and it is in stock.
// Otherwise the shop shows the "coming soon" page with WhatsApp and phone ordering, as before.
export const canOrderOnline = (product) =>
  shopIsOnline() && !!product && product.price !== null && product.price !== undefined && product.in_stock !== false

// Joins cart lines with product details: [{ product, qty, amount }]
export const cartItems = (lines, products) =>
  lines
    .map((line) => {
      const product = products.find((item) => String(item.id) === String(line.id))
      return product && canOrderOnline(product) ? { product, qty: line.qty, amount: line.qty * Number(product.price) } : null
    })
    .filter(Boolean)

export const LOGIN_LINK = '/account/login'
export const CART_LINK = '/cart'
export const CHECKOUT_LINK = '/checkout'
export const ORDERS_LINK = '/account/orders'
