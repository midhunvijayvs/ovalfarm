// Text and pictures shown on the Why Mushrooms page (/why-mushrooms).
// Edit this file to change the benefits, the nutrition numbers or the
// "Why buy from us" points without touching the layout.
//
// Pictures live in public/images/why-mushrooms/. To change a picture, replace
// the file with a new one of the same name, or point "image" at a new file.
//
// Any text can also be written as { en: '...', ml: '...', kn: '...', ta: '...' }
// to add translations later, the same way as the recipes.

const IMAGES = `${process.env.REACT_APP_PUBLIC_IMAGES_URL}/why-mushrooms`;

// Big numbers in the hero. "value" counts up from 0 when it scrolls into view.
export const QUICK_FACTS = [
  { value: 33, suffix: '', unit: 'kcal', label: 'in 100 g of fresh mushrooms' },
  { value: 0, suffix: '', unit: 'mg', label: 'cholesterol, naturally' },
  { value: 9, suffix: '', unit: '', label: 'essential amino acids in mushroom protein' },
  { value: 100, suffix: '%', unit: '', label: 'plant-based and vegan' },
];

// Filter chips above the benefits list. "id" must match a benefit's "group".
export const BENEFIT_GROUPS = [
  { id: 'all', label: 'All benefits' },
  { id: 'nutrition', label: 'Daily nutrition' },
  { id: 'protection', label: 'Protection' },
  { id: 'heart', label: 'Heart & metabolism' },
  { id: 'mind', label: 'Mind & energy' },
];

