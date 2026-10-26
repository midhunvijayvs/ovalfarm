import React, { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Icon from '../../user-panel/pages/Home/Icon'
import { useCustomer } from '../CustomerContext'
import { LOGIN_LINK, CHECKOUT_LINK } from '../shop'
import { ADDRESS_LINK, EMPTY_ADDRESS, addressOf, addressFields, addressProblem, addressText, hasAddress } from '../address'
import { useDeliveryZones, deliveryQuote, isPincode, DELIVERY_INFO_LINK } from '../deliveryService'
import '../Customer.scss'

// /account/address: the one delivery address we keep for a customer. Checkout sends people here
// to add or change it, and back again once it is saved.
const Address = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, profile, isLoading, saveProfile } = useCustomer()
  const { zones } = useDeliveryZones()
  const fromCheckout = new URLSearchParams(location.search).get('next') === CHECKOUT_LINK

  const [address, setAddress] = useState(EMPTY_ADDRESS)
  const [editing, setEditing] = useState(false)
  const [started, setStarted] = useState(false)
  const [locating, setLocating] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [busy, setBusy] = useState(false)

  // Fill the form with the saved address, and open it straight away when there is nothing saved yet
  useEffect(() => {
    if (!profile || started) return
    setAddress(addressOf(profile))
    setEditing(!hasAddress(profile))
    setStarted(true)
  }, [profile, started])

  if (isLoading) return <div className='customer-page'><p className='customer-lead center'>Loading…</p></div>
  if (!user) return <Navigate to={`${LOGIN_LINK}?next=${ADDRESS_LINK}`} replace />

  const setField = (key) => (event) => { setAddress({ ...address, [key]: event.target.value }); setSaved(false) }

  const useMyLocation = () => {
    if (!navigator.geolocation) return setError('This browser cannot find your location. You can paste a Google Maps link instead.')
    setError('')
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const link = `https://www.google.com/maps?q=${coords.latitude.toFixed(6)},${coords.longitude.toFixed(6)}`
        setAddress((current) => ({ ...current, mapUrl: link }))
        setLocating(false)
        setSaved(false)
      },
      () => { setLocating(false); setError('We could not get your location. Please allow location access, or paste a Google Maps link.') },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  const save = async (event) => {
    event.preventDefault()
    const problem = addressProblem(address)
    if (problem) return setError(problem)
    setError('')
    setBusy(true)
    try {
      await saveProfile(addressFields(address))
      setEditing(false)
      setSaved(true)
      if (fromCheckout) navigate(CHECKOUT_LINK)
    } catch (e) {
      console.error(e)
      setError('Sorry, your address could not be saved. Please check your internet connection and try again.')
    }
    setBusy(false)
  }

  const quote = isPincode(address.pincode) ? deliveryQuote(zones, address.pincode, 1, 0) : null

  return (
    <div className='customer-page'>
      <div className='customer-wrap narrow-wrap'>
        <h1 className='customer-title'>My address</h1>
        <p className='customer-lead'>We deliver to this address and keep it for your next order. You can change it any time.</p>

        <div className='customer-card'>
          {editing ? (
            <form className='customer-form grid' onSubmit={save}>
              <label className='wide'>House name / number and street<input type='text' autoComplete='address-line1' value={address.line1} onChange={setField('line1')} /></label>
              <label className='wide'>Area or locality (optional)<input type='text' autoComplete='address-line2' value={address.line2} onChange={setField('line2')} /></label>
              <label>Landmark (optional)<input type='text' value={address.landmark} onChange={setField('landmark')} /></label>
              <label>Town / city<input type='text' autoComplete='address-level2' value={address.city} onChange={setField('city')} /></label>
              <label>PIN code<input type='text' inputMode='numeric' autoComplete='postal-code' maxLength={6} value={address.pincode} onChange={setField('pincode')} /></label>
              <div className='wide map-field'>
                <label>Google Maps location (optional)<input type='url' placeholder='https://maps.google.com/…' value={address.mapUrl} onChange={setField('mapUrl')} /></label>
                <button type='button' className='shop-btn ghost' onClick={useMyLocation} disabled={locating}>
                  <Icon name='pin' size={18} />{locating ? 'Finding you…' : 'Use my current location'}
                </button>
                <p className='customer-fine'>This helps our delivery person find you. Stand at your gate and tap the button, or paste a link from the Google Maps app.</p>
              </div>
              {quote ? <p className={`delivery-hint wide ${quote.paused ? 'warn' : ''}`}>{quote.paused ? quote.note : `We deliver here: ${quote.label} from our farm.`} <Link to={DELIVERY_INFO_LINK}>See how our delivery charges work</Link></p> : null}
              {error ? <p className='form-error wide' role='alert'>{error}</p> : null}
              <div className='wide button-row'>
                <button type='submit' className='shop-btn solid' disabled={busy}>{busy ? 'Saving…' : fromCheckout ? 'Save and go to checkout' : 'Save'}</button>
                {hasAddress(profile) ? <button type='button' className='shop-btn ghost' onClick={() => { setAddress(addressOf(profile)); setEditing(false); setError('') }}>Cancel</button> : null}
              </div>
            </form>
          ) : (
            <>
              <div className='address-card'>
                <span className='address-icon'><Icon name='pin' size={20} /></span>
                <div>
                  <p className='address-text'>{addressText(address)}</p>
                  {address.mapUrl ? <a className='map-link' href={address.mapUrl} target='_blank' rel='noreferrer'>Open in Google Maps</a> : <span className='customer-fine'>No map location added yet.</span>}
                  {quote && !quote.paused ? <p className='customer-fine'>{quote.label} from our farm. <Link to={DELIVERY_INFO_LINK}>See how our delivery charges work</Link></p> : null}
                  {quote && quote.paused ? <p className='form-error'>{quote.note}</p> : null}
                </div>
              </div>
              {saved ? <p className='saved-note'><Icon name='check' size={16} /> Address saved</p> : null}
              <div className='button-row'>
                <button type='button' className='shop-btn solid' onClick={() => { setEditing(true); setSaved(false) }}>Edit address</button>
                {fromCheckout ? <Link to={CHECKOUT_LINK} className='shop-btn ghost'>Back to checkout</Link> : null}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Address
