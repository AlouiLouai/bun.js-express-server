export interface Product {
  link: string;
  description: string;
  price: number;
  title: string;
  category?: Category;
  niveau?: Level;
}

export interface ProductDisplayStudent {
  id: number;
  link?: string;
  description: string;
  price: number;
  title: string;
  category?: Category;
  niveau?: Level;
}

// Modify ProductDisplayStudent to extend Record<string, unknown>
export interface ProductDisplayStudentAlgoliaSearch extends Record<string, unknown> {
  id: number;
  title: string;
  description: string;
  category: Category;
  niveau: Level;
  price: number;
  link?: string;
}


export interface ProductState {
  product: Product;
  products: Product[];
  loading: boolean;
  error: string | null;
}

export enum Category {
  MATH = 'MATH',
  SCIENCE = 'SCIENCE',
}

export enum Level {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  THIRD = 'THIRD',
  FOURTH = 'FOURTH',
  FIFTH = 'FIFTH',
  SIXTH = 'SIXTH',
}
