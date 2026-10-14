import React from 'react'
import { Link } from 'react-router-dom'
import './Legal.scss'

// Shared layout for the Privacy Policy and Terms of Service pages.
// The text lives in legalContent.js.
const LegalPage = ({ content, otherLink }) => (
  <div className='legal-page'>
    <header className='legal-hero'>
      <span className='eyebrow'>Oval Farms</span>
      <h1>{content.title}</h1>
      <p>Last updated {content.updated}</p>
    </header>

    <article className='legal-body'>
      <p className='legal-intro'>{content.intro}</p>
      {content.sections.map((section) => (
        <section key={section.heading} id={section.id}>
          <h2>{section.heading}</h2>
          {section.body.map((part, index) =>
            Array.isArray(part)
              ? <ul key={index}>{part.map((item) => <li key={item}>{item}</li>)}</ul>
              : <p key={index}>{part}</p>
          )}
        </section>
      ))}
      {otherLink ? <p className='legal-other'><Link to={otherLink.to}>{otherLink.label}</Link></p> : null}
    </article>
  </div>
)

export default LegalPage
