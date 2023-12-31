import React, { useEffect, useState } from 'react';
import axiosInstance from './axios';
import './Banner.css';

const base_url = "http://image.tmdb.org/t/p/original";

const Banner = ({ fetchUrl }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axiosInstance.get(fetchUrl);
        const randomIndex = Math.floor(Math.random() * request.data.results.length);
        setMovie(request.data.results[randomIndex]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();



  }, [fetchUrl]);

  if (!movie) {

    return <p>Loading...</p>;
  }

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("${base_url}${movie.backdrop_path}")`,
        // backgroundPosition: " top center",
      }}
    >
      {/* <h3 className='banner_logo'>FlixFlow</h3>
      <button className="banner_login_button">Login</button> */}
      <div className="banner_contents">
        <h1 className='title'>{movie.title || movie.name || movie.original_name}</h1>
        <div className='banner_buttons'>
          <button className='banner_button'>Play</button>
          <button className='banner_button'>Rate</button>
        </div>
        <h1 className='overview'>{truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="fade"></div>
    </header>
  );
};

export default Banner;