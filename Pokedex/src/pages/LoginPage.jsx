import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

function LoginPage() {
  const { user, login, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await login();
    } catch (err) {
      setError("Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      setError("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="text-center p-6 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-bold mb-4">Login Page</h2>
        {loading ? (
          <div className="text-lg text-gray-700">Loading...</div>
        ) : error ? (
          <div className="text-red-600 mb-4">{error}</div>
        ) : user ? (
          <div>
            <h3 className="text-xl font-semibold mb-2">Welcome, {user.displayName}</h3>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Login with Google
          </button>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
