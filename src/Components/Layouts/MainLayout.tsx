import { Outlet } from 'react-router';
import Navbar from '../Navbar/Navbar';
import { useContext, useEffect } from 'react';
import { TokenContext } from '../Context/TokenContext';
import useGet from '../../Hooks/useGet';
import { useQuery } from '@tanstack/react-query';

export default function MainLayout() {
  const tokenContext = useContext(TokenContext);
  const getUserData = useGet('/users/profile-data');

  const { data } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => getUserData(),
    select: (res) => res?.data?.user,
    enabled: Boolean(tokenContext?.token),
  });

  useEffect(() => {
    if (data && tokenContext?.setUserData) {
      tokenContext.setUserData(data);
    }
  }, [data, tokenContext]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
}

