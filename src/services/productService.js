import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../customer/firebase'

// Where the pages get product data from: the "catalog" collection in Firebase.
// Products are managed in the Oval Farms ERP (Products & Materials). Every product ticked
// "Show on ovalfarm.in" is copied to the catalog, together with its stock status
// (stock_status: 'in_stock' | 'low' | 'out', in_stock: true/false) and its position
// on the site (display_order, set with "Website order" in the ERP).
//
// Product fields: id, sku, slug, name, category, category_name, short_description, description,
// images, price, mrp, currency, net_quantity, unit, is_featured, badge, highlights,
// how_to_use, storage, shelf_life, display_order, stock_status, in_stock,
// product_id, pack_id, pack_name, pack_size. A product sold in pack sizes (e.g. Loose and Bag 25 kg) has one
// entry per pack; they share product_id, and pack_size is how much of the product's stock one uses.

let cache = null

// All published products, in the order chosen in the ERP. Loaded once per visit.
export const getProducts = () => {
  if (!db) return Promise.resolve([])
  if (!cache) {
    cache = getDocs(query(collection(db, 'catalog'), orderBy('display_order')))
      .then((snap) => snap.docs.map((d) => ({ ...d.data(), id: d.id })))
      .catch((error) => {
        cache = null
        throw error
      })
  }
  return cache
}

export const getProductById = (id) =>
  getProducts().then((products) => products.find((item) => String(item.id) === String(id) || item.slug === id) || null)

// Categories in the order their first product appears: [{ id, name }]
export const getProductCategories = () =>
  getProducts().then((products) => {
    const seen = new Map()
    products.forEach((product) => {
      if (product.category && !seen.has(product.category)) seen.set(product.category, { id: product.category, name: product.category_name || product.category })
    })
    return [...seen.values()]
  })
