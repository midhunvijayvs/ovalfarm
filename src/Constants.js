// constants.js
//
// Recipe data for the public website.
// Later this will come from the database (updated from the ERP app). Until then,
// add or edit recipes here. Pages read it through src/services/recipeService.js,
// so switching to the database only needs a change in that one file.
//
// Recipe structure:
// {
//   id: number,
//   name: text,
//   ingredients: [{ name: text, quantity: number | null, unit: unit code }],
//   cooking_instruction: text (one step per line),
//   image: picture of the dish,
//   bg_image: background picture for the recipe page,
//   cooking_time: minutes,
//   utensils_needed: [text, ...],
// }
//
// "text" can be plain English ("Mushroom Fry") or an object with one entry per
// language: { en: 'Mushroom Fry', ml: 'കൂൺ ഫ്രൈ', kn: '...', ta: '...' }.
// Any language that is missing falls back to English.
//
// Unit codes: g, kg, ml, l, tsp, tbsp, cup, nos, sprig, clove, pinch, to_taste, as_needed
// (their names in each language are in src/i18n/translations.js).

const IMAGES = process.env.REACT_APP_PUBLIC_IMAGES_URL;

// Common ingredient names, reused across recipes
const ING = {
  oysterMushroom: { en: 'Oyster mushrooms', ml: 'ചിപ്പിക്കൂൺ', kn: 'ಸಿಂಪಿ ಅಣಬೆ', ta: 'சிப்பிக் காளான்' },
  onion: { en: 'Onion', ml: 'സവാള', kn: 'ಈರುಳ್ಳಿ', ta: 'வெங்காயம்' },
  shallots: { en: 'Shallots (small onions)', ml: 'ചെറിയ ഉള്ളി', kn: 'ಸಾಂಬಾರ್ ಈರುಳ್ಳಿ', ta: 'சின்ன வெங்காயம்' },
  tomato: { en: 'Tomato', ml: 'തക്കാളി', kn: 'ಟೊಮೆಟೊ', ta: 'தக்காளி' },
  greenChilli: { en: 'Green chillies', ml: 'പച്ചമുളക്', kn: 'ಹಸಿರು ಮೆಣಸಿನಕಾಯಿ', ta: 'பச்சை மிளகாய்' },
  driedRedChilli: { en: 'Dried red chillies', ml: 'വറ്റൽമുളക്', kn: 'ಒಣ ಮೆಣಸಿನಕಾಯಿ', ta: 'காய்ந்த மிளகாய்' },
  gingerGarlicPaste: { en: 'Ginger-garlic paste', ml: 'ഇഞ്ചി-വെളുത്തുള്ളി പേസ്റ്റ്', kn: 'ಶುಂಠಿ-ಬೆಳ್ಳುಳ್ಳಿ ಪೇಸ್ಟ್', ta: 'இஞ்சி-பூண்டு விழுது' },
  garlic: { en: 'Garlic', ml: 'വെളുത്തുള്ളി', kn: 'ಬೆಳ್ಳುಳ್ಳಿ', ta: 'பூண்டு' },
  turmeric: { en: 'Turmeric powder', ml: 'മഞ്ഞൾപ്പൊടി', kn: 'ಅರಿಶಿನ ಪುಡಿ', ta: 'மஞ்சள் தூள்' },
  chilliPowder: { en: 'Kashmiri chilli powder', ml: 'കാശ്മീരി മുളകുപൊടി', kn: 'ಕಾಶ್ಮೀರಿ ಮೆಣಸಿನ ಪುಡಿ', ta: 'காஷ்மீரி மிளகாய்த் தூள்' },
  corianderPowder: { en: 'Coriander powder', ml: 'മല്ലിപ്പൊടി', kn: 'ಕೊತ್ತಂಬರಿ ಪುಡಿ', ta: 'மல்லித் தூள்' },
  pepperPowder: { en: 'Black pepper powder', ml: 'കുരുമുളകുപൊടി', kn: 'ಕಾಳುಮೆಣಸಿನ ಪುಡಿ', ta: 'மிளகுத் தூள்' },
  garamMasala: { en: 'Garam masala', ml: 'ഗരം മസാല', kn: 'ಗರಂ ಮಸಾಲ', ta: 'கரம் மசாலா' },
  mustardSeeds: { en: 'Mustard seeds', ml: 'കടുക്', kn: 'ಸಾಸಿವೆ', ta: 'கடுகு' },
  curryLeaves: { en: 'Curry leaves', ml: 'കറിവേപ്പില', kn: 'ಕರಿಬೇವು', ta: 'கறிவேப்பிலை' },
  coconutOil: { en: 'Coconut oil', ml: 'വെളിച്ചെണ്ണ', kn: 'ತೆಂಗಿನ ಎಣ್ಣೆ', ta: 'தேங்காய் எண்ணெய்' },
  oilForFrying: { en: 'Oil for deep frying', ml: 'വറുക്കാനുള്ള എണ്ണ', kn: 'ಕರಿಯಲು ಎಣ್ಣೆ', ta: 'பொரிக்க எண்ணெய்' },
  salt: { en: 'Salt', ml: 'ഉപ്പ്', kn: 'ಉಪ್ಪು', ta: 'உப்பு' },
  riceFlour: { en: 'Rice flour', ml: 'അരിപ്പൊടി', kn: 'ಅಕ್ಕಿ ಹಿಟ್ಟು', ta: 'அரிசி மாவு' },
  cornFlour: { en: 'Corn flour', ml: 'കോൺഫ്ലോർ', kn: 'ಕಾರ್ನ್ ಫ್ಲೋರ್', ta: 'சோள மாவு' },
  lemonJuice: { en: 'Lemon juice', ml: 'നാരങ്ങാനീര്', kn: 'ನಿಂಬೆ ರಸ', ta: 'எலுமிச்சை சாறு' },
  thickCoconutMilk: { en: 'Thick coconut milk', ml: 'കട്ടിയുള്ള തേങ്ങാപ്പാൽ', kn: 'ದಪ್ಪ ತೆಂಗಿನ ಹಾಲು', ta: 'கெட்டியான தேங்காய்ப் பால்' },
  thinCoconutMilk: { en: 'Thin coconut milk', ml: 'നേർത്ത തേങ്ങാപ്പാൽ', kn: 'ತೆಳು ತೆಂಗಿನ ಹಾಲು', ta: 'நீர்த்த தேங்காய்ப் பால்' },
  gratedCoconut: { en: 'Grated coconut', ml: 'ചിരകിയ തേങ്ങ', kn: 'ತುರಿದ ತೆಂಗಿನಕಾಯಿ', ta: 'துருவிய தேங்காய்' },
};

