import React, { useEffect, useState } from "react";
import axios from "axios";
// eslint-disable-next-line
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
// eslint-disable-next-line
import "../styles/Favorites.css";
import gif from "../assets/gif/ZK.gif";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(
        "https://project-3-manga-backend-2d7dcb1090ee.herokuapp.com/favorites/manga"
        //"http://localhost:3000/favorites/manga/"
      );
      setFavorites(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFavorite = async (mangaId) => {
    try {
      await axios.delete(
        `https://project-3-manga-backend-2d7dcb1090ee.herokuapp.com/favorites/manga/${mangaId}`
      );
      // await axios.delete(`http://localhost:3000/favorites/manga/${mangaId}`);
      toast.success("Manga removed from favorites!", { autoClose: 1500 });

      fetchFavorites(); // Refresh the favorites
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove manga from favorites", { autoClose: 1500 });
    }
  };

  if (!favorites.length) {
    return (
      <div className="intro-text">
        No favorites yet!
        <img src={gif} alt="loading..." />
      </div>
    );
  }

  return (
    <div>
      <div className="title">Favorites</div>
      <div className="favorites-grid">
        {favorites.map(
          (favorite) =>
            favorite.manga && (
              <div key={favorite._id} className="favorite-item">
                <Link to={`/mangas/id/${favorite.manga._id}`}>
                  <img
                    src={favorite.manga.picture_url}
                    alt={favorite.manga.title}
                  />
                </Link>
                <h3>{favorite.manga.title}</h3>
                <button
                  className="favorite-delete-button"
                  onClick={() => deleteFavorite(favorite._id)}
                >
                  Delete from Favorites
                </button>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Favorites;
