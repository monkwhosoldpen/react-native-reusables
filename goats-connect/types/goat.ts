export type GoatCategory = {
  id: string;
  value: 'all' | 'dairy' | 'meat' | 'fiber' | 'pet';
  label: string;
};

export type GoatType = 'all' | 'dairy' | 'meat' | 'fiber' | 'pet';

export type Goat = {
  id: string;
  name: string;
  username: string;
  description: string;
  image: string;
  price: number;
  category: GoatType;
}; 