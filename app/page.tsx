"use client";

import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { addLikedPost } from "./firebase/database";

const Page = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [text, setText] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Logged in as:", user);
        setUser(user);
      } else {
        console.log("User not logged in");
        router.push("/signin"); // Redirect to /signin if user is not logged in
      }
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, [router]);

  // Render null or loading state until user is verified
  if (user === null) {
    return <p>Loading...</p>;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addLikedPost(user.uid, text);

    console.log("Saaverd to db");
  };
  return (
    <>
      <h1>This is the Home Page</h1>
      <h1>Hello, {user.displayName || user.email}</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Page;
