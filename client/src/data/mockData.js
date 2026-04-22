export const initialWardrobe = [
  { id: '1', name: 'White Crewneck T-Shirt', category: 'top', color: 'White', type: 'casual', image: '/images/tshirt.png' },
  { id: '2', name: 'Black Denim Jeans', category: 'bottom', color: 'Black', type: 'casual', image: '/images/jeans.png' },
  { id: '3', name: 'Beige Trench Coat', category: 'outerwear', color: 'Beige', type: 'formal', image: '/images/coat.png' },
  { id: '4', name: 'Navy Blue Blazer', category: 'outerwear', color: 'Navy', type: 'formal', image: '/images/coat.png' },
  { id: '5', name: 'Light Wash Denim', category: 'bottom', color: 'Blue', type: 'casual', image: '/images/jeans.png' },
  { id: '6', name: 'White Button-Up', category: 'top', color: 'White', type: 'formal', image: '/images/tshirt.png' },
  { id: '7', name: 'Grey Joggers', category: 'bottom', color: 'Grey', type: 'casual', image: '/images/jeans.png' },
  { id: '8', name: 'Black Leather Jacket', category: 'outerwear', color: 'Black', type: 'party', image: '/images/coat.png' },
  { id: '9', name: 'Red Silk Top', category: 'top', color: 'Red', type: 'party', image: '/images/tshirt.png' },
  { id: '10', name: 'Black Trousers', category: 'bottom', color: 'Black', type: 'formal', image: '/images/jeans.png' },
];

export const initialOutfits = [
  {
    id: 'o1',
    name: 'Casual Minimalist',
    top: initialWardrobe[0],
    bottom: initialWardrobe[1],
    scenario: 'college',
    confidence: '98%',
    reason: 'Monochrome contrast provides a clean, timeless everyday look.'
  },
  {
    id: 'o2',
    name: 'Smart Casual Layer',
    top: initialWardrobe[0],
    bottom: initialWardrobe[1],
    outerwear: initialWardrobe[2],
    scenario: 'date',
    confidence: '95%',
    reason: 'The beige coat elevates the simple black and white base.'
  },
  {
    id: 'o3',
    name: 'Formal Evening',
    top: initialWardrobe[5],
    bottom: initialWardrobe[9],
    outerwear: initialWardrobe[3],
    scenario: 'interview',
    confidence: '99%',
    reason: 'Classic navy-white-black combo ensures professional readiness.'
  },
  {
    id: 'o4',
    name: 'Weekend Relax',
    top: initialWardrobe[0],
    bottom: initialWardrobe[6],
    scenario: 'casual',
    confidence: '92%',
    reason: 'Soft fabrics and neutral tones for ultimate comfort.'
  },
  {
    id: 'o5',
    name: 'Night Out',
    top: initialWardrobe[8],
    bottom: initialWardrobe[1],
    outerwear: initialWardrobe[7],
    scenario: 'party',
    confidence: '96%',
    reason: 'Bold red paired with sleek black leather speaks confidence.'
  }
];

export const mockInsights = [
  { id: 'i1', type: 'warning', title: 'Wardrobe Gap Detected', text: 'You lack formal shoes. Adding a pair of black oxfords will unlock 4 new outfits.' },
  { id: 'i2', type: 'tip', title: 'Color Palette Analysis', text: '70% of your wardrobe is neutral. Consider adding a pop of color for spring.' },
  { id: 'i3', type: 'insight', title: 'Most Worn Pair', text: 'Your White Crewneck and Black Jeans are a winning combo (Worn 12 times).' }
];
