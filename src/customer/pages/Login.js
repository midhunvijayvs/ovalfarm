import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  GoogleAuthProvider, RecaptchaVerifier, createUserWithEmailAndPassword, sendPasswordResetEmail,
  signInWithEmailAndPassword, signInWithPhoneNumber, signInWithPopup, updateProfile,
} from 'firebase/auth'
import { auth, authMessage, shopIsOnline } from '../firebase'
import { useCustomer, rememberSignUpName } from '../CustomerContext'
import { ORDERS_LINK } from '../shop'
import '../Customer.scss'

// /account/login?next=/checkout
// Sign in or create an account with a mobile OTP, Google, or email and password.
const Login = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const next = new URLSearchParams(search).get('next') || ORDERS_LINK
  const { user, isLoading } = useCustomer()

  const [method, setMethod] = useState('phone')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [busy, setBusy] = useState(false)

  // Phone
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [confirmation, setConfirmation] = useState(null)
  const recaptcha = useRef(null)

  // Email
  const [isNewAccount, setIsNewAccount] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Already signed in: carry on to where they were going
  useEffect(() => {
    if (!isLoading && user) navigate(next, { replace: true })
  }, [user, isLoading, next, navigate])

  useEffect(() => () => {
    if (recaptcha.current) recaptcha.current.clear()
  }, [])

  const run = async (action) => {
    setError('')
    setNotice('')
    setBusy(true)
    try {
      await action()
    } catch (e) {
      setError(authMessage(e))
    }
    setBusy(false)
  }

  const sendOtp = (event) => {
    event.preventDefault()
    const digits = phone.replace(/\D/g, '').slice(-10)
    if (digits.length !== 10) return setError('Please enter your 10-digit mobile number.')
    return run(async () => {
      if (!recaptcha.current) recaptcha.current = new RecaptchaVerifier(auth, 'recaptcha-box', { size: 'invisible' })
      setConfirmation(await signInWithPhoneNumber(auth, '+91' + digits, recaptcha.current))
      setNotice(`We sent a 6-digit OTP to +91 ${digits}.`)
    })
  }

  const verifyOtp = (event) => {
    event.preventDefault()
    run(() => confirmation.confirm(otp.trim()))
  }

  const google = () => run(() => signInWithPopup(auth, new GoogleAuthProvider()))

  const emailSubmit = (event) => {
    event.preventDefault()
    if (isNewAccount && !name.trim()) return setError('Please enter your name.')
    return run(async () => {
      if (isNewAccount) {
        rememberSignUpName(name.trim())
        const created = await createUserWithEmailAndPassword(auth, email.trim(), password)
        await updateProfile(created.user, { displayName: name.trim() })
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password)
      }
    })
  }

  const forgot = () => {
    if (!email.trim()) return setError('Type your email above, then tap "Forgot password" again.')
    return run(async () => {
      await sendPasswordResetEmail(auth, email.trim())
      setNotice(`We emailed a password reset link to ${email.trim()}.`)
    })
  }

  if (!shopIsOnline()) {
    return (
      <div className='customer-page'>
        <div className='customer-card narrow'>
          <h1>Accounts are coming soon</h1>
          <p>Online ordering isn't open yet. Please order on WhatsApp or by phone for now.</p>
          <Link to='/shop/list' className='shop-btn solid'>Back to the shop</Link>
        </div>
      </div>
    )
  }

  return (
    <div className='customer-page'>
      <div className='customer-card narrow'>
        <span className='eyebrow'>Your account</span>
        <h1>Sign in to order</h1>
        <p className='customer-lead'>New here? Signing in the first time creates your account.</p>

        <button type='button' className='google-btn' onClick={google} disabled={busy}>
          <svg viewBox='0 0 48 48' width='20' height='20' aria-hidden='true'><path fill='#EA4335' d='M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.9 6.1C12.5 13.6 17.8 9.5 24 9.5z' /><path fill='#4285F4' d='M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.8c4.3-4 6.9-9.9 6.9-17.2z' /><path fill='#FBBC05' d='M10.6 28.6A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.6l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.7 10.7l7.9-6.1z' /><path fill='#34A853' d='M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.8c-2.1 1.4-4.8 2.3-8.5 2.3-6.2 0-11.5-4.1-13.4-9.8l-7.9 6.1C6.6 42.6 14.6 48 24 48z' /></svg>
          Continue with Google
        </button>

        <div className='or-line'><span>or</span></div>

        <div className='method-tabs' role='tablist'>
          <button type='button' role='tab' aria-selected={method === 'phone'} className={method === 'phone' ? 'active' : ''} onClick={() => { setMethod('phone'); setError(''); setNotice('') }}>Mobile number</button>
          <button type='button' role='tab' aria-selected={method === 'email'} className={method === 'email' ? 'active' : ''} onClick={() => { setMethod('email'); setError(''); setNotice('') }}>Email</button>
        </div>

        {method === 'phone' ? (
          !confirmation ? (
            <form onSubmit={sendOtp} className='customer-form'>
              <label>
                Mobile number
                <div className='phone-field'>
                  <span>+91</span>
                  <input type='tel' inputMode='numeric' autoComplete='tel-national' placeholder='98765 43210' value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </label>
              <button type='submit' className='shop-btn solid block' disabled={busy}>{busy ? 'Sending…' : 'Send OTP'}</button>
            </form>
          ) : (
            <form onSubmit={verifyOtp} className='customer-form'>
              <label>
                Enter the OTP
                <input type='text' inputMode='numeric' autoComplete='one-time-code' maxLength={6} placeholder='6-digit code' value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} autoFocus />
              </label>
              <button type='submit' className='shop-btn solid block' disabled={busy || otp.length !== 6}>{busy ? 'Checking…' : 'Verify and continue'}</button>
              <button type='button' className='link-btn' onClick={() => { setConfirmation(null); setOtp(''); setNotice('') }}>Change number or resend OTP</button>
            </form>
          )
        ) : (
          <form onSubmit={emailSubmit} className='customer-form'>
            {isNewAccount ? (
              <label>
                Your name
                <input type='text' autoComplete='name' value={name} onChange={(e) => setName(e.target.value)} />
              </label>
            ) : null}
            <label>
              Email
              <input type='email' autoComplete='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
              Password
              <input type='password' autoComplete={isNewAccount ? 'new-password' : 'current-password'} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            </label>
            <button type='submit' className='shop-btn solid block' disabled={busy}>{isNewAccount ? 'Create account' : 'Sign in'}</button>
            <div className='form-links'>
              <button type='button' className='link-btn' onClick={() => { setIsNewAccount(!isNewAccount); setError('') }}>
                {isNewAccount ? 'I already have an account' : 'New customer? Create an account'}
              </button>
              {!isNewAccount ? <button type='button' className='link-btn' onClick={forgot}>Forgot password</button> : null}
            </div>
          </form>
        )}

        {notice ? <p className='form-notice'>{notice}</p> : null}
        {error ? <p className='form-error' role='alert'>{error}</p> : null}
        <div id='recaptcha-box' />
        <p className='customer-fine'>We use your details only to deliver your orders. See our <Link to='/privacy-policy'>Privacy Policy</Link> and <Link to='/terms-of-service'>Terms of Service</Link>.</p>
      </div>
    </div>
  )
}

export default Login
