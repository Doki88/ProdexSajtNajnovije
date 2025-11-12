import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../AppContext";
import { Link } from "react-router-dom";
import "../../../styles/webshop/account.css";  
 

const Orders = () => {
  
  const { userCredentials } = useContext(AppContext);
  const { cartItems, removeFromCart, setCartItems } = useContext(AppContext);
  const [orders, setOrders] = useState([])
  
   
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(prev =>
      prev.map(item =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };


  function getOrders(){

        let url = '';

        if (process.env.NODE_ENV === 'production') {
            url = `https://prodexmd.ba/api/orders/getOrdersByEmail`;
        } else {
             url = `http://localhost:5000/api/orders/getOrdersByEmail`;
        }
 
        fetch(url, {
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

           // console.log("API data received:", data)
           
           

            setOrders(data);

            console.log('orders:')
            console.log(orders)
            
            // setCurrentPage(data.pagination.currentPage)
            // setTotalPages(data.pagination.totalPages)
        })
        .catch(error => {
            alert("Unable to get the data now" + error )
        })
  }

  useEffect(getOrders, []);
  
  return (
    <>
        <div className="cart-container">
        <h2 className="account-title">Dosadašnje Porudžbine</h2>
        
         <table className="cart-table">
            <thead>
                <tr>
                    <th>ID porudžbine	</th>
                    <th>Klijent</th>
                    <th>Broj proizvoda	</th>
                    <th>Status</th>
                    <th>Ukupno</th>
                    <th>Datum</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => (
                     <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user?.companyName || 'N/A'}</td>
                        <td>{order.orderItems?.length || 0}</td>
                        <td>{order.status || "U obradi"}</td>
                        <td>{order.totalPrice?.toFixed(2) || "0.00"} KM</td>
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>
                            <Link className="btn btn-primary btn-sm me-1" to={"/orders/view/" + order._id}>Prikaži</Link>
                        </td>
                     </tr>
                ))}
            </tbody>
      </table>   

        </div>

        


    </>
  );
};

export default Orders;
