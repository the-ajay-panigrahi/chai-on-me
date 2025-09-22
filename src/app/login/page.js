"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { data: session } = useSession();
  if (session) {
    const router = useRouter();
    router.push("/dashboard");
  }
  return (
    <>
      <div className="relative min-h-[calc(100vh-6rem)]">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
        </div>

        <div className="flex items-center justify-center h-full min-h-[calc(100vh-6rem)] px-4">
          <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-xl shadow-lg">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome, Creator!
              </h1>
              <p className="mt-2 text-gray-600">
                Sign in with GitHub to manage your profile.
              </p>
            </div>

            <button
              onClick={() => signIn()}
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-400 font-medium transition-colors duration-300 cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Login with GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
