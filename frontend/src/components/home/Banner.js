import React from 'react';
import '../../stylesheets/banner.css';

const Banner = ({ title, subtitle, buttonText, imageUrl }) => {
  const bannerStyle = {
    backgroundImage: `url(${imageUrl})`,
  };

  return (
    <div className="banner-container" style={bannerStyle}>
      <h1 className="banner-title">{title}</h1>
      <p className="banner-subtitle">{subtitle}</p>
      <button className="shop-now-btn">{buttonText}</button>
    </div>
  );
};

export default Banner;
