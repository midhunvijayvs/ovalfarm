import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './WhyMushrooms.scss'
import Icon from '../Home/Icon'
import {
  QUICK_FACTS, BENEFIT_GROUPS, BENEFITS, NUTRITION, DAILY_IDEAS, WHY_US, PROCESS, SOURCES,
} from './whyMushroomsContent'
import { useLanguage } from '../../../i18n/LanguageContext'

const IMAGES = `${process.env.REACT_APP_PUBLIC_IMAGES_URL}/why-mushrooms`

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Adds "is-visible" to elements with the "reveal" class as they scroll into view.
// "deps" re-runs it when the list changes (for example after filtering).
const useRevealOnScroll = (deps = []) => {
  useEffect(() => {
    const elements = document.querySelectorAll('.why-page .reveal:not(.is-visible)')
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

// Moves pictures with the "parallax" class slightly slower than the page scroll
const useParallax = () => {
  useEffect(() => {
    if (prefersReducedMotion()) return
    let frame = null
    const update = () => {
      frame = null
      const viewport = window.innerHeight
      document.querySelectorAll('.why-page .parallax').forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > viewport) return
        // -1 when the element is at the bottom of the screen, +1 at the top
        const progress = (viewport / 2 - (rect.top + rect.height / 2)) / (viewport / 2 + rect.height / 2)
        el.style.setProperty('--shift', `${(progress * 28).toFixed(1)}px`)
      })
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])
}

// Calls back once when the element scrolls into view
const useInView = (ref) => {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
  return inView
}

// A number that counts up from 0 when it comes into view
const CountUp = ({ value, duration = 1400 }) => {
  const ref = useRef(null)
  const inView = useInView(ref)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (prefersReducedMotion() || value === 0) {
      setCurrent(value)
      return
    }
    let frame
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setCurrent(Math.round(value * eased))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, duration])

  return <span ref={ref}>{current}</span>
}

// Hand-drawn style mushroom used as decoration
const MushroomArt = ({ className }) => (
  <svg className={className} viewBox='0 0 200 200' aria-hidden='true'>
    <path className='cap' d='M20 96c0-44 36-74 80-74s80 30 80 74c0 6-5 10-11 10H31c-6 0-11-4-11-10Z' />
    <g className='spots'>
      <ellipse cx='70' cy='60' rx='10' ry='7' />
      <ellipse cx='118' cy='46' rx='13' ry='8' />
      <ellipse cx='146' cy='78' rx='8' ry='6' />
      <ellipse cx='96' cy='84' rx='7' ry='5' />
    </g>
    <path className='gills' d='M40 106c18 8 102 8 120 0' />
    <path className='stem' d='M78 106c-4 30-8 54-10 70 0 6 4 10 10 10h44c6 0 10-4 10-10-2-16-6-40-10-70Z' />
    <path className='ring' d='M80 128c12 6 28 6 40 0' />
  </svg>
)

// Little drifting dots in the hero, like spores in the air
const Spores = () => (
  <div className='spores' aria-hidden='true'>
    {Array.from({ length: 14 }).map((_, i) => (
      <span key={i} style={{ '--i': i }} />
    ))}
  </div>
)

const BenefitRow = ({ benefit, index }) => {
  const { tr } = useLanguage()
  const [open, setOpen] = useState(false)
  const flipped = index % 2 === 1
  const panelId = `science-${benefit.id}`

  return (
    <article className={`benefit-row reveal ${flipped ? 'flipped' : ''}`} id={benefit.id}>
      <div className='benefit-media'>
        <div className='benefit-photo parallax'>
          <img src={benefit.image} alt={tr(benefit.title)} loading='lazy' />
        </div>
        <span className='benefit-number' aria-hidden='true'>{String(index + 1).padStart(2, '0')}</span>
        {benefit.stat && (
          <div className='benefit-stat'>
            <strong>{benefit.stat.value}</strong>
            <span>{tr(benefit.stat.label)}</span>
          </div>
        )}
      </div>

      <div className='benefit-body'>
        <span className='benefit-icon'><Icon name={benefit.icon} size={26} /></span>
        <span className='benefit-nutrient'>{tr(benefit.nutrient)}</span>
        <h3>{tr(benefit.title)}</h3>
        <p className='benefit-lead'>{tr(benefit.lead)}</p>

        <button
          type='button'
          className={`science-toggle ${open ? 'open' : ''}`}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen(!open)}>
          <Icon name='flask' size={18} />
          {open ? 'Hide the science' : 'The science'}
          <Icon name='plus' size={16} className='toggle-plus' />
        </button>

        <div className={`science-panel ${open ? 'open' : ''}`} id={panelId}>
          <div className='science-inner'>
            <ul>
              {benefit.points.map((point, i) => (
                <li key={i}><Icon name='check' size={16} strokeWidth={2.4} />{tr(point)}</li>
              ))}
            </ul>
            {benefit.footnote && <p className='benefit-footnote'>{tr(benefit.footnote)}</p>}
          </div>
        </div>
      </div>
    </article>
  )
}

