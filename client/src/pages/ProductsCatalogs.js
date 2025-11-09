import { useContext, useEffect, useState } from "react"
import { useParams, Link, useLocation, useNavigate } from "react-router-dom"
import "../styles/productcatalog.css"
import Slideshow from "./common/Slideshow"
import BottomSlider from "./BottomSlider"
import { AppContext } from "../AppContext";
 

export default function ProductsCatalogs({ catalogs: catalogsProp }){
    
      const { id } = useParams();
 
      const location = useLocation();
      let stateCatalogs = location.state?.catalogs || [];

      const navigate = useNavigate()
      
       const { allCatalogs } = useContext(AppContext);

   
       const [isLoading, setIsLoading] = useState(true);

       const [catalogs, setCatalogs] = useState([]);
    
        
        // function getCatalogs(){
           
        //     alert('tu sem')
        //     let url =  `http://localhost:5000/api/catalogs/?page=${currentPage}&perPage=${pageSize}/`
             
        //     //let url =  `https://prodexmd.ba/api/products?page=${currentPage}&perPage=${pageSize}/`
    
        //     //let url =  `https://prodexmd.ba/api/catalogs/?page=${currentPage}&perPage=${pageSize}/`
            
         
    
          
        //       fetch(url)
    
        //     .then(response => {
        //         if(response.ok){
                  
        //             let totalCount = response.headers.get('X-Total-Count')
                  
        //             return response.json()
        //         }
    
        //         throw new Error()
        //     })
        //     .then(data => {
                 
        //          let sortedCatalogs = [...data.catalogs].sort((a, b) =>
        //             a.name.localeCompare(b.name)
        //          );

                 
        //         setCatalogs(sortedCatalogs)
        //         //setCurrentPage(data.pagination.currentPage)
                 
        //     })
        //     .catch(error => {
        //         alert("Unable to get the data"+error)
        //     })
        // }
     
        // useEffect(() => {
        //     const newCatalogs = location.state?.catalogs || [];

        //     if (newCatalogs.length > 0) {
        //         setCatalogs(newCatalogs);
        //     } else {
        //         getCatalogs();
        //     }
        // }, [location.key]); 

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
    
      useEffect(() => {
        setIsLoading(true); // 🔄 Start loading

        if (id) {
            //fetch(`http://localhost:5000/api/catalogs/${id}/children`)
            fetch(`https://prodexmd.ba/api/catalogs/${id}/children`)
                .then(res => res.json())
                .then(data => {
                     
                    if (!data.children || data.children.length === 0) {
                       //console.log('sad sam tu')
                        // ⛔ No children → go to products
                        navigate(`/productscatalogs/${id}/products`, { replace: true });
                    } else {
                        // ✅ Has children → show them
                        //  console.log('a sad sam ovde')
                        //  console.log(data.children)
                        const sorted = [...data.children].sort((a, b) => a.name.localeCompare(b.name));


                        let cleanedCatalogs = sorted.map(item => ({
                            ...item,
                            name: item.name.replace(/^\s*\d+\)/, '').trim()
                        }));

                        //console.log('Cleaned array:')
                        //console.log(cleanedCatalogs);

                        setCatalogs(cleanedCatalogs);
                    }
                })
                .catch(error => {
                    console.error("Failed to load child catalogs", error);
                })
                .finally(() => {
                    setIsLoading(false); // ✅ Done loading
                });
        } else {
            //alert('ev me')
            fetch("https://prodexmd.ba/api/catalogs")
            //fetch(`http://localhost:5000/api/catalogs`)
                .then(res => res.json())
                .then(data => {
                    const sorted = [...data.catalogs].sort((a, b) => a.name.localeCompare(b.name));

                     let cleanedCatalogs = sorted.map(item => ({
                            ...item,
                            name: item.name.replace(/^\s*\d+\)/, '').trim()
                    }));
                    setCatalogs(cleanedCatalogs);
                })
                .catch(err => {
                    console.error("Failed to fetch root catalogs", err);
                })
                .finally(() => {
                    setIsLoading(false); // ✅ Done loading
                });
        }
    }, [id, navigate]);



        if (isLoading) {
            return <div style={{ padding: "20px" }}>Učitavanje kataloga...</div>;
        }
    return (
         <>
             
             <div className="product-grid">
                {catalogs.map((catalog, index) => {
            
                     return (
                    <div className="product-card" key={index}>
                        <CatalogItem1 catalog={catalog} />
                     
                     </div>
                    );
                })}
            </div>

             {/* <BottomSlider/> */}
         </>
    )
}

