import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './AboutUs.scss'
import Icon from '../Home/Icon'
import {
  ABOUT_HERO, QUICK_FACTS, STORY, VALUES, FLAGSHIP, MUSHROOM_STORY, PROCESS, TEAM, SHOW_TEAM_PHOTOS,
} from './aboutContent'
import { productLink, SHOP_LIST_LINK } from '../Shop/shopHelpers'

const IMAGES = process.env.REACT_APP_PUBLIC_IMAGES_URL

// Fades elements with the "reveal" class in as they scroll into view
const useRevealOnScroll = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.about-page .reveal')
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
  }, [])
}

// A plain, formal person outline (suit and tie), shown while team photos are hidden
const FormalAvatar = () => (
  <span className='team-avatar' aria-hidden='true'>
    <svg viewBox='0 0 160 160'>
      <circle cx='80' cy='62' r='28' fill='#12650a' />
      <path d='M24 160c2-34 26-54 56-54s54 20 56 54Z' fill='#0b2e0d' />
      <path d='M66 106l14 22 14-22Z' fill='#ffffff' />
      <path d='M80 112l-5 8 5 32 5-32Z' fill='#1d9b09' />
    </svg>
  </span>
)

// /about-us
const AboutUs = () => {
  useRevealOnScroll()

  return (
    <div className='about-page'>

      {/* ---------- Hero ---------- */}
      <section className='about-hero'>
        <div className='about-hero-inner'>
          <div className='about-hero-text'>
            <span className='eyebrow'>{ABOUT_HERO.eyebrow}</span>
            <h1>{ABOUT_HERO.title}</h1>
            <p>{ABOUT_HERO.text}</p>
            <div className='about-hero-actions'>
              <Link to={SHOP_LIST_LINK} className='btn-primary'>
                Shop our products <Icon name='arrow' size={18} strokeWidth={2.2} />
              </Link>
              <a href='#team' className='btn-outline'>Meet the team</a>
            </div>
          </div>
          <div className='about-hero-art' aria-hidden='true'>
            <div className='art-photo big'><img src={`${IMAGES}/home/hero-mob.jpg`} alt='' /></div>
            <div className='art-photo small'><img src={`${IMAGES}/home/sec-2-1.jpg`} alt='' /></div>
            <div className='art-badge'>
              <strong>Health</strong>
              <span>for those who matter</span>
            </div>
          </div>
        </div>

        <div className='about-facts'>
          {QUICK_FACTS.map((fact) => (
            <div className='about-fact reveal' key={fact.title}>
              <span className='about-fact-icon'><Icon name={fact.icon} size={24} /></span>
              <div>
                <strong>{fact.title}</strong>
                <span>{fact.text}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Our story ---------- */}
      <section className='about-story'>
        <div className='about-story-inner'>
          <div className='about-story-head reveal'>
            <span className='eyebrow'>Our story</span>
            <h2>Food for people who care what is inside</h2>
            <blockquote>
              “The food that is easiest to cook should also be the food that is best for you.”
            </blockquote>
          </div>
          <div className='about-story-text reveal'>
            {STORY.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
        </div>
      </section>

      {/* ---------- Values ---------- */}
      <section className='about-values'>
        <div className='section-head reveal'>
          <span className='eyebrow'>What we stand for</span>
          <h2>Healthy, honest and easy</h2>
        </div>
        <div className='value-grid'>
          {VALUES.map((value, index) => (
            <div className='value-card reveal' key={value.title} style={{ transitionDelay: `${index * 80}ms` }}>
              <span className='value-number'>{String(index + 1).padStart(2, '0')}</span>
              <span className='value-icon'><Icon name={value.icon} size={26} /></span>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Flagship product ---------- */}
      <section className='about-flagship'>
        <div className='about-flagship-inner reveal'>
          <div className='flagship-image'>
            <img src={FLAGSHIP.image} alt={FLAGSHIP.title} loading='lazy' />
          </div>
          <div className='flagship-text'>
            <span className='eyebrow light'>{FLAGSHIP.eyebrow}</span>
            <h2>{FLAGSHIP.title}</h2>
            <p>{FLAGSHIP.text}</p>
            <ul>
              {FLAGSHIP.points.map((point) => (
                <li key={point}><Icon name='check' size={16} strokeWidth={2.4} />{point}</li>
              ))}
            </ul>
            <p className='flagship-next'>{FLAGSHIP.next}</p>
            <Link to={productLink(FLAGSHIP.productId)} className='btn-light'>
              View the soup premix <Icon name='arrow' size={18} strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Why mushrooms ---------- */}
      <section className='about-mushrooms'>
        <div className='about-mushrooms-inner'>
          <div className='mushroom-photos reveal' aria-hidden='true'>
            {MUSHROOM_STORY.images.map((image, index) => (
              <div className={`mushroom-photo p${index}`} key={image}><img src={image} alt='' loading='lazy' /></div>
            ))}
          </div>
          <div className='mushroom-text reveal'>
            <span className='eyebrow'>{MUSHROOM_STORY.eyebrow}</span>
            <h2>{MUSHROOM_STORY.title}</h2>
            {MUSHROOM_STORY.text.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            <div className='mushroom-facts'>
              {MUSHROOM_STORY.facts.map((fact) => (
                <div key={fact.label}>
                  <strong>{fact.value}<small>{fact.unit}</small></strong>
                  <span>{fact.label}</span>
                </div>
              ))}
            </div>
            <Link to='/why-mushrooms' className='text-link'>
              Read about the health benefits <Icon name='arrow' size={18} strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- How we work ---------- */}
      <section className='about-process'>
        <div className='section-head center reveal'>
          <span className='eyebrow'>How we work</span>
          <h2>From our farm to your kitchen</h2>
        </div>
        <ol className='about-process-steps reveal'>
          {PROCESS.map((step, index) => (
            <li key={step.title} style={{ '--step': index }}>
              <span className='process-dot'><Icon name={step.icon} size={24} /></span>
              <strong>{step.title}</strong>
              <span>{step.text}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- Where we deliver ---------- */}
      <section className='about-delivery'>
        <div className='about-delivery-inner'>
          <div className='delivery-map reveal' aria-hidden='true'>
            <span className='ring r3' />
            <span className='ring r2' />
            <span className='ring r1' />
            <span className='delivery-pin'><Icon name='sprout' size={26} /></span>
            <span className='delivery-label'>30 km</span>
          </div>
          <div className='delivery-text reveal'>
            <span className='eyebrow'>Where we deliver</span>
            <h2>Fresh nearby, packed products everywhere</h2>
            <div className='delivery-cards'>
              <div className='delivery-card'>
                <span className='delivery-icon'><Icon name='truck' size={24} /></span>
                <div>
                  <strong>Fresh mushrooms within 30 km</strong>
                  <p>Perishable items are delivered fresh within about 30 km of our farm near Perambra, Kozhikode.</p>
                </div>
              </div>
              <div className='delivery-card'>
                <span className='delivery-icon'><Icon name='box' size={24} /></span>
                <div>
                  <strong>Everything else, all over India</strong>
                  <p>Dried mushrooms, powders and ready-to-cook products are shipped anywhere in India.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Team ---------- */}
      <section className='about-team' id='team'>
        <div className='section-head center reveal'>
          <span className='eyebrow light'>Meet the team</span>
          <h2>The people behind Oval Farms</h2>
        </div>
        <div className='team-grid'>
          {TEAM.map((member, index) => (
            <article className='team-card reveal' key={member.name} style={{ transitionDelay: `${index * 100}ms` }}>
              <div className='team-photo'>
                {SHOW_TEAM_PHOTOS && member.photo ? (
                  <img src={member.photo} alt={member.name} loading='lazy' />
                ) : (
                  <FormalAvatar />
                )}
              </div>
              <h3>{member.name}</h3>
              <span className='team-role'>{member.role}</span>
              <p className='team-bio'>{member.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AboutUs
