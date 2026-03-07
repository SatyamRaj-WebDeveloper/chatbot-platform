'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }) {
  // Ensure the variable name is exactly 'authorized'
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true); // Added a loading state
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setAuthorized(true);
    }
    setLoading(false);
  }, [router]);

  // Use the loading state to prevent 'authorized' from being checked too early
  if (loading) return null; 

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-[#050505]">
      {children}
    </div>
  );
}