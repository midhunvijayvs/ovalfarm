import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.scss'
import Icon from './Icon'
import { HIGHLIGHTS, BENEFITS } from './homeContent'
import { useLanguage } from '../../../i18n/LanguageContext'
import { useRecipes, recipeLink } from '../Recipes/recipeHelpers'
import { useProducts, productLink, formatPackSize, SHOP_LIST_LINK } from '../Shop/shopHelpers'
import ProductPrice from '../Shop/ProductPrice'
import { ORDER_LINK } from '../../common-component/navLinks'

const IMAGES = process.env.REACT_APP_PUBLIC_IMAGES_URL

// Fades sections in as they scroll into view (elements with the "reveal" class).
// "deps" re-runs it when content loads later, such as the products.
const useRevealOnScroll = (deps = []) => {
  useEffect(() => {
    const elements = document.querySelectorAll('.home-page .reveal:not(.is-visible)')
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

// A horizontally scrolling row with previous / next buttons
const ScrollRow = ({ className, children, label }) => {
  const rowRef = useRef(null)
  const scrollBy = (direction) => {
    const row = rowRef.current
    if (!row) return
    const card = row.firstElementChild
    const step = card ? card.getBoundingClientRect().width + 20 : row.clientWidth * 0.8
    row.scrollBy({ left: direction * step, behavior: 'smooth' })
  }
  return (
    <div className={`scroll-row-wrap ${className || ''}`}>
      <div className='scroll-row' ref={rowRef} role='list' aria-label={label}>
        {children}
      </div>
      <div className='scroll-row-buttons'>
        <button onClick={() => scrollBy(-1)} aria-label='Previous'><Icon name='arrowLeft' size={20} /></button>
        <button onClick={() => scrollBy(1)} aria-label='Next'><Icon name='arrow' size={20} /></button>
      </div>
    </div>
  )
}

const Home = () => {
  const { recipes } = useRecipes()
  const { products } = useProducts()
  const featuredProducts = products.filter((product) => product.is_featured)
  useRevealOnScroll([featuredProducts.length])
  const { tr } = useLanguage()

  // The "4" in FOOD 4 HEALTH spins when you scroll back up
  const [spinFour, setSpinFour] = useState(false)
  useEffect(() => {
    let lastY = window.scrollY
    const handleScroll = () => {
      const y = window.scrollY
      setSpinFour(y < lastY)
      lastY = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='home-page'>

      {/* ---------- Hero ---------- */}
      <section className='hero'>
        <picture className='hero-bg'>
          <source media='(max-width: 767px)' srcSet={`${IMAGES}/home/hero-mob.jpg`} />
          <source media='(max-width: 1200px)' srcSet={`${IMAGES}/home/hero-1100.jpg`} />
          <img src={`${IMAGES}/home/hero-1920.jpg`} alt='' />
        </picture>
        <div className='hero-overlay'></div>

        <div className='hero-content'>
          <span className='hero-eyebrow'>
            <Icon name='mushroom' size={16} /> Oval Hi-Tech Farms · Kozhikode
          </span>
          <h1>
            Health for <em>those who matter.</em>
          </h1>
          <p>
            Fresh oyster mushrooms and nutritious mushroom products, grown on our
            hi-tech farm and delivered to your doorstep.
          </p>
          <div className='hero-actions'>
            <Link to={ORDER_LINK} className='btn-primary'>
              Buy Fresh Mushrooms <Icon name='arrow' size={18} strokeWidth={2.2} />
            </Link>
            <Link to={SHOP_LIST_LINK} className='btn-ghost'>Explore Products</Link>
          </div>
        </div>
      </section>

      {/* ---------- Highlights ---------- */}
      <section className='highlights'>
        <div className='highlights-inner reveal'>
          {HIGHLIGHTS.map((item) => (
            <div className='highlight' key={item.title}>
              <span className='icon-badge'><Icon name={item.icon} /></span>
              <div>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Products (from the product data in Constants.js) ---------- */}
      <section className='products' id='products'>
        <div className='section-head row reveal'>
          <div>
            <span className='eyebrow'>Our Products</span>
            <h2>From our farm, for your family</h2>
            <p>Fresh, dried and grow-your-own. Everything mushroom, produced with care.</p>
          </div>
          <Link to={SHOP_LIST_LINK} className='text-link'>
            Visit the shop <Icon name='arrow' size={18} strokeWidth={2.2} />
          </Link>
        </div>

        <div className='product-grid'>
          {featuredProducts.map((product, index) => (
            <article className='product-card reveal' key={product.id} style={{ transitionDelay: `${(index % 3) * 80}ms` }}>
              <Link to={productLink(product.id)} className='product-image' tabIndex={-1} aria-hidden='true'>
                <img src={product.images && product.images[0]} alt='' loading='lazy' />
                {product.badge ? <span className='product-tag'>{tr(product.badge)}</span> : null}
              </Link>
              <div className='product-body'>
                <h3><Link to={productLink(product.id)}>{tr(product.name)}</Link></h3>
                <p>{tr(product.short_description)}</p>
                <div className='product-meta'>
                  <ProductPrice product={product} />
                  {formatPackSize(product) ? <span className='product-size'>{formatPackSize(product)}</span> : null}
                </div>
                <Link to={productLink(product.id)} className='product-link'>
                  View product <Icon name='arrow' size={16} strokeWidth={2.2} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- Food 4 Health ---------- */}
      <section className='food4health'>
        <div className='food4health-inner reveal'>
          <div className='f4h-word' aria-label='Food for health'>
            <span>FOOD</span>
            <span className={`f4h-four ${spinFour ? 'spin' : ''}`}>4</span>
            <span>HEALTH</span>
          </div>
          <div className='f4h-text'>
            <h2>Health without compromising taste</h2>
            <p>
              You no longer need to give up flavour to stay healthy. Just switch
              to mushrooms! They are tasty, filling and packed with nutrition.
            </p>
            <Link to='/why-mushrooms' className='text-link'>
              See the benefits <Icon name='arrow' size={18} strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Recipes (from the recipe data in Constants.js) ---------- */}
      <section className='recipes' id='recipes'>
        <div className='section-head row reveal'>
          <div>
            <span className='eyebrow'>Mushroom Dishes</span>
            <h2>Kerala favourites, made with mushrooms</h2>
          </div>
          <Link to='/recipies/list' className='text-link'>
            All recipes <Icon name='arrow' size={18} strokeWidth={2.2} />
          </Link>
        </div>
        <ScrollRow className='reveal' label='Mushroom dishes'>
          {recipes.map((recipe, index) => (
            <Link to={recipeLink(recipe.id)} className='dish-card' role='listitem' key={recipe.id}>
              <img src={recipe.image} alt={tr(recipe.name)} loading='lazy' />
              <span className='dish-caption'>
                <span className='dish-number'>{String(index + 1).padStart(2, '0')}</span>
                {tr(recipe.name)}
              </span>
            </Link>
          ))}
        </ScrollRow>
      </section>

      {/* ---------- Benefits ---------- */}
      <section className='benefits' id='benefits'>
        <div className='section-head reveal'>
          <span className='eyebrow'>Why Mushrooms</span>
          <h2>Benefits of mushrooms</h2>
          <p>Small in calories, big on goodness. Here is what a regular serving does for you.</p>
        </div>
        <div className='benefit-grid'>
          {BENEFITS.map((benefit, index) => (
            <div className='benefit-card reveal' key={benefit.title} style={{ transitionDelay: `${(index % 5) * 60}ms` }}>
              <span className='icon-badge'><Icon name={benefit.icon} /></span>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </div>
          ))}
        </div>
        <div className='benefits-more reveal'>
          <Link to='/why-mushrooms' className='btn-primary'>
            Know more <Icon name='arrow' size={18} strokeWidth={2.2} />
          </Link>
        </div>
      </section>

    </div>
  )
}

export default Home
