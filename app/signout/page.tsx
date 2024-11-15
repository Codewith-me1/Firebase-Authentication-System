"use client";

import React, { useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

const SignOut = () => {
  const userData = useAuthState(auth);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUserState = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleSignOut = () => {
    try {
      signOut(auth);
      console.log(userData);
    } catch (error) {
      console.log(error);
      console.log(userData);
    }
  };

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => {
          handleSignOut();
        }}
      >
        signOt
      </button>
    </>
  );
};

export default SignOut;
