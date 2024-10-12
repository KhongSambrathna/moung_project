import Monglogo from '../assets/logo/moung_banner.png';
import MongLogoMobile from '../assets/logo/moung_banner_mobile.png';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// ResponsiveImage Component
const ResponsiveImage = () => {
  const [imageUrl, setImageUrl] = useState(Monglogo); // Default image

  useEffect(() => {
    const updateImage = () => {
      const screenWidth = window.innerWidth;

      // Change the image URL based on screen width
      if (screenWidth < 768) {
        setImageUrl(MongLogoMobile); // Mobile image
      } else {
        setImageUrl(Monglogo); // Desktop image
      }
    };

    // Update the image when the component mounts
    updateImage();

    // Add a listener to update the image when resizing
    window.addEventListener('resize', updateImage);

    // Clean up the event listener
    return () => window.removeEventListener('resize', updateImage);
  }, []);

  return <img className="w-70" src={imageUrl} alt="Moung Banner" />;
};

// Navigation Component
const Navigation = () => {
  return (
    <>
      {/* Navigation Bar */}
      <div className="container-fluid"> {/* Fixed class name */}
        <div className="container">
          {/* Add ResponsiveImage component to display the image */}
          <ResponsiveImage />
        </div>
      </div>

      <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-white nav-shadow koulen">
        <div className="container">
          <Link to={"/"} className="nav-link text-primary">ទំព័រដើម</Link>
          <button
            className="navbar-toggler border-primary btn"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"news"} className="nav-link text-primary">ពត៍មាន</Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  to={"#"}
                  className="nav-link text-primary dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  បាល់ទាត់
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to={"players"} className="dropdown-item">កីឡាករ</Link>
                  <Link to={"player_rank"} className="dropdown-item">ចំណាត់ថ្នាក់កីឡាករ</Link>
                  <Link to={"match_history"} className="dropdown-item">ប្រវត្តិប្រកួត</Link>
                </div>
              </li>
              <li className="nav">
                <Link to={"about"} className="nav-link text-primary">អំពីអនុ.មោង</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
