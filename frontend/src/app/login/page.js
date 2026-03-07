'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://chatbot-platform-sgmo.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token); // Store token
        router.push('/dashboard'); // Redirect to existing dashboard
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <form onSubmit={handleLogin} className="p-8 bg-zinc-900 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6">Login to Dashboard</h2>
        <input 
          type="email" placeholder="Email" 
          className="w-full p-3 mb-4 bg-zinc-800 rounded border border-zinc-700"
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" placeholder="Password" 
          className="w-full p-3 mb-6 bg-zinc-800 rounded border border-zinc-700"
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit" className="w-full p-3 bg-blue-600 rounded-lg hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}