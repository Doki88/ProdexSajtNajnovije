import React, { useState } from 'react';
import "../styles/galerySlider.css"
    
const images = [
    '/images/catalogs/6013.webp',
    '/images/catalogs/5566.jpg',
    '/images/catalogs/rezervniDijeloi.jpg',
    '/images/catalogs/optakatalog.jpg',
    '/images/catalogs/Pl sporet.png',
  ];
    const GallerySlider = () => {
      const [currentIndex, setCurrentIndex] = useState(0);
    
      const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
      };
    
      const handleNext = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      };
    
      return (
        <div className="slider-wrapper">
          <button className="arrow left" onClick={handlePrev}>
            ◀
          </button>
          <div className="image-container">
            <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
          </div>
          <button className="arrow right" onClick={handleNext}>
            ▶
          </button>
        </div>
      );
    };
    
    export default GallerySlider;
 