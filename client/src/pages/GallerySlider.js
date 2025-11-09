import React, { useState } from 'react';
import "../styles/galerySlider.css"
    
const images = [
    '/images/home/Colosseum_11-7-2003.jpg',
    '/images/home/Na_Koloseum_i_K_Franciszki_Rzymianki.jpg',
    '/images/home/Roma_(2005).jpg',
    '/images/home/Roma_Piazza_Venezia.jpg',
    '/images/home/Roma-prati.jpg',
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
 