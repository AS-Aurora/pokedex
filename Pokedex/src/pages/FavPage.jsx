import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { db, doc, getDoc } from "../firebase";

const FavPage = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);
      try {
        if (user) {
          const userDoc = doc(db, "favorites", user.uid);
          const docSnapshot = await getDoc(userDoc);
          if (docSnapshot.exists()) {
            setFavorites(docSnapshot.data().favorites || []);
          } else {
            setFavorites([]);
          }
        }
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setError("Failed to fetch your favorites. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  if (!user) {
    return (
      <div className="text-center text-gray-700">
        Please log in to view your favorites.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center text-gray-700">
        Loading your favorite Pokémon...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">
        {user.displayName}'s Favorite Pokémon
      </h2>
      {favorites.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {favorites.map((pokemon) => (
            <li key={pokemon.id} className="bg-gray-100 p-2 rounded shadow-md">
              <p className="font-semibold">{pokemon.name}</p>
              <p>ID: #{pokemon.id.toString().padStart(4, "0")}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-500">
          You have no favorite Pokémon yet.
        </div>
      )}
    </div>
  );
};

export default FavPage;