// Common utensils, reused across recipes
const UTENSIL = {
  kadai: { en: 'Kadai or deep frying pan', ml: 'ചീനച്ചട്ടി', kn: 'ಬಾಣಲೆ', ta: 'வாணலி' },
  panWithLid: { en: 'Pan with a lid', ml: 'മൂടിയുള്ള പാൻ', kn: 'ಮುಚ್ಚಳವಿರುವ ಪಾತ್ರೆ', ta: 'மூடியுள்ள பாத்திரம்' },
  spatula: { en: 'Wooden spatula', ml: 'മരത്തവി', kn: 'ಮರದ ಸೌಟು', ta: 'மரக் கரண்டி' },
  knifeBoard: { en: 'Knife and chopping board', ml: 'കത്തിയും കട്ടിംഗ് ബോർഡും', kn: 'ಚಾಕು ಮತ್ತು ಕತ್ತರಿಸುವ ಹಲಗೆ', ta: 'கத்தி மற்றும் நறுக்கும் பலகை' },
  mixingBowl: { en: 'Mixing bowl', ml: 'മിക്സിംഗ് ബൗൾ', kn: 'ಮಿಶ್ರಣದ ಬಟ್ಟಲು', ta: 'கலக்கும் கிண்ணம்' },
  slottedSpoon: { en: 'Slotted spoon', ml: 'കണ്ണാപ്പ', kn: 'ಜಾಲರಿ ಸೌಟು', ta: 'சல்லடைக் கரண்டி' },
  mortar: { en: 'Mortar and pestle or mixer', ml: 'ഉരലും ഉലക്കയും അല്ലെങ്കിൽ മിക്സി', kn: 'ಒರಳು ಅಥವಾ ಮಿಕ್ಸಿ', ta: 'உரல் அல்லது மிக்ஸி' },
};

