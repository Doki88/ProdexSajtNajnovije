import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/webshop/checkout.css"; // optional for styling
import { AppContext } from "../../AppContext";

const LoggedInCheckout = () => {
  const [paymentMethod, setPaymentMethod] = useState("pouzece");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);  
  const { userCredentials } = useContext(AppContext);
  const { cartItems } = useContext(AppContext);
  
 const handleConfirm = async (e) => {
    // Optional: Add form validation or send data to server here
    alert(`Izabrali ste: ${paymentMethod === "pouzece" ? "Plaćanje pouzećem" : "Plaćanje na žiro račun"}`);
    
    // Redirect or reset after confirmation
    //navigate("/order-confirmation"); // Make sure this route exists

     e.preventDefault();
    setLoading(true);
    setMessage(null);

    
    const token = userCredentials?.token

    const { _id, email, firstname, lastname, companyName, city, address, phoneNumber, role} = userCredentials || {};
      
     try {
      //const response = await fetch("http://localhost:5000/api/orders/", {  
      const response = await fetch("https://prodexmd.ba/api/orders/", {
        method: "POST",
          headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
         },
        body: JSON.stringify({ 
            cartItems: cartItems,
            userInfo: { _id, email, firstname, lastname, companyName, city, address, phoneNumber, role },
            paymentMethod: paymentMethod,

         }),
      });

     

      const data = await response.json();
      
      if (response.ok) {
        setMessage({ type: "success", text: "Ponuda je poslata. Provjerite vaš email." });      
        
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
      <h2>Način plaćanja</h2>

      <div className="payment-methods">
        <label>
          <input
            type="radio"
            value="pouzece"
            checked={paymentMethod === "pouzece"}
            onChange={() => setPaymentMethod("pouzece")}
          />
          Plaćanje pouzećem
        </label>


        <label>
          <input
            type="radio"
            value="ziro"
            checked={paymentMethod === "ziro"}
            onChange={() => setPaymentMethod("ziro")}
          />
          Plaćanje na žiro račun
        </label>
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

      <button className="confirm-button" onClick={handleConfirm}>
        Potvrdi kupovinu
      </button>
    </div>
  );
};

export default LoggedInCheckout;
