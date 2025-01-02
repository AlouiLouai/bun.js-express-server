import { useAppSelector } from '@/lib/hooks';

const useUser = () => {
  const user = useAppSelector((state) => state.profile.user);
  return user;
};

export default useUser;
