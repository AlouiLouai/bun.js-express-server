'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ProductDisplayStudent } from '@/types/IProduct';
import ProductCardModal from '../../modals/product-card-modal';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ProductCardProps {
  product: ProductDisplayStudent;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{product.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-2">
            {product.category} | {product.niveau}
          </p>
          <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setIsModalOpen(true)}>View Details</Button>
        </CardFooter>
      </Card>
      <ProductCardModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
