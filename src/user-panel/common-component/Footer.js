import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
import { NAV_LINKS } from "./navLinks";
import { SITE_INFO } from "../../siteInfo";

const IMAGES = process.env.REACT_APP_PUBLIC_IMAGES_URL;

const PRODUCT_LINKS = [
  "White Oyster Mushrooms",
  "Grey Oyster Mushrooms",
  "Dried Mushrooms",
  "Mushroom Powder",
  "Mushroom Spawn",
  "Ready-to-grow Beds",
];

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-cta">
        <div className="footer-cta-inner">
          <div>
            <h2>Fresh from our farm to your kitchen.</h2>
            <p>Order today and get farm-fresh oyster mushrooms delivered to your door.</p>
          </div>
          <div className="footer-cta-actions">
            <a href={SITE_INFO.whatsappLink} target="_blank" rel="noreferrer" className="cta-whatsapp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z" />
              </svg>
              Order on WhatsApp
            </a>
            <a href={SITE_INFO.phoneLink} className="cta-call">Call {SITE_INFO.phoneDisplay}</a>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-brand">
          <img src={`${IMAGES}/footer/oval-logo-light.svg`} alt="Oval Hi-Tech Farm" />
          <p>
            A hi-tech mushroom farm near Perambra in Kozhikode, Kerala. We grow and
            deliver fresh oyster mushrooms and nutritious farm products for your
            family's everyday health.
          </p>
        </div>

        <div className="footer-col">
          <h3>Explore</h3>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.to}><Link to={link.to}>{link.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3>Our Products</h3>
          <ul>
            {PRODUCT_LINKS.map((name) => (
              <li key={name}><Link to="/home#products">{name}</Link></li>
            ))}
          </ul>
        </div>

        <div className="footer-col contact">
          <h3>Get in Touch</h3>
          <ul>
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.8" /></svg>
              <span>{SITE_INFO.address}</span>
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
              <a href={SITE_INFO.phoneLink}>{SITE_INFO.phoneDisplay}</a>
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" /><path d="m3.5 6 8.5 7 8.5-7" stroke="currentColor" strokeWidth="1.8" /></svg>
              <a href={`mailto:${SITE_INFO.email}`}>{SITE_INFO.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {SITE_INFO.fullName}. All rights reserved.</span>
        <span>Grown with care in Kozhikode, Kerala 🌱</span>
      </div>
    </footer>
  );
};

export default Footer;
