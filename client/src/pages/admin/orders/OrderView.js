import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../styles/orders/orderView.css"; // Make sure this matches your folder structure

export default function OrderView() {
  const params = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOrder();
  }, []);

  function getOrder() {
    fetch("https://prodexmd.ba/api/orders/" + params.id)
    //fetch("http://localhost:5000/api/orders/" + params.id)
   
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error();
      })
      .then(data => {
        setOrder(data);
      })
      .catch(error => {
        alert("Unable to read the order details");
        console.error(error);
      });
  }

  if (!order) return <div>Loading...</div>;

  return (
    <div className="container my-4 order-view">
      <h2 className="mb-4">Porudžbina</h2>

      <div className="mb-3">
        <strong>Kupac:</strong> {order.email}
      </div>

      <div className="mb-4">
        <strong>Datum porudžbine:</strong>{" "}
        {new Date(order.createdAt).toLocaleString("sr-RS")}
      </div>

      <h4>Stavke porudžbine</h4>
      <table className="table table-bordered table-striped order-items-table">
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Količina</th>
            <th>Cijena</th>
          </tr>
        </thead>
        <tbody>
          {order.orderItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price.toFixed(2)} KM</td>
            </tr>
          ))}
        </tbody>
      </table>

       <div className="mb-3">
        <strong>Ukupno:</strong> {order.totalPrice}
      </div>
    </div>
  );
}
