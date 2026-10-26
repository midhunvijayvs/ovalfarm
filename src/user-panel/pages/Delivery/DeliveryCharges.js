import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '../Home/Icon'
import { useDeliveryZones, ZONE_LABELS, ZONE_ORDER, FAR_ZONE } from '../../../customer/deliveryService'
import { SHOP_LIST_LINK } from '../Shop/shopHelpers'
import { SITE_INFO } from '../../../siteInfo'
import './DeliveryCharges.scss'

// Rings drawn around the farm. The spacing is even so the near ranges stay readable:
// the circles show the order of the ranges, not the distance to scale.
const RINGS = [
  { id: 'z6', r: 196, tone: '#eef4ea' },
  { id: 'z5', r: 160, tone: '#e4efdd' },
  { id: 'z4', r: 124, tone: '#d6e8cc' },
  { id: 'z3', r: 90, tone: '#c4dfb6' },
  { id: 'z2', r: 58, tone: '#aed69c' },
  { id: 'z1', r: 28, tone: '#8ec97a' },
]

const rupees = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`

// /delivery-charges: how the delivery charge is worked out, with the live rates
const DeliveryCharges = () => {
  const { zones, isLoading } = useDeliveryZones()
  const by = (id) => zones.find((zone) => zone.id === id) || {}
  const label = (id) => by(id).label || ZONE_LABELS[id]
  const rate = (id) => {
    const zone = by(id)
    if (zone.paused === true) return 'Not delivering now'
    const perKg = Number(zone.perKg) || 0
    return perKg ? `${rupees(perKg)} per kg` : 'No charge'
  }

  return (
    <div className='delivery-page'>
      <div className='delivery-wrap'>
        <h1>Delivery charges</h1>
        <p className='delivery-lead'>
          We deliver from our farm in Koothali, Kozhikode. What you pay depends on how far your PIN code is from the farm
          and how heavy your order is. Order enough and delivery is free.
        </p>

        <div className='delivery-figure'>
          <svg viewBox='0 0 460 460' role='img' aria-label='Circles showing our delivery ranges around the farm'>
            {RINGS.map((ring) => (
              <circle key={ring.id} cx='230' cy='230' r={ring.r} fill={ring.tone} stroke='#ffffff' strokeWidth='2' />
            ))}
            {RINGS.map((ring) => (
              <text key={ring.id} x='230' y={230 - ring.r + 16} textAnchor='middle' className='ring-label'>{label(ring.id)}</text>
            ))}
            <circle cx='230' cy='230' r='9' fill='#1d9b09' />
            <text x='230' y='252' textAnchor='middle' className='farm-label'>Our farm</text>
          </svg>
          <p className='figure-note'>The circles show the order of the ranges, not the distance to scale.</p>
        </div>

        <div className='delivery-table'>
          <div className='row head'><span>Distance from the farm</span><span>Delivery charge</span><span>Free delivery</span></div>
          {ZONE_ORDER.map((id) => {
            const zone = by(id)
            const freeAbove = Number(zone.freeAbove) || 0
            return (
              <div className={`row ${zone.paused ? 'paused' : ''}`} key={id}>
                <span data-head='Distance from the farm'>{label(id)}{id === FAR_ZONE ? <small> · anywhere else in India</small> : null}</span>
                <span data-head='Delivery charge'>{isLoading ? '…' : rate(id)}</span>
                <span data-head='Free delivery'>{isLoading ? '…' : freeAbove ? `On orders above ${rupees(freeAbove)}` : '—'}</span>
              </div>
            )
          })}
        </div>

        <div className='delivery-steps'>
          <h2>How we work it out</h2>
          <ol>
            <li><strong>Your PIN code</strong> tells us which range you are in.</li>
            <li><strong>The weight of your order</strong> is added up, in kilograms.</li>
            <li><strong>The charge</strong> is the rate per kg for your range, times that weight.</li>
            <li><strong>It is free</strong> when your order is above the amount shown for your range.</li>
          </ol>
          <p className='delivery-fine'>
            You see the exact charge at checkout before you place the order. If we are not delivering to your area yet,
            call us on <a href={SITE_INFO.phoneLink}>{SITE_INFO.phoneDisplay}</a> and we will do our best to help.
          </p>
          <div className='button-row'>
            <Link to={SHOP_LIST_LINK} className='shop-btn solid'><Icon name='cart' size={18} />Shop fresh mushrooms</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeliveryCharges
