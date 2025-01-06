import type { Category, Niveau } from '@prisma/client';

export interface StudentProduct {
  id: number;
  title: string;
  description: string | null;
  category: Category | null;
  niveau: Niveau | null;
  price: number;
}
