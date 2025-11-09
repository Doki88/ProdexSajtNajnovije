
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "../styles/bottomSlider.css"

const BottomSlider = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className="slider-container">
      {/* <div className="carousel-text">
            <h1 className="bottom-slider-title" >VELIKI IZBOR BIJELE <br></br> TEHNIKE NAJPOVOLJNJIJE CIJENE</h1>
            <p>Ako vam je potrebna prodavnica sa najpovoljnjijim cijenama bijele tehnike i <br></br>
            kućanskih aparata na pravom ste mjestu. Posjetite nas i uvjerite se da imamo <br></br> najveći izbor
            i asortiman bijele tehnike u Modriči i regionu. Čekamo vas.</p>
        </div> */}
      <div className='carouselContainer'>
        <Carousel responsive={responsive}>
            <div className="card">
              <img src="/images/home/FINDER.png" alt=""/>     
            </div>
            <div className="card">
              <img src="/images/home/ls-MC-TOR.jpg" alt=""/>     
            </div>
            <div className="card">
              <img src="/images/home/loren-02.jpg" alt=""/>     
            </div>
            <div className="card">
              <img src="/images/home/multi-split-sistemi-Beograd.jpg" alt=""/>     
            </div>
            <div className="card">
              <img src="/images/home/alingconel.jpg" alt=""/>     
            </div>
              
        </Carousel> 
      </div>
     
      
    </div>
  );
};

export default BottomSlider;


const images = [
  '/images/home/Colosseum_11-7-2003.jpg',
  '/images/home/Na_Koloseum_i_K_Franciszki_Rzymianki.jpg',
  '/images/home/Roma_(2005).jpg',
  '/images/home/Roma_Piazza_Venezia.jpg',
  '/images/home/Roma-prati.jpg',
];

  


 
 

 