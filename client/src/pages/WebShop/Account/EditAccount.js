import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../../AppContext";
import axios from "axios";
// import "../../styles/webshop/checkout.css"; // optional for styling
 

const EditAccount = () => {
  const [paymentMethod, setPaymentMethod] = useState("pouzece");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);  
  const { userCredentials } = useContext(AppContext);
  const { cartItems } = useContext(AppContext);

   const { _id, email, firstname, lastname, companyName, city, address, phoneNumber, role} = userCredentials || {};

  console.log('evo kredenca:',userCredentials)
  
async function handleSubmit(event) {
  console.log('tuj sam bato!!!');
  event.preventDefault();
  setLoading(true);
  setMessage(null);

  const token = userCredentials?.token;
  const userId = userCredentials?._id;


  const formData = new FormData(event.target);
  const updatedData = Object.fromEntries(formData.entries());
  updatedData.id = userId;

  
   if(!address || ! city  || !phoneNumber){
                alert("Molimo vas da popunite sva polja!!!")
                return
        }
  try {
    const response = await axios.put(
      process.env.NODE_ENV === 'production'
        ? 'https://prodexmd.ba/api/users'
        : 'http://localhost:5000/api/users',
      updatedData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Optional if you're using auth
        },
      }
    );

    if (response.status === 200) {
      setMessage({ type: "success", text: "Informacije su uspješno sačuvane." });
    } else {
      setMessage({ type: "error", text: response.data.message || "Došlo je do greške." });
    }
  } catch (error) {
    console.error("Error:", error);
    setMessage({ type: "error", text: "Greška prilikom slanja podataka. Pokušajte kasnije." });
  } finally {
    setLoading(false);
  }
}


//  async function handleSubmit1(event){
//         console.log('tuj sam bato!!!')
//         event.preventDefault()
 
//         const formData = new FormData(event.target)

//         const product = Object.fromEntries(formData.entries())   

//         // console.log('evo producta:'+product)
//         // console.log(product)
       
//         const formNew = new FormData();
//         //formNew.append("image", file);
        
//         formNew.append("name", product.name);
       
//         formNew.append("price", product.price);
//         formNew.append("description", product.description);
//         formNew.append("serialNumber", product.serialNumber);
//         //formNew.append("id", productId);

//          if(!product.name || !product.price ||
//                 !product.serialNumber ){
//                 alert("Molimo vas da popunite sva obavezna polja!!!")
//                 return
//         }

//         try {
//          if (process.env.NODE_ENV === 'production') {
//                const response = await axios.put('https://prodexmd.ba/api/upload', formNew, {
            
//               headers: {
//                 'Content-Type': 'multipart/form-data',
//               },
//             });
//             } else {
//                 await axios.put('http://localhost:5000/api/upload', formNew, {

//                  headers: {
//                 'Content-Type': 'multipart/form-data',
//               },
//             });
//             }
//              alert('Izmijenili ste prozivod: ' + product.name)
//             //console.log('Upload successful:', response.data);
//           } catch (error) {
//             console.error('Upload failed:', error);
//           }

            
//     }

  return (
    <div className="checkout-container">
      <h2>Izmijenite informacije o svom nalogu</h2>

      <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Grad:</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="city" defaultValue={city}></input>
                               
                            </div>

                        </div>
               

                        
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Adresa:</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="address" defaultValue={address}></input>
                               
                            </div>

                        </div>

                         <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Broj telefona:</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="phoneNumber" defaultValue={phoneNumber}></input>
                               
                            </div>

                        </div>
                      

                        
                             {message && (
                            <div
                                className={`message ${message.type === "success" ? "success" : "error"}`}
                                style={{
                                padding: "10px",
                                marginBottom: "15px",
                                borderRadius: "5px",
                                backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da",
                                color: message.type === "success" ? "#155724" : "#721c24",
                                border: message.type === "success"
                                    ? "1px solid #c3e6cb"
                                    : "1px solid #f5c6cb",
                                }}
                            >
                                {message.text}
                            </div>
                            )}
                        
                        
                        <div className="row">
                            <div className="offeset-sm-4 col-sm-4 d-grid">
                                <button type="submit" className="btn btn-primary">Sačuvaj</button>
                            </div>
                            {/* <div className="col-sm-4 d-grid">
                                <Link className="btn btn-secondary" to='/admin/catalogs' role="button">Poništi</Link>
                            </div> */}
                        </div>
                    </form>

                    

            

      {/* <button className="confirm-button" onClick={handleConfirm}>
        Potvrdi kupovinu
      </button> */}
    </div>
  );
};

export default EditAccount;
