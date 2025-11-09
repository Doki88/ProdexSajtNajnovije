 const mongoose = require('mongoose')

const catalogSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
        categories: {
            type: Array,
            required: true,
        },
        // catalogs: {
        //     type: Array,
        //     required: true,
        // },
        catalogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Catalog'
            }]  

    },
    { timestamps: true }
);

const Catalog = mongoose.model('Catalog', catalogSchema);

 module.exports = Catalog;
