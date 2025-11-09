import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../../AppContext";

import axios from "axios";
import CatalogSearchSelect from "./CatalogSearchSelect";


export default function EditCatalog(){

 
    const params = useParams()

    const [initialData, setInitialData] = useState()

    const [validationErrors, setValidationErrors] = useState({})

    const [catalogId, setCatalogId] = useState()
    const [category, setCategory] = useState("")
    const [file, setFile] = useState(null);
    const [selectedCatalogs, setSelectedCatalogs] = useState([]);

     
    function getCatalog(){

        setCatalogId(params.id)
        //fetch("http://localhost:5000/api/catalogs/" + params.id)
        fetch("https://prodexmd.ba/api/catalogs/" + params.id)
        //fetch("https://prodexproba.onrender.com/api/products/" + params.id)
            .then(response => {
                if(response.ok){
                    return response.json()
                    
                }

                throw new Error()
            })
            .then(data => {
                setInitialData(data)
            })
            .catch(error => {
                alert("Unable to read the product details")
            })
    }

    useEffect(getCatalog, [])

    async function handleSubmit(event){
        event.preventDefault()
 
        const formData = new FormData(event.target)

        const catalog = Object.fromEntries(formData.entries())   

        // console.log('evo catalog:'+ catalog)
        // console.log(catalog)
        // console.log('evo dice:')
        // console.log(selectedCatalogs)
        // console.log(catalogId)

 
        const formNew = new FormData();
        formNew.append("name", catalog.name); // catalog name input
        formNew.append("imagename", file?.name || ""); // optional
      

        if (selectedCatalogs) {
            const catalogNames = selectedCatalogs.map(catalog => catalog.name);
            console.log(catalogNames);
            formNew.append("catalogNames", JSON.stringify(catalogNames)); // only names
        }
        
        if (file) {
           
            formNew.append("image", file); // only if file selected
        }

        try {
            //const response = await axios.put(`http://localhost:5000/api/catalogs/${catalogId}`, formNew, {
            const response = await axios.put(` https://prodexmd.ba/api/catalogs/${catalogId}`, formNew, {
                headers: {
                'Content-Type': 'multipart/form-data',
            },
            });

            alert('Katalog je izmijenjen: ' + response.data.name);
            // optionally redirect or refresh
        } catch (error) {
            console.error('Error updating catalog:', error);
            alert("Failed to update catalog");
        }

            
    }

    function handleCategoryFilter(event){
        
        let category = event.target.value
        //setFilterParams({...filterParams, category: category})
      }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };

    return(
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4">
                    <h2 className="text-center mb-5">Prepravi katalog</h2>
                    {/* <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">ID</label>
                            <div className="col-sm-8">
                                <input readOnly name="id" className="form-control-plaintext" defaultValue={params.id}></input>
                            </div>
                    </div> */}
                    {
                    initialData && 
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Naziv</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="name" defaultValue={initialData.name}></input>
                                <span className="text-danger">{validationErrors.name}</span>
                            </div>

                        </div>
               

                        <div className="row mb-3">
                            <div className="offeset-sm-4 col-sm-8">
                                <img src={initialData.image}
                                    width="150" alt="..."/>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Image</label>
                            <div className="col-sm-8">
                                <input className="form-control" type="file" name="image" onChange={handleFileChange}/>
                                <span className="text-danger">{validationErrors.image}</span>
                            </div>
                        </div>

                       {initialData.catalogs && initialData.catalogs.length > 0 && (
                            <div className="row mb-3">
                                <label className="col-sm-4 col-form-label">Sub-Catalogs</label>
                                <div className="col-sm-8">
                                <p>{initialData.catalogs.map(c => c.name).join(", ")}</p>
                                </div>
                            </div>
                        )}

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Dodaj postojeće kataloge</label>
                                <div className="col-sm-8">
                                   <CatalogSearchSelect onSelect={(selected) => setSelectedCatalogs(selected)} />
                                </div>
                        </div>

                         <div className="row mb-3">
                       
                                <div className="col-sm-8">
                                     {initialData.image}
                                </div>
                        </div>

                        <div className="row">
                            <div className="offeset-sm-4 col-sm-4 d-grid">
                                <button type="submit" className="btn btn-primary">Sačuvaj</button>
                            </div>
                            <div className="col-sm-4 d-grid">
                                <Link className="btn btn-secondary" to='/admin/catalogs' role="button">Poništi</Link>
                            </div>
                        </div>
                    </form>
                    }
                </div>
            </div> 
        </div>
    )
}