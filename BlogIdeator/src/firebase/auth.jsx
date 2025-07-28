/* eslint-disable no-useless-catch */
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
    // onAuthStateChanged
  } from 'firebase/auth';
import { auth } from './Config';
import { setDoc, getDoc, doc } from 'firebase/firestore';
import { db } from './Config';

  // Sign up with email and password
  export const registerWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Create Firestore user doc with default plan if not exists
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnap = await getDoc(userDocRef);
    if (!userDocSnap.exists()) {
      await setDoc(userDocRef, {
        email: user.email,
        plan: 'free',
        createdAt: new Date().toISOString(),
      });
    }
    return user;
    } catch (error) {
      throw error;
    }
  };
  
  // Sign in with email and password
  export const loginWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };
  
  // Sign in with Google
  export const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    // Create Firestore user doc with default plan if not exists
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnap = await getDoc(userDocRef);
    if (!userDocSnap.exists()) {
      await setDoc(userDocRef, {
        email: user.email,
        plan: 'free',
        createdAt: new Date().toISOString(),
      });
    }
    console.log('Google sign-in successful:', user);
    return user;
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  };
  
  // Sign out
  export const logout = async () => {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      throw error;
    }
  };
  
  // Password reset
  export const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      throw error;
    }
  };