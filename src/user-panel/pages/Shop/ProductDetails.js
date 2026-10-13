import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './Shop.scss'
import Icon from '../Home/Icon'
import { useLanguage } from '../../../i18n/LanguageContext'
import ProductCard from './ProductCard'
import ProductPrice from './ProductPrice'
import {
  useProduct, useProducts, useProductCategories, comingSoonLink, formatPackSize, splitLines, SHOP_LIST_LINK,
} from './shopHelpers'
import { SITE_INFO } from '../../../siteInfo'

// /shop/details/:id
const ProductDetails = () => {
  const { id } = useParams()
  const { tr } = useLanguage()
  const { product, isLoading } = useProduct(id)
  const { products } = useProducts()
  const categories = useProductCategories()
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [tab, setTab] = useState('description')

  // Start fresh when moving to another product
  useEffect(() => {
    setActiveImage(0)
    setQuantity(1)
    setTab('description')
  }, [id])

  if (isLoading) {
    return <div className='shop-page'><p className='shop-message padded'>Loading product…</p></div>
  }

  if (!product) {
    return (
      <div className='shop-page'>
        <div className='shop-message padded'>
          <h1>Product not found</h1>
          <p>This product may have been removed or the link is incorrect.</p>
          <Link to={SHOP_LIST_LINK} className='shop-btn solid'>Back to the shop</Link>
        </div>
      </div>
    )
  }

  const images = product.images && product.images.length ? product.images : ['']
  const packSize = formatPackSize(product)
  const category = categories.find((item) => item.id === product.category)
  const outOfStock = product.in_stock === false
  const whatsappText = `Hi Oval Farms, I would like to order ${tr(product.name)}${packSize ? ` (${packSize})` : ''}, quantity ${quantity}.`
  const whatsappLink = `https://wa.me/91${SITE_INFO.phone}?text=${encodeURIComponent(whatsappText)}`

  // Same category first, then the rest
  const related = [
    ...products.filter((item) => item.id !== product.id && item.category === product.category),
    ...products.filter((item) => item.id !== product.id && item.category !== product.category),
  ].slice(0, 3)

  const tabs = [
    { id: 'description', label: 'Description', lines: splitLines(tr(product.description)) },
    { id: 'how_to_use', label: 'How to use', lines: splitLines(tr(product.how_to_use)), steps: true },
    {
      id: 'storage',
      label: 'Storage & shelf life',
      lines: [
        product.storage ? tr(product.storage) : null,
        product.shelf_life ? `Shelf life: ${tr(product.shelf_life)}` : null,
      ].filter(Boolean),
    },
  ].filter((item) => item.lines.length)
  const currentTab = tabs.find((item) => item.id === tab) || tabs[0]

  return (
    <div className='shop-page'>
      <nav className='shop-breadcrumb' aria-label='Breadcrumb'>
        <Link to='/home'>Home</Link>
        <span aria-hidden='true'>/</span>
        <Link to={SHOP_LIST_LINK}>Shop</Link>
        <span aria-hidden='true'>/</span>
        <span>{tr(product.name)}</span>
      </nav>

      <section className='product-main'>
        <div className='product-gallery'>
          <div className='product-gallery-main'>
            <img src={images[activeImage]} alt={tr(product.name)} key={activeImage} />
            {product.badge ? <span className='product-tile-badge'>{tr(product.badge)}</span> : null}
          </div>
          {images.length > 1 ? (
            <div className='product-gallery-thumbs'>
              {images.map((image, index) => (
                <button
                  type='button'
                  key={image + index}
                  className={index === activeImage ? 'active' : ''}
                  onClick={() => setActiveImage(index)}
                  aria-label={`Picture ${index + 1}`}>
                  <img src={image} alt='' />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className='product-info'>
          {category ? (
            <Link to={SHOP_LIST_LINK} className='product-category'>{tr(category.name)}</Link>
          ) : null}
          <h1>{tr(product.name)}</h1>
          {packSize ? <span className='product-size'>Net quantity: {packSize}</span> : null}

          <div className='product-price-row'>
            <ProductPrice product={product} large />
            <span className={`product-stock ${outOfStock ? 'out' : ''}`}>
              {outOfStock ? 'Out of stock' : 'In stock'}
            </span>
          </div>

          <p className='product-short'>{tr(product.short_description)}</p>

          {product.highlights && product.highlights.length ? (
            <ul className='product-highlights'>
              {product.highlights.map((item, index) => (
                <li key={index}><Icon name='check' size={16} strokeWidth={2.4} />{tr(item)}</li>
              ))}
            </ul>
          ) : null}

          <div className='product-buy'>
            <div className='qty-stepper' aria-label='Quantity'>
              <button type='button' onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label='Decrease quantity'>−</button>
              <span aria-live='polite'>{quantity}</span>
              <button type='button' onClick={() => setQuantity(Math.min(99, quantity + 1))} aria-label='Increase quantity'>+</button>
            </div>
            <Link to={comingSoonLink(product, 'cart')} className={`shop-btn ghost ${outOfStock ? 'disabled' : ''}`}>
              <Icon name='cart' size={18} /> Add to cart
            </Link>
            <Link to={comingSoonLink(product, 'buy')} className={`shop-btn solid ${outOfStock ? 'disabled' : ''}`}>
              Buy now
            </Link>
          </div>

          <a href={whatsappLink} target='_blank' rel='noreferrer' className='product-whatsapp'>
            <svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
              <path d='M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3Z' />
            </svg>
            Or order this on WhatsApp
          </a>

          <ul className='product-assurance'>
            <li><Icon name='sunrise' size={20} /> Fresh from our farm</li>
            <li><Icon name='truck' size={20} /> Doorstep delivery</li>
            <li><Icon name='shield' size={20} /> Hygienically packed</li>
          </ul>
        </div>
      </section>

      {tabs.length ? (
        <section className='product-tabs'>
          <div className='product-tab-buttons' role='tablist'>
            {tabs.map((item) => (
              <button
                type='button'
                role='tab'
                key={item.id}
                aria-selected={currentTab.id === item.id}
                className={currentTab.id === item.id ? 'active' : ''}
                onClick={() => setTab(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
          <div className='product-tab-panel' role='tabpanel' key={currentTab.id}>
            {currentTab.steps ? (
              <ol>
                {currentTab.lines.map((line, index) => <li key={index}>{line}</li>)}
              </ol>
            ) : (
              currentTab.lines.map((line, index) => <p key={index}>{line}</p>)
            )}
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section className='product-related'>
          <div className='product-related-head'>
            <h2>You may also like</h2>
            <Link to={SHOP_LIST_LINK} className='text-link'>
              All products <Icon name='arrow' size={18} strokeWidth={2.2} />
            </Link>
          </div>
          <div className='product-grid-shop'>
            {related.map((item) => (
              <div className='product-grid-item' key={item.id}><ProductCard product={item} /></div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}

export default ProductDetails
