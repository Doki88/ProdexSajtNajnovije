const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
	{
		userType: String,
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		username: {
			type: String,
			// required: true,
			ref: 'User',
		},
		email: {
			type: String,
			required: true,
			ref: 'User',
		},
		orderItems: [
			{
				serialNumber: { type: String, required: false },
				name: { type: String, required: true },
				quantity: { type: Number, required: true },
				image1: { type: String, required: true },
				image2: { type: String, required: false },
				price: { type: Number, required: true },
				_id: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Product',
				},
			},
		],
		shippingAddress: {
			// address: { type: String, required: true },
			// city: { type: String, required: true },
			// postalCode: { type: String, required: true },
			// country: { type: String, required: true },
			address: { type: String },
			city: { type: String },
			postalCode: { type: String },
			country: { type: String },
		},
		shippingPrice: { type: Number, default: 0.0 },
		totalPrice: { type: Number, default: 0.0 },
		// subtotal: { type: Number, default: 0.0 },
		isDelivered: { type: Boolean, required: true, default: false },

		deliveredAt: {
			type: Date,
		},
		status: {
			type: String,
		},
	},
	
	{ timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