export const RECIPES = [
  {
    id: 1,
    name: { en: 'Mushroom Fry', ml: 'കൂൺ ഫ്രൈ', kn: 'ಅಣಬೆ ಫ್ರೈ', ta: 'காளான் வறுவல்' },
    ingredients: [
      { name: ING.oysterMushroom, quantity: 250, unit: 'g' },
      { name: ING.onion, quantity: 1, unit: 'nos' },
      { name: ING.greenChilli, quantity: 2, unit: 'nos' },
      { name: ING.gingerGarlicPaste, quantity: 1, unit: 'tbsp' },
      { name: ING.turmeric, quantity: 0.25, unit: 'tsp' },
      { name: ING.chilliPowder, quantity: 1, unit: 'tsp' },
      { name: ING.pepperPowder, quantity: 0.5, unit: 'tsp' },
      { name: ING.garamMasala, quantity: 0.5, unit: 'tsp' },
      { name: ING.curryLeaves, quantity: 1, unit: 'sprig' },
      { name: ING.coconutOil, quantity: 2, unit: 'tbsp' },
      { name: ING.salt, quantity: null, unit: 'to_taste' },
    ],
    cooking_instruction: {
      en: `Clean the mushrooms with a damp cloth and tear them into long strips.
Heat coconut oil in a pan. Add curry leaves, sliced onion and green chillies and sauté until golden.
Add ginger-garlic paste and cook until the raw smell goes.
Add turmeric, chilli powder and salt and stir for a minute on a low flame.
Add the mushrooms. Cook uncovered on medium heat until the water they release dries up.
Sprinkle pepper powder and garam masala, toss well and fry for 3–4 more minutes until the edges turn golden.
Serve hot with rice or chapati.`,
      ml: `കൂൺ നനഞ്ഞ തുണി കൊണ്ട് തുടച്ച് വൃത്തിയാക്കി നീളത്തിൽ കീറിയെടുക്കുക.
ഒരു പാനിൽ വെളിച്ചെണ്ണ ചൂടാക്കി കറിവേപ്പില, അരിഞ്ഞ സവാള, പച്ചമുളക് എന്നിവ ചേർത്ത് സ്വർണ്ണനിറമാകുന്നതുവരെ വഴറ്റുക.
ഇഞ്ചി-വെളുത്തുള്ളി പേസ്റ്റ് ചേർത്ത് പച്ചമണം മാറുന്നതുവരെ വഴറ്റുക.
മഞ്ഞൾപ്പൊടി, മുളകുപൊടി, ഉപ്പ് എന്നിവ ചേർത്ത് ചെറുതീയിൽ ഒരു മിനിറ്റ് ഇളക്കുക.
കൂൺ ചേർക്കുക. കൂണിൽ നിന്ന് ഇറങ്ങുന്ന വെള്ളം വറ്റുന്നതുവരെ ഇടത്തരം തീയിൽ തുറന്നുവെച്ച് വേവിക്കുക.
കുരുമുളകുപൊടിയും ഗരം മസാലയും വിതറി നന്നായി ഇളക്കി, അരികുകൾ സ്വർണ്ണനിറമാകുന്നതുവരെ 3–4 മിനിറ്റ് കൂടി വറുക്കുക.
ചോറിനോ ചപ്പാത്തിക്കോ ഒപ്പം ചൂടോടെ വിളമ്പുക.`,
    },
    image: `${IMAGES}/home/sec-4-1.jpg`,
    bg_image: `${IMAGES}/home/sec-2-1.jpg`,
    cooking_time: 25,
    utensils_needed: [UTENSIL.kadai, UTENSIL.spatula, UTENSIL.knifeBoard],
  },
  {
    id: 2,
    name: { en: 'Mushroom Dry Fry', ml: 'കൂൺ ഡ്രൈ ഫ്രൈ', kn: 'ಅಣಬೆ ಡ್ರೈ ಫ್ರೈ', ta: 'காளான் டிரை ஃப்ரை' },
    ingredients: [
      { name: ING.oysterMushroom, quantity: 250, unit: 'g' },
      { name: ING.chilliPowder, quantity: 1.5, unit: 'tsp' },
      { name: ING.turmeric, quantity: 0.25, unit: 'tsp' },
      { name: ING.gingerGarlicPaste, quantity: 1, unit: 'tbsp' },
      { name: ING.lemonJuice, quantity: 1, unit: 'tbsp' },
      { name: ING.riceFlour, quantity: 2, unit: 'tbsp' },
      { name: ING.cornFlour, quantity: 1, unit: 'tbsp' },
      { name: ING.curryLeaves, quantity: 2, unit: 'sprig' },
      { name: ING.oilForFrying, quantity: null, unit: 'as_needed' },
      { name: ING.salt, quantity: null, unit: 'to_taste' },
    ],
    cooking_instruction: {
      en: `Squeeze any extra water from the cleaned mushrooms and tear them into bite-sized pieces.
Mix chilli powder, turmeric, ginger-garlic paste, lemon juice and salt. Coat the mushrooms well and rest them for 15 minutes.
Sprinkle rice flour and corn flour and toss until every piece is lightly coated. Do not add water.
Heat oil in a kadai and deep-fry the mushrooms in small batches until crisp.
Fry the curry leaves in the same oil and scatter them over the mushrooms.
Serve hot with sliced onion and a wedge of lemon.`,
      ml: `വൃത്തിയാക്കിയ കൂണിലെ അധിക വെള്ളം പിഴിഞ്ഞുകളഞ്ഞ് ചെറിയ കഷണങ്ങളായി കീറുക.
മുളകുപൊടി, മഞ്ഞൾപ്പൊടി, ഇഞ്ചി-വെളുത്തുള്ളി പേസ്റ്റ്, നാരങ്ങാനീര്, ഉപ്പ് എന്നിവ യോജിപ്പിച്ച് കൂണിൽ നന്നായി പുരട്ടി 15 മിനിറ്റ് വെക്കുക.
അരിപ്പൊടിയും കോൺഫ്ലോറും വിതറി എല്ലാ കഷണങ്ങളിലും പിടിക്കുന്നതുവരെ ഇളക്കുക. വെള്ളം ചേർക്കരുത്.
ചീനച്ചട്ടിയിൽ എണ്ണ ചൂടാക്കി കൂൺ കുറച്ചുവീതം ഇട്ട് മൊരിയുന്നതുവരെ വറുത്തുകോരുക.
അതേ എണ്ണയിൽ കറിവേപ്പില വറുത്ത് കൂണിന് മുകളിൽ വിതറുക.
അരിഞ്ഞ സവാളയും നാരങ്ങാക്കഷണവും ചേർത്ത് ചൂടോടെ വിളമ്പുക.`,
    },
    image: `${IMAGES}/home/sec-4-2.jpg`,
    bg_image: `${IMAGES}/home/sec-2-2.jpg`,
    cooking_time: 35,
    utensils_needed: [UTENSIL.mixingBowl, UTENSIL.kadai, UTENSIL.slottedSpoon],
  },
  {
    id: 3,
    name: { en: 'Mushroom Curry', ml: 'കൂൺ കറി', kn: 'ಅಣಬೆ ಕರಿ', ta: 'காளான் கறி' },
    ingredients: [
      { name: ING.oysterMushroom, quantity: 250, unit: 'g' },
      { name: ING.onion, quantity: 1, unit: 'nos' },
      { name: ING.tomato, quantity: 1, unit: 'nos' },
      { name: ING.greenChilli, quantity: 2, unit: 'nos' },
      { name: ING.gingerGarlicPaste, quantity: 1, unit: 'tbsp' },
      { name: ING.corianderPowder, quantity: 1.5, unit: 'tsp' },
      { name: ING.chilliPowder, quantity: 1, unit: 'tsp' },
      { name: ING.turmeric, quantity: 0.25, unit: 'tsp' },
      { name: ING.garamMasala, quantity: 0.5, unit: 'tsp' },
      { name: ING.thinCoconutMilk, quantity: 1, unit: 'cup' },
      { name: ING.thickCoconutMilk, quantity: 1, unit: 'cup' },
      { name: ING.mustardSeeds, quantity: 0.5, unit: 'tsp' },
      { name: ING.curryLeaves, quantity: 1, unit: 'sprig' },
      { name: ING.coconutOil, quantity: 2, unit: 'tbsp' },
      { name: ING.salt, quantity: null, unit: 'to_taste' },
    ],
    cooking_instruction: {
      en: `Heat coconut oil in a pan, splutter the mustard seeds and add curry leaves.
Add sliced onion and green chillies and sauté until soft. Add ginger-garlic paste and cook for a minute.
Lower the flame, add turmeric, chilli and coriander powders and stir until fragrant.
Add the chopped tomato and cook until it turns soft and mushy.
Add the mushrooms, salt and the thin coconut milk. Cover and simmer for 8–10 minutes.
Pour in the thick coconut milk and garam masala. Heat gently without letting it boil, then switch off.
Serve with appam, idiyappam, chapati or rice.`,
      ml: `പാനിൽ വെളിച്ചെണ്ണ ചൂടാക്കി കടുക് പൊട്ടിച്ച് കറിവേപ്പില ചേർക്കുക.
അരിഞ്ഞ സവാളയും പച്ചമുളകും ചേർത്ത് വാടുന്നതുവരെ വഴറ്റുക. ഇഞ്ചി-വെളുത്തുള്ളി പേസ്റ്റ് ചേർത്ത് ഒരു മിനിറ്റ് വഴറ്റുക.
തീ കുറച്ച് മഞ്ഞൾപ്പൊടി, മുളകുപൊടി, മല്ലിപ്പൊടി എന്നിവ ചേർത്ത് മണം വരുന്നതുവരെ ഇളക്കുക.
അരിഞ്ഞ തക്കാളി ചേർത്ത് നന്നായി ഉടയുന്നതുവരെ വേവിക്കുക.
കൂൺ, ഉപ്പ്, നേർത്ത തേങ്ങാപ്പാൽ എന്നിവ ചേർത്ത് മൂടിവെച്ച് 8–10 മിനിറ്റ് വേവിക്കുക.
കട്ടിയുള്ള തേങ്ങാപ്പാലും ഗരം മസാലയും ചേർത്ത് തിളയ്ക്കാൻ അനുവദിക്കാതെ ചൂടാക്കി തീ അണയ്ക്കുക.
അപ്പം, ഇടിയപ്പം, ചപ്പാത്തി അല്ലെങ്കിൽ ചോറിനൊപ്പം വിളമ്പുക.`,
    },
    image: `${IMAGES}/home/sec-4-3.webp`,
    bg_image: `${IMAGES}/home/sec-2-1.jpg`,
    cooking_time: 30,
    utensils_needed: [UTENSIL.panWithLid, UTENSIL.spatula, UTENSIL.knifeBoard],
  },
  {
    id: 4,
    name: { en: 'Mushroom Upperi', ml: 'കൂൺ ഉപ്പേരി', kn: 'ಅಣಬೆ ಪಲ್ಯ', ta: 'காளான் பொரியல்' },
    ingredients: [
      { name: ING.oysterMushroom, quantity: 250, unit: 'g' },
      { name: ING.gratedCoconut, quantity: 0.5, unit: 'cup' },
      { name: ING.shallots, quantity: 6, unit: 'nos' },
      { name: ING.greenChilli, quantity: 2, unit: 'nos' },
      { name: ING.garlic, quantity: 3, unit: 'clove' },
      { name: ING.turmeric, quantity: 0.25, unit: 'tsp' },
      { name: ING.chilliPowder, quantity: 0.5, unit: 'tsp' },
      { name: ING.mustardSeeds, quantity: 0.5, unit: 'tsp' },
      { name: ING.driedRedChilli, quantity: 2, unit: 'nos' },
      { name: ING.curryLeaves, quantity: 1, unit: 'sprig' },
      { name: ING.coconutOil, quantity: 1.5, unit: 'tbsp' },
      { name: ING.salt, quantity: null, unit: 'to_taste' },
    ],
    cooking_instruction: {
      en: `Chop the mushrooms finely.
Lightly crush the grated coconut, shallots, green chillies, garlic and turmeric together without adding water.
Heat coconut oil, splutter the mustard seeds and add dried red chillies and curry leaves.
Add the mushrooms and salt. Stir on medium heat until the water dries up.
Add the crushed coconut mix and chilli powder. Mix well and cook for 4–5 minutes, stirring often, until dry and fragrant.
Serve as a side dish with rice.`,
      ml: `കൂൺ ചെറുതായി അരിയുക.
ചിരകിയ തേങ്ങ, ചെറിയ ഉള്ളി, പച്ചമുളക്, വെളുത്തുള്ളി, മഞ്ഞൾപ്പൊടി എന്നിവ വെള്ളം ചേർക്കാതെ ചെറുതായി ചതച്ചെടുക്കുക.
വെളിച്ചെണ്ണ ചൂടാക്കി കടുക് പൊട്ടിച്ച് വറ്റൽമുളകും കറിവേപ്പിലയും ചേർക്കുക.
കൂണും ഉപ്പും ചേർത്ത് വെള്ളം വറ്റുന്നതുവരെ ഇടത്തരം തീയിൽ ഇളക്കുക.
ചതച്ച തേങ്ങാക്കൂട്ടും മുളകുപൊടിയും ചേർത്ത് നന്നായി യോജിപ്പിച്ച്, ഇടയ്ക്കിടെ ഇളക്കി 4–5 മിനിറ്റ് ഉലർത്തിയെടുക്കുക.
ചോറിനൊപ്പം ഉപ്പേരിയായി വിളമ്പുക.`,
    },
    image: `${IMAGES}/home/sec-4-4.jpg`,
    bg_image: `${IMAGES}/home/sec-2-2.jpg`,
    cooking_time: 20,
    utensils_needed: [UTENSIL.mortar, UTENSIL.kadai, UTENSIL.spatula],
  },
];

