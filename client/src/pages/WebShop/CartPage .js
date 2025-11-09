import React, { useContext } from "react";
import { AppContext } from "../../AppContext";
import { Link } from "react-router-dom";
import "../../styles/webshop/cartpage.css"; // optional if you want styles

const CartPage = () => {
  
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

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h2>Vaša korpa je prazna 🛒</h2>
        <Link to="/webshopproducts" className="continue-shopping">↩ Nastavi kupovinu</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Vaša korpa</h2>

      <table className="cart-table">
        <thead>
          <tr>
            <th>Proizvod</th>
            <th>Cijena</th>
            <th>Količina</th>
            <th>Ukupno</th>
          
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item._id}>
              <td>
                <div className="cart-product-info">
                  <img src={item.image1} alt={item.name} />
                  <span>{item.name}</span>
                </div>
              </td>
              <td>{item.price > 0 ? `${item.price} KM` : "Cijena po upitu"}</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={e => handleQuantityChange(item._id, parseInt(e.target.value))}
                />
              </td>
              <td>
                {item.price > 0
                  ? `${(item.price * item.quantity).toFixed(2)} KM`
                  : "N/A"}
              </td>
              <td>
                <button onClick={() => removeFromCart(item._id)}>Ukloni</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-summary">
        <h3>Ukupno: {totalPrice.toFixed(2)} KM</h3>
          <Link to={userCredentials ? "/checkout-logged-in" : "/checkout"}>
              <button className="checkout-button">Nastavi na plaćanje</button>
        </Link>
      </div>

      <Link to="/webshopproducts" className="continue-shopping">↩ Nastavi kupovinu</Link>
    </div>
  );
};

export default CartPage;
