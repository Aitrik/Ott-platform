import React, { useState, useEffect } from 'react';
import './Nav.css';
// Import the necessary icons and components
import {faClapperboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function Navbar() {
  const [state, handle] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        handle(true);
      } else {
        handle(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); 

  return (
    <div className={`nav ${state && "nav_background"}`}>
      <h2 className='nav_logo' >FlixFlow</h2>
      <button className='login'>Login</button>
    </div>
  );
}

export default Navbar;
