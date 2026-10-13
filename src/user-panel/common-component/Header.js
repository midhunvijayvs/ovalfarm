import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Header.scss'
import { NAV_LINKS, ORDER_LINK } from './navLinks'

const IMAGES = process.env.REACT_APP_PUBLIC_IMAGES_URL

const Header = () => {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setMenuOpen] = useState(false)

  // Add a shadow once the page is scrolled
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close the mobile menu whenever the page or section changes
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.hash])

  // Stop the page behind the mobile menu from scrolling
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  // A link is active when its page (and section, if any) matches the current URL
  const isActive = (to) => {
    const link = NAV_LINKS.find((item) => item.to === to)
    if (link && link.section) return location.pathname.startsWith(link.section)
    const [path, hash] = to.split('#')
    if (location.pathname !== path) return false
    return hash ? location.hash === `#${hash}` : !location.hash
  }

  return (
    <>
      <div className='announcement-bar'>
        <span>🍄 Fresh oyster mushrooms from our hi-tech farm</span>
        <span className='dot'>•</span>
        <span>Home delivery on orders above 900 g</span>
      </div>

      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} id='header'>
        <div className='header-inner'>
          <Link to='/home' className='brand' aria-label='Oval Farms home'>
            <img src={`${IMAGES}/header/oval-logo.svg`} alt='Oval Hi-Tech Farm' />
          </Link>

          <nav className='main-nav' aria-label='Main menu'>
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={() => (isActive(link.to) ? 'active' : '')}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className='header-actions'>
            <Link to={ORDER_LINK} className='order-btn'>
              Order Now
              <svg width='16' height='16' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
                <path d='M5 12h14M13 6l6 6-6 6' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </Link>
            <button
              className={`menu-btn ${isMenuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)}>
        <nav className='mobile-menu-panel' onClick={(e) => e.stopPropagation()} aria-label='Mobile menu'>
          {NAV_LINKS.map((link, index) => (
            <Link
              key={link.to}
              to={link.to}
              className={isActive(link.to) ? 'active' : ''}
              style={{ transitionDelay: isMenuOpen ? `${80 + index * 40}ms` : '0ms' }}>
              {link.label}
            </Link>
          ))}
          <Link to={ORDER_LINK} className='order-btn mobile'>Order Fresh Mushrooms</Link>
          <p className='mobile-menu-note'>Oval Hi-Tech Farms · Perambra, Kozhikode</p>
        </nav>
      </div>
    </>
  )
}

export default Header
