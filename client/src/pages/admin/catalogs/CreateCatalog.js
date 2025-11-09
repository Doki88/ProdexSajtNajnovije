import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../../AppContext";
import FinderFilter from "../../../brandFilters/FinderFilter";
import NopalFilter from "../../../brandFilters/NopalFilter";
import TehnoinFilter from "../../../brandFilters/TehnoinFilter";
import AlingPrestigeFIlter from "../../../brandFilters/AlingPrestigeFIlter";
import AlingModularFilter from "../../../brandFilters/AlingModularFilter";
import RezervniGrijaciFilter from "../../../brandFilters/RezervniGrijaciFilter";
import axios from "axios";
import RezervniVesMasinaFIlter from "../../../brandFilters/RezervniVesMasinaFIlter";
import CatalogSearchSelect from "./CatalogSearchSelect.js";

export default function CreateCatalog(){

    const [validationErrors, setValidationErrors] = useState({})
    const [catalog, setCatalog] = useState("")
    const [category, setCategory] = useState("")
    const [file, setFile] = useState(null);
    const [selectedCatalogs, setSelectedCatalogs] = useState([]);




    async function handleSubmit(event){
        event.preventDefault()

        const formData = new FormData(event.target)

        const catalog = Object.fromEntries(formData.entries())   

        const formNew = new FormData();
        formNew.append("image", file);
        formNew.append("name", catalog.name);
        formNew.append("imagename", catalog.image.name);
        formNew.append("catalogNames", JSON.stringify(selectedCatalogs.map(c => c.name)));
       

        // if(!product.name || !product.brand || !product.category || !product.price ||
        //     !product.description || !product.image.name)
       
        if(!catalog.name){
                alert("Molimo vas da popunite sva obavezna polja!!!")
                return
        }

       
        // try {
            
        //     const response = await axios.post('http://localhost:5000/api/catalogs', formNew, 
        //     //const response = await axios.post('https://prodexmd.ba/api/upload', formNew,
        //         {

        //       headers: {
        //         'Content-Type': 'multipart/form-data',
        //       },
        //     });
        //     //navigate("/admin/products")
        //     alert('Dodali ste katalog: ' + catalog.name)
        //     //console.log('Upload successful:', response.data);
        //   } catch (error) {
        //     console.error('Upload failed:', error);
        //   }
        
        //await fetch('http://localhost:5000/api/catalogs', {
        await fetch('https://prodexmd.ba/api/catalogs', {
           
        method: 'POST',
        
        body: formNew
        });

        alert('Dodali ste katalog: ' + catalog.name)
        
            
    }

     const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };

    return(
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4">
                    <h2 className="text-center mb-5">Kreiraj novi katalog</h2>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Naziv</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="name"></input>
                                <span className="text-danger">{validationErrors.name}</span>
                            </div>

                        </div>
                       

                        
                       <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Dodaj postojeće kataloge</label>
                            <div className="col-sm-8">
                            <CatalogSearchSelect onSelect={(selected) => setSelectedCatalogs(selected)} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Slika</label>
                            <div className="col-sm-8">
                                <input className="form-control" type="file" name="image" onChange={handleFileChange} />
                                <span className="text-danger">{validationErrors.image}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="offeset-sm-4 col-sm-4 d-grid">
                                <button type="submit" className="btn btn-primary">Sačuvaj</button>
                            </div>
                            <div className="col-sm-4 d-grid">
                                <Link className="btn btn-secondary" to='/admin/catalogs' role="button">Ponisti</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div> 
        </div>
    )
}