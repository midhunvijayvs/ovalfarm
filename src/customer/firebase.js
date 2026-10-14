import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { FIREBASE_CONFIG } from './firebaseConfig'

// One Firebase connection for the whole site. Both are null until firebaseConfig.js is filled in.
const app = FIREBASE_CONFIG ? initializeApp(FIREBASE_CONFIG) : null
export const auth = app ? getAuth(app) : null
export const db = app ? getFirestore(app) : null

// Local testing only: REACT_APP_FIREBASE_EMULATORS=1 npm start talks to the Firebase emulators on this computer
if (app && process.env.REACT_APP_FIREBASE_EMULATORS === '1') {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
  connectFirestoreEmulator(db, '127.0.0.1', 8080)
}

// True when customers can sign in and order on the website
export const shopIsOnline = () => !!app

// Order statuses, the same as in the Oval Farms ERP
export const ORDER_STATUS = {
  placed: 'Order placed',
  confirmed: 'Confirmed',
  packed: 'Packed',
  out_for_delivery: 'Out for delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}

// Short order number shown to customers and staff, e.g. W-7Q2KX9
export const orderNumber = (id) => 'W-' + String(id).slice(0, 6).toUpperCase()

// Firebase error codes in plain words
export const authMessage = (error) => {
  const code = (error && error.code) || ''
  const messages = {
    'auth/invalid-credential': 'The email or password is wrong.',
    'auth/wrong-password': 'The email or password is wrong.',
    'auth/user-not-found': 'There is no account with this email. Create one below.',
    'auth/email-already-in-use': 'An account with this email already exists. Sign in instead.',
    'auth/weak-password': 'Use at least 6 characters for the password.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/invalid-phone-number': 'Please enter a valid 10-digit mobile number.',
    'auth/invalid-verification-code': 'That OTP is wrong. Please check and try again.',
    'auth/code-expired': 'That OTP has expired. Please request a new one.',
    'auth/too-many-requests': 'Too many attempts. Please wait a few minutes and try again.',
    'auth/popup-closed-by-user': 'The Google window was closed before signing in.',
    'auth/network-request-failed': 'No internet connection. Please try again.',
  }
  return messages[code] || 'Something went wrong. Please try again.'
}
