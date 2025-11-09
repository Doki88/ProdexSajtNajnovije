import { useContext, useEffect, useState } from "react"
import { useParams, Link, useLocation } from "react-router-dom"
 
// import BottomSlider from "./common/BottomSlider"
import "../../styles/webshop/webshopproducts.css"

 
import { FaSearch } from "react-icons/fa"
import Slideshow from "../common/Slideshow";
import { AppContext } from "../../AppContext";
 

export default function ProductsWithCart(){

    const { catalogId } = useParams(); 
    const location = useLocation()
    //const { brand } = location.state

    const { allCatalogs } = useContext(AppContext);

    const [brand, setBrand] = useState(location.state?.brand || "");

    //console.log('evo brende:'+brand)

    const [products, setProducts] = useState([])

     //pagination functionality
     const [currentPage, setCurrentPage] = useState(1)
     const [totalPages, setTotalPages] = useState(1)
     const pageSize = 90

    // search functionality
    const [searchValue, setSearchValue] = useState("")

    function getProducts(){
     
         console.log('evo brendija:'+brand)

        setBrand('Releji serije 4051');
        //let url = `https://prodexmd.ba/api/products/?page=${currentPage}&perPage=${pageSize}&brand=${brand}`;
        //let url = `http://localhost:5000/api/products/?page=${currentPage}&perPage=${pageSize}&brand=${brand}`;
        let url = '';
        if (process.env.NODE_ENV === 'production') {
            url = `https://prodexmd.ba/api/products/?page=${currentPage}&perPage=${pageSize}&brand=${brand}`;
        } else {
             url = `http://localhost:5000/api/products/?page=${currentPage}&perPage=${pageSize}&brand=${brand}`;
        }
        console.log('evo urle:'+url)
       

        if(searchValue){
           
            url = url + searchValue
         }

         console.log('evo url:'+url)
          fetch(url)

        .then(response => {
            if(response.ok){
                console.log('U redu je sve ipak')
                 let totalCount = response.headers.get('X-Total-Count')
                let pages = Math.ceil(totalCount / pageSize)
                setTotalPages(pages)
                return response.json()
            }

            throw new Error()
        })
        .then(data => {
            console.log(data)

            let sortedProducts = [...data.products].sort((a, b) =>
                a.name.localeCompare(b.name)
            );
       
            let cleanedProducts = sortedProducts.map(item => ({
                ...item,
                name: item.name.replace(/^\s*\d+\)/, '').trim()
            }));

   

            setProducts(cleanedProducts);
            setCurrentPage(data.pagination.currentPage)
            setTotalPages(data.pagination.totalPages)
        })
        .catch(error => {
            alert("Unable to get the data"+error)
        })
    }
 
    

    useEffect(() => {
        if (catalogId && allCatalogs.length > 0) {
            const catalog = findCatalogById(allCatalogs, catalogId);

            if (catalog) {
                // setBrand(catalog.name);  
                setBrand('Releji serije 4051'); 
            } else {
                console.warn("Catalog not found for ID:", catalogId);
            }
        }
    }, [catalogId, allCatalogs]);   


    useEffect(() => {
    // if (brand) {
    //     getProducts();
    // }
     getProducts();
}, [brand, currentPage, searchValue]);
    //console.log(products)
      // pagination functionlity
    let pagintationButtons = []
    for(let i = 1; i <= totalPages; i++){
         
          pagintationButtons.push(
               <li className={i === currentPage ? "page-item-active" : "page-item"}  key={i}>
              <a className="page-link" href={"?page=" + i} 
                  onClick={event => {
                      event.preventDefault()
  
                      setCurrentPage(i)
                  }}
               >{i}</a>
            </li>
          )
    }

    function findCatalogById(catalogs, id) {
        for (let catalog of catalogs) {
            if (catalog._id === id) return catalog;
            if (Array.isArray(catalog.catalogs)) {
            const found = findCatalogById(catalog.catalogs, id);
            if (found) return found;
            }
        }
        return null;
}


    //filter functionality
    function handleBrandFilter(event){
       
        let brand = event.target.value
         
       
        setCurrentPage(1)
    }

    function handleCategoryFilter(event){
        let category = event.target.value
        
        setCurrentPage(1)
     }

    

    function handleSearch(event){
        const searchTerm = event.target.value;
        // do something with the search term (e.g. redirect to a search results page)
        //console.log(`Searching for "${searchTerm}"...`);
        setSearchValue(searchTerm)
        setCurrentPage(1)
    }
  
    return (
         <>
             
            <Slideshow/>
      
             <div className="three-blocks-container">
                    <div className="block"> 
                        <div className="title-filters-box1">
                            <h4 className="title-products1">{brand}</h4>
                        </div>
                    </div>
                    
                    
                </div>

                
                <div className="product-grid">
                        {products.map((product, index) => (
                            <div className="product-card" key={index}>
                                 <ProductItem product={product}/>
                            </div>
                        ))}
                 </div>
                 <ul className="pagination">{pagintationButtons}</ul>
         </>
    )
}

function ProductItem({product}){
    const { addToCart } = useContext(AppContext);
    const [added, setAdded] = useState(false);

     const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000); // remove feedback after 2s
    };


    return(
        <div className="product-item">
            <Link to={`/products1/${product._id}`} className="product-name-link">
                 <h4>{product.name}</h4> 
            </Link>
           <Link to={`/products1/${product._id}`}>
                <img
                    src={product.image1}
                    className="img-fluid"
                    alt={product.name}
                    style={{ height: "220px", objectFit: "contain" }}
                />
            </Link>

            <hr />
            { product.description === "pometru" &&
                <h4>{product.price}KM/1m</h4>           
            } 
            { product.description !== "pometru" && product.price !== 0 && product.price !== -1 &&
                <h4>{product.price}KM</h4>           
            } 
            {product.price === 0 &&
                <h4>{product.price}samo po narudžbi</h4>  
            }  
            {product.price === -1 &&
                <h4 className="priceNegative">cijena po upitu</h4>  
            }    

            <h4 className="sifra">Šifra: {product.serialNumber}</h4>

            <div className="product-buttons">
                
                 <button className="add-to-cart-btn" onClick={handleAddToCart}>
                   Dodaj u korpu
                </button>
                {added && <span className="added-message">✔ Dodato u korpu</span>}
            </div>
        </div>
    )
}
