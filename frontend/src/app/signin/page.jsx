"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    const result = await signIn('credentials', {
      redirect: false, 
      email,
      password,
    });

    if (result.error) {
      setError(result.error);
    } else {
      const session = await getSession();
      const role = session?.role;

      switch (role) {
        case 'admin':
          router.push('/admin');
          break;
        case 'staff':
          router.push('/staff');
          break;
        case 'trainer':
          router.push('/coach');
          break;
        default:
          router.push('/member');
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Link href="/">
        <Button className="absolute top-4 left-4 bg-indigo-900 text-white hover:bg-white hover:text-indigo-900 cursor-pointer">
        ← Back
        </Button>
      </Link>

      <div className="bg-white w-full max-w-xl flex shadow-md rounded-lg overflow-hidden">
        {/* Form Section */}
        <div className="w-full p-8">
          <h2 className="text-3xl font-bold text-indigo-900 mb-6">Sign-in</h2>

          <form className="space-y-4">
            <div>
              <label className="block text-indigo-900 font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full border-2 border-indigo-900 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                fdprocessedid="axcvlk"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-indigo-900 font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full border-2 border-indigo-900 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                fdprocessedid="axcvlk"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-indigo-800 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-900 text-white py-2 mb-4 rounded-md font-semibold hover:bg-indigo-800 transition cursor-pointer"
              fdprocessedid="axcvlk"
              onClick={handleSubmit}
            >
              Login
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
          <div className="text-center text-lg">or</div>
          <button
            type="submit"
            className="w-full bg-indigo-900 text-white py-2 mt-4 rounded-md font-semibold hover:bg-indigo-800 transition margin cursor-pointer"
            fdprocessedid="axcvlk"
            onClick={() => signIn('google', {callbackUrl: '/member', redirect: true})}
          >
            Login with Google
          </button>
        </div>
      </div>
      <img src="/logo.png" alt="Stamina Logo" className="w-128 p-16" />
    </div>
  );
}