const NutritionBars = () => {
  const ref = useRef(null)
  const inView = useInView(ref)
  return (
    <ul className={`nutrition-bars ${inView ? 'in-view' : ''}`} ref={ref}>
      {NUTRITION.map((item, i) => (
        <li key={item.label} style={{ '--dv': `${Math.min(item.dv * 2.5, 100)}%`, '--delay': `${i * 90}ms` }}>
          <div className='bar-label'>
            <span>{item.label}</span>
            <span className='bar-amount'>{item.amount} <b>{item.dv}%</b></span>
          </div>
          <div className='bar-track'><div className='bar-fill' /></div>
        </li>
      ))}
    </ul>
  )
}

const WhyMushrooms = () => {
  const { tr } = useLanguage()
  const [group, setGroup] = useState('all')
  const heroRef = useRef(null)

  const visibleBenefits = group === 'all' ? BENEFITS : BENEFITS.filter((b) => b.group === group)

  useRevealOnScroll([group])
  useParallax()

  // The hero photos follow the mouse a little
  const handlePointerMove = (event) => {
    const hero = heroRef.current
    if (!hero || prefersReducedMotion() || event.pointerType === 'touch') return
    const rect = hero.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    hero.style.setProperty('--mx', x.toFixed(3))
    hero.style.setProperty('--my', y.toFixed(3))
  }

  const chooseGroup = (id) => {
    setGroup(id)
    const list = document.getElementById('benefits-list')
    if (list && list.getBoundingClientRect().top < 0) {
      list.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className='why-page'>

      {/* ---------- Hero ---------- */}
      <section className='why-hero' ref={heroRef} onPointerMove={handlePointerMove}>
        <Spores />
        <div className='why-hero-inner'>
          <div className='why-hero-text'>
            <span className='eyebrow'>Why Mushrooms</span>
            <h1>Small mushroom. <em>Big science.</em></h1>
            <p>
              Mushrooms are one of the most nutritious foods you can eat every day. Here is what
              research says a daily serving can do for your body, from protein and immunity to
              heart, gut and brain health.
            </p>
            <div className='why-hero-actions'>
              <a href='#benefits' className='btn-primary'>
                Explore the benefits <Icon name='arrow' size={18} strokeWidth={2.2} />
              </a>
              <a href='#why-us' className='btn-outline'>Why buy from us</a>
            </div>
          </div>

          <div className='why-hero-art' aria-hidden='true'>
            <MushroomArt className='hero-mushroom' />
            <div className='hero-photo photo-a'><img src={`${IMAGES}/minerals.jpg`} alt='' /></div>
            <div className='hero-photo photo-b'><img src={`${IMAGES}/protein.jpg`} alt='' /></div>
            <div className='hero-photo photo-c'><img src={`${IMAGES}/antioxidants.jpg`} alt='' /></div>
            <div className='hero-badge badge-a'><Icon name='leaf' size={18} /> 100% vegan</div>
            <div className='hero-badge badge-b'><Icon name='bolt' size={18} /> 33 kcal / 100 g</div>
          </div>
        </div>

        <div className='quick-facts'>
          {QUICK_FACTS.map((fact) => (
            <div className='fact reveal' key={tr(fact.label)}>
              <strong>
                <CountUp value={fact.value} />{fact.suffix}
                {fact.unit && <small>{fact.unit}</small>}
              </strong>
              <span>{tr(fact.label)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Benefits ---------- */}
      <section className='why-benefits' id='benefits'>
        <div className='section-head reveal'>
          <span className='eyebrow'>Backed by research</span>
          <h2>{BENEFITS.length} reasons to eat mushrooms every day</h2>
          <p>
            Tap <b>The science</b> on any benefit to see what the studies found. Pick a topic to
            see only the benefits you care about.
          </p>
        </div>

        <div className='group-chips' role='tablist' aria-label='Filter benefits'>
          {BENEFIT_GROUPS.map((g) => {
            const count = g.id === 'all' ? BENEFITS.length : BENEFITS.filter((b) => b.group === g.id).length
            return (
              <button
                key={g.id}
                type='button'
                role='tab'
                aria-selected={group === g.id}
                className={group === g.id ? 'active' : ''}
                onClick={() => chooseGroup(g.id)}>
                {tr(g.label)} <span className='chip-count'>{count}</span>
              </button>
            )
          })}
        </div>

        <div className='benefit-list' id='benefits-list' key={group}>
          {visibleBenefits.map((benefit, index) => (
            <BenefitRow benefit={benefit} index={index} key={benefit.id} />
          ))}
        </div>
      </section>

      {/* ---------- Nutrition at a glance ---------- */}
      <section className='why-nutrition'>
        <div className='why-nutrition-inner'>
          <div className='nutrition-text reveal'>
            <span className='eyebrow light'>Nutrition at a glance</span>
            <h2>What 100 g of fresh mushrooms gives you</h2>
            <p>
              The bars show the share of your daily need met by a single 100 g serving, about one
              cup of sliced mushrooms. All this for just 33 kcal.
            </p>
            <MushroomArt className='nutrition-mushroom' />
          </div>
          <div className='nutrition-card reveal'>
            <NutritionBars />
            <p className='nutrition-note'>% of daily value, approximate. Source: USDA FoodData Central.</p>
          </div>
        </div>
      </section>

      {/* ---------- Make it daily ---------- */}
      <section className='why-daily'>
        <div className='section-head row reveal'>
          <div>
            <span className='eyebrow'>Make it a habit</span>
            <h2>Easy ways to eat mushrooms every day</h2>
          </div>
          <Link to='/recipies/list' className='text-link'>
            Get the recipes <Icon name='arrow' size={18} strokeWidth={2.2} />
          </Link>
        </div>
        <ol className='daily-ideas'>
          {DAILY_IDEAS.map((idea, i) => (
            <li className='reveal' key={tr(idea.time)} style={{ transitionDelay: `${i * 90}ms` }}>
              <span className='daily-icon'><Icon name={idea.icon} size={24} /></span>
              <span className='daily-time'>{tr(idea.time)}</span>
              <p>{tr(idea.text)}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- Why buy from us ---------- */}
      <section className='why-us' id='why-us'>
        <div className='section-head reveal'>
          <span className='eyebrow light'>Why buy from us</span>
          <h2>Fresh from Oval Farms, the way mushrooms should be</h2>
          <p>Grown, picked and packed by us in Kozhikode, so you get every bit of the goodness above.</p>
        </div>

        <div className='why-us-grid'>
          {WHY_US.map((item, i) => (
            <div className='why-us-card reveal' key={tr(item.title)} style={{ transitionDelay: `${(i % 3) * 90}ms` }}>
              <span className='why-us-icon'><Icon name={item.icon} size={28} /></span>
              <h3>{tr(item.title)}</h3>
              <p>{tr(item.text)}</p>
            </div>
          ))}
        </div>

        <div className='process reveal'>
          <h3 className='process-title'>From our farm to your plate</h3>
          <ol className='process-steps'>
            {PROCESS.map((step, i) => (
              <li key={tr(step.title)} style={{ '--step': i }}>
                <span className='process-dot'><Icon name={step.icon} size={22} /></span>
                <strong>{tr(step.title)}</strong>
                <span>{tr(step.text)}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Sources ---------- */}
      <section className='why-sources'>
        <details>
          <summary>
            <Icon name='flask' size={18} /> Studies and sources behind this page
          </summary>
          <ol>
            {SOURCES.map((source) => <li key={source}>{source}</li>)}
          </ol>
        </details>
        <p className='disclaimer'>
          This page is for general information and is not medical advice. If you have a health
          condition, please talk to your doctor about your diet.
        </p>
      </section>
    </div>
  )
}

export default WhyMushrooms
