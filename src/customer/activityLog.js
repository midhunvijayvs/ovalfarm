import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { auth, db } from './firebase'

// Activity log shared with the ERP (Admins read it there under Activity log): sign-ups,
// sign-ins and every change a customer makes on the website. Browsing is never logged.
// The database rules only accept entries about the signed-in person, stamped with the
// server's time, and nobody can edit or delete them.

let identity = { name: '', phone: '' }
export const setLogIdentity = (profile) => {
  identity = { name: (profile && profile.name) || '', phone: (profile && (profile.phoneE164 || profile.phone)) || '' }
}

// Public address of this device, reported by a free lookup service (a guide, not proof)
let ipPromise = null
const publicIp = () => {
  if (!ipPromise) {
    ipPromise = Promise.race([
      fetch('https://api.ipify.org?format=json').then((r) => r.json()).then((j) => String(j.ip || '')),
      new Promise((resolve) => setTimeout(() => resolve(''), 4000)),
    ]).catch(() => '')
  }
  return ipPromise
}

const device = () => {
  const ua = navigator.userAgent || ''
  const os = /Android/.test(ua) ? 'Android' : /iPhone|iPad/.test(ua) ? 'iPhone/iPad' : /Windows/.test(ua) ? 'Windows' : /Mac OS/.test(ua) ? 'Mac' : /Linux/.test(ua) ? 'Linux' : ''
  const browser = /Edg\//.test(ua) ? 'Edge' : /Chrome\//.test(ua) ? 'Chrome' : /Firefox\//.test(ua) ? 'Firefox' : /Safari\//.test(ua) ? 'Safari' : ''
  return [browser, os].filter(Boolean).join(' on ')
}

// action: 'Signed up', 'Signed in', 'Placed order'… Never throws: logging must not break the shop.
export const logActivity = async (action, { what = '', docId = '', label = '', fields = [], note = '' } = {}) => {
  try {
    const user = auth && auth.currentUser
    if (!user || !db) return
    await addDoc(collection(db, 'logs'), {
      uid: user.uid,
      email: (user.email || '').toLowerCase(),
      at: serverTimestamp(),
      app: 'site',
      action,
      what,
      docId,
      label: String(label || '').slice(0, 120),
      fields,
      note,
      name: identity.name || user.displayName || '',
      phone: identity.phone || user.phoneNumber || '',
      ip: await publicIp(),
      device: device(),
    })
  } catch (error) {
    console.warn('Activity log entry not saved', error)
  }
}
