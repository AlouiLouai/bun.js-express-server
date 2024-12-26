'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from '../../../components/ui/sidebar';
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from '@tabler/icons-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ProductCard } from '@/components/products/product-card';

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

const links = [
  {
    label: 'Dashboard',
    href: '#',
    icon: (
      <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: 'Profile',
    href: '#',
    icon: (
      <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: 'Settings',
    href: '#',
    icon: (
      <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: 'Logout',
    href: '#',
    icon: (
      <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];

export default function SidebarDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        'w-screen h-screen',
        'rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden'
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: 'Manu Arora',
                href: '#',
                icon: (
                  <Image
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Admin dashboard
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

const Dashboard = () => {
  const [visibleProducts, setVisibleProducts] = useState(products);
  const [loading, setLoading] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

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
};
