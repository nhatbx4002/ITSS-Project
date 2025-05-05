import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
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
                Username
              </label>
              <input
                type="email"
                className="w-full border-2 border-indigo-900 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                fdprocessedid="axcvlk"
              />
            </div>

            <div>
              <label className="block text-indigo-900 font-semibold mb-1">
                Email
              </label>
              <input
                type="password"
                className="w-full border-2 border-indigo-900 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                fdprocessedid="axcvlk"
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
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-900 text-white py-2 mb-4 rounded-md font-semibold hover:bg-indigo-800 transition cursor-pointer"
              fdprocessedid="axcvlk"
            >
              Register
            </button>
          </form>
          <div className="text-center text-lg">or</div>
          <button
            type="submit"
            className="w-full bg-indigo-900 text-white py-2 mt-4 rounded-md font-semibold hover:bg-indigo-800 transition margin cursor-pointer"
            fdprocessedid="axcvlk"
          >
            Sign up with Google
          </button>
        </div>
      </div>
      <img src="/logo.png" alt="Stamina Logo" className="w-128 p-16" />
    </div>
  );
}
