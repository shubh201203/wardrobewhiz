// Helper: returns true if outfit matches scenario broadly
export function filterOutfitsByScenario(outfits, scenario) {
  if (!scenario || scenario === 'all') return outfits;
  return outfits.filter(outfit => outfit.scenario === scenario || outfit.scenario === 'casual' && scenario === 'college');
}

// Helper: check for wardrobe gaps based on simple rules
export function detectWardrobeGaps(wardrobe) {
  const gaps = [];
  const hasFormalShoes = wardrobe.some(item => item.category === 'shoes' && item.type === 'formal');
  const hasOuterwear = wardrobe.some(item => item.category === 'outerwear');

  if (!hasFormalShoes) {
    gaps.push({ title: 'Shoe Gap', message: 'You lack formal shoes. Adding a pair will unlock more formal outfits.' });
  }
  if (!hasOuterwear) {
    gaps.push({ title: 'Layering Gap', message: 'No jackets found. Try adding a blazer or coat for layered looks.' });
  }

  return gaps;
}

// Dynamic Chat Stylist logic
export function generateChatResponse(query, wardrobe) {
  const q = query.toLowerCase();
  
  if (q.includes('party')) {
    const hasPartyItems = wardrobe.some(i => i.type === 'party');
    if (hasPartyItems) {
      return "Confidence: 89%. You have a great Red Silk Top or Leather Jacket that would kill at a party! Try pairing it with dark denim.";
    }
    return "Confidence: 75%. You don't have many party-specific items, but your black jeans and a clean top can work as a minimal party look.";
  }
  
  if (q.includes('interview') || q.includes('formal')) {
    return "Confidence: 94%. Definitely go with the Navy Blue Blazer and White Button-up. It's a classic and professional combination.";
  }

  if (q.includes('date')) {
    return "Confidence: 91%. The Beige Trench Coat over your casual basics offers a smart-casual vibe perfect for a date.";
  }

  if (q.includes('college')) {
    return "Confidence: 98%. Keep it simple! The White T-Shirt and Grey Joggers or Jeans are perfect for comfort.";
  }

  return "Confidence: 85%. I recommend sticking to your neutral basics to be safe. They pair well with anything.";
}