// Each benefit:
//   title     short heading
//   lead      one or two sentences, always visible
//   points    what the research says, shown under "The science"
//   nutrient  the key nutrient behind the benefit, shown as a label
//   stat      { value, label } a highlight number shown on the picture
export const BENEFITS = [
  {
    id: 'protein',
    group: 'nutrition',
    icon: 'sprout',
    title: 'Quality plant protein',
    nutrient: 'Protein with all 9 essential amino acids',
    image: `${IMAGES}/protein.jpg`,
    stat: { value: '20–30%', label: 'protein when dried' },
    lead: 'Mushroom protein contains all nine essential amino acids your body cannot make on its own, which is rare for a plant food.',
    points: [
      'Fresh mushrooms give about 3 g of protein per 100 g. Dried mushrooms are 20–30% protein by weight, close to many pulses.',
      'They are naturally rich in lysine and leucine, the amino acids that cereals like rice and wheat are short of, so mushrooms round off a vegetarian meal.',
      'Easy to digest and free of the saturated fat that comes with most animal protein.',
    ],
  },
  {
    id: 'plant-based',
    group: 'nutrition',
    icon: 'leaf',
    title: '100% vegan, naturally meaty',
    nutrient: 'Umami, fibre, zero cholesterol',
    image: `${IMAGES}/plant-based.jpg`,
    stat: { value: '0 mg', label: 'cholesterol' },
    lead: 'Mushrooms are fungi, not animals, yet their firm, juicy bite and deep umami flavour make them the easiest swap for meat in curries, fries and biryanis.',
    points: [
      'Natural glutamates give mushrooms the savoury depth usually found in meat, so dishes stay satisfying with less salt and oil.',
      'In a Johns Hopkins study, people who ate mushrooms in place of beef took in far fewer calories and less fat, and felt just as full.',
      'Suitable for vegans, vegetarians and anyone cutting down on red meat.',
    ],
  },
  {
    id: 'immunity',
    group: 'protection',
    icon: 'shield',
    title: 'Strengthens immunity',
    nutrient: 'Beta-glucans',
    image: `${IMAGES}/immunity.jpg`,
    stat: { value: 'β-glucan', label: 'natural immune fibre' },
    lead: 'Mushrooms are one of the best natural sources of beta-glucans, a type of fibre that trains your immune cells to respond faster.',
    points: [
      'Beta-glucans bind to receptors on immune cells such as macrophages and natural killer cells, keeping them alert.',
      'In clinical trials, beta-glucan from edible mushrooms reduced how often children with recurrent chest infections fell ill, and lowered colds in athletes after hard training.',
      'Mushrooms also add zinc and selenium, two minerals the immune system needs every day.',
    ],
  },
  {
    id: 'antioxidants',
    group: 'protection',
    icon: 'sparkle',
    title: 'Packed with rare antioxidants',
    nutrient: 'Ergothioneine & glutathione',
    image: `${IMAGES}/antioxidants.jpg`,
    stat: { value: '#1', label: 'food source of ergothioneine' },
    lead: 'Mushrooms are the richest food source of ergothioneine and glutathione, two "master antioxidants" that protect your cells from wear and tear.',
    points: [
      'Penn State researchers found mushrooms carry the highest levels of ergothioneine of any food tested, and some varieties lead the list.',
      'Your body has a dedicated transporter just to absorb ergothioneine, a sign of how much your cells rely on it.',
      'These antioxidants are heat stable, so they survive normal cooking.',
    ],
  },
  {
    id: 'vitamin-d',
    group: 'nutrition',
    icon: 'sun',
    title: 'A natural source of vitamin D',
    nutrient: 'Vitamin D2',
    image: `${IMAGES}/vitamin-d.jpg`,
    stat: { value: '15 min', label: 'of sun boosts vitamin D' },
    lead: 'Mushrooms are the only non-animal, unfortified food that makes vitamin D, just like your skin does in sunlight.',
    points: [
      'Mushrooms contain ergosterol, which turns into vitamin D2 when exposed to sunlight or UV light.',
      'Kitchen tip: spread mushrooms gills-up in midday sun for 15–30 minutes before cooking to raise their vitamin D many times over.',
      'Vitamin D helps your body absorb calcium for strong bones and teeth, and supports muscles and immunity.',
    ],
  },
  {
    id: 'heart',
    group: 'heart',
    icon: 'heart',
    title: 'Kind to your heart',
    nutrient: 'Potassium, fibre, natural lovastatin',
    image: `${IMAGES}/heart.jpg`,
    stat: { value: '420 mg', label: 'potassium per 100 g' },
    lead: 'Cholesterol-free, very low in fat and sodium, and rich in potassium, mushrooms tick every box of a heart-healthy food.',
    points: [
      'Some edible mushrooms naturally contain lovastatin, the same compound used in cholesterol-lowering medicines.',
      'Their beta-glucan fibre binds cholesterol in the gut so less of it is absorbed.',
      'Potassium balances sodium and helps keep blood pressure in a healthy range.',
    ],
  },
  {
    id: 'gut',
    group: 'heart',
    icon: 'leaf',
    title: 'Feeds a healthy gut',
    nutrient: 'Prebiotic fibre (chitin & beta-glucans)',
    image: `${IMAGES}/gut.jpg`,
    stat: { value: '2.3 g', label: 'fibre per 100 g' },
    lead: 'The fibre in mushrooms is a prebiotic: it passes your stomach untouched and feeds the friendly bacteria in your gut.',
    points: [
      'Gut bacteria ferment mushroom fibre into short-chain fatty acids that nourish the gut lining and calm inflammation.',
      'Research reviews show mushroom polysaccharides increase beneficial bacteria such as Bifidobacteria and Lactobacilli.',
      'Regular fibre keeps digestion smooth and helps prevent constipation.',
    ],
  },
  {
    id: 'weight',
    group: 'heart',
    icon: 'scale',
    title: 'Helps manage weight',
    nutrient: 'Low calorie, high water, high fibre',
    image: `${IMAGES}/weight.jpg`,
    stat: { value: '33', label: 'kcal per 100 g' },
    lead: 'About 90% water and only 33 kcal per 100 g, mushrooms fill your plate and your stomach without filling up your calorie count.',
    points: [
      'Protein and fibre together slow digestion and keep you full for longer.',
      'Swapping part of the meat in a dish for mushrooms cuts calories and fat without reducing how satisfied you feel.',
      'Practically fat-free, so they suit any weight-loss plan.',
    ],
  },
  {
    id: 'blood-sugar',
    group: 'heart',
    icon: 'drop',
    title: 'Keeps blood sugar steady',
    nutrient: 'Low carbohydrate, soluble fibre',
    image: `${IMAGES}/blood-sugar.jpg`,
    stat: { value: 'Low GI', label: 'gentle on blood sugar' },
    lead: 'With very few digestible carbohydrates and plenty of fibre, mushrooms barely nudge your blood sugar.',
    points: [
      'Small clinical studies found that eating cooked mushrooms lowered blood sugar after meals in healthy volunteers and in people with type 2 diabetes.',
      'Soluble fibre slows down how quickly sugar from the rest of the meal enters the blood.',
      'A good fit for diabetic-friendly and low-carb diets.',
    ],
  },
  {
    id: 'brain',
    group: 'mind',
    icon: 'brain',
    title: 'Protects the brain as you age',
    nutrient: 'Ergothioneine, B vitamins',
    image: `${IMAGES}/brain.jpg`,
    stat: { value: '50%', label: 'lower odds of memory decline*' },
    lead: 'People who eat mushrooms regularly show better memory and thinking as they grow older.',
    points: [
      'A study of over 600 seniors in Singapore found those eating more than two portions of mushrooms a week had 50% lower odds of mild cognitive impairment.',
      'Ergothioneine levels in the blood drop with age and are lower in people with memory problems; mushrooms are the best way to top them up.',
      'A large US population study also linked mushroom eaters with a lower risk of depression.',
    ],
    footnote: '*Observational study; it shows a link, not proof of cause.',
  },
  {
    id: 'energy',
    group: 'mind',
    icon: 'bolt',
    title: 'Natural, steady energy',
    nutrient: 'Niacin (B3), riboflavin (B2), pantothenic acid (B5)',
    image: `${IMAGES}/energy.jpg`,
    stat: { value: '~30%', label: 'of daily niacin in 100 g' },
    lead: 'Mushrooms are rich in B vitamins, the helpers that turn the food you eat into energy your body can use.',
    points: [
      '100 g of fresh mushrooms gives roughly a quarter to a third of your daily niacin, riboflavin and pantothenic acid.',
      'They also supply iron and copper, which help carry oxygen in the blood and fight tiredness.',
      'Energy without sugar crashes, because it comes with fibre and protein.',
    ],
  },
  {
    id: 'inflammation',
    group: 'protection',
    icon: 'cool',
    title: 'Calms chronic inflammation',
    nutrient: 'Polysaccharides & ergothioneine',
    image: `${IMAGES}/inflammation.jpg`,
    stat: { value: '34%', label: 'lower cancer risk in big eaters*' },
    lead: 'Long-term, low-grade inflammation is behind many lifestyle diseases. Compounds in mushrooms help keep it in check.',
    points: [
      'Mushroom polysaccharides and ergothioneine reduce inflammatory signals in the body, as shown in many laboratory and animal studies.',
      'A 2021 review of 17 studies covering more than 19,000 people found those who ate the most mushrooms had a 34% lower risk of cancer.',
      'Their antioxidants protect joints, blood vessels and skin from oxidative damage.',
    ],
    footnote: '*Observational studies; they show a link, not proof of cause.',
  },
  {
    id: 'minerals',
    group: 'nutrition',
    icon: 'sparkle',
    title: 'A daily dose of minerals',
    nutrient: 'Potassium, copper, iron, zinc, selenium, folate',
    image: `${IMAGES}/minerals.jpg`,
    stat: { value: '6+', label: 'key minerals and vitamins' },
    lead: 'Small in size, mushrooms carry a surprising range of minerals that many vegetarian diets fall short on.',
    points: [
      'Copper helps make red blood cells and keeps nerves and bones healthy.',
      'Selenium and zinc support thyroid function, healing and immunity.',
      'Folate is important for everyone, and especially during pregnancy.',
    ],
  },
];

