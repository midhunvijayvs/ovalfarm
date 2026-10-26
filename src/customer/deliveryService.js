import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from './firebase'

// Delivery charges by distance. The ERP (Delivery → Pincodes & charges) keeps one document per
// distance range in the public "delivery" collection: which pincodes it covers, the order value
// above which delivery is free, the charge per kg below that, and whether we deliver there at all.
// A pincode that is in no range counts as the farthest one.

export const FAR_ZONE = 'z7'
export const DELIVERY_INFO_LINK = '/delivery-charges'

export const ZONE_ORDER = ['z1', 'z2', 'z3', 'z4', 'z5', 'z6', FAR_ZONE]
export const ZONE_LABELS = {
  z1: '1–8 km', z2: '8–25 km', z3: '25–50 km', z4: '50–100 km',
  z5: '100–300 km', z6: '300–500 km', z7: 'Above 500 km',
}

export const isPincode = (value) => /^\d{6}$/.test(String(value || '').trim())

// '673501-673586' or '673525' -> [from, to]
const span = (entry) => {
  const [from, to = from] = String(entry || '').split('-').map((part) => part.trim())
  return isPincode(from) && isPincode(to) ? [Number(from), Number(to)] : null
}

const covers = (zone, pincode) => (zone.pincodes || []).some((entry) => {
  const range = span(entry)
  return range && Number(pincode) >= range[0] && Number(pincode) <= range[1]
})

// Loads the ranges once and keeps them up to date: const { zones, isLoading } = useDeliveryZones()
export const useDeliveryZones = () => {
  const [zones, setZones] = useState([])
  const [isLoading, setLoading] = useState(!!db)

  useEffect(() => {
    if (!db) return undefined
    return onSnapshot(collection(db, 'delivery'), (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      list.sort((a, b) => ZONE_ORDER.indexOf(a.id) - ZONE_ORDER.indexOf(b.id))
      setZones(list)
      setLoading(false)
    }, () => setLoading(false))
  }, [])

  return { zones, isLoading }
}

export const zoneForPincode = (zones, pincode) => {
  if (!isPincode(pincode) || !zones.length) return null
  return zones.find((zone) => zone.id !== FAR_ZONE && covers(zone, pincode))
    || zones.find((zone) => zone.id === FAR_ZONE)
    || null
}

// What a product weighs, as the ERP works it out for the catalog
export const itemWeight = (product, qty) => (Number(product.weight_kg) || 0) * qty

// The delivery charge for an order: { zone, label, charge, free, paused, note }
export const deliveryQuote = (zones, pincode, weightKg, orderValue) => {
  const zone = zoneForPincode(zones, pincode)
  if (!zone) return { zone: null, label: '', charge: 0, free: false, paused: false, note: '' }
  const label = zone.label || ZONE_LABELS[zone.id] || ''
  const freeAbove = Number(zone.freeAbove) || 0
  const perKg = Number(zone.perKg) || 0
  if (zone.paused === true) return { zone, label, charge: 0, free: false, paused: true, note: `Sorry, we are not delivering to this area (${label} from our farm) at the moment.` }
  if (freeAbove > 0 && Number(orderValue) >= freeAbove) return { zone, label, charge: 0, free: true, paused: false, note: `Free delivery on orders of ₹${freeAbove} and above.` }
  const charge = Math.round(perKg * Math.max(Number(weightKg) || 0, 0))
  const more = freeAbove > 0 ? ` Free above ₹${freeAbove}.` : ''
  return { zone, label, charge, free: charge === 0, paused: false, note: charge ? `${label} from our farm, ₹${perKg} per kg.${more}` : `No delivery charge for this order.${more}` }
}
