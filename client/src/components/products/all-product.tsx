'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ProductCard } from '@/components/products/product-card';
import AuthService from '@/services/auth.services';

const products = [
  {
    id: 1,
    name: 'Classic T-Shirt',
    description: 'Comfortable cotton t-shirt for everyday wear',
    image: '/landing-1.png',
  },
  {
    id: 2,
    name: 'Denim Jeans',
    description: 'Stylish and durable jeans for any occasion',
    image: '/landing-1.png',
  },
  {
    id: 3,
    name: 'Running Shoes',
    description: 'Lightweight and supportive shoes for your workouts',
    image: '/landing-1.png',
  },
  {
    id: 4,
    name: 'Leather Wallet',
    description: 'Sleek and functional wallet to keep your essentials',
    image: '/landing-1.png',
  },
  // {
  //   id: 5,
  //   name: 'Sunglasses',
  //   description: 'Protect your eyes in style with these trendy shades',
  //   image: '/landing-1.png',
  // },
  // {
  //   id: 6,
  //   name: 'Smartwatch',
  //   description: 'Stay connected and track your fitness with this smartwatch',
  //   image: '/landing-1.png',
  // },
];

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
}

export function AllProducts() {
  const [visibleProducts, setVisibleProducts] = useState(products);
  const [loading, setLoading] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // const [users, setUsers] = useState<User[]>([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const authService = new AuthService();
  //     const response: any[] = await authService.users(); // Ensure response matches the User[] type
  //     setUsers(response); // Now this works as expected
  //   };
  //   fetchUsers();
  // }, []);

  //console.log('USERS :', users);

  // Function to load more products
  const loadMoreProducts = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setVisibleProducts((prev) => [
        ...prev,
        ...products.map((product) => ({
          ...product,
          id: prev.length + product.id, // Generate unique IDs for new products
        })),
      ]);
      setLoading(false);
    }, 1000); // Simulate network delay
  };

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreProducts();
        }
      },
      { root: null, rootMargin: '0px', threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(loadMoreRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMoreRef.current]);

  return (
    <div className="flex flex-1 overflow-y-auto">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">Our Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleProducts.map((product) => (
              <div key={product.id} className="group">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
          {loading && (
            <div className="text-center mt-4">
              <p>Loading more products...</p>
            </div>
          )}
          <div ref={loadMoreRef} className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}
