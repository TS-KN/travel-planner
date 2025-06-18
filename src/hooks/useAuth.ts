import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export function useAuth(requireAuth: boolean = true) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (requireAuth && status === 'unauthenticated') {
      router.push('/');
    } else if (!requireAuth && status === 'authenticated') {
      router.push('/planner');
    }
  }, [status, router, requireAuth]);

  return {
    session,
    status,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
  };
} 
