import { Goat, GoatCategory } from '~/types/goat';

export const goatCategories: GoatCategory[] = [
  { id: '1', name: 'Dairy' },
  { id: '2', name: 'Meat' },
  { id: '3', name: 'Pet' },
  { id: '4', name: 'Show' },
];

const goatNames = [
  'Alpine', 'Nubian', 'Saanen', 'Boer', 'Angora', 'Pygmy', 'Nigerian Dwarf',
  'LaMancha', 'Kiko', 'Spanish', 'Toggenburg', 'Oberhasli', 'Cashmere', 'Kinder',
  'Golden Guernsey'
];

const descriptions = [
  'A great dairy goat breed',
  'Perfect for meat production',
  'Excellent show goat',
  'Friendly pet goat',
  'High milk producer',
  'Award-winning bloodline',
  'Great for beginners',
  'Show quality breed',
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomColor(): string {
  const colors = ['4287f5', 'f54242', '42f554', 'f542f5', 'f5d442', '42f5f5'];
  return getRandomElement(colors);
}

function getRandomPrice(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateUsername(name: string, index: number): string {
  return `${name}`;
}

export const goats: Goat[] = Array.from({ length: 100 }, (_, index) => {
  const categoryId = getRandomElement(goatCategories).id;
  const basePrice = categoryId === '1' ? 500 : 
                   categoryId === '2' ? 400 :
                   categoryId === '3' ? 300 :
                   600; // Show goats are more expensive
  
  const name = `${getRandomElement(goatNames)} #${index + 1}`;

  return {
    id: (index + 1).toString(),
    name,
    username: generateUsername((index + 1).toString(), index + 1),
    image: `https://placehold.co/400x300/${getRandomColor()}/ffffff?text=Goat+${index + 1}`,
    category: categoryId,
    price: getRandomPrice(basePrice, basePrice + 300),
    description: getRandomElement(descriptions),
  };
}); 