// ---------------------------------------------------------------------------
// Products for the shop (/shop/list and /shop/details/<id>) and the home page.
// Later this will come from the database. Pages read it through
// src/services/productService.js, so switching only needs a change there.
//
// Product structure:
// {
//   id: number,                  unique, used in the page address /shop/details/<id>
//   sku: text code,              your stock code, e.g. 'OF-PREMIX-SOUP-25'
//   slug: text,                  short web name, e.g. 'mushroom-soup-premix'
//   name: text,
//   category: category id,       one of PRODUCT_CATEGORIES below
//   short_description: text,     one line, shown on cards
//   description: text,           longer text, shown on the product page
//   images: [picture, ...],      first one is the main picture
//   price: number | null,        selling price in rupees; null shows "Price on request"
//   mrp: number | null,          printed MRP; shown struck through when higher than price
//   currency: 'INR',
//   net_quantity: number | null, pack size, e.g. 25 (null hides it)
//   unit: unit code,             g, kg, ml, l, nos, pack, bed
//   in_stock: true | false,
//   is_featured: true | false,   featured products are shown on the home page
//   badge: text | null,          small label on the picture, e.g. 'New'
//   highlights: [text, ...],     short selling points
//   how_to_use: text | null,     one step per line
//   storage: text | null,
//   shelf_life: text | null,
// }
//
// As with recipes, any "text" can be plain English or { en, ml, kn, ta }.
// ---------------------------------------------------------------------------

