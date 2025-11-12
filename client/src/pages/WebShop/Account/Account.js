import React, { useContext } from "react";
import { AppContext } from "../../../AppContext";
import { Link } from "react-router-dom";
import "../../../styles/webshop/account.css";  
 

const Account = () => {
  
  const { userCredentials } = useContext(AppContext);
  const { cartItems, removeFromCart, setCartItems } = useContext(AppContext);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(prev =>
      prev.map(item =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    if (item.price > 0) {
      return sum + item.price * item.quantity;
    }
    return sum;
  }, 0);

  // if (cartItems.length === 0) {
  //   return (
  //     <div className="cart-container">
  //       <h2>Vaša korpa je prazna 🛒</h2>
  //       <Link to="/webshopproducts" className="continue-shopping">↩ Nastavi kupovinu</Link>
  //     </div>
  //   );
  // }

  return (
    <>
        <div className="cart-container">
        <h2 className="account-title">Moj nalog</h2>
        
          <Link to="/editaccount">
                <p>Izmijenite informacije o svom nalogu</p> 
            </Link>
            
            <Link to={userCredentials ? "/checkout-logged-in" : "/checkout"}>
                <p>Promijenite lozinku</p> 
            </Link>

        </div>

        <div className="cart-container">
            <h2 className="account-title">Moje porudžbine</h2>
            
                <Link to="/myorders">
                    <p>Pogledajte Vaše dosadašnje porudžbine</p> 
                </Link>
                
                 

       </div>


    </>
  );
};

export default Account;