// "Nutrition at a glance" bars. "dv" is the percent of the daily value
// in 100 g of fresh mushrooms (approximate, from USDA FoodData Central).
export const NUTRITION = [
  { label: 'Niacin (B3)', amount: '5 mg', dv: 31 },
  { label: 'Riboflavin (B2)', amount: '0.35 mg', dv: 27 },
  { label: 'Pantothenic acid (B5)', amount: '1.3 mg', dv: 26 },
  { label: 'Folate', amount: '38 µg', dv: 10 },
  { label: 'Potassium', amount: '420 mg', dv: 9 },
  { label: 'Fibre', amount: '2.3 g', dv: 8 },
  { label: 'Iron', amount: '1.3 mg', dv: 7 },
  { label: 'Protein', amount: '3.3 g', dv: 7 },
];

// Ways to make mushrooms a daily habit. "link" can point at any page.
export const DAILY_IDEAS = [
  { time: 'Breakfast', icon: 'sunrise', text: 'Add chopped mushrooms to your omelette, dosa filling or upma.' },
  { time: 'Lunch', icon: 'leaf', text: 'A quick mushroom thoran or stir-fry next to your rice.' },
  { time: 'Evening', icon: 'jar', text: 'Stir a spoon of mushroom powder into soup or chapati dough.' },
  { time: 'Dinner', icon: 'heart', text: 'Swap meat for mushrooms in your curry or biryani.' },
];

