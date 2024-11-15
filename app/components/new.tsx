// components/login.js
"use client";
import { auth, provider, signInWithPopup } from "@/app/firebase/config";
import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState(null);

  // Handle Google Sign-in
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  // Handle Google Sign-out

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user}!</p>
        </>
      ) : (
        <button onClick={handleSignIn}>Sign in with Google</button>
      )}
    </div>
  );
};

export default Login;
