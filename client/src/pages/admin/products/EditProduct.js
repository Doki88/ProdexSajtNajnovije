import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../../AppContext";
import axios from "axios";


export default function EditProduct(){

 
    const params = useParams()

    const [initialData, setInitialData] = useState()

    const [validationErrors, setValidationErrors] = useState({})

    const [productId, setProductId] = useState()
    const [catalog, setCatalog] = useState("")
    const [category, setCategory] = useState("")
    //const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);

    const [catalogs, setCatalogs] = useState([])  


 
    function getProduct(){

        setProductId(params.id)
        //fetch("http://localhost:5000/api/products/" + params.id)
        fetch("https://prodexmd.ba/api/products/" + params.id)
        // fetch("https://prodexproba.onrender.com/api/products/" + params.id)
            .then(response => {
                if(response.ok){
                    return response.json()
                }

                throw new Error()
            })
            .then(data => {
                
               
                setInitialData(data)
                setCatalog(data.brand);
            })
            .catch(error => {
                alert("Unable to read the product details")
            })
    }

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
                 setCatalogs(data)

                 

                
             })
             .catch(error => {
                 alert("Unable to get the data now" + error )
             })
         }
     

    useEffect(getProduct, [])
    useEffect(getCatalogs, [])

    async function handleSubmit(event){
        console.log('tuj sam bato!!!')
        event.preventDefault()
 
        const formData = new FormData(event.target)

        const product = Object.fromEntries(formData.entries())   

        // console.log('evo producta:'+product)
        // console.log(product)
        let clearedCatalog = catalog.replace(/^\s*\d+\)/, '').trim()
 
        const formNew = new FormData();
        //formNew.append("image", file);
        files.forEach((file) => {
            formNew.append("images", file); // Note: backend must handle 'images' as array
        });
        formNew.append("name", product.name);
        formNew.append("brand", clearedCatalog);
        formNew.append("price", product.price);
        formNew.append("description", product.description);
        formNew.append("serialNumber", product.serialNumber);
        //formNew.append("imagename", product.image.name);
        formNew.append("id", productId);

         if(!product.name || ! catalog  || !product.price ||
                !product.serialNumber ){
                alert("Molimo vas da popunite sva obavezna polja!!!")
                return
        }

        try {

        //    const response = await axios.put('https://prodexmd.ba/api/upload', formNew, {
        //    //const response = await axios.put('http://localhost:5000/api/upload', formNew, {
        //     // const response = await axios.put('https://prodexproba.onrender.com/api/upload', formNew, {


        //       headers: {
        //         'Content-Type': 'multipart/form-data',
        //       },
        //     });

         if (process.env.NODE_ENV === 'production') {
               const response = await axios.put('https://prodexmd.ba/api/upload', formNew, {
            
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            } else {
                await axios.put('http://localhost:5000/api/upload', formNew, {

                 headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            }
             alert('Izmijenili ste prozivod: ' + product.name)
            //console.log('Upload successful:', response.data);
          } catch (error) {
            console.error('Upload failed:', error);
          }

            
    }

    function handleCategoryFilter(event){
        
        let category = event.target.value
        //setFilterParams({...filterParams, category: category})
      }

    const handleFileChange = (e) => {
         const selected = Array.from(e.target.files);
         setFiles(prev => [...prev, ...selected]);
      };

    function handleCatalog(event){
        let catalog = event.target.value
        setCatalog(catalog)
         
     }  

    return(
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4">
                    <h2 className="text-center mb-5">Prepravi Proizvod</h2>
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
                            <label className="col-sm-4 col-form-label">Prodex šifra:</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="serialNumber" defaultValue={initialData.serialNumber}></input>
                                <span className="text-danger">{validationErrors.serialNumber}</span>
                            </div>

                        </div>

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
                                <input className="form-control" name="price" type="number" step="0.01"
                                    defaultValue={initialData.price}/>
                                <span className="text-danger">{validationErrors.price}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Opis</label>
                            <div className="col-sm-8">
                                <textarea className="form-control" name="description" rows="4" defaultValue={initialData.description}/>
                                <span className="text-danger">{validationErrors.description}</span>
                            </div>
                        </div>                 

                        <div className="row mb-3">
                            <div className="offeset-sm-4 col-sm-8">
                                <img src={initialData.image1}
                                    width="150" alt="..."/>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Slika</label>
                            <div className="col-sm-8">
                                {/* <input className="form-control" type="file" name="image" onChange={handleFileChange}/> */}
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

                

                        {/* <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Created At</label>
                            <div className="offeset-sm-4 col-sm-8">
                                <input readOnly className="form-control-plaintext" 
                                    defaultValue={initialData.createdAt.slice(0,10)}/>
                            </div>
                        </div> */}

                        <div className="row">
                            <div className="offeset-sm-4 col-sm-4 d-grid">
                                <button type="submit" className="btn btn-primary">Sačuvaj</button>
                            </div>
                            <div className="col-sm-4 d-grid">
                                <Link className="btn btn-secondary" to='/admin/products' role="button">Poništi</Link>
                            </div>
                        </div>
                    </form>
                    }
                </div>
            </div> 
        </div>
    )
}