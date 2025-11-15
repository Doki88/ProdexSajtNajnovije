import "../styles/about.css"
import Slideshow from "./common/Slideshow"
import GallerySlider from "./GallerySlider"


export default function About(){
    return (
        <>
            
            <div className="grid-container">
                <div className="grid-item">
                     <div className="text-box">
                        <h1 className="title">O NAMA</h1>
                        <p>Kompanija je u poslovno partnerskim relacijama sa velikim
                        brojem  firmi iz Bosne i Hercegovine.<br></br>
                        U cilju što boljeg plasmana našeg asortimana robe, prilikom 
                        prodaje nudimo stručne savjete kao i tehničku podršku.
                        </p>
                        <p>Širok asortiman elektromaterijala čine sve vrste kablova, elektro- 
                        instalacioni materijal za domaćinstvo, kancelarije i industriju, 
                        unutrašnja dekorativna rasvjeta za uređenje enterijera, rasvjeta 
                        za domaćinstvo, kancelarije, poslovne prostore.
                        </p>
                     </div>
                </div>
                <div className="grid-item"> 
                    <img src="/images/home/Colosseum_11-7-2003.jpg"
                            alt="hero"/>  </div>
                <div className="grid-item">        
                    <img src="/images/home/Roma_Piazza_Venezia.jpg"  
                             alt="hero"/>
                </div>
                <div className="grid-item">
                     <p>Veoma dobar kvalitet, reznovrsnost, uvijek dostupne količine i 
                        pristupačne cijene našeg asortimana robe, potvrđuju i veliki broj  
                        zadovoljnih kupaca i saradnika, sa kojima ostvarujemo jako dobru  
                        saradnju dugi niz godina, uz dobro razvijenu i organizovanu  
                        komercijalnu službu firme. Strukturu kupaca čini veliki broj  
                        veleprodaja, maloprodaja, tržnih centara, prodajnih trgovačkih  
                        lanaca, firmi za izvođenje elektro-instalacionih i građevinskih  
                        radova i mnogi drugi kupci širom Bosne i Hercegovine.</p></div>
            </div>

            <div className="lowerTitle"><h1>GALERIJA</h1></div>

            <GallerySlider/>


            <div className="box-containerLower">
                <div className="boxLower"> <img src="/images/catalogs/lselectric.jpg"
                            alt="hero"/>  </div>
                <div className="boxLower"> <img src="/images/catalogs/MC-22b AC.webp"
                            alt="hero"/>  </div>
                <div className="boxLower"> <img src="/images/catalogs/xmta-608.jpg"
                            alt="hero"/>  </div>
                <div className="boxLower"> <img src="/images/catalogs/Tehnoin009 2025-07-24 210213.png"
                            alt="hero"/>  </div>
                 </div>
         </>
        
    )
}