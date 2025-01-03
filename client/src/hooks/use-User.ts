'use client';
import { fetchProfile } from '@/lib/features/profile/profileActions';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect } from 'react';

const useUser = () => {
  const dispatch = useAppDispatch();
  const { user, status } = useAppSelector((state) => state.profile);

  useEffect(() => {
    if (!user) {
      dispatch(fetchProfile());
    }
  }, [user, status, dispatch]);
  return user;
};

export default useUser;
