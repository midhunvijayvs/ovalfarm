// Firebase settings for online orders and customer accounts.
// Paste the firebaseConfig block from Firebase console > Project settings > Your apps > Web app.
// It is not a secret (the database rules protect the data). The ERP uses the same values.
//
// While this is null, the shop keeps working as before: Add to cart and Buy now
// show the "coming soon" page with WhatsApp and phone ordering.
export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDIyU5niDKZC0rCWdb6N4a254LcC6dX1rc',
  authDomain: 'oval-farms-erp.firebaseapp.com',
  projectId: 'oval-farms-erp',
  storageBucket: 'oval-farms-erp.firebasestorage.app',
  messagingSenderId: '69145806484',
  appId: '1:69145806484:web:c0e2e4eff5ecb4c2f85681'
}

// Delivery charge added to every order (in rupees). 0 = free delivery.
export const DELIVERY_CHARGE = 0
