import React, { useState } from "react";
import "../../styles/webshop/checkoutpage.css"; // optional if you want styles
import { AppContext } from "../../AppContext";
import { useContext } from "react";



const CheckoutPage = () => {

  const { cartItems } = useContext(AppContext);



  const [formData, setFormData] = useState({
    ime: "",
    prezime: "",
    email: "",
    adresa: "",
    telefon: "",
    placanje: "pouzecem", // default selection
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!formData.ime || !formData.prezime || !formData.email || !formData.adresa || !formData.telefon) {
        setMessage({ type: "error", text: "Molimo vas da popunite sva polja." });
        setLoading(false);
        return;
    }

 
    try {
      //const response = await fetch("http://localhost:5000/api/orders/send-email", {
      const response = await fetch("https://prodexmd.ba/api/orders/send-email", {              

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, cartItems }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Kupovina je potvrđena! Provjerite svoj email." });
         
        setFormData({
          ime: "",
          prezime: "",
          email: "",
          adresa: "",
          telefon: "",
          placanje: "pouzecem",
        });
      } else {
        setMessage({ type: "error", text: data.message || "Došlo je do greške." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Greška prilikom slanja podataka. Pokušajte kasnije." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Podaci za kupovinu</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Ime:
          <input
            type="text"
            name="ime"
            value={formData.ime}
            onChange={handleChange}
            
          />
        </label>
        <label>
          Prezime:
          <input
            type="text"
            name="prezime"
            value={formData.prezime}
            onChange={handleChange}
            
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            
          />
        </label>
        <label>
          Adresa:
          <input
            type="text"
            name="adresa"
            value={formData.adresa}
            onChange={handleChange}
            
          />
        </label>
        <label>
          Broj telefona:
          <input
            type="tel"
            name="telefon"
            value={formData.telefon}
            onChange={handleChange}
            
          />
        </label>

        <div>
          <p>Način plaćanja:</p>
          <label>
            <input
              type="radio"
              name="placanje"
              value="pouzecem"
              checked={formData.placanje === "pouzecem"}
              onChange={handleChange}
            />
            Plaćanje pouzećem
          </label>
          <label>
            <input
              type="radio"
              name="placanje"
              value="ziro"
              checked={formData.placanje === "ziro"}
              onChange={handleChange}
            />
            Plaćanje na žiro račun
          </label>
        </div>

         <button type="submit" disabled={loading}>
          {loading ? "Slanje..." : "Potvrdi kupovinu"}
        </button>

        {message && (
            <div className={`checkout-message ${message.type}`}>
                {message.text}
            </div>
        )}

      </form>
    </div>
  );
};

export default CheckoutPage;
