import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { collection, doc, onSnapshot, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import { db, orderNumber, ORDER_STATUS } from '../firebase'
import { useCustomer } from '../CustomerContext'
import { formatPrice, SHOP_LIST_LINK } from '../../user-panel/pages/Shop/shopHelpers'
import { LOGIN_LINK, ORDERS_LINK } from '../shop'
import { SITE_INFO } from '../../siteInfo'
import '../Customer.scss'

const STEPS = ['placed', 'confirmed', 'packed', 'out_for_delivery', 'delivered']
const placedOn = (value) => {
  const date = value && value.toDate ? value.toDate() : null
  return date ? date.toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : 'Just now'
}

// /account/orders: the customer's orders, updated live as staff move them along
const MyOrders = () => {
  const { user, profile, isLoading, signOut } = useCustomer()
  const [orders, setOrders] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return undefined
    // Sorted here rather than in the query, so Firestore needs no extra index
    const q = query(collection(db, 'orders'), where('customerUid', '==', user.uid))
    return onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      const time = (order) => (order.createdAt && order.createdAt.toMillis ? order.createdAt.toMillis() : Date.now())
      list.sort((a, b) => time(b) - time(a))
      setOrders(list)
    }, () => setError('Could not load your orders. Please refresh the page.'))
  }, [user])

  if (isLoading) return <div className='customer-page'><p className='customer-lead center'>Loading…</p></div>
  if (!user) return <Navigate to={`${LOGIN_LINK}?next=${ORDERS_LINK}`} replace />

  const cancel = async (order) => {
    if (!window.confirm(`Cancel order ${orderNumber(order.id)}?`)) return
    try {
      await updateDoc(doc(db, 'orders', order.id), { status: 'cancelled', updatedAt: serverTimestamp() })
    } catch (e) {
      alert(`This order can no longer be cancelled online. Please call us on ${SITE_INFO.phoneDisplay}.`)
    }
  }

  const who = (profile && profile.name) || user.displayName || user.email || user.phoneNumber

  return (
    <div className='customer-page'>
      <div className='customer-wrap'>
        <div className='orders-head'>
          <div>
            <h1 className='customer-title'>My orders</h1>
            <p className='customer-lead'>Signed in as {who}</p>
          </div>
          <button type='button' className='shop-btn ghost' onClick={signOut}>Sign out</button>
        </div>

        {error ? <p className='form-error'>{error}</p> : null}
        {orders === null ? <p className='customer-lead'>Loading your orders…</p> : null}
        {orders && !orders.length ? (
          <div className='customer-card center'>
            <h2>No orders yet</h2>
            <p className='customer-lead'>When you place an order it shows up here, with its delivery status.</p>
            <Link to={SHOP_LIST_LINK} className='shop-btn solid'>Go to the shop</Link>
          </div>
        ) : null}

        {(orders || []).map((order) => {
          const step = STEPS.indexOf(order.status)
          return (
            <article className='customer-card order-card' key={order.id}>
              <div className='order-top'>
                <div>
                  <strong className='order-no'>{orderNumber(order.id)}</strong>
                  <span className='order-date'>{placedOn(order.createdAt)}</span>
                </div>
                <span className={`order-status s-${order.status}`}>{ORDER_STATUS[order.status] || order.status}</span>
              </div>
              {order.status !== 'cancelled' ? (
                <ol className='order-steps' aria-label='Delivery progress'>
                  {STEPS.map((key, index) => <li key={key} className={index <= step ? 'done' : ''}><span>{ORDER_STATUS[key]}</span></li>)}
                </ol>
              ) : null}
              <ul className='order-items'>
                {(order.items || []).map((item, index) => (
                  <li key={index}><span>{item.qty} × {item.name}</span><span>{formatPrice(item.qty * item.price)}</span></li>
                ))}
              </ul>
              <div className='order-bottom'>
                <span>Total <strong>{formatPrice(order.total)}</strong> · pay on delivery</span>
                {order.status === 'placed' ? <button type='button' className='link-btn danger' onClick={() => cancel(order)}>Cancel order</button> : null}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders
