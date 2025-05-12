import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/ui/navbar";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation Bar */}
      <Navbar>
        <Link
          href="/signin"
          className="bg-purple-900 text-yellow-400 font-bold px-4 py-2 rounded-md hover:bg-purple-950 mr-3"
        >
          Sign in
        </Link>

        <Link
          href="/signup"
          className="bg-yellow-400 text-purple-900 font-bold px-4 py-2 rounded-md hover:bg-yellow-500"
        >
          Register
        </Link>
      </Navbar>

      {/* Learn more Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-purple-900 to-indigo-900 flex items-center">
        <div className="absolute inset-0 bg-[url('/hero-section-background.jpg')] bg-cover bg-center opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="text-white mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Start a better
            </h1>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              shape of you!
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6">
              Come Join Us!
            </h2>
            <a
              href="#about"
              className="bg-white text-purple-900 px-6 py-2 rounded-full font-medium hover:bg-gray-100 cursor-pointer"
            >
              Learn More
            </a>
          </div>
          <div className="w-64 h-64 md:w-90 md:h-90 mr-20">
            <Image
              src="/logo.png"
              alt="Stamina Fitness Logo"
              width={400}
              height={400}
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative bg-gradient-to-r py-16">
        <div className="absolute inset-0 bg-[url('/about-section-bg.jpg')] bg-cover bg-center -z-10"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h3 className="text-xl text-gray-600 mb-2">About</h3>
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-8">
            STAMINA GYM FOR MAN & WOMAN
          </h2>
          <p className="max-w-3xl mx-auto text-gray-700 mb-8">
            Stamina Gym Fitness Center provides proper training and conditioning
            for members who want to improve and transform their body with
            Program depend on the body composition.
          </p>

          <h2 className="text-3xl font-bold text-purple-900 mb-8">
            What we offer:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-purple-200">
              <div className="text-3xl font-bold text-purple-900">24</div>
              <div className="text-2xl font-bold text-purple-900">/7</div>
              <div className="text-gray-600">Chat</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-purple-200">
              <div className="text-2xl font-bold text-purple-900">1 on 1</div>
              <div className="text-gray-600">coaching</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-purple-200">
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 rounded-full bg-purple-900 flex items-center justify-center">
                  <span className="text-white text-xl">N</span>
                </div>
              </div>
              <div className="text-gray-600">Nutrition</div>
              <div className="text-gray-600">Guide</div>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Section */}
      <section id="plan" className="relative py-16 bg-gradient-to-r text-white">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/plan-background.jpg')] bg-cover bg-center  -z-10"></div>

        {/* Nội dung chính */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">
              Our Plan:
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold">
              JOIN OUR MEMBERSHIP
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="bg-white text-purple-900 p-6 rounded-lg text-center">
              <h4 className="font-bold">Annual</h4>
              <p>Membership</p>
            </div>

            <div className="bg-purple-800 p-6 rounded-lg text-center">
              <div className="text-4xl font-bold">7</div>
              <h4 className="font-bold">Days</h4>
              <p>Weekly Rate</p>
            </div>

            <div className="bg-purple-700 p-6 rounded-lg text-center">
              <div className="text-4xl font-bold">1</div>
              <h4 className="font-bold">Month</h4>
              <p>Monthly Rate</p>
            </div>

            <div className="bg-purple-800 p-6 rounded-lg text-center">
              <div className="text-4xl font-bold">6</div>
              <h4 className="font-bold">Months</h4>
              <p>Biannual Rate</p>
            </div>

            <div className="bg-purple-900 p-6 rounded-lg text-center">
              <div className="text-4xl font-bold">1</div>
              <h4 className="font-bold">Year</h4>
              <p>Annual Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Coaches Section */}
      <section
        id="coaches"
        className="relative py-16 bg-gradient-to-r text-white"
      >
        <div className="absolute inset-0 bg-[url('/coach-section-bg.jpg')] bg-cover bg-center -z-20" />
        <div className="absolute inset-0 bg-gray-900/60 -z-10" />

        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            COACHES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-purple-200 p-6 rounded-lg text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-300">
                <Image
                  src="/coach-long.jpg"
                  alt="coach pic"
                  fill
                  className="object-cover w-full h-full"
                ></Image>
              </div>
              <h3 className="text-xl font-bold text-purple-900">Coach Long</h3>
              <div className="text-center">Info</div>
            </div>

            <div className="bg-purple-200 p-6 rounded-lg text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-300">
                <Image
                  src="/coach-long.jpg"
                  alt="coach pic"
                  fill
                  className="object-cover w-full h-full"
                ></Image>
              </div>
              <h3 className="text-xl font-bold text-purple-900">Coach Long</h3>
              <div className="text-center">Info</div>
            </div>

            <div className="bg-purple-200 p-6 rounded-lg text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-300">
                <Image
                  src="/coach-long.jpg"
                  alt="coach pic"
                  fill
                  className="object-cover w-full h-full"
                ></Image>
              </div>
              <h3 className="text-xl font-bold text-purple-900">Coach Long</h3>
              <div className="text-center">Info</div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Our Gym Section */}
      <section id="visit" className="py-16 bg-gray-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-900 mb-12">
            VISIT OUR GYM
          </h2>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="relative w-full md:w-1/2 h-64 bg-gray-300 rounded-lg overflow-hidden">
              <Link href="https://www.google.com/maps" target="_blank">
                <Image
                  src="/map.jpg"
                  alt="Map"
                  fill
                  className="object-cover w-full h-full"
                />
              </Link>
            </div>

            <div className="w-full md:w-1/2">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-700">Address:</h3>
                <p className="text-yellow-600">
                  TRƯỜNG CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG - ĐH BÁCH KHOA HÀ
                  NỘI
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-700">Email:</h3>
                <p className="text-yellow-600">staminafitness@yahoo.com</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-700">
                  Contact Number:
                </h3>
                <p className="text-yellow-600">09xxxxxxxxx</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-700 mb-2">
                  OUR SOCIALS:
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-purple-900 hover:text-purple-700 mr-5"
                  >
                    <Facebook size={24} />
                  </a>
                  <a
                    href="#"
                    className="text-purple-900 hover:text-purple-700 mr-5"
                  >
                    <Twitter size={24} />
                  </a>
                  <a
                    href="#"
                    className="text-purple-900 hover:text-purple-700 mr-5"
                  >
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-gray-800 mb-4">GYM</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-purple-900">
                    Why Join Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-900">
                    Plan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-900">
                    Coaches
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-4">MEMBERS</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-purple-900">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-900">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
