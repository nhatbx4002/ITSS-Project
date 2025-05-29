"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [full_name, setFull_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirm_password) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        full_name,
        email,
        password,
        confirm_password
      });

      const data = await response.data;

      if (!response.ok) {
        setError(data.message || 'Signup failed');
        return;
      }

      console.log('Signup successful:', data);
      router.push('/signin');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'An unexpected error occurred');
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
          <h2 className="text-3xl font-bold text-indigo-900 mb-6">Sign-up</h2>

          <form className="space-y-4">
            <div>
              <label className="block text-indigo-900 font-semibold mb-1">
                Fullname
              </label>
              <input
                type="text"
                className="w-full border-2 border-indigo-900 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                fdprocessedid="axcvlk"
                value={full_name}
                onChange={(e) => setFull_name(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-indigo-900 font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full border-2 border-indigo-900 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                fdprocessedid="axcvlk"
                value={email}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-indigo-900 font-semibold mb-1">
                Re-type Password
              </label>
              <input
                type="password"
                className="w-full border-2 border-indigo-900 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                fdprocessedid="axcvlk"
                value={confirm_password}
                onChange={(e) => setConfirm_password(e.target.value)}
              />
            </div>

            <button
              className="w-full bg-indigo-900 text-white py-2 mb-4 rounded-md font-semibold hover:bg-indigo-800 transition cursor-pointer"
              fdprocessedid="axcvlk"
              onClick={handleSubmit}
            >
              Register
            </button>
          </form>
          <div className="text-center text-lg">or</div>
          <button
            className="w-full bg-indigo-900 text-white py-2 mt-4 rounded-md font-semibold hover:bg-indigo-800 transition margin cursor-pointer"
            fdprocessedid="axcvlk"
            onClick={() => signIn('google', {callbackUrl: '/member', redirect: true})}
          >
            Sign up with Google
          </button>
        </div>
      </div>
      <img src="/logo.png" alt="Stamina Logo" className="w-128 p-16" />
    </div>
  );
}