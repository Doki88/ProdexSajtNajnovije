const express = require("express");
const sendOrderEmail = require("../utils/sendOrderEmail");
const sendOrderEmailToProdex = require("../utils/sendOrderEmailToProdex");
const asyncHandler = require('express-async-handler')
const Order = require('../models/Order.js')
const { admin, protectRoute } = require('../middleware/authMiddleware.js')

const orderRoutes = express.Router();


orderRoutes.post("/send-email", async (req, res) => {
   
  const { ime, prezime, email, adresa, telefon, placanje, cartItems } = req.body;


  if (!ime || !prezime || !email || !adresa || !telefon || !placanje || !cartItems || cartItems.length === 0) {
    return res.status(400).json({ message: "Nedostaju podaci o kupcu ili proizvodima." });
  }

  try {
    await sendOrderEmail({
		 ime: ime,
		 prezime: prezime,
		 email: email,
		 adresa: adresa,
		 telefon: telefon,
		 placanje: placanje,
		 cartItems: cartItems 
	 });
     await sendOrderEmailToProdex({
		 ime: ime,
		 prezime: prezime,
		 email: email,
		 adresa: adresa,
		 telefon: telefon,
		 placanje: placanje,
		 cartItems: cartItems
	 });
    res.json({ message: "Email je poslan uspješno" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Greška prilikom slanja emaila." });
  }
});

// const sendEmail = async (req, res) => {
// 	const { ime, prezime, email, adresa, telefon, placanje, cartItems } = req.body;


//   if (!ime || !prezime || !email || !adresa || !telefon || !placanje || !cartItems || cartItems.length === 0) {
//     return res.status(400).json({ message: "Nedostaju podaci o kupcu ili proizvodima." });
//   }

//   try {
//     await sendOrderEmail({ ime, prezime, email, adresa, telefon, placanje, cartItems });
//      await sendOrderEmailToProdex({ ime, prezime, email, adresa, telefon, placanje, cartItems });
//     res.json({ message: "Email je poslan uspješno" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Greška prilikom slanja emaila." });
//   }
// };

const getOrders = async (req, res) => {
	const orders = await Order.find({});
	res.json(orders);
};

const getOrdersByEmail = async (req, res) => {
	console.log('ev me rodjace')
	try {
		const userEmail = req.user.email; 

		const orders = await Order.find({ email: userEmail })
			.populate("user", "companyName");


		res.json(orders);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};


const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
	res.json(order);
  } else {
	res.status(404);
	throw new Error('Order not found');
  }
});

const deleteOrder = asyncHandler(async (req, res) => {
	const order = await Order.findByIdAndDelete(req.params.id);

	if (order) {
		res.json(order);
	} else {
		res.status(404).send('Order not found.');
		throw new Error('Order not found.');
	}
});

const setDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isDelivered = true;
		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404).send('Order could not be uploaded.');
		throw new Error('Order could not be updated.');
	}
});

const createOrder = async (req, res) => {

    
	const data = req.body;
//   console.log(data.cartItems)

  const totalPrice = Number(
		data.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
   );
 
	const order = new Order({
		orderItems: data.cartItems,
		user: data.userInfo._id,
		// username: data.userInfo.name,
		email: data.userInfo.email,
		serialNumber: data.serialNumber,
		//shippingAddress: data.shippingAddress,
		//shippingPrice: data.shipping,
		//subtotal: data.subtotal,
		//totalPrice: Number(data.subtotal + data.shipping).toFixed(2),
		totalPrice: totalPrice
	});

	const newOrder = await order.save();

	try {


		//   console.log('evo me sad ovdi')
		//   console.log(data.userInfo)
		if(data.userInfo.role === 'fizicko'){
			await sendOrderEmail({
				ime: data.userInfo.firstname,
				prezime: data.userInfo.lastname,
				email: data.userInfo.email,
				adresa: data.userInfo.address,
				telefon: data.userInfo.phoneNumber,
				placanje: data.paymentMethod,
				cartItems: data.cartItems 
			});
			await sendOrderEmailToProdex({
				ime: data.userInfo.firstname,
				prezime: data.userInfo.lastname,
				email: data.userInfo.email,
				adresa: data.userInfo.address,
				telefon: data.userInfo.phoneNumber,
				placanje: data.paymentMethod,
				cartItems: data.cartItems
			});
		} else if(data.userInfo.role === 'kompanija'){
				await sendOrderEmail({
				kompanija: data.userInfo.companyName,
				email: data.userInfo.email,
				adresa: data.userInfo.address,
				telefon: data.userInfo.phoneNumber,
				placanje: data.paymentMethod,
				cartItems: data.cartItems 
				});
				//console.log('poslao sam')

				await sendOrderEmailToProdex({
					kompanija: data.userInfo.companyName,
					email: data.userInfo.email,
					adresa: data.userInfo.address,
					telefon: data.userInfo.phoneNumber,
					placanje: data.paymentMethod,
					cartItems: data.cartItems
				});
		}
    res.json({ message: "Email je poslat uspješno" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Greška prilikom slanja emaila." });
  }

	// res.send(
	// 	JSON.stringify({
	// 		orderId: newOrder._id.toString(),
	// 		// url: session.url,
	// 	})
	// );
};

orderRoutes.route('/').get(protectRoute, admin, getOrders);
orderRoutes.route('/getOrdersByEmail').get(protectRoute, getOrdersByEmail);
orderRoutes.route('/:id').put(protectRoute, admin, setDelivered);
orderRoutes.route('/:id').delete(protectRoute, admin, deleteOrder);
orderRoutes.route('/').post(protectRoute, createOrder);
orderRoutes.route('/:id').get(getOrder);

//orderRoutes.route('/send-email').post(protectRoute, sendEmail);



module.exports = orderRoutes;
