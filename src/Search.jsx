import React, { useState, useEffect, useRef } from 'react';
import './Search.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const API_KEY = '53bf9bb3f8fdd63f07435dfefaea992b';
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const base_url = 'https://image.tmdb.org/t/p/original/';

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    autoplay: 1,
  },
};

export default function Search({ title, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [trailerUrl, setTrailer] = useState('');
  const [showButtons, setShowButtons] = useState(false);
  const sliderRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    fetch(SEARCH_API + search)
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .then(() => setShowButtons(true)) // Show the buttons after fetching results
      .catch((error) => console.error(error));
  };

  const playTrailer = (movie) => {
    if (trailerUrl) {
      setTrailer('');
    } else {
      movieTrailer(movie?.name || '')
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailer(urlParams.get('v'));
        })
        .catch((error) => console.error(error));
    }
  };

  const handleSliderClick = (direction) => {
    // Get the width of a single poster
    const posterWidth = sliderRef.current?.firstChild.clientWidth || 0;
    // Calculate the distance to scroll based on the direction
    const scrollDistance = direction === 'left' ? -posterWidth : posterWidth;
    // Scroll the slider
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += scrollDistance;
    }
  };

  return (
    <>
      <div className="Search">
        <form onSubmit={handleSearch}>
          <input
            type="search"
            className="search_bar"
            placeholder="Search for your shows"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="button">
            Search
          </button>
        </form>
      </div>
      <div className="row">
        <h2>{title}</h2>
        <div className="row_posters" ref={sliderRef}>
          {movies.map((item) => (
            <img
              key={item.id}
              onClick={() => playTrailer(item)}
              className={`poster ${isLargeRow && 'row_posterLarge'}`}
              src={`${base_url}${isLargeRow ? item.poster_path : item.backdrop_path}`}
              alt={item.name}
            />
          ))}
        </div>
        {showButtons && (
          <div className="slider-buttons">
            <button onClick={() => handleSliderClick('left')}>
              <i className="fa fa-chevron-left" aria-hidden="true"></i>
            </button>
            <button onClick={() => handleSliderClick('right')}>
              <i className="fa fa-chevron-right" aria-hidden="true"></i>
            </button>
          </div>
        )}
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </>
  );
}
