import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function ProductDetails(){

    const params = useParams()
    const [product, setProduct] = useState({})

    async function getProductDetails(){
        try {
            //let response = await fetch("http://localhost:5000/api/products/" + params.id)
            let response = await fetch("https://prodexmd.ba/api/products/" + params.id)
            let data = await response.json()

            if(response.ok){
               
                setProduct(data)
            }
            else{
                alert("Unable to get the product details")
            }
        } catch (error) {
            alert("Unable to connect to the server")
        }

    }

    useEffect(() => {
        getProductDetails()
    }, [])

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-4 text-center">
                    {/* <img src={product.images[0]}
                        className="img-fluid mb-3" alt="..." width="250"/> */}
                </div>
                <div className="col-md-8">
                    <h3 className="mb-3">{product.name}</h3>
                    <h3 className="mb-3">{product.price} KM</h3>
                    {/* <button type="button" className="btn btn-warning btn-sm">
                        Add to Cart <i className="bi bi-cart4"></i>
                    </button> */}

                    <hr/>

                    <div className="row mb-3">
                        <div className="col-sm-3 fw-bold">
                            Proizvođač
                        </div>
                        <div className="col-sm-9">
                            {product.brand}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-sm-3 fw-bold">
                            Kategorija
                        </div>
                        <div className="col-sm-9">
                            {product.category}
                        </div>
                    </div>

                    <div className="fw-bold">Opis proizvoda</div>
                    <div style={{ whiteSpace: "pre-line" }}>
                        {product.description}
                    </div>
                </div>
            </div>
         </div>
    )
}