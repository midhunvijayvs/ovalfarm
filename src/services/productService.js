import { PRODUCTS, PRODUCT_CATEGORIES } from '../Constants'

// Where the pages get product data from.
// Right now it reads PRODUCTS from Constants.js. When the database is ready, change
// these functions to call the API instead, for example:
//
//   import API from '../API'
//   export const getProducts = () => API.get('/products/').then((res) => res.data)
//   export const getProductById = (id) => API.get(`/products/${id}/`).then((res) => res.data)
//   export const getProductCategories = () => API.get('/product-categories/').then((res) => res.data)
//
// The pages already wait for the result, so nothing else needs to change.

export const getProducts = () => Promise.resolve(PRODUCTS)

export const getProductById = (id) => {
  const product = PRODUCTS.find((item) => String(item.id) === String(id))
  return Promise.resolve(product || null)
}

export const getProductCategories = () => Promise.resolve(PRODUCT_CATEGORIES)
