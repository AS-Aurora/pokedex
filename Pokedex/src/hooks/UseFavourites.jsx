import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

export const UseFavourites = () => {
  const { user } = useContext(AuthContext);

  const addToFavorites = async (pokemon) => {
    if (!user) {
      alert("Please log in to save favorites.");
      return;
    }

    try {
      const userDoc = doc(db, "favorites", user.uid);
      const docSnapshot = await getDoc(userDoc);

      const favorites = docSnapshot.exists()
        ? docSnapshot.data().favorites || []
        : [];

      const isFavorite = favorites.some((fav) => fav.id === pokemon.id);
      if (isFavorite) {
        alert("This Pokémon is already in your favorites.");
        return;
      }

      const updatedFavorites = [...favorites, { id: pokemon.id, name: pokemon.name }];
      
      if (docSnapshot.exists()) {
        await updateDoc(userDoc, { favorites: updatedFavorites });
      } else {
        await setDoc(userDoc, { favorites: updatedFavorites });
      }

      alert(`${pokemon.name} added to your favorites!`);
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("Failed to add to favorites. Please try again later.");
    }
  };

  return { addToFavorites };
};
