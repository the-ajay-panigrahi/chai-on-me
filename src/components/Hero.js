import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <>
      <div className="relative h-fit">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
        </div>

        <div className="flex flex-col items-center justify-center h-full py-30 md:py-0 md:min-h-[84.2vh] px-4 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-6xl mb-4 bg-gradient-to-r from-black via-pink-600 to-black bg-clip-text text-transparent flex justify-center items-center flex-wrap">
            <span>Welcome to</span>{" "}
            <img
              src="/chai.gif"
              className="h-10 w-10 md:w-20 md:h-20"
              width={1}
              height={1}
              alt="Chai On Me"
            />{" "}
            <span>On Me</span>
          </h1>

          <h2 className="text-2xl font-extrabold tracking-tight sm:text-5xl mb-4 bg-gradient-to-r from-black via-pink-600 to-black bg-clip-text text-transparent">
            Fuel the Next Commit
          </h2>

          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
            A simple, elegant way for fans to directly support the developers
            and open-source projects they admire.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/about">
              <button
                type="button"
                className="w-full sm:w-auto text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium cursor-pointer rounded-lg text-sm px-5 py-2.5"
              >
                Learn More
              </button>
            </Link>

            <Link href="/login">
              <button
                type="button"
                className="w-full sm:w-auto text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center cursor-pointer"
              >
                Get Started
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
