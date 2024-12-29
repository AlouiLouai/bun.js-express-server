'use client';
import React, { useEffect } from 'react';
//import { ProductCard } from '@/components/products/product-card';
import { useDispatch, useSelector } from 'react-redux';
import AuthService from '@/services/auth.services';
import { RootState } from '@/lib/store';

// const products = [
//   {
//     id: 1,
//     name: 'Classic T-Shirt',
//     description: 'Comfortable cotton t-shirt for everyday wear',
//     image: '/landing-1.png',
//   },
//   {
//     id: 2,
//     name: 'Denim Jeans',
//     description: 'Stylish and durable jeans for any occasion',
//     image: '/landing-1.png',
//   },
//   {
//     id: 3,
//     name: 'Running Shoes',
//     description: 'Lightweight and supportive shoes for your workouts',
//     image: '/landing-1.png',
//   },
//   {
//     id: 4,
//     name: 'Leather Wallet',
//     description: 'Sleek and functional wallet to keep your essentials',
//     image: '/landing-1.png',
//   },
//   // {
//   //   id: 5,
//   //   name: 'Sunglasses',
//   //   description: 'Protect your eyes in style with these trendy shades',
//   //   image: '/landing-1.png',
//   // },
//   // {
//   //   id: 6,
//   //   name: 'Smartwatch',
//   //   description: 'Stay connected and track your fitness with this smartwatch',
//   //   image: '/landing-1.png',
//   // },
// ];

export function AllProducts() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );
  // const [visibleProducts, setVisibleProducts] = useState(products);
  // const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(loading(true)); // Set loading state to true
      try {
        const authService = new AuthService();
        const response = await authService.users();
        if (!response) {
          throw new Error('Failed to fetch users');
        }
        dispatch(users(response)); // Set users data in the state
      } catch (err) {
        dispatch(error(err.message)); // Set error message if the fetch fails
      } finally {
        dispatch(loading(false)); // Set loading state to false after the request is complete
      }
    };

    fetchUsers();

    return () => {
      dispatch(resetUsers()); // Optionally reset the users state on component unmount
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
  // const loadMoreProducts = () => {
  //   if (loading) return;
  //   setLoading(true);
  //   setTimeout(() => {
  //     setVisibleProducts((prev) => [
  //       ...prev,
  //       ...products.map((product) => ({
  //         ...product,
  //         id: prev.length + product.id, // Generate unique IDs for new products
  //       })),
  //     ]);
  //     setLoading(false);
  //   }, 1000); // Simulate network delay
  // };

  // // Intersection Observer
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
  //         loadMoreProducts();
  //       }
  //     },
  //     { root: null, rootMargin: '0px', threshold: 1.0 }
  //   );

  //   if (loadMoreRef.current) {
  //     observer.observe(loadMoreRef.current);
  //   }

  //   return () => {
  //     if (loadMoreRef.current) {
  //       // eslint-disable-next-line react-hooks/exhaustive-deps
  //       observer.unobserve(loadMoreRef.current);
  //     }
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [loadMoreRef.current]);

  return (
    // <div className="flex flex-1 overflow-y-auto">
    //   <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full">
    //     <div className="container mx-auto py-8">
    //       <h1 className="text-3xl font-bold mb-6">Our Products</h1>
    //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    //         {visibleProducts.map((product) => (
    //           <div key={product.id} className="group">
    //             <ProductCard {...product} />
    //           </div>
    //         ))}
    //       </div>
    //       {loading && (
    //         <div className="text-center mt-4">
    //           <p>Loading more products...</p>
    //         </div>
    //       )}
    //       <div ref={loadMoreRef} className="h-10 w-full" />
    //     </div>
    //   </div>
    // </div>
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
