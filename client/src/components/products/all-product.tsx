'use client';
import React, { useEffect } from 'react';
import { RootState } from '@/lib/store';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchUsers } from '@/lib/features/users/userActions';
import { User } from '@/lib/features/users/userSlice';

export function AllProducts() {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>{user.firstname}</li>
        ))}
      </ul>
    </div>
  );
}
