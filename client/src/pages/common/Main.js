import Slideshow from "./Slideshow";

export default function Main(){

    return (
        <div style={{ backgroundColor: "#08618d", minHeight: "200px"}}>
            <div className="container text-white py-5">
              <div className="row align-items-center g-2">
                <div className="col-md-6">
                    <h1 className="mb-5 display-2"><strong>DOBRODOŠLI!</strong></h1>
                    <p>Preduzeće Prodex d.o.o Modriča osnovano 2000.god, nudi
                    mogućnost cijelokupnog rješavanja široke palete problema
                    mogućnost cijelokupnog rješavanja široke palete problema
                    vezanih za industriju i industrijske potrebe.
                    U ponudi industrijske opreme, nalazi se paleta najpoznatijih
                    svjetskih firmi kao što su: LS (LS frekventni regulatori,
                    kontaktori i bimetalni releji. Automatski osigurači) Finder
                    (Relejna oprema), KBR (kompenzacija reaktivne energije).
                    </p>
                    <button className="aboutus-button">O nama</button>
                     
                     
                    
                     
                </div>
                    <div className="col-md-6 text-center">
                    {/* <img src="/images/hero.jpg" className="img-fluid" alt="hero"/> */}
                    <Slideshow/>
                </div>
            </div>
        
        </div>
    </div>
    )
}