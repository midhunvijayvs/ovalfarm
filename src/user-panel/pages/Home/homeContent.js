// Text and pictures shown on the home page.
// Edit this file to change products, dishes or benefits without touching the layout.

const IMAGES = process.env.REACT_APP_PUBLIC_IMAGES_URL;

export const HIGHLIGHTS = [
  { icon: 'truck', title: 'Doorstep delivery', text: 'On orders above 900 g' },
  { icon: 'calendar', title: 'Daily & weekly plans', text: 'Subscribe once, eat healthy always' },
  { icon: 'jar', title: '6-month shelf life', text: 'Shade-dried mushrooms' },
  { icon: 'sprout', title: 'Hi-tech farm', text: 'Grown in Kozhikode, Kerala' },
];

export const PRODUCTS = [
  {
    tag: 'Fresh',
    title: 'White Oyster Mushrooms',
    text: 'Fresh white oyster mushrooms, delivered straight from our farm to your home.',
    image: `${IMAGES}/home/sec-2-1.jpg`,
  },
  {
    tag: 'Fresh',
    title: 'Grey Oyster Mushrooms',
    text: 'Our grey variety of oyster mushrooms makes your dishes even more flavourful.',
    image: `${IMAGES}/home/sec-2-2.jpg`,
  },
  {
    tag: 'Dried',
    title: 'Dried Mushrooms',
    text: 'Tired of buying every day? Shade-dried mushrooms keep for 6 months with all the goodness of fresh ones.',
    image: `${IMAGES}/home/sec-2-7.webp`,
  },
  {
    tag: 'Dried',
    title: 'Mushroom Powder',
    text: 'Add a pinch to your daily dishes to boost both taste and nutrition.',
    image: `${IMAGES}/home/sec-2-8.jpg`,
  },
  {
    tag: 'For growers',
    title: 'Mushroom Spawn',
    text: 'Planning to cultivate mushrooms? Start with our high-quality spawn.',
    image: `${IMAGES}/home/sec-2-3.jpg`,
  },
  {
    tag: 'For growers',
    title: 'Ready-to-pluck Beds',
    text: 'Grow mushrooms at home with no technical know-how. Just water and harvest.',
    image: `${IMAGES}/home/sec-2-4.jpg`,
  },
];

export const DISHES = [
  { title: 'Mushroom Fry', image: `${IMAGES}/home/sec-4-1.jpg` },
  { title: 'Mushroom Dry Fry', image: `${IMAGES}/home/sec-4-2.jpg` },
  { title: 'Mushroom Curry', image: `${IMAGES}/home/sec-4-3.webp` },
  { title: 'Mushroom Upperi', image: `${IMAGES}/home/sec-4-4.jpg` },
];

export const BENEFITS = [
  { icon: 'shield', title: 'Boosts Immunity', text: 'Beta-glucans in mushrooms stimulate the immune system and help the body fight infections.' },
  { icon: 'sparkle', title: 'Rich in Antioxidants', text: 'Ergothioneine and selenium protect cells from damage and reduce oxidative stress.' },
  { icon: 'brain', title: 'Supports Brain Health', text: 'B vitamins and ergothioneine improve cognitive function and may protect the brain as you age.' },
  { icon: 'heart', title: 'Promotes Heart Health', text: 'Cholesterol-free, with compounds that help lower bad (LDL) cholesterol.' },
  { icon: 'leaf', title: 'Improves Gut Health', text: 'High in fibre and prebiotics that feed healthy gut bacteria and aid digestion.' },
  { icon: 'scale', title: 'Helps Manage Weight', text: 'Low in calories yet rich in nutrients, so you stay full for longer.' },
  { icon: 'drop', title: 'Balances Blood Sugar', text: 'Their fibre helps keep blood sugar steady and lowers the risk of diabetes.' },
  { icon: 'sun', title: 'Provides Vitamin D', text: 'One of the few natural non-animal sources of vitamin D for strong bones.' },
  { icon: 'cool', title: 'Fights Inflammation', text: 'Natural anti-inflammatory compounds reduce chronic inflammation.' },
  { icon: 'bolt', title: 'Enhances Energy', text: 'B vitamins help turn food into energy and fight fatigue.' },
];
