import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
 
import axios from "axios";
import { AppContext } from "../../../AppContext";


export default function UserDetails(){

     const params = useParams()

    const [initialData, setInitialData] = useState()
    const {userCredentials, setUserCredentials} = useContext(AppContext)

    function getUser(){
 
          const url = process.env.NODE_ENV === 'production'
          ? "https://prodexmd.ba/api/users/"
          : "http://localhost:5000/api/users/";
       
        fetch(url + params.id, {
            headers: {
                'Authorization': `Bearer ${userCredentials?.token}`,
            }
        })
         .then(response => {
                if(response.ok){
                    return response.json()
                }

                throw new Error()
            })
        .then(data => {
                // console.log('evo date:')
                // console.log(data)
                setInitialData(data)
            })
            .catch(error => {
                alert("Unable to read the product details")
            })
    }

  useEffect(getUser, [])
 
  return (
    <div className="container my-4">
        {!initialData ? (
        <p>Učitavanje...</p>
        ) : (
        <div className="col-md-8 mx-auto rounded border p-4">
    <h2 className="text-center mb-5">Podaci korisnika</h2>

    <div className="row mb-3">
        <label className="col-sm-4 col-form-label">Email:</label>
        <div className="col-sm-8">
        <input className="form-control" name="email" defaultValue={initialData.email} readOnly />
        </div>
    </div>

    {/* ✅ Show this only if role === 'fizicko' */}
    {initialData.role === 'fizicko' && (
        <>
        <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Ime:</label>
            <div className="col-sm-8">
            <input className="form-control" name="firstname" defaultValue={initialData.firstname} readOnly />
            </div>
        </div>

        <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Prezime:</label>
            <div className="col-sm-8">
            <input className="form-control" name="lastname" defaultValue={initialData.lastname} readOnly />
            </div>
        </div>
        </>
    )}

    {/* ✅ Show company name only if role === 'kompanija' */}
    {initialData.role === 'kompanija' && (
        <div className="row mb-3">
        <label className="col-sm-4 col-form-label">Naziv kompanije:</label>
        <div className="col-sm-8">
            <input className="form-control" name="companyname" defaultValue={initialData.companyName} readOnly />
        </div>
        </div>
    )}

    <div className="row mb-3">
        <label className="col-sm-4 col-form-label">Grad:</label>
        <div className="col-sm-8">
        <input className="form-control" name="city" defaultValue={initialData.city} readOnly />
        </div>
    </div>

    <div className="row mb-3">
        <label className="col-sm-4 col-form-label">Adresa:</label>
        <div className="col-sm-8">
        <textarea className="form-control" name="address" rows="4" defaultValue={initialData.address} readOnly />
        </div>
    </div>

    <div className="row mb-3">
        <label className="col-sm-4 col-form-label">Broj telefona:</label>
        <div className="col-sm-8">
        <textarea className="form-control" name="phoneNumber" rows="4" defaultValue={initialData.phoneNumber} readOnly />
        </div>
    </div>

    <div className="row">
        <div className="col-sm-4 d-grid">
        <Link className="btn btn-secondary" to='/admin/users' role="button">Nazad</Link>
        </div>
    </div>
    </div>

    )}
  </div>
);

}