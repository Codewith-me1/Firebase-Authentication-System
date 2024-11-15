"use client";

import { FormEvent, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
const Signup = () => {
  //data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, user, error] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Attempt to login
    await login(email, password);

    // Check if there's a user logged in
    if (user) {
      console.log("Logged in successfully");
      router.push("/");
    } else if (error) {
      console.log("Error:", error.message || "Incorrect credentials");
    } else {
      console.log("No account found or incorrect credentials");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Login an Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 text-black w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log In
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Create An New Account.
            <a
              href="/signin"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Singup
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
