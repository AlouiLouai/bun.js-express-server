'use client';
import React, { useRef, useState } from 'react';
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
    image: '/placeholder.svg?height=300&width=300',
  },
  {
    id: 2,
    name: 'Denim Jeans',
    description: 'Stylish and durable jeans for any occasion',
    image: '/placeholder.svg?height=300&width=300',
  },
  {
    id: 3,
    name: 'Running Shoes',
    description: 'Lightweight and supportive shoes for your workouts',
    image: '/placeholder.svg?height=300&width=300',
  },
  {
    id: 4,
    name: 'Leather Wallet',
    description: 'Sleek and functional wallet to keep your essentials',
    image: '/placeholder.svg?height=300&width=300',
  },
  {
    id: 5,
    name: 'Sunglasses',
    description: 'Protect your eyes in style with these trendy shades',
    image: '/placeholder.svg?height=300&width=300',
  },
  {
    id: 6,
    name: 'Smartwatch',
    description: 'Stay connected and track your fitness with this smartwatch',
    image: '/placeholder.svg?height=300&width=300',
  },
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
        'w-screen h-screen', // Ensures the container fills the entire viewport
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
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
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
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  const [visibleProducts, setVisibleProducts] = useState(products);
  const [loading, setLoading] = useState(false);

  // Correctly typing the observer ref as IntersectionObserver | null
  const observer = useRef<IntersectionObserver | null>(null);

  // Function to load more products
  const loadMoreProducts = () => {
    if (loading) return;

    setLoading(true);
    // Simulate a network request to load more products
    setTimeout(() => {
      setVisibleProducts((prev) => [
        ...prev,
        ...products.map((product) => ({
          ...product,
          id: prev.length + product.id, // Simulate new ids for new products
        })),
      ]);
      setLoading(false);
    }, 1000);
  };

  // Intersection Observer callback
  const lastProductRef = (node: HTMLElement | null) => {
    if (loading || !node) return; // Ensure node is not null and avoid unnecessary re-renders

    // Disconnect previous observer if it exists
    if (observer.current) observer.current.disconnect();

    // Create a new IntersectionObserver instance
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreProducts();
        }
      },
      { threshold: 1.0 } // Trigger when the last card is fully in view
    );

    observer.current.observe(node);
  };

  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        {/* Add the CardContainer to wrap the ProductCards */}
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">Our Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto max-h-[80vh]">
            {visibleProducts.map((product, index) => (
              <div
                key={product.id}
                className="group"
                ref={
                  index === visibleProducts.length - 1 ? lastProductRef : null
                } // Attach the ref to the last item
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
          {loading && (
            <div className="text-center mt-4">
              <p>Loading more products...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
