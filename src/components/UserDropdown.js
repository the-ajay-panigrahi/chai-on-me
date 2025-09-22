"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const timeoutRef = useRef(null);
  const { status } = useSession();

  useEffect(() => {
    const fetchProfile = async () => {
      if (status === "authenticated") {
        const response = await fetch("/api/profile");
        const profileData = await response.json();
        setProfile(profileData);
      }
    };
    fetchProfile();
  }, [status]);

  const handleSignOut = () => {
    toast.success("Logged out successfully!");
    signOut();
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <button
          type="button"
          className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        >
          My Account
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
      </div>

      <div
        className={`absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-150 ease-out ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="py-1">
          {profile && profile.username && (
            <Link
              href={`/${profile.username}`}
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
            >
              Your Profile
            </Link>
          )}
          <Link
            href="/dashboard"
            className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Dashboard
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full text-left text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
