import { useEffect, useState } from 'react'
import { getProducts, getProductById, getProductCategories } from '../../../services/productService'

export const SHOP_LIST_LINK = '/shop/list'
export const productLink = (id) => `/shop/details/${id}`

// Add to cart and Buy now go here until the cart and checkout are built.
// "action" is 'cart' or 'buy'.
export const comingSoonLink = (product, action) =>
  `/shop/coming-soon?action=${action}${product ? `&product=${product.id}` : ''}`

// Loads all products: const { products, isLoading } = useProducts()
export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true
    getProducts()
      .then((data) => { if (active) setProducts(data || []) })
      .catch(() => { if (active) setProducts([]) })
      .finally(() => { if (active) setIsLoading(false) })
    return () => { active = false }
  }, [])

  return { products, isLoading }
}

// Loads one product by id: const { product, isLoading } = useProduct(id)
export const useProduct = (id) => {
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true
    setIsLoading(true)
    getProductById(id)
      .then((data) => { if (active) setProduct(data) })
      .catch(() => { if (active) setProduct(null) })
      .finally(() => { if (active) setIsLoading(false) })
    return () => { active = false }
  }, [id])

  return { product, isLoading }
}

// Loads the product categories: const categories = useProductCategories()
export const useProductCategories = () => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    let active = true
    getProductCategories()
      .then((data) => { if (active) setCategories(data || []) })
      .catch(() => { if (active) setCategories([]) })
    return () => { active = false }
  }, [])
  return categories
}

// 60 -> "₹60", 1250.5 -> "₹1,250.50"
export const formatPrice = (amount, currency = 'INR') => {
  if (amount === null || amount === undefined || amount === '') return ''
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      minimumFractionDigits: Number.isInteger(Number(amount)) ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch (e) {
    return `₹${amount}`
  }
}

// Pack size label: { net_quantity: 25, unit: 'g' } -> "25 g"
const UNIT_LABELS = { g: 'g', kg: 'kg', ml: 'ml', l: 'L', nos: 'nos', pack: 'pack', bed: 'bed' }
export const formatPackSize = (product) => {
  if (!product || product.net_quantity === null || product.net_quantity === undefined) return ''
  const unit = UNIT_LABELS[product.unit] || product.unit || ''
  if (product.unit === 'pack' || product.unit === 'bed') {
    return `${product.net_quantity} ${unit}${product.net_quantity > 1 ? 's' : ''}`
  }
  return `${product.net_quantity} ${unit}`
}

// Percentage saved when the price is below the MRP, otherwise 0
export const discountPercent = (product) => {
  if (!product || !product.price || !product.mrp || product.mrp <= product.price) return 0
  return Math.round(((product.mrp - product.price) / product.mrp) * 100)
}

export const splitLines = (text) =>
  (text || '').split('\n').map((line) => line.trim()).filter(Boolean)