function CatalogItem({catalog}){
    return(
        
        <div className="product-item">
          
           
             
            <hr />
            { catalog.brand === "Aling Conel" &&
                     
                <Link to={"/alingcatalog/" }  role="button" > <img src={catalog.image}
                    className="img-fluid" alt="..."
                    style={{height: "220px", objectFit:"contain"}}/>  </Link>
            }

            { catalog.brand === "Aling Conel" &&
                 <Link to={"/alingcatalog/" }  role="button" > 
                    <p className="linktext">{catalog.title}</p>
                </Link>
            } 
            { catalog.brand === "Rezervni dijelovi" &&
                     
                     <Link to={"/rezervnicatalog/" }  role="button" > <img src={catalog.image}
                         className="img-fluid" alt="..."
                         style={{height: "220px", objectFit:"contain"}}/>  </Link>
                 }
     
                 { catalog.brand === "Rezervni dijelovi" &&
                      <Link to={"/rezervnicatalog/" }  role="button" > 
                         <p className="linktext">{catalog.title}</p>
                     </Link>
                 } 
            { catalog.brand !== "Aling Conel" && catalog.brand !== "Rezervni dijelovi" &&
                <Link to={"/products/" } state={{ brand: catalog.brand }} role="button" > <img src={catalog.image}
                    className="img-fluid" alt="..."
                    style={{height: "220px", objectFit:"contain"}}/>  </Link>
            }
            { catalog.brand !== "Aling Conel" && catalog.brand !== "Rezervni dijelovi" &&
                <Link to={"/products/" }  state={{ brand: catalog.brand }} role="button" > 
                    <p className="linktext">{catalog.title}</p>
                </Link>
            }
            
             
             
            
            {/* <Link to={"/products/" + product._id} role="button" className="details-btn">Detaljnjije</Link> */}
        </div>
    )

}

 

function CatalogItem1({ catalog }) {
 
    // If this catalog has sub-catalogs, recursively render them
    // if (Array.isArray(catalog.catalogs) && catalog.catalogs.length > 0) {
    if (catalog.hasChildren) {
        return (
            <>
                 <div className="product-item">
                    
                    <Link
                      to={`/productscatalogs/${catalog._id}`}
                      role="button">
                         <img
                            src={catalog.image}
                            className="img-fluid"
                            alt="..."
                            style={{ height: "220px", objectFit: "contain" }}
                        />

                      </Link>
                   
                    <Link
                       to={`/productscatalogs/${catalog._id}`} 
                       state={{ catalogs: catalog.catalogs }}
                        
                       role="button"
                        >
                        <p className="linktext">{catalog.name}</p>
                    </Link>
                 </div>
            </>
        );
    }

    // Otherwise, render the catalog item
    return (
        <div className="product-item">
            {/* <Link to={"/products/"} state={{ brand: catalog.name }} role="button"> */}
            <Link to={`/productscatalogs/${catalog._id}/products`} state={{ brand: catalog.name }} role="button">
                <img
                    src={catalog.image}
                    className="img-fluid"
                    alt="..."
                    style={{ height: "220px", objectFit: "contain" }}
                />
            </Link>
            {/* <Link to={"/products/"} state={{ brand: catalog.name }} role="button"> */}
            <Link to={`/productscatalogs/${catalog._id}/products`} state={{ brand: catalog.name }} role="button">
                <p className="linktext">{catalog.name}</p>
            </Link>
        </div>
    );
}

