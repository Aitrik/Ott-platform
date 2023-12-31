import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from './axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = 'http://image.tmdb.org/t/p/original';

export default function Rows({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailer] = useState('');

  const sliderRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const request = await axiosInstance.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  const play = (movie) => {
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
    // Move the slider by one item in the specified direction
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += direction === 'left' ? -500 : 500;
    }
  };

  return (
    <>
      <div className="row">
        <h2>{title}</h2>
        <div className="row_posters" ref={sliderRef}>
          {movies.map((item) => (
            <img
              key={item.id}
              onClick={() => play(item)}
              className={`poster ${isLargeRow && 'row_posterLarge'}`}
              src={`${base_url}${isLargeRow ? item.poster_path : item.backdrop_path}`}
              alt={item.name}
            />
          ))}
        </div>
        <div className="slider-buttons">
          <button onClick={() => handleSliderClick('left')}>
            <i className="fa fa-chevron-left" aria-hidden="true"></i>
          </button>
          <button onClick={() => handleSliderClick('right')}>
            <i className="fa fa-chevron-right" aria-hidden="true"></i>
          </button>
        </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </>
  );
}
