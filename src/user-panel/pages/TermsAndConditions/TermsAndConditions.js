import React from 'react'
import LegalPage from '../Legal/LegalPage'
import { TERMS_OF_SERVICE } from '../Legal/legalContent'

// /terms-of-service (linked from the Google sign-in screen); /terms-and-conditions shows the same page
const TermsAndConditions = () => (
  <LegalPage content={TERMS_OF_SERVICE} otherLink={{ to: '/privacy-policy', label: 'Read our Privacy Policy' }} />
)

export default TermsAndConditions
