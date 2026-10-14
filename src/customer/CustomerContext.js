import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from './firebase'

// The signed-in website customer and their saved profile (name, phone, addresses).
// Use it in any page: const { user, profile, isLoading } = useCustomer()
const CustomerContext = createContext({ user: null, profile: null, isLoading: false })

// The name typed on the "Create account" form. Firebase signs the new customer in
// before their name is saved on the account, so the profile takes it from here.
let nameFromSignUp = ''
export const rememberSignUpName = (name) => { nameFromSignUp = name }

// Firestore does not accept undefined values, so leave those fields out
const clean = (data) => Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined))

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
        const ref = doc(db, 'customers', signedIn.uid)
        const snap = await getDoc(ref)
        if (snap.exists()) {
          setProfile(snap.data())
        } else {
          // First sign-in: create the customer record the ERP shows under Website Customers
          const fresh = clean({
            name: (signedIn.displayName || nameFromSignUp || '').slice(0, 100),
            phone: signedIn.phoneNumber || undefined,
            email: signedIn.email || undefined,
            addresses: [],
            source: 'website',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          })
          await setDoc(ref, fresh)
          setProfile(fresh)
        }
      } catch (error) {
        console.error('Could not load the customer profile', error)
      }
      setIsLoading(false)
    })
  }, [])

  // Save changes to the profile, e.g. saveProfile({ name, phone, addresses })
  const saveProfile = async (changes) => {
    if (!user) return
    const data = clean({ ...changes, updatedAt: serverTimestamp() })
    await updateDoc(doc(db, 'customers', user.uid), data)
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
