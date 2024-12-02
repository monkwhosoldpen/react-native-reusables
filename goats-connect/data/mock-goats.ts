import { Goat, GoatType } from '~/types/goat';

type BreedRecord = Record<Exclude<GoatType, 'all'>, string[]>;
type DescriptionRecord = Record<Exclude<GoatType, 'all'>, string[]>;

const goatBreeds: BreedRecord = {
  dairy: [
    'Alpine', 'Nubian', 'Saanen', 'LaMancha', 'Oberhasli', 'Toggenburg', 'Nigerian Dwarf',
    'Sable', 'Golden Guernsey', 'British Alpine'
  ],
  meat: [
    'Boer', 'Kiko', 'Spanish', 'Myotonic', 'Savanna', 'Black Bengal', 'Red Kalahari',
    'Rangeland', 'Texmaster', 'Kalahari Red'
  ],
  fiber: [
    'Angora', 'Cashmere', 'Pygora', 'Nigora', 'Kashmir', 'Australian Cashmere', 
    'Don', 'Soviet Mohair', 'Tennessee Fainting', 'Uzbek Black'
  ],
  pet: [
    'Pygmy', 'Mini Silky', 'Kinder', 'Mini Nubian', 'African Pygmy', 'Australian Miniature',
    'Mini LaMancha', 'Dwarf Nigerian', 'Mini Alpine', 'Mini Oberhasli'
  ]
};

const descriptions: DescriptionRecord = {
  dairy: [
    'Excellent milk producer with high butterfat content',
    'Consistent dairy producer with great temperament',
    'Award-winning dairy lineage',
    'Perfect for small-scale dairy production',
    'High-yielding milk goat with excellent genetics'
  ],
  meat: [
    'Fast-growing meat breed with excellent confirmation',
    'Premium meat goat with superior genetics',
    'Ideal for commercial meat production',
    'High-quality meat producer with good feed conversion',
    'Muscular build with excellent meat-to-bone ratio'
  ],
  fiber: [
    'Produces high-quality fiber with excellent staple length',
    'Premium fiber producer with consistent yields',
    'Known for soft, luxurious fiber production',
    'Excellent fiber characteristics and yield',
    'Superior fiber quality with great handling'
  ],
  pet: [
    'Friendly temperament, perfect for families',
    'Great companion animal with loving personality',
    'Gentle nature, ideal for children',
    'Well-socialized and easy to handle',
    'Perfect backyard companion'
  ]
};

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generatePrice(category: Exclude<GoatType, 'all'>): number {
  const basePrice = {
    dairy: 800,
    meat: 600,
    fiber: 700,
    pet: 400,
  }[category];

  const variation = basePrice * 0.3;
  return Math.floor(basePrice + (Math.random() * variation * 2 - variation));
}

function generateUsername(breed: string, index: number): string {
  const prefix = breed.toLowerCase().replace(/\s+/g, '_');
  const randomNum = Math.floor(Math.random() * 1000);
  return `${prefix}_${randomNum}_${index}`;
}

function generateGoat(category: Exclude<GoatType, 'all'>, id: number): Goat {
  const breed = getRandomElement(goatBreeds[category]);
  const description = getRandomElement(descriptions[category]);

  return {
    id: id.toString(),
    name: `${breed} #${id}`,
    username: generateUsername(breed, id),
    description,
    image: `https://picsum.photos/seed/goat${id}/400/400`,
    price: generatePrice(category),
    category
  };
}

export const MOCK_GOATS: Goat[] = [];

// Generate 500 goats for each category
(['dairy', 'meat', 'fiber', 'pet'] as const).forEach(category => {
  for (let i = 0; i < 500; i++) {
    MOCK_GOATS.push(generateGoat(category, MOCK_GOATS.length + 1));
  }
});

// Shuffle the array
for (let i = MOCK_GOATS.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [MOCK_GOATS[i], MOCK_GOATS[j]] = [MOCK_GOATS[j], MOCK_GOATS[i]];
} 