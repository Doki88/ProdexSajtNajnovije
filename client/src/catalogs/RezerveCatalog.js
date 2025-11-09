import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import "../styles/productcatalog.css"
import Slideshow from "../pages/common/Slideshow"
import BottomSlider from "../pages/BottomSlider"

export default function RezerveCatalog(){

    const catalogs = [
        {
            image: "/images/catalogs/rezervniCatalogs/sporet-removebg-preview.png",
            title: "Rezervni dijelovi šporeta",
            brand: "Rezervni dijelovi-grijaci"
        } ,
        {
            image: "/images/catalogs/rezervniCatalogs/vesmasina-removebg-preview.png",
            title: "Rezervni dijelovi veš mašine",
            brand: "Rezervni dijelovi-vesmasine"
        } ,
        {
            image: "/images/catalogs/rezervniCatalogs/bojler.png",
            title: "Rezervni dijelovi bojlera",
            brand: "Aling Conel-eon"
        } ,
        {
            image: "/images/catalogs/rezervniCatalogs/rashladni.png",
            title: "Rezervni dijelovi rashlade",
            brand: "Aling Conel-indicators"
        } ,
        {
            image: "/images/catalogs/rezervniCatalogs/usisivac.png",
            title: "Rezervni dijelovi usisivača",
            brand: "Aling Conel-cables"
        } ,
        {
            image: "/images/catalogs/rezervniCatalogs/grijalice.png",
            title: "Rezervni dijelovi TA peći i grijalica",
            brand: "Aling Conel-bulbs"
        } 
    ]

    return (
         <>
             
            <Slideshow/>

            {/* <div className="products-main-box">
                <div>
                 

                    <div className="products-container">
                       {
                            
                            catalogs.map((catalog, index) => {
                                return (
                                    <div className="product-container" key={index}>
                                        <ProductItem catalog={catalog}/>
                                     </div>
                                )
                            })
                            
                       }
                    </div>       
                </div>

            </div> */}
             <div className="product-grid">
                        {catalogs.map((catalog, index) => (
                            <div className="product-card" key={index}>
                                 <ProductItem catalog={catalog}/>
                            </div>
                        ))}
            </div>
            <BottomSlider/>
         </>
    )
}

function ProductItem({catalog}){
    return(
        <div className="product-item">
            
           
             
            <hr />
            <Link to={"/products/" } state={{ brand: catalog.brand }} role="button" > <img src={catalog.image}
                className="img-fluid" alt="..."
                style={{height: "220px", objectFit:"contain"}}/>  </Link>
            <Link to={"/products/" }  state={{ brand: catalog.brand }} role="button" > 
                <p className="linktext">{catalog.title}</p>
             </Link>
            
             
             
            
            {/* <Link to={"/products/" + product._id} role="button" className="details-btn">Detaljnjije</Link> */}
        </div>
    )

}