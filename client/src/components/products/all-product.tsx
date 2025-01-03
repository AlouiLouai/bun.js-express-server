'use client';
import React, { useEffect } from 'react';
import { RootState } from '@/lib/store';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchUsers } from '@/lib/features/profile/profileActions';

export function AllProducts() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <h1>User model</h1>
      {user && (
        <ul>
          <li key={user.lastname}>{user.firstname}</li>
        </ul>
      )}
    </div>
  );
}
