import { ProductDisplayStudent } from '@/types/product';
import ProductCard from './product-card';

type ProductGridProps = {
  products: ProductDisplayStudent[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
