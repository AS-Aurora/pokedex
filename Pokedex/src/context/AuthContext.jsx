import React, { createContext, useState, useEffect } from "react";
import { auth, signInWithPopup, provider, signOut } from "../firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Failed to log in. Please try again.");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error.message);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <p>Loading...</p>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthContext;