export const PRODUCT_CATEGORIES = [
  { id: 'fresh', name: 'Fresh mushrooms' },
  { id: 'dried', name: 'Dried & powders' },
  { id: 'ready-to-cook', name: 'Ready to cook' },
  { id: 'grow', name: 'Grow your own' },
];

export const PRODUCTS = [
  {
    id: 1,
    sku: 'OF-FRESH-WHITE',
    slug: 'white-oyster-mushrooms',
    name: 'White Oyster Mushrooms',
    category: 'fresh',
    short_description: 'Fresh white oyster mushrooms, delivered straight from our farm to your home.',
    description: `Tender, mild and quick to cook, our white oyster mushrooms are harvested fresh at our hi-tech farm in Kozhikode and packed the same day.
They soak up spices beautifully, which makes them perfect for Kerala-style fries, thorans, curries and biryanis.`,
    images: [`${IMAGES}/home/sec-2-1.jpg`],
    price: null,
    mrp: null,
    currency: 'INR',
    net_quantity: null,
    unit: 'g',
    in_stock: true,
    is_featured: true,
    badge: 'Fresh',
    highlights: ['Harvested fresh', 'Grown on our own farm', '100% vegan source of protein'],
    how_to_use: `Wipe or rinse quickly and pat dry.
Tear or slice into strips.
Cook on medium-high heat until golden, then add your spices.`,
    storage: 'Keep refrigerated in a paper bag or the box it came in.',
    shelf_life: 'Best within 3 days of delivery.',
  },
  {
    id: 2,
    sku: 'OF-FRESH-GREY',
    slug: 'grey-oyster-mushrooms',
    name: 'Grey Oyster Mushrooms',
    category: 'fresh',
    short_description: 'Our grey variety makes your dishes even more flavourful.',
    description: `Grey oyster mushrooms have a slightly firmer bite and a deeper, earthier taste than the white variety.
Try them in a dry fry or a pepper roast, where their flavour really comes through.`,
    images: [`${IMAGES}/home/sec-2-2.jpg`],
    price: null,
    mrp: null,
    currency: 'INR',
    net_quantity: null,
    unit: 'g',
    in_stock: true,
    is_featured: true,
    badge: 'Fresh',
    highlights: ['Richer, earthier taste', 'Firm, meaty bite', 'Harvested fresh'],
    how_to_use: `Rinse quickly and pat dry.
Tear into strips along the gills.
Fry, roast or add to curries.`,
    storage: 'Keep refrigerated in a paper bag or the box it came in.',
    shelf_life: 'Best within 3 days of delivery.',
  },
  {
    id: 3,
    sku: 'OF-DRIED',
    slug: 'dried-mushrooms',
    name: 'Dried Mushrooms',
    category: 'dried',
    short_description: 'Shade-dried mushrooms that keep for 6 months, with all the goodness of fresh ones.',
    description: `Tired of buying mushrooms every day? Our mushrooms are gently shade-dried to keep their flavour and nutrients.
Soak them in warm water and use them just like fresh mushrooms, any time you like.`,
    images: [`${IMAGES}/home/sec-2-7.webp`],
    price: null,
    mrp: null,
    currency: 'INR',
    net_quantity: null,
    unit: 'g',
    in_stock: true,
    is_featured: true,
    badge: null,
    highlights: ['6-month shelf life', 'Shade-dried', 'Handy pantry staple'],
    how_to_use: `Soak in warm water for 15–20 minutes.
Squeeze out the water and cook like fresh mushrooms.
Keep the soaking water for soups and gravies.`,
    storage: 'Store in an airtight container in a cool, dry place.',
    shelf_life: '6 months.',
  },
  {
    id: 4,
    sku: 'OF-POWDER',
    slug: 'mushroom-powder',
    name: 'Mushroom Powder',
    category: 'dried',
    short_description: 'Add a pinch to your daily dishes to boost both taste and nutrition.',
    description: `Finely ground from our dried mushrooms, this powder is the easiest way to add mushroom goodness to everyday food.
Stir it into soups, gravies, chapati dough, dosa batter or even smoothies.`,
    images: [`${IMAGES}/home/sec-2-8.jpg`],
    price: null,
    mrp: null,
    currency: 'INR',
    net_quantity: null,
    unit: 'g',
    in_stock: true,
    is_featured: true,
    badge: null,
    highlights: ['Easy daily nutrition', 'Adds natural umami', 'Kid-friendly'],
    how_to_use: `Add 1–2 teaspoons to soups, gravies or dough.
Mix well and cook as usual.`,
    storage: 'Store in an airtight container in a cool, dry place.',
    shelf_life: null,
  },
  {
    id: 5,
    sku: 'OF-PREMIX-SOUP-25',
    slug: 'mushroom-soup-premix',
    name: 'Mushroom Soup Premix',
    category: 'ready-to-cook',
    short_description: 'Rich, creamy mushroom soup, ready in 3 minutes.',
    description: `Our mushroom soup premix is made with mushrooms from our own farm, so you can enjoy a hearty, nourishing soup any time, without the chopping and stirring.
Perfect for a quick evening snack, a light dinner or a warm cup on a rainy day.`,
    images: [`${IMAGES}/shop/soup-premix.jpg`],
    price: 60,
    mrp: 60,
    currency: 'INR',
    net_quantity: 25,
    unit: 'g',
    in_stock: true,
    is_featured: true,
    badge: 'New',
    highlights: ['Ready in 3 minutes', 'No added preservatives', 'No artificial flavours', '100% vegetarian'],
    how_to_use: `Empty the pack into a pan with water.
Stir well and bring to a boil, stirring often.
Simmer for about 3 minutes until thick, then serve hot.`,
    storage: 'Store in a cool, dry place. Close tightly after opening.',
    shelf_life: null,
  },
  {
    id: 6,
    sku: 'OF-SPAWN',
    slug: 'mushroom-spawn',
    name: 'Mushroom Spawn',
    category: 'grow',
    short_description: 'Planning to cultivate mushrooms? Start with our high-quality spawn.',
    description: `Healthy, high-yield spawn, the same spawn we use on our own farm.
Ideal for home growers and new mushroom farmers. Ask us for growing tips when you order.`,
    images: [`${IMAGES}/home/sec-2-3.jpg`],
    price: null,
    mrp: null,
    currency: 'INR',
    net_quantity: 1,
    unit: 'pack',
    in_stock: true,
    is_featured: false,
    badge: 'For growers',
    highlights: ['The spawn we use ourselves', 'High yield', 'Growing support from our team'],
    how_to_use: null,
    storage: 'Keep in a cool, shaded place and use soon after delivery.',
    shelf_life: null,
  },
  {
    id: 7,
    sku: 'OF-GROW-BED',
    slug: 'ready-to-pluck-beds',
    name: 'Ready-to-pluck Beds',
    category: 'grow',
    short_description: 'Grow mushrooms at home with no technical know-how. Just water and harvest.',
    description: `A fully grown mushroom bed that starts fruiting at home within days.
Keep it in a shaded corner, spray a little water every day and watch fresh mushrooms appear. A fun project for kids and a fresh harvest for the kitchen.`,
    images: [`${IMAGES}/home/sec-2-4.jpg`],
    price: null,
    mrp: null,
    currency: 'INR',
    net_quantity: 1,
    unit: 'bed',
    in_stock: true,
    is_featured: true,
    badge: 'For growers',
    highlights: ['No experience needed', 'Harvest at home', 'Great for kids'],
    how_to_use: `Keep the bed in a cool, shaded place away from direct sun.
Spray water lightly 2–3 times a day.
Twist and pluck mushrooms when the caps open out.`,
    storage: null,
    shelf_life: null,
  },
];
