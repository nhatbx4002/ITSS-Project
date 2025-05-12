import Image from "next/image";
import Link from "next/link";
import { Children } from "react";

export default function Navbar({ children }) {
  return (
    <nav className="bg-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        <a href="#" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Stamina Fitness Logo"
            width={50}
            height={25}
            className="mr-4"
          />

          <div>
            <h1 className="flex font-bold text-3xl">Stamina Gym</h1>
          </div>
        </a>
      </div>

      <div className="hidden md:flex space-x-6">
        <Link
          href="#about"
          className="text-gray-800 hover:text-purple-800 mx-10 font-bold text-xl"
        >
          About
        </Link>
        <Link
          href="#plan"
          className="text-gray-800 hover:text-purple-800 mx-10 font-bold text-xl"
        >
          Plan
        </Link>
        <Link
          href="#coaches"
          className="text-gray-800 hover:text-purple-800 mx-10 font-bold text-xl"
        >
          Coaches
        </Link>
        <Link
          href="#visit"
          className="text-gray-800 hover:text-purple-800 mx-10 font-bold text-xl"
        >
          Visit our gym
        </Link>
      </div>
      <div>{children}</div>
    </nav>
  );
}
