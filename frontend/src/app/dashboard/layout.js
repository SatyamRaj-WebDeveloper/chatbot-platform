'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Boot them out if no token
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) return null; // Prevent UI flicker

  return <>{children}</>;
}