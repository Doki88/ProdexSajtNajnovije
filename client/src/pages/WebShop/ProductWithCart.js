import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "../../styles/product.css"
 

import Slideshow from "../common/Slideshow"
import { AppContext } from "../../AppContext"
import ImageModal from "../common/ImageModal"
 



export default function ProductWithCart(){

    const params = useParams()
    const [product, setProduct] = useState({})
    const [features, setFeatures] = useState([])
    const [modalImage, setModalImage] = useState(null);
    const [clearedProductName, setClearedProductName] = useState([])
    const [addedToCart, setAddedToCart] = useState(false);
    const [quantity, setQuantity] = useState(1);

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
        if (!product._id || quantity < 1) return;

        for (let i = 0; i < quantity; i++) {
            addToCart(product); // reuses your existing context logic (increases quantity)
        }

        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        }
    };

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

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

                        <div className="product-buttons">
                            <div className="quantity-selector">
                                <button onClick={decreaseQuantity}>-</button>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                />
                                <button onClick={increaseQuantity}>+</button>
                            </div>
                            <button className="add-to-cart-btn" onClick={handleAddToCart}>
                                Dodaj u korpu
                            </button>
                            {addedToCart && <span className="added-message">✔ Dodato u korpu</span>}
                        </div>  
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

        feature = proba[1]
        let feature1 = proba[2]
        let feature2 = proba[3]

        let formattedFeature = feature.startsWith('http') ? `http:${feature1}/${feature2}` : `https://${feature}`;
        if(feature.startsWith('https')){
            formattedFeature = `https:${feature1}`
        }
        //console.log('irl je: '+formattedFeature)

        if(feature.startsWith('http')){
             return(
       
            <div className="featureRed">
                <a href={formattedFeature}>- Uputstvo</a>
             </div>
            )
        }else{
             return(
       
            <div className="featureRed">
                <a href={formattedFeature}>{formattedFeature}</a>
             </div>
        )
        }
       
    }

    if(feature.startsWith("kbrlink")){

        //console.log('tu sem')
        
        const proba = feature.split(':')

        feature = proba[1]
        let feature1 = proba[2]
        let feature2 = proba[3]

        let formattedFeature = feature.startsWith('http') ? `http:${feature1}/${feature2}` : `https://${feature}`;
        if(feature.startsWith('https')){
            formattedFeature = `https:${feature1}`
        }
        //console.log('irl je: '+formattedFeature)

        if(feature.startsWith('http')){
             return(
       
            <div className="featureRed">
                <a href={formattedFeature}>-{formattedFeature}</a>
             </div>
            )
        }else{
             return(
       
            <div className="featureRed">
                <a href={formattedFeature}>{formattedFeature}</a>
             </div>
        )
        }
       
    }

    if(feature.startsWith("ytube")){
        const proba = feature.split(':')
        
         feature = proba[1]
        let feature1 = proba[2]
        let feature2 = proba[3]

        let formattedFeature = feature.startsWith('http') ? `http:${feature1}/${feature2}` : `https://${feature}`;
        if(feature.startsWith('https')){
            formattedFeature = `https:${feature1}`
        }

        console.log('evo linka:'+formattedFeature)
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