// "Why buy from us" cards. Placeholder text: update it any time.
export const WHY_US = [
  { icon: 'sprout', title: 'Grown on our own farm', text: 'Every mushroom is grown at our hi-tech farm in Kozhikode, so we know exactly how it was raised.' },
  { icon: 'shield', title: 'Free from harmful chemicals', text: 'Clean, controlled growing rooms mean no pesticides and no shortcuts.' },
  { icon: 'sunrise', title: 'Harvested fresh every morning', text: 'We pick to order, so your mushrooms reach you at their freshest and firmest.' },
  { icon: 'truck', title: 'Farm to your door', text: 'Quick local delivery keeps the cold chain short and the flavour intact.' },
  { icon: 'box', title: 'Hygienic packing', text: 'Packed by hand in clean, food-safe packaging that lets mushrooms breathe.' },
  { icon: 'users', title: 'Trusted by local families', text: 'Homes, hotels and caterers across Kerala order from us week after week.' },
];

// The farm-to-plate steps shown under "Why buy from us"
export const PROCESS = [
  { icon: 'sprout', title: 'Quality spawn', text: 'We start with healthy, lab-grade spawn.' },
  { icon: 'cool', title: 'Climate-controlled rooms', text: 'Temperature and humidity are kept just right.' },
  { icon: 'sunrise', title: 'Hand-picked', text: 'Harvested at peak freshness each morning.' },
  { icon: 'box', title: 'Packed with care', text: 'Cleaned, graded and packed the same day.' },
  { icon: 'truck', title: 'Delivered', text: 'Straight from the farm to your kitchen.' },
];

// Studies behind the benefits, listed at the bottom of the page
export const SOURCES = [
  'USDA FoodData Central: nutrient values for raw edible mushrooms (per 100 g).',
  'Kalaras M.D. et al. "Mushrooms: A rich source of the antioxidants ergothioneine and glutathione." Food Chemistry, 2017.',
  'Feng L. et al. "The association between mushroom consumption and mild cognitive impairment: a community-based cross-sectional study in Singapore." Journal of Alzheimer\'s Disease, 2019.',
  'Ba D.M. et al. "Higher mushroom consumption is associated with lower risk of cancer: a systematic review and meta-analysis of observational studies." Advances in Nutrition, 2021.',
  'Ba D.M. et al. "Mushroom intake and depression: a population-based study using data from the US NHANES 2005–2016." Journal of Affective Disorders, 2021.',
  'Cardwell G. et al. "A review of mushrooms as a potential source of dietary vitamin D." Nutrients, 2018.',
  'Jesenak M. et al. International Immunopharmacology, 2013: mushroom beta-glucan (pleuran) in children with recurrent respiratory tract infections.',
  'Cheskin L.J. et al. "Lack of energy compensation over 4 days when white button mushrooms are substituted for beef." Appetite, 2008.',
  'Jayachandran M., Xiao J., Xu B. "A critical review on health promoting benefits of edible mushrooms through gut microbiota." International Journal of Molecular Sciences, 2017.',
  'Gunde-Cimerman N. & Cimerman A. Experimental Mycology, 1995: natural lovastatin in edible mushroom fruiting bodies.',
];
