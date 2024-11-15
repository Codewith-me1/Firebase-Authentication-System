// lib/firebaseHelpers.js
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

import { db } from './config'

export const saveUserData = async (userId, userData) => {
  try {
    await setDoc(doc(db, "users", userId), userData);
    console.log("User data saved successfully");
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};


export const addLikedPost = async (userId, typedData) => {
    try {
      await updateDoc(doc(db, "users", userId), {
        data: arrayUnion(typedData),
      });
      console.log("Post added to likedPosts");
    } catch (error) {
      console.error("Error adding liked post:", error);
    }
  };