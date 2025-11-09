 
import "../styles/contact.css"
import Slideshow from "./common/Slideshow";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'; // formerly faMapMarkerAlt
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';


export default function Contact(){

    
    return (
        <>
          {/* <Slideshow/> */}

           <div className="map-container">
                <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2834.404859631727!2d18.297338315840986!3d44.964402979098485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475c9d8dfcd4d05d%3A0xeed37ab4d6b84578!2sCara%20Lazara%2035%2C%20Modri%C4%8Da!5e0!3m2!1sen!2sba!4v1699208502309!5m2!1sen!2sba"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
           <div className="layout">
                <div className="topContact"><h3>KONTAKT</h3></div>
                <div className="middle">
                    <div className="box">
                        <div className="flex-container-two-contact">
                            <FontAwesomeIcon icon={faLocationDot} style={{ color: '#03fcad' }} /> 
                         </div>
                         <div className="flex-container-two-text-contact">
                            <p>Adresa:<br></br>Cara Lazara 35, 74480 Modriča, BIH</p>       
                        </div>
                        </div>
                        <div className="box">
                            <div className="flex-container-two-contact">
                                <FontAwesomeIcon icon={faPhone} style={{ color: '#03fcad' }} />
                            
                                </div>
                                <div className="flex-container-two-multi-contact">
                                    <div className="flex-container-two-text-multi-contact">
                                        <p>Tel:<br></br>053/820-891</p>
                                    </div>
                                                    
                                    <div className="flex-container-two-text-multi-contact">
                                       <p>Mob:<br></br>066-119-921</p>
                                    </div>
                                </div>
                        </div>
                        <div className="box">
                            <div className="flex-container-two-contact">
                                <FontAwesomeIcon icon={faEnvelope} style={{ color: '#03fcad', fontSize: '16px' }} />
                            </div>
                            <div className="flex-container-two-text-contact">
                                 <p>Email:<br></br>prodexmd@yahoo.com</p> 
                             </div>
                        </div>
                    </div>
                <div className="bottom"><b>Radno vreme:</b>  Pon-Pet: 7:30 - 16:30h | Sub: 7:30 - 14:30h</div>
                <div className="formTitle"><h3>PIŠITE NAM</h3></div>
                
                    <div className="formMiddle">
                        <div className="formBox">
                            <input type="text" className="firstrow-data" placeholder="Ime i prezime" name="fanlname"/>
                        </div>
                        <div className="formBox">
                             <input type="text" className="firstrow-data" placeholder="Broj telefona" name="phone"/>
                        </div>
                        <div className="formBox">
                            <input type="text" className="firstrow-data" placeholder="Email" name="email"/> 
                        </div>
                    </div>
                    <div className="formMessageTitle">
                        <input type="text" className="message-title-input" placeholder="Naslov poruke" name="msgtitle"/>            
                    </div>
                    <div className="formMessageDescription"><textarea className="text-area-data">Tekst poruke...</textarea></div>
                    <div className="formMessageButton">
                                <button>Pošalji</button>
                    </div>
                

            </div>
            
         </>
         
    )
}