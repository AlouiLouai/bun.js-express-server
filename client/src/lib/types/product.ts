export interface Product {
  id: string;
  link: string;
  logo?: string;
  description?: string;
  price: number;
  ttile: string;
  userId: number;
  category?: string;
  class?: string;
  createdAt: string;
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}
