 const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		image1: {
			type: String,
			required: false,
		},
		image2: {
			type: String,
			required: false,
			 
		},
		brand: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: false,
		},
		price: {
			type: Number,
			required: true,
		},
        subtitle: {
            type: String
        },
        description: {
            type: String,
        },
		stock: {
			type: Number,
			//required: true,
		},
		productIsNew: {
			type: Boolean,
			//required: true,
		},
		proizvodJeNov: {
			type: Boolean,
			//required: true,
		},
		proizvodJeNaAkciji: {
			type: Boolean,
			//required: true,
		},
		serialNumber: {
			type: String,
		},
		catalogNumber: {
			type: String,
		},

	},
	{ timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

 module.exports = Product;
