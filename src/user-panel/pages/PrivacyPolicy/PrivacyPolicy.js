import React from 'react'
import LegalPage from '../Legal/LegalPage'
import { PRIVACY_POLICY } from '../Legal/legalContent'

// /privacy-policy (linked from the Google sign-in screen)
const PrivacyPolicy = () => (
  <LegalPage content={PRIVACY_POLICY} otherLink={{ to: '/terms-of-service', label: 'Read our Terms of Service' }} />
)

export default PrivacyPolicy
