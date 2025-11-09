// import React, { useState, useEffect } from 'react';
// import "../../styles/image-slider.css";

// // const images = [
 
// //   '/images/home/ALING.png',
// //   '/images/home/ls-MC-TOR.jpg',
 
// // ];

// const images = [
 
//   '/images/home/OBLO 1_slider_image.jpg',
//   '/images/home/Exp konf 1_slider_image.jpg',
//     '/images/home/Aling-Conel corporate video_slider_image.jpg',
   

 
// ];
// const Slideshow = ({ interval = 5000 }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev + 1) % images.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
//   };

//   useEffect(() => {
//     const timer = setInterval(nextSlide, interval);
//     return () => clearInterval(timer);
//   }, [interval]);

//   return (
//     <div className="slider-wrapper">
//     <div
//       className="slider-track"
//       style={{
//         transform: `translateX(-${currentIndex * 100}%)`,
//         width: `${images.length * 100}%`,
//       }}
//     >

//         {images.map((src, index) => (
//           <div className="slide" key={index}>
//             <img src={src} alt={`Slide ${index}`} className="slide-image" />
//             <div className="overlay-text">
//               {/* <h1>DOBRODOŠLI!</h1>
//               <p>Preduzeće Prodex d.o.o Modriča osnovano 2000.god, nudi
//                     mogućnost cijelokupnog rješavanja široke palete problema
//                     mogućnost cijelokupnog rješavanja široke palete problema
//                     vezanih za industriju i industrijske potrebe.
//                     U ponudi industrijske opreme, nalazi se paleta najpoznatijih
//                     svjetskih firmi kao što su: LS (LS frekventni regulatori,
//                     kontaktori i bimetalni releji. Automatski osigurači) Finder
//                     (Relejna oprema), KBR (kompenzacija reaktivne energije).
//                     </p> */}
                    
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Navigation Arrows */}
//       <button className="slider-btn prev" onClick={prevSlide}>&#10094;</button>
//       <button className="slider-btn next" onClick={nextSlide}>&#10095;</button>
//     </div>
//   );
// };

// export default Slideshow;




 


 import React, { useState, useEffect, useRef } from 'react';
import "../../styles/image-slider.css";

const images = [
 
  '/images/home/FinderSlideshow.jpg',
  '/images/home/ls-MC-TOR.jpg',
  '/images/home/wipcool.png',
  '/images/home/alingslide.jpg'
    
];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = useRef(null);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    resetAutoSlide();
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    resetAutoSlide();
  };

  const startAutoSlide = () => {
    slideInterval.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds
  };

  const resetAutoSlide = () => {
    clearInterval(slideInterval.current);
    startAutoSlide();
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(slideInterval.current); // Cleanup on unmount
  }, []);

  return (
    <div className="slider-container">
      <div
        className="slide"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      ></div>

      <div className="left-arrow" onClick={goToPrevious}>❮</div>
      <div className="right-arrow" onClick={goToNext}>❯</div>
    </div>
  );
};

export default Slideshow;


