import { SITE_INFO } from '../../../siteInfo'

// Text of the Privacy Policy and Terms of Service pages.
// Each section has a heading and paragraphs; a paragraph that is a list is written as an array.
// Change the date whenever you change the text.

const contact = `${SITE_INFO.fullName}, ${SITE_INFO.address}. Email: ${SITE_INFO.email}. Phone / WhatsApp: ${SITE_INFO.phoneDisplay}.`

export const PRIVACY_POLICY = {
  title: 'Privacy Policy',
  updated: '14 October 2026',
  intro: `This policy explains what personal information ${SITE_INFO.fullName} ("Oval Farms", "we") collects when you use ovalfarm.in, how we use it and the choices you have. We collect only what we need to take and deliver your orders.`,
  sections: [
    {
      heading: 'What we collect',
      body: [
        'When you create an account or place an order we collect:',
        [
          'your name, mobile number and email address;',
          'your delivery address and any note you add to an order;',
          'the orders you place, their items, amounts and delivery status.',
        ],
        'If you sign in with Google, Google shares your name and email address with us. If you sign in with your mobile number, we receive the number you verify with a one-time password (OTP). If you use email and password, your password is handled by our sign-in provider and we never see it.',
        'We do not collect card or bank details. Orders are paid on delivery by cash or UPI.',
      ],
    },
    {
      heading: 'How we use it',
      body: [
        [
          'to confirm, prepare and deliver your orders, and to call or message you about them;',
          'to show you your order history on the My orders page;',
          'to prepare invoices and keep the accounts and tax records the law requires;',
          'to answer your questions and handle complaints.',
        ],
        'We do not sell your information and we do not use it for advertising by other companies. We will only send you offers if you ask us to.',
      ],
    },
    {
      heading: 'Where it is stored and who can see it',
      body: [
        'Your account and orders are stored with Google Firebase (Firebase Authentication and Cloud Firestore), in Google\'s Mumbai, India data centre. Phone sign-in codes are sent by SMS through Firebase.',
        'Only Oval Farms staff who handle orders and accounts can see your details, through our internal business system. We share your name, phone number and address with the person delivering your order. We may also share information when the law requires it.',
      ],
    },
    {
      heading: 'Cookies and storage in your browser',
      id: 'cookies',
      body: [
        'We do not use advertising or tracking cookies. The website stores your shopping cart and your sign-in session in your own browser so they are still there when you come back. Google\'s sign-in and reCAPTCHA (used to prevent abuse of OTP sign-in) may set their own cookies.',
      ],
    },
    {
      heading: 'How long we keep it',
      body: [
        'We keep your account while it is open. We keep order and invoice records for as long as Indian tax and accounting law requires (generally 8 years), even if you close your account.',
      ],
    },
    {
      heading: 'Your choices and rights',
      body: [
        'You can see your orders and update your name, phone and address when you check out. You can ask us to correct your information, send you a copy of it, or delete your account, by emailing or calling us using the details below. We will reply within 30 days.',
        'You have these rights under India\'s Digital Personal Data Protection Act, 2023. If you are not happy with our reply, you may complain to the Data Protection Board of India.',
      ],
    },
    {
      heading: 'Children',
      body: ['Our website is meant for adults. Please do not create an account if you are under 18.'],
    },
    {
      heading: 'Changes to this policy',
      body: ['If we change this policy we will update it on this page and change the date at the top.'],
    },
    {
      heading: 'Contact and grievances',
      body: [`For any question or complaint about your personal information, contact ${contact}`],
    },
  ],
}

export const TERMS_OF_SERVICE = {
  title: 'Terms of Service',
  updated: '14 October 2026',
  intro: `These terms apply when you use ovalfarm.in or order from ${SITE_INFO.fullName} ("Oval Farms", "we"). By creating an account or placing an order, you agree to them.`,
  sections: [
    {
      heading: 'Your account',
      body: [
        'You can sign in with Google, with your mobile number and an OTP, or with your email and a password. Please give correct details and keep your sign-in private. You are responsible for orders placed from your account.',
        'We may suspend an account that is used to place fake orders or to misuse the website.',
      ],
    },
    {
      heading: 'Orders and confirmation',
      body: [
        'Placing an order on the website is a request to buy. An order is accepted only when we confirm it, usually by a phone call, and its status changes to Confirmed on your My orders page.',
        'We may decline or cancel an order, for example if a product is unavailable, the address is outside the area we deliver to, or a price was shown incorrectly. If that happens we will tell you, and you will not be charged.',
      ],
    },
    {
      heading: 'Prices and payment',
      body: [
        'Prices are in Indian rupees and include applicable taxes unless stated otherwise. Delivery charges, if any, are shown before you place the order.',
        'You pay on delivery, by cash or UPI. We will give you a GST invoice for your order.',
      ],
    },
    {
      heading: 'Delivery',
      body: [
        'We agree the delivery time with you when we confirm the order. Please make sure someone is available to receive it. Fresh mushrooms are perishable, so refrigerate them as soon as they arrive.',
      ],
    },
    {
      heading: 'Cancellations',
      body: [
        'You can cancel an order yourself on the My orders page until we confirm it. After that, please call or WhatsApp us as soon as possible. Once an order has been packed or sent out for delivery, we may not be able to cancel it.',
      ],
    },
    {
      heading: 'Quality, returns and refunds',
      body: [
        'Because our products are food, we cannot take back products that have been delivered in good condition.',
        'If a product arrives damaged, spoiled or different from what you ordered, tell us within 24 hours of delivery, with a photo if you can. We will replace it or refund what you paid for it.',
      ],
    },
    {
      heading: 'Product information',
      body: [
        'We describe our products and their health benefits as accurately as we can. This information is general and is not medical advice. Product photos may differ slightly from the product you receive.',
      ],
    },
    {
      heading: 'Use of the website',
      body: [
        'The text, photos and logos on this website belong to Oval Farms. Please do not copy them without our permission, and do not try to disrupt the website or access information that is not yours.',
      ],
    },
    {
      heading: 'Liability',
      body: [
        'To the extent the law allows, our responsibility for any order is limited to the amount you paid for it. Nothing in these terms limits your rights under the Consumer Protection Act, 2019.',
      ],
    },
    {
      heading: 'Law and disputes',
      body: [
        'These terms are governed by the laws of India. Disputes will be handled by the courts at Kozhikode, Kerala.',
      ],
    },
    {
      heading: 'Changes and contact',
      body: [
        'We may update these terms; the version on this page at the time you order applies to that order.',
        `Questions or complaints: ${contact}`,
      ],
    },
  ],
}
