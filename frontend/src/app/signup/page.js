'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://chatbot-platform-sgmo.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
      } else {
        alert(`Error: ${data.message || 'Registration failed'}`);
      }
    } catch (err) {
      alert('Network error. Check if backend is live.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white p-6">
      <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-[2rem] shadow-2xl">
        <h2 className="text-3xl font-bold tracking-tighter mb-2">Create Account</h2>
        <p className="text-gray-500 mb-8 text-sm">Start building your custom AI chatbot today.</p>

        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="email" placeholder="Email Address" required
            className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500 transition-all"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password" placeholder="Password" required
            className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500 transition-all"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit" disabled={loading}
            className="w-full p-4 bg-blue-600 rounded-xl font-bold hover:bg-blue-500 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(37,99,235,0.2)]"
          >
            {loading ? "Creating Account..." : "Sign Up & Get Started"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}