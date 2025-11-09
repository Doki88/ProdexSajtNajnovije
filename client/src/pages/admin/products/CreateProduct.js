import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

export default function CreateProduct(){

    const [validationErrors, setValidationErrors] = useState({})
    const [catalog, setCatalog] = useState("")
    const [category, setCategory] = useState("")
    //const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);


      const [catalogs, setCatalogs] = useState([])  
        
     
      function getCatalogs(){
            
            //let url =  `http://localhost:5000/api/catalogs/leaves`
             // let url =  `https://prodexmd.ba/api/products?page=${currentPage}&perPage=${pageSize}`
             let url =  `https://prodexmd.ba/api/catalogs/leaves`
     
             fetch(url)
             .then(response => {
                 
                
                 if(response.ok){
                     let totalCount = response.headers.get('X-Total-Count')
                     // console.log("X-Total-Count:" + totalCount)
                     return response.json()
                 }
     
                 throw new Error()
             })
             .then(data => {
                console.log('tuj smo:')
                  console.log(data)

                let sortedCatalogs = [...data].sort((a, b) =>
                         a.name.localeCompare(b.name)
                );
                 setCatalogs(sortedCatalogs)

                 console.log('evo i kataloga:')
                                   console.log(catalogs)

                
             })
             .catch(error => {
                 alert("Unable to get the data now" + error )
             })
         }
     
         useEffect(getCatalogs, [])
     

    

    async function handleSubmit(event){
        event.preventDefault()

        const formData = new FormData(event.target)

        const product = Object.fromEntries(formData.entries())   

        // console.log('catalog')
        // console.log(catalog)

         let clearedCatalog = catalog.replace(/^\s*\d+\)/, '').trim()

        const formNew = new FormData();
        //formNew.append("image", file);
        files.forEach((file) => {
            formNew.append("images", file); // Note: backend must handle 'images' as array
        });
        formNew.append("name", product.name);
        formNew.append("brand", clearedCatalog);
        formNew.append("category", category);
        formNew.append("price", product.price);
        formNew.append("description", product.description);
        formNew.append("serialNumber", product.serialNumber);
        //formNew.append("imagename", product.image.name);
        
        
        //alert(product.image.name)
        // if(!product.name || !product.brand || !product.category || !product.price ||
        //     !product.description || !product.image.name)
       
        if(!product.name || ! catalog  || !product.price ||
                !product.serialNumber ){
                alert("Molimo vas da popunite sva obavezna polja!!!")
                return
        }

       
        try {

             if (process.env.NODE_ENV === 'production') {
                const response = await axios.post('https://prodexmd.ba/api/upload', formNew,
                {

              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            } else {
                const response = await axios.post('http://localhost:5000/api/upload', formNew, 
                {

              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            }
            
            //const response = await axios.post('http://localhost:5000/api/upload', formNew, 
            //const response = await axios.post('https://prodexmd.ba/api/upload', formNew,
            //     {

            //   headers: {
            //     'Content-Type': 'multipart/form-data',
            //   },
            // });
             alert('Dodali ste prozivod: ' + product.name)
            //console.log('Upload successful:', response.data);
          } catch (error) {
            console.error('Upload failed:', error);
          }
        
            
    }

    function handleCatalog(event){
        let catalog = event.target.value

        setCatalog(catalog)
         
     }

     function handleCategoryFilter(event){
        let category = event.target.value

        setCategory(category)
        
     }

     const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files)); // Convert FileList to array
      };

    return(
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4">
                    <h2 className="text-center mb-5">Kreiraj novi prozivod</h2>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Naziv</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="name"></input>
                                <span className="text-danger">{validationErrors.name}</span>
                            </div>

                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Prodex šifra:</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="serialNumber"></input>
                                <span className="text-danger">{validationErrors.serialNumber}</span>
                            </div>

                        </div>

                        {/* <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Katalog</label>
                            <div className="col-sm-8">
                                <select className="form-select" name="category" onChange={handleCategory}>
                                    <option value='Finder'>Finder</option>
                                    <option value='Nopal'>Nopal</option>
                                    <option value='Tehnoin'>Tehnoin</option>
                                    <option value='Aling Conel-prestige'>Aling Conel-prestige</option>
                                    <option value='Aling Conel-modular'>Aling Conel-modular</option>
                                    <option value='Rezervni dijelovi-grijaci'>Rezervni dijelovi-grijaci</option>
                                    <option value='Rezervni dijelovi-vesmasine'>Rezervni dijelovi-vesmasine</option>

                                </select>
                                <span className="text-danger">{validationErrors.category}</span>
                            </div>
                        </div> */}
                        <div className="row mb-3">
                             <label className="col-sm-4 col-form-label">Katalog</label>
                            <div className="col-sm-8">
                                <select className="form-select" name="category" value={catalog} onChange={handleCatalog}>
                                <option value="">-- Odaberite katalog --</option>
                                {catalogs.map((cat) => (
                                    <option key={cat._id} value={cat.name}>
                                    {cat.name}
                                    </option>
                                ))}
                                </select>
                                <span className="text-danger">{validationErrors.category}</span>
                            </div>
                        </div>


                     
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Cijena</label>
                            <div className="col-sm-8">
                                {/* <input className="form-control" name="price" type="number" step="0.01" min="1"/> */}
                                <input className="form-control" name="price" type="number" step="0.01"/>
                                <span className="text-danger">{validationErrors.price}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Opis</label>
                            <div className="col-sm-8">
                                <textarea className="form-control" name="description" rows="4"/>
                                <span className="text-danger">{validationErrors.description}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Slika</label>
                            <div className="col-sm-8">
                                {/* <input className="form-control" type="file" name="image" onChange={handleFileChange} /> */}
                                <input
                                    className="form-control"
                                    type="file"
                                    name="images"
                                    onChange={handleFileChange}
                                    multiple
                                    />

                                <span className="text-danger">{validationErrors.image}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="offeset-sm-4 col-sm-4 d-grid">
                                <button type="submit" className="btn btn-primary">Sačuvaj</button>
                            </div>
                            <div className="col-sm-4 d-grid">
                                <Link className="btn btn-secondary" to='/admin/products' role="button">Ponisti</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div> 
        </div>
    )
}