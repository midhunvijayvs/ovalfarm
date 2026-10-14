// Text and pictures shown on the About Us page (/about-us).
// Edit this file to change the story, values or team without touching the layout.
//
// Team photos live in public/images/about/. To change a photo, replace the file
// with a new one of the same name (a square picture works best).

const IMAGES = process.env.REACT_APP_PUBLIC_IMAGES_URL;

export const ABOUT_HERO = {
  eyebrow: 'About Oval Farms',
  title: 'Healthy food, made easy to cook',
  text: 'Oval Farms is a farming company from a village near Perambra, Kozhikode. We grow mushrooms with modern, automated farming and turn them into food that is good for you and quick to put on the table.',
};

export const QUICK_FACTS = [
  { icon: 'sprout', title: 'Grown near Perambra', text: 'Our farm is in a village in Kozhikode, Kerala' },
  { icon: 'truck', title: 'Fresh within 30 km', text: 'Perishable items delivered fresh around our farm' },
  { icon: 'box', title: 'Shipped all over India', text: 'Dried and packed products reach you anywhere' },
];

// "Our story" paragraphs
export const STORY = [
  'We started Oval Farms with a simple belief: the food that is easiest to cook should also be the food that is best for you. Too often, quick meals mean packets full of taste enhancers, added sugar and things your body does not need.',
  'So we chose to do it differently. We grow our own mushrooms using the latest farming technology, and we use them to make health-first food products where every ingredient is chosen for what it does for your body, not just for how it tastes.',
  'Oval Farms is for people who care about their health, read what goes into their food, and simply do not have much time to cook.',
];

// What we stand for
export const VALUES = [
  {
    icon: 'heart',
    title: 'Health before taste tricks',
    text: 'We design every recipe around a balanced composition, not around taste enhancers or added sugar.',
  },
  {
    icon: 'bolt',
    title: 'Easy to cook, easy to eat',
    text: 'Ready-to-cook and ready-to-eat food for busy days, without turning it into junk food.',
  },
  {
    icon: 'cool',
    title: 'Ultra-tech farming',
    text: 'Automated, climate-controlled growing rooms give us clean, consistent harvests all year round.',
  },
  {
    icon: 'flask',
    title: 'Always researching',
    text: 'We keep studying how to pack food that is quick to prepare and still well-balanced for what the body needs.',
  },
];

// The flagship product spotlight. "productId" links to /shop/details/<id>.
export const FLAGSHIP = {
  productId: 5,
  eyebrow: 'Our flagship product',
  title: 'Mushroom Soup Premix',
  text: 'The first product in our ready-to-cook series. A rich, creamy mushroom soup made with mushrooms from our own farm, ready in about 3 minutes.',
  points: ['No added preservatives', 'No artificial flavours', 'Ready in 3 minutes'],
  image: `${IMAGES}/shop/soup-premix.jpg`,
  next: 'More ready-to-cook and ready-to-eat products are on the way, made with the same care for what goes inside.',
};

// Generic mushroom content
export const MUSHROOM_STORY = {
  eyebrow: 'Why we grow mushrooms',
  title: 'A small food with a big future',
  text: [
    'Mushrooms are one of the most nutritious and sustainable foods on the planet. They are rich in plant protein, fibre, B vitamins and antioxidants, low in calories and naturally free of cholesterol.',
    'They also grow indoors, on farm leftovers like paddy straw, using very little land and water. After the harvest, the spent growing material can go back to the soil as compost.',
  ],
  facts: [
    { value: '33', unit: 'kcal', label: 'in 100 g of fresh mushrooms' },
    { value: '0', unit: 'mg', label: 'cholesterol' },
    { value: '100', unit: '%', label: 'plant-based' },
  ],
  images: [`${IMAGES}/home/sec-2-1.jpg`, `${IMAGES}/home/sec-2-2.jpg`],
};

// How we work, from farm to your door
export const PROCESS = [
  { icon: 'sprout', title: 'Healthy spawn', text: 'Every crop starts with quality spawn.' },
  { icon: 'cool', title: 'Automated rooms', text: 'Temperature and humidity are controlled automatically.' },
  { icon: 'sunrise', title: 'Fresh harvest', text: 'Mushrooms are hand-picked at their best.' },
  { icon: 'jar', title: 'Made into food', text: 'Turned into dried, powdered and ready-to-cook products.' },
  { icon: 'truck', title: 'Delivered', text: 'Fresh within 30 km, packed products all over India.' },
];

// Team photos are hidden for now and a formal avatar is shown instead.
// Set this to true to show the photos again (the files are still in public/images/about/).
export const SHOW_TEAM_PHOTOS = false;

export const TEAM = [
  {
    name: 'Midhun Vijay',
    role: 'Founder & CEO',
    photo: `${IMAGES}/about/midhun-vijay.jpg`,
    description: 'The mind behind Oval Farms. Shaped the idea of health-first, easy-to-cook food and leads the company’s vision, strategy, marketing and overall growth.',
  },
  {
    name: 'Abin Vijay',
    role: 'Execution Manager & Co-founder',
    photo: `${IMAGES}/about/abin-vijay.jpg`,
    description: 'Runs the day-to-day operations, from production on the farm to sales, making sure every order is grown, packed and delivered right.',
  },
  {
    name: 'Rejilesh V. M',
    role: 'Director',
    photo: `${IMAGES}/about/rejilesh-vm.jpg`,
    description: 'A partner and director at Oval Farms, guides the company’s direction and helps steer key business decisions as we grow.',
  },
];
