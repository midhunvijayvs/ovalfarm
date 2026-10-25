import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth'
import { collection, doc, getDocs, limit, query, setDoc, updateDoc, where, serverTimestamp } from 'firebase/firestore'
import { auth, db } from './firebase'

// The signed-in website customer and their record in the shared customers list (the same list
// the ERP shows under Customers). Use it in any page: const { user, profile, isLoading } = useCustomer()
// profile.id is the customer record's id, which orders point to as customerId.
const CustomerContext = createContext({ user: null, profile: null, isLoading: false })

// The name typed on the "Create account" form. Firebase signs the new customer in
// before their name is saved on the account, so the profile takes it from here.
let nameFromSignUp = ''
export const rememberSignUpName = (name) => { nameFromSignUp = name }

// Firestore does not accept undefined values, so leave those fields out
const clean = (data) => Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined))

// "+91 98470 12345" -> "+919847012345", the form Firebase uses for phone sign-ins
export const phoneE164 = (phone) => {
  const digits = String(phone || '').replace(/\D/g, '')
  if (digits.length === 10) return '+91' + digits
  if (digits.length === 12 && digits.startsWith('91')) return '+' + digits
  return undefined
}

const firstMatch = async (...conditions) => {
  const snap = await getDocs(query(collection(db, 'customers'), ...conditions, limit(1)))
  return snap.empty ? null : snap.docs[0]
}

// Finds this customer's record, in this order:
//  1. the record already linked to their login (signed up here before, or a login the ERP made for them)
//  2. a record the shop added in the ERP with the same verified email or phone number, which is then linked
//  3. otherwise a new online customer record
const loadProfile = async (signedIn) => {
  const linked = await firstMatch(where('uid', '==', signedIn.uid))
  if (linked) {
    const data = linked.data()
    // First sign-in with a login the ERP made: show them as registered there
    const changes = { lastLoginAt: serverTimestamp(), updatedAt: serverTimestamp() }
    if (data.accountStatus !== 'active') changes.accountStatus = 'active'
    updateDoc(linked.ref, changes).catch(() => {})
    return { ...data, ...changes, id: linked.id }
  }

  const email = signedIn.emailVerified && signedIn.email ? signedIn.email.toLowerCase() : null
  const phone = signedIn.phoneNumber || null
  const claimable = (email && await firstMatch(where('uid', '==', null), where('email', '==', email)).catch(() => null))
    || (phone && await firstMatch(where('uid', '==', null), where('phoneE164', '==', phone)).catch(() => null))
  if (claimable) {
    const changes = { uid: signedIn.uid, accountStatus: 'active', lastLoginAt: serverTimestamp(), updatedAt: serverTimestamp() }
    await updateDoc(claimable.ref, changes)
    return { ...claimable.data(), ...changes, id: claimable.id }
  }

  const fresh = clean({
    name: (signedIn.displayName || nameFromSignUp || '').slice(0, 100),
    phone: phone || undefined,
    phoneE164: phone || undefined,
    email: signedIn.email ? signedIn.email.toLowerCase() : undefined,
    addresses: [],
    channel: 'online',
    uid: signedIn.uid,
    accountStatus: 'active',
    lastLoginAt: serverTimestamp(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  await setDoc(doc(db, 'customers', signedIn.uid), fresh)
  return { ...fresh, id: signedIn.uid }
}

export const CustomerProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(!!auth)

  useEffect(() => {
    if (!auth) return undefined
    return onAuthStateChanged(auth, async (signedIn) => {
      setUser(signedIn)
      if (!signedIn) {
        setProfile(null)
        setIsLoading(false)
        return
      }
      try {
        setProfile(await loadProfile(signedIn))
      } catch (error) {
        console.error('Could not load the customer profile', error)
      }
      setIsLoading(false)
    })
  }, [])

  // Save changes to the profile, e.g. saveProfile({ name, phone, addresses })
  const saveProfile = async (changes) => {
    if (!user || !profile) return
    const data = clean({ ...changes, updatedAt: serverTimestamp() })
    if (changes.phone) data.phoneE164 = phoneE164(changes.phone)
    await updateDoc(doc(db, 'customers', profile.id), clean(data))
    setProfile((current) => ({ ...(current || {}), ...data }))
  }

  const signOut = () => (auth ? firebaseSignOut(auth) : Promise.resolve())

  return (
    <CustomerContext.Provider value={{ user, profile, isLoading, saveProfile, signOut }}>
      {children}
    </CustomerContext.Provider>
  )
}

export const useCustomer = () => useContext(CustomerContext)
