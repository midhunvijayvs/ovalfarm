import React, { useMemo, useState } from 'react'
import './Shop.scss'
import Icon from '../Home/Icon'
import { useLanguage, pickText } from '../../../i18n/LanguageContext'
import ProductCard from './ProductCard'
import { useProducts, useProductCategories } from './shopHelpers'
import { SITE_INFO } from '../../../siteInfo'

const IMAGES = process.env.REACT_APP_PUBLIC_IMAGES_URL

const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-low', label: 'Price: low to high' },
  { id: 'price-high', label: 'Price: high to low' },
  { id: 'name', label: 'Name: A to Z' },
]

// Products without a price go to the end when sorting by price
const priceOf = (product, fallback) =>
  product.price === null || product.price === undefined ? fallback : Number(product.price)

// /shop/list
const ShopList = () => {
  const { lang, tr } = useLanguage()
  const { products, isLoading } = useProducts()
  const categories = useProductCategories()
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('featured')

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase()
    const matches = (text) =>
      pickText(text, lang).toLowerCase().includes(query) || pickText(text, 'en').toLowerCase().includes(query)

    let list = products.filter((product) =>
      (category === 'all' || product.category === category) &&
      (!query || matches(product.name) || matches(product.short_description)))

    if (sort === 'price-low') list = [...list].sort((a, b) => priceOf(a, Infinity) - priceOf(b, Infinity))
    if (sort === 'price-high') list = [...list].sort((a, b) => priceOf(b, -Infinity) - priceOf(a, -Infinity))
    if (sort === 'name') list = [...list].sort((a, b) => pickText(a.name, lang).localeCompare(pickText(b.name, lang)))
    return list
  }, [products, category, search, sort, lang])

  const countFor = (id) => (id === 'all' ? products.length : products.filter((p) => p.category === id).length)

  return (
    <div className='shop-page'>
      <section className='shop-hero' style={{ backgroundImage: `url(${IMAGES}/home/sec-2-2.jpg)` }}>
        <div className='shop-hero-inner'>
          <span className='eyebrow light'>Oval Farms Shop</span>
          <h1>Fresh from our farm, for your family</h1>
          <p>Fresh mushrooms, dried goodness, ready-to-cook mixes and everything you need to grow your own.</p>
          <ul className='shop-hero-points'>
            <li><Icon name='sunrise' size={18} /> Harvested fresh</li>
            <li><Icon name='truck' size={18} /> Doorstep delivery</li>
            <li><Icon name='leaf' size={18} /> 100% vegetarian</li>
          </ul>
        </div>
      </section>

      <section className='shop-list'>
        <div className='shop-toolbar'>
          <label className='shop-search'>
            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' aria-hidden='true'>
              <circle cx='11' cy='11' r='7' /><path d='m20 20-3.5-3.5' />
            </svg>
            <input
              type='search'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search products'
              aria-label='Search products'
            />
          </label>
          <label className='shop-sort'>
            <span>Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {SORT_OPTIONS.map((option) => (
                <option value={option.id} key={option.id}>{option.label}</option>
              ))}
            </select>
          </label>
        </div>

        <div className='shop-chips' role='tablist' aria-label='Product categories'>
          {[{ id: 'all', name: 'All products' }, ...categories].map((item) => (
            <button
              key={item.id}
              type='button'
              role='tab'
              aria-selected={category === item.id}
              className={category === item.id ? 'active' : ''}
              onClick={() => setCategory(item.id)}>
              {tr(item.name)} <span className='chip-count'>{countFor(item.id)}</span>
            </button>
          ))}
        </div>

        {isLoading ? (
          <p className='shop-message'>Loading products…</p>
        ) : visibleProducts.length === 0 ? (
          <p className='shop-message'>No products match your search.</p>
        ) : (
          <div className='product-grid-shop' key={category + sort}>
            {visibleProducts.map((product, index) => (
              <div className='product-grid-item' style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }} key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        <div className='shop-help'>
          <div>
            <h2>Need a bulk order or a custom pack?</h2>
            <p>Hotels, caterers and retailers, talk to us for wholesale prices and regular supply.</p>
          </div>
          <a href={SITE_INFO.whatsappLink} target='_blank' rel='noreferrer' className='shop-btn light'>
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}

export default ShopList
