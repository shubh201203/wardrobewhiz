import test from 'node:test';
import assert from 'node:assert/strict';
import { filterOutfitsByScenario, detectWardrobeGaps, generateChatResponse } from '../client/src/utils/outfitLogic.js';

test('filterOutfitsByScenario should filter outfits correctly', () => {
  const mockOutfits = [
    { id: '1', scenario: 'casual' },
    { id: '2', scenario: 'interview' },
    { id: '3', scenario: 'party' }
  ];

  const casuals = filterOutfitsByScenario(mockOutfits, 'casual');
  assert.equal(casuals.length, 1);
  assert.equal(casuals[0].id, '1');

  const all = filterOutfitsByScenario(mockOutfits, 'all');
  assert.equal(all.length, 3);
});

test('detectWardrobeGaps should detect missing footwear and outerwear', () => {
  const minimalWardrobe = [
    { category: 'top', type: 'casual' },
    { category: 'bottom', type: 'casual' }
  ];

  const gaps = detectWardrobeGaps(minimalWardrobe);
  assert.equal(gaps.length, 2);
  assert.ok(gaps.some(g => g.title === 'Shoe Gap'));
  assert.ok(gaps.some(g => g.title === 'Layering Gap'));
});

test('detectWardrobeGaps should report zero gaps when wardrobe is complete', () => {
  const completeWardrobe = [
    { category: 'top', type: 'casual' },
    { category: 'bottom', type: 'casual' },
    { category: 'outerwear', type: 'formal' },
    { category: 'shoes', type: 'formal' }
  ];

  const gaps = detectWardrobeGaps(completeWardrobe);
  assert.equal(gaps.length, 0);
});

test('generateChatResponse should return tailored styling advice', () => {
  const wardrobe = [
    { category: 'top', type: 'party', color: 'Red' },
    { category: 'bottom', type: 'casual', color: 'Black' }
  ];

  const partyAdvice = generateChatResponse('What should I wear to a party tonight?', wardrobe);
  assert.ok(partyAdvice.includes('party') || partyAdvice.includes('Confidence'));

  const formalAdvice = generateChatResponse('I have a job interview tomorrow', wardrobe);
  assert.ok(formalAdvice.includes('Blazer') || formalAdvice.includes('Confidence'));
});
