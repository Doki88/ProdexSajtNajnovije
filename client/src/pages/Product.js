import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "../styles/webshop/productwithcart.css"
import Slideshow from "./common/Slideshow"
import ImageModal from "./common/ImageModal"
import { AppContext } from "../AppContext"
 



export default function Product(){

    const params = useParams()
    const [product, setProduct] = useState({})
    const [features, setFeatures] = useState([])
    const [modalImage, setModalImage] = useState(null);
    const [clearedProductName, setClearedProductName] = useState([])
    const [addedToCart, setAddedToCart] = useState(false);

    const { addToCart } = useContext(AppContext);
    

    async function getProductDetails(){
         
        try {
            //let response = await fetch("http://localhost:5000/api/products/" + params.id)
            
            let response = await fetch("https://prodexmd.ba/api/products/" + params.id)

            let data = await response.json()

            if(response.ok){
              
                setProduct(data)

                if(data.description)
                  {
                    const description1= data.description 
                    const proba = description1.split(';')
                    setFeatures(proba)
                    // console.log(proba[0])
                  }

                  let clearedName = data.name.replace(/^\s*\d+\)/, '').trim()
                  setClearedProductName(clearedName)
                 
                //console.log('evo em')
              
             }
            else{
                alert("Unable to get the product details")
            }
        } catch (error) {
            alert("Unable to connect to the server")
        }

    }

    const handleAddToCart = () => {
        addToCart(product);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000); // Reset message after 2 seconds
    };


    useEffect(() => {
        getProductDetails()
    }, [])

    return (
        <>
        {/* <Slideshow/> */}
          <div className="mainContainer">
            <div className="upperContainer">
                <div className="imageContainer1">
                    
                    {product.image1 &&
                         <img src={product.image1}
                    
                         style={{width: "220px"}}
                         alt="..."
                        onClick={() => setModalImage(product.image1)}
                         />   
                    }     
                </div>
                <div className="titleContainer">
                     <h3>{clearedProductName}</h3>

                     
                    
                     { product.price!== 0 && product.description === "pometru" &&  product.price !== -1 &&
                     
                          <p className="price">Cijena: {product.price} KM/1m </p>
                     }
                     { product.price!== 0 && product.description !== "pometru" && product.price !== -1 &&
                        <p className="price">Cijena: {product.price} KM </p>
                     }
                    {product.price === 0 &&
                          <p className="priceRed">samo po narudžbi </p>
                     }  
                     {product.price === -1 &&
                          <p className="priceRed">cijena po upitu </p>
                     }    

                     
                     <div>
                        <p>Prodex šifra: {product.serialNumber}</p>

                        {/* <div className="product-buttons">
                            <button className="add-to-cart-btn" onClick={handleAddToCart}>
                                Dodaj u korpu
                            </button>
                            {addedToCart && <span className="added-message">✔ Dodato u korpu</span>}
                        </div> */}

                                
                    </div>
                      
                             
                </div>
                {product.image2 &&
                <div className="imageContainer2">
                    
                         <img src={product.image2}
                         style={{width: "220px"}}
                         alt="..."
                         onClick={() => setModalImage(product.image2)}

                         />   
                        
                </div>
                }

                {/* {!product.videoUrl && (
                    <div className="videoContainer">
                        <iframe
                            width="300"
                            height="200"
                            // src={getYouTubeEmbedUrl(product.videoUrl)}
                            src={getYouTubeEmbedUrl("https://www.youtube.com/watch?v=C7Ksht8qFzg&embeds_referring_euri=https%3A%2F%2Fwww.wipcool.com%2F")}
                            title="YouTube video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                )} */}

            </div>    
            <div className="descriptionContainer">
                <div className="descriptionTitle">
                    Opis
                </div>
                <div className="features">
                        {
                            features.map((feature, index) => {
                                return (
                                    <div key={index}>
                                         <FeatureItem feature={feature}/>
                                         
                                     </div>
                                )
                            })
                       }
                </div>
                
            </div>        
          </div>
          <ImageModal src={modalImage} onClose={() => setModalImage(null)} />

         {/* <BottomSlider/> */}
        </>
       
    )
}

function getYouTubeEmbedUrl(url) {
        if (!url) return null;

        const match = url.match(
            /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        );
        return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

function FeatureItem({feature}){
    console.log('tude sum')
    if(feature.startsWith("opiscrveno")){
        const proba = feature.split(':')
        
        feature = proba[1]
        return(
       
            <div className="featureRed">
                -{feature}
             </div>
        )
    }
    if(feature.startsWith("link")){
        const proba = feature.split(':')

        //console.log('ev me tu:'+proba)
        
        feature = proba[1]

        const formattedFeature = feature.startsWith('http') ? feature : `https://${feature}`;
        console.log('irl je: '+formattedFeature)
        return(
       
            <div className="featureRed">
                <a href={formattedFeature}>{feature}</a>
             </div>
        )
    }

    if(feature.startsWith("ytube")){
          console.log('evo linka jpr:'+feature)
        const proba = feature.split('=>')
        
        feature = proba[1]

        const formattedFeature = feature.startsWith('http') ? feature : `https://${feature}`;

        console.log('evo linka:'+proba)
        return(
       
             <div className="videoContainer">
                        <iframe
                            width="300"
                            height="200"
                            // src={getYouTubeEmbedUrl(product.videoUrl)}
                            src={getYouTubeEmbedUrl(formattedFeature)}
                            title="YouTube video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
        )
    }
    return(
       
        <div >
            -{feature}
         </div>
    )

}