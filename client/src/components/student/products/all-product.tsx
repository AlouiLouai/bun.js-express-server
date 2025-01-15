'use client';
import { useEffect, useState } from 'react';
import { ProductDisplayStudent } from '@/types/product';
import Navbar from '@/components/student/products/navbar';
import ProductGrid from '@/components/student/products/product-grid';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import ProductService from '@/services/product.services';
import { AiOutlineReload } from 'react-icons/ai';

type FilterState = {
  category: string;
  level: string;
  minPrice?: number;
  maxPrice?: number;
  search: string;
};

export function ProductsPage() {
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    level: '',
    minPrice: undefined,
    maxPrice: undefined,
    search: '',
  });

  const [products, setProducts] = useState<ProductDisplayStudent[]>([]); // Store the original products list
  const [filteredProducts, setFilteredProducts] = useState<
    ProductDisplayStudent[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // Track if there are more products to load

  // Fetch the products when the component mounts or page changes
  useEffect(() => {
    const fetchProducts = async (page: number) => {
      setLoading(true);
      setError(null); // Reset error before new fetch
      const productService = new ProductService();

      try {
        const response = await productService.getAllProductsForStudent(page); // Fetch page based on currentPage 

        if (response && Array.isArray(response.products)) {
          setProducts((prevProducts) => [
            ...prevProducts,
            ...response.products,
          ]); // Append new products to the existing list
          setFilteredProducts((prevFiltered) => [
            ...prevFiltered,
            ...response.products,
          ]);
          setHasMore(response.products.length > 0); // Check if there are more products
        } else {
          throw new Error(
            'Fetched data does not contain a valid products array'
          );
        }
      } catch (err) {
        console.error(err);
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(currentPage); // Initial page load
  }, [currentPage]); // Only re-run when the currentPage changes

  // Filter products based on the selected filters
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
  }, [filters, products]); // Trigger when filters or products change

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  // Load more products
  const handleLoadMore = () => {
    const scrollPosition = window.scrollY; // Get current scroll position
    setCurrentPage((prevPage) => prevPage + 1);

    // Restore scroll position after state update
    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
    }, 0);
  };

  return (
    <BackgroundGradient className="rounded-[22px] max-w-[100vw] p-4 sm:p-10 bg-white dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Documents</h1>
        <div className="flex justify-center mb-8">
          <Navbar filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* Conditionally render loading, error message, or product grid */}
        {loading ? (
          <div className="text-center text-xl text-gray-500 p-8">
            <p>Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center text-xl text-red-500 p-8">
            <p>{error}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-xl text-gray-500 p-8">
            <p>No products available that match your filters</p>
          </div>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}

        {/* Load More Button */}
        {hasMore && !loading && (
          <div className="flex justify-center mt-8">
            <button
              className="flex items-center gap-2 bg-slate-950 text-white py-1 px-3 rounded-full hover:bg-red-600 transition-all"
              onClick={handleLoadMore}
            >
              <AiOutlineReload /> Load More
            </button>
          </div>
        )}
      </div>
    </BackgroundGradient>
  );
}
