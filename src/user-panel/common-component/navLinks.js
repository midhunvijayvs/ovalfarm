// Main menu links, shared by the Header and the Footer.
// Links with a "#" scroll to that section of the home page.
// "section" marks the link active on every page under that path.
export const NAV_LINKS = [
  { label: 'Home', to: '/home' },
  { label: 'Products', to: '/shop/list', section: '/shop' },
  { label: 'Why Mushrooms', to: '/why-mushrooms' },
  { label: 'Recipes', to: '/recipies/list', section: '/recipies' },
  { label: 'Contact', to: '/contact-us' },
];

export const ORDER_LINK = '/shop/list';
