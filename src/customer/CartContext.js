import React, { createContext, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// The shopping cart, kept in this browser so it survives a page reload.
// Each line is { id, qty } where id is the product id from Constants.js.
// Use it in any page: const { lines, count, add, setQty, remove, clear } = useCart()
const STORAGE_KEY = 'ovalfarm_cart'
const CartContext = createContext(null)

const load = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(saved) ? saved.filter((line) => line && line.id !== undefined && line.qty > 0) : []
  } catch (e) {
    return []
  }
}

export const CartProvider = ({ children }) => {
  const [lines, setLines] = useState(load)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(lines)) } catch (e) { /* private mode */ }
  }, [lines])

  const setQty = (id, qty) => {
    const amount = Math.max(0, Math.min(99, Math.round(Number(qty) || 0)))
    setLines((current) => {
      const others = current.filter((line) => String(line.id) !== String(id))
      if (!amount) return others
      const exists = current.some((line) => String(line.id) === String(id))
      return exists
        ? current.map((line) => (String(line.id) === String(id) ? { ...line, qty: amount } : line))
        : [...others, { id, qty: amount }]
    })
  }

  // "Added to cart" message at the bottom of the screen
  const [notice, setNotice] = useState('')
  useEffect(() => {
    if (!notice) return undefined
    const timer = setTimeout(() => setNotice(''), 3000)
    return () => clearTimeout(timer)
  }, [notice])

  // add(id, qty, name): name shows in the "Added to cart" message; leave it out to add quietly
  const add = (id, qty = 1, name = '') => {
    const line = lines.find((item) => String(item.id) === String(id))
    setQty(id, (line ? line.qty : 0) + qty)
    if (name) setNotice(name)
  }

  const remove = (id) => setQty(id, 0)
  const clear = () => setLines([])
  const count = lines.reduce((total, line) => total + line.qty, 0)

  return (
    <CartContext.Provider value={{ lines, count, add, setQty, remove, clear }}>
      {children}
      {notice ? (
        <div className='cart-toast' role='status'>
          <span>Added {notice} to your cart</span>
          <Link to='/cart' onClick={() => setNotice('')}>View cart</Link>
        </div>
      ) : null}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
