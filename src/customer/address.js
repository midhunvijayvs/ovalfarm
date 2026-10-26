// One delivery address per customer, kept on their customer record in the fields the ERP shows
// under Customers → Delivery address. Older accounts kept it in addresses[0]; those are still read.

export const ADDRESS_LINK = '/account/address'

export const EMPTY_ADDRESS = { line1: '', line2: '', landmark: '', city: '', pincode: '', mapUrl: '' }

export const addressOf = (profile) => {
  if (!profile) return EMPTY_ADDRESS
  const flat = {
    line1: profile.addrLine1 || '',
    line2: profile.addrLine2 || '',
    landmark: profile.addrLandmark || '',
    city: profile.addrCity || '',
    pincode: profile.addrPincode || '',
    mapUrl: profile.mapUrl || '',
  }
  if (flat.line1 || flat.city || flat.pincode) return flat
  const old = Array.isArray(profile.addresses) && profile.addresses[0]
  return old ? { ...EMPTY_ADDRESS, ...old } : EMPTY_ADDRESS
}

export const hasAddress = (profile) => {
  const a = addressOf(profile)
  return !!(a.line1 && a.city && /^\d{6}$/.test(String(a.pincode || '').trim()))
}

// One line for the order and for the address card
export const addressText = (address) =>
  [address.line1, address.line2, address.landmark, address.city, address.pincode].map((part) => String(part || '').trim()).filter(Boolean).join(', ')

const trimmed = (value, max = 200) => String(value || '').trim().slice(0, max)

// The address as the customer record keeps it
export const addressFields = (address) => ({
  addrLine1: trimmed(address.line1),
  addrLine2: trimmed(address.line2),
  addrLandmark: trimmed(address.landmark),
  addrCity: trimmed(address.city, 100),
  addrPincode: trimmed(address.pincode, 6),
  mapUrl: /^https?:\/\//i.test(trimmed(address.mapUrl, 500)) ? trimmed(address.mapUrl, 500) : '',
})

// The address as an order keeps it
export const orderAddress = (address) => {
  const fields = addressFields(address)
  return {
    line1: fields.addrLine1,
    line2: fields.addrLine2,
    landmark: fields.addrLandmark,
    city: fields.addrCity,
    pincode: fields.addrPincode,
    mapUrl: fields.mapUrl,
  }
}

// What is still missing, so the forms can say so in plain words
export const addressProblem = (address) => {
  if (!String(address.line1 || '').trim()) return 'Please enter your house name or number and street.'
  if (!String(address.city || '').trim()) return 'Please enter your town or city.'
  if (!/^\d{6}$/.test(String(address.pincode || '').trim())) return 'Please enter the 6-digit PIN code.'
  if (address.mapUrl && !/^https?:\/\//i.test(String(address.mapUrl).trim())) return 'The Google Maps link should start with https://'
  return ''
}
