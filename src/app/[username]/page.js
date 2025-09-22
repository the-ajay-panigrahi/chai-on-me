import React from "react";
import Link from "next/link";
import dbConnect from "@/db/db";
import Profile from "@/models/profile.model";

// This is a separate client component for the payment form
import PaymentForm from "@/components/PaymentForm";

export default async function ProfilePage({ params }) {
  await dbConnect();
  const { username } = await params;

  const userData = await Profile.findOne({ username }).lean();

  if (!userData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold">Profile not found</h1>
        <p className="mt-4 text-gray-700">
          The user profile you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="mt-6 text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Go to Homepage
        </Link>
      </div>
    );
  }

  if (!userData.name || !userData.stripeKey) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold">Profile Not Complete</h1>
        <p className="mt-4 max-w-md text-gray-700">
          This creator hasn't finished setting up their profile yet. Please
          check back later.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          (If this is your profile, please complete your details in the{" "}
          <Link href="/dashboard" className="text-pink-500 underline">
            dashboard
          </Link>
          .)
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 pb-10">
      {/* Cover Image Section */}
      <div className="relative h-48 md:h-64">
        <img
          src={userData.coverPhoto || "/default-cover.png"}
          alt="Cover photo"
          // FIXED: Replaced next/image props with Tailwind CSS classes
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative container mx-auto px-4 -mt-16">
        <div className="flex flex-col items-center text-center">
          <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-lg">
            <img
              src={userData.profilePicture || "/default-profile.png"}
              alt="Profile picture"
              // FIXED: Replaced next/image props with Tailwind CSS classes
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            {userData.name}
          </h1>
          <p className="text-gray-600 mt-1">@{userData.username}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          <div className="bg-white/70 p-6 rounded-lg shadow-md backdrop-blur-sm scroll-auto h-[400px] ">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Supporters
            </h2>
            <ul className="space-y-4 overflow-y-auto h-[320px] pr-2">
              {userData.supporters && userData.supporters.length > 0 ? (
                userData.supporters.map((s) => (
                  <li key={s._id.toString()} className="flex items-start">
                    <img className="w-12 h-10 mr-3" src="/gift.gif" alt="" />
                    <div>
                      <p className="text-gray-700">
                        <span className="font-bold">{s.name}</span> donated{" "}
                        <span className="font-semibold">${s.amount}</span>
                      </p>
                      <p className="text-gray-500 text-sm italic">
                        "{s.message}"
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-gray-600">Be the first to support!</p>
              )}
            </ul>
          </div>

          <PaymentForm username={username} />
        </div>
      </div>
    </div>
  );
}
