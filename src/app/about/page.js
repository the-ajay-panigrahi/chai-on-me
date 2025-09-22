import Image from "next/image";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24">
          <section className="grid md:grid-cols-2 gap-12 items-center mb-20 md:mb-28">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl mb-4 bg-gradient-to-r from-black via-pink-600 to-black bg-clip-text text-transparent">
                Turn Your Code into Chai
              </h1>
              <p className="max-w-xl text-lg text-gray-700 mx-auto md:mx-0">
                Chai On Me is for developers and open-source contributors.
                Create a simple profile, link your Razorpay, and let your fans
                say `&quot;`thank you`&quot;` for your hard work with a direct donation.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Developer working with a cup of chai"
                unoptimized
                width={500}
                height={350}
                className="rounded-lg shadow-xl object-cover w-full h-auto max-w-md"
              />
            </div>
          </section>

          <section className="text-center mb-20 md:mb-28">
            <h2 className="text-2xl font-bold sm:text-4xl mb-12 bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
              How It Works for Creators
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white/50 p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg text-gray-800 mb-2 flex flex-col items-center justify-center">
                  <Image
                    width={1}
                    height={1}
                    unoptimized
                    className="w-10 h-10 md:w-15 md:h-15"
                    src="/developer.gif"
                    alt="developer"
                  />{" "}
                  <span>Create Your Profile</span>
                </h3>
                <p className="text-gray-600">
                  Sign up in minutes. Share your projects, links, and what
                  you`&apos;`re working on.
                </p>
              </div>
              <div className="bg-white/50 p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg text-gray-800 mb-2 flex flex-col items-center justify-center">
                  <Image
                    width={1}
                    height={1}
                    unoptimized
                    className="w-10 h-10 md:w-15 md:h-15"
                    src="/connect.gif"
                    alt="connect"
                  />{" "}
                  <span>Connect Razorpay</span>
                </h3>
                <p className="text-gray-600">
                  Securely link your Razorpay account to receive donations
                  directly. No hidden fees.
                </p>
              </div>
              <div className="bg-white/50 p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg text-gray-800 mb-2 flex flex-col items-center justify-center">
                  <Image
                    width={1}
                    height={1}
                    className="w-10 h-10 md:w-15 md:h-15"
                    src="/heart.gif"
                    alt="heart"
                  />{" "}
                  <span>Receive Support</span>
                </h3>
                <p className="text-gray-600">
                  Share your profile link. Fans can donate instantly—no login
                  required for them.
                </p>
              </div>
            </div>
          </section>

          <section className="text-center bg-white/50 p-8 md:p-12 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold sm:text-3xl mb-4 text-gray-800">
              Ready to Get Started?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6 max-w-2xl mx-auto">
              Give your fans an easy way to support your open-source journey.
              Create your free profile today and start receiving donations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <button
                  type="button"
                  className="w-full sm:w-auto text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center cursor-pointer"
                >
                  Create Your Profile
                </button>
              </Link>
              <Link href="/profile/example">
                <button
                  type="button"
                  className="w-full sm:w-auto text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium cursor-pointer rounded-lg text-sm px-5 py-2.5"
                >
                  View Example Profile
                </button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
