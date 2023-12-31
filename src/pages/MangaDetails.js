import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import "../styles/MangaDetails.css";
// eslint-disable-next-line
import { toast } from "react-toastify";

const MangaDetails = () => {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const response = await axios.get(
          `https://project-3-manga-backend-2d7dcb1090ee.herokuapp.com/mangas/id/${id}`
          // `http://localhost:3000/mangas/id/${id}`
        );
        setManga(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchManga();
  }, [id]);

  const addMangaToFavorite = async () => {
    try {
      const response = await axios.post(
        `https://project-3-manga-backend-2d7dcb1090ee.herokuapp.com/favorites/add/manga/${id}`
        // `http://localhost:3000/favorites/add/manga/${id}`
      );
      if (response.data.isAlreadyFavorite) {
        toast.error("Manga is already added to favorites!", {
          toastId: "alreadyFavorite",
          autoClose: 1500,
        });
      } else {
        toast.success("Manga added to favorites!", {
          toastId: "addedFavorite",
          autoClose: 1500,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!manga) {
    return <div>Loading...</div>;
  }

  return (
    <div className="manga-details">
      <div className="image-container">
        <img
          src={manga.picture_url}
          alt={manga.title}
          onClick={() => setShowModal(true)}
        />
        <p className="click-instruction">Click image to view a preview</p>
      </div>
      {showModal && (
        <div className="modal">
          <button className="modal-close" onClick={() => setShowModal(false)}>
            &times;
          </button>
          <div className="modal-content">
            {manga.firstTenPages.map((url, index) => (
              <div key={index} className="page">
                <img src={url} alt={`page ${index + 1}`} />
                <p> {index + 1}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="info">
        <h1>{manga.title}</h1>
        <div className="authors">
          <h3>By:</h3>
          <p className="author-names">
            {manga.authors.map((author, index) => (
              <span key={index}>
                <a href={author.url} target="_blank" rel="noopener noreferrer">
                  {author.name}
                </a>
                {index < manga.authors.length - 1 && ","}
              </span>
            ))}
          </p>
        </div>
        <p className="published">
          <span>Published:</span> {manga.aired_on}
        </p>
        <p>
          <span>Synopsis:</span> {manga.synopsis}
        </p>
        <button className="favorite-button" onClick={addMangaToFavorite}>
          Add to Favorites
        </button>
      </div>
    </div>
  );
};

export default MangaDetails;
