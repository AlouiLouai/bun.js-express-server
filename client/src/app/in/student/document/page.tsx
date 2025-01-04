'use client';
import { useEffect, useState } from 'react';
import { products } from '@/components/mock/products';
import { ProductDisplayStudent } from '@/types/product';
import Navbar from '@/components/student/products/navbar';
import ProductGrid from '@/components/student/products/product-grid';
import { BackgroundGradient } from '@/components/ui/background-gradient';

type FilterState = {
  category: string;
  level: string;
  minPrice?: number;
  maxPrice?: number;
  search: string;
};

export default function ProductsPage() {
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    level: '',
    minPrice: undefined,
    maxPrice: undefined,
    search: '',
  });

  const [filteredProducts, setFilteredProducts] =
    useState<ProductDisplayStudent[]>(products);

  useEffect(() => {
    const filterProducts = () => {
      const filtered = products.filter((product) => {
        const categoryMatch =
          !filters.category || product.category === filters.category;
        const levelMatch = !filters.level || product.niveau === filters.level;
        const priceMatch =
          (!filters.minPrice || product.price >= filters.minPrice) &&
          (!filters.maxPrice || product.price <= filters.maxPrice);
        const searchMatch =
          !filters.search ||
          product.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(filters.search.toLowerCase());

        return categoryMatch && levelMatch && priceMatch && searchMatch;
      });
      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  return (
    <BackgroundGradient className="rounded-[22px] max-w-[100vw] p-4 sm:p-10 bg-white dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Products</h1>
        <div className="flex justify-center mb-8">
          <Navbar filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* Conditionally render product grid or message */}
        {filteredProducts.length === 0 ? (
          <div className="text-center text-xl text-gray-500 p-8">
            <p>No products available that match your filters</p>
          </div>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </div>
    </BackgroundGradient>
  );
}
