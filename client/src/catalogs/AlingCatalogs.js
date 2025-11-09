import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// import BottomSlider from "./common/BottomSlider"
import "../styles/productcatalog.css"
import Main from "../pages/common/Main"
import Slideshow from "../pages/common/Slideshow"
import BottomSlider from "../pages/BottomSlider"

export default function AlingCatalogs(){

    const catalogs = [
        {
            image: "/images/alingcatalogs/presitgealing.png",
            title: "Aling Conel Prestige Line, Power line, Armor line",
            brand: "Aling Conel-prestige"
        } ,
        {
            image: "/images/alingcatalogs/indikatori.png",
            title: "Aling Conel modularni program \"Mode\"",
            brand: "Aling Conel-modular"
        } ,
        {
            image: "/images/alingcatalogs/eon.png",
            title: "Aling Conel \"EON\" program",
            brand: "Aling Conel-eon"
        } ,
        {
            image: "/images/alingcatalogs/kupatilo.png",
            title: "Aling Conel indikatori za kupatilo",
            brand: "Aling Conel-indicators"
        } ,
        {
            image: "/images/alingcatalogs/produzni.png",
            title: "Aling Conel produžni kablovi",
            brand: "Aling Conel-cables"
        } ,
        {
            image: "/images/alingcatalogs/bulbs.png",
            title: "Aling Conel sijalična grla",
            brand: "Aling Conel-bulbs"
        } 
    ]

    return (
         <>
             
             <Slideshow/>

            
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