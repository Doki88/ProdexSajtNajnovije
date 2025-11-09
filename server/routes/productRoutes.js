// // const express = require('express')
// // const Product = require('../models/Product.js')

 
// // const myRoutes = express.Router()

 
// // const serverRespond = async (req, res) => {

// //  	//  console.log('Pogodio sam')
// //     res.json("odgovor servera");
	 
// // };

// // const getProducts =  async (req,res) => {

    

// // 	// let products = []
       
// // 	// try {
// // 	// 	products = await Product.find({});
// // 	// } catch (error) {
// // 	// 	console.log('Ovo zajebava:' + error)
// // 	// 	res.json('problem je ovo izgleda');
		 
// // 	// }

// // 	let products = await Product.find({});
// // 	res.json({ products, pagination: {} });
	 
// // }

// // myRoutes.route('/serverRespond').get(serverRespond);
// // myRoutes.route('/').get(getProducts);

 
// // module.exports = myRoutes;
// const express = require('express')
// const Product = require('../models/Product.js')
// const asyncHandler = require('express-async-handler')
// // const fs = require('fs')


// // import multer from 'multer'
// // const storage = multer.diskStorage({
// //     destination: function (req, file, cb) {
// //       cb(null, '\client/public/images')
// //     },
// //     filename: function (req, file, cb) {
     
// //       cb(null, file.originalname)
// //     }
// //   })
// // const upload = multer({ storage })
 
 
// const productRoutes = express.Router()

// const getProducts =  async (req,res) => {

//     console.log('ovdje sam')
   
//     const page = parseInt(req.params.page); // 1, 2 or 3
// 	const perPage = parseInt(req.params.perPage); // 10
//     const sort = req.params.sort;
//     const order = req.params.order;
//     // const categoryAndBrand = req.params.categoryAndBrand;
//     const brand = req.params.brand;
//     const category = req.params.category;
//     const search = req.params.search;

//     // console.log('category:'+category)
//     console.log('search:'+search)
//     let products = []
//     try {
//         products = await Product.find({});
//     } catch (error) {
//          return;
//     }

	 

//     if(brand && brand!='all'){
//             products = products.filter((product) => product.brand == brand);
//     }

//     //napravicu da postoji kategorija "all" koja ce biti defaultna
//     //i onda cu ako je ta kategorija preskakati i necu filtrirati
//     //time sam postigao da ce mi category biti obvezno polje kao i brand
//     //i posle samo dodam search
//     if(category && category!='all'){
//             products = products.filter((product) => product.category == category);
         
//     }
//     // if(categoryAndBrand && categoryAndBrand != 'proba'){
//     //     let brand = categoryAndBrand.split("-")[0]
//     //     let category = categoryAndBrand.split("-")[1]
       
//     //     if(brand){
//     //         products = products.filter((product) => product.brand == brand);
//     //     }
    
//     //     if(category){
//     //         products = products.filter((product) => product.category == category);
//     //     }
//     // }
    
//     // if(sort && order){
//     //     products = _.orderBy(products, ['name'], ['asc']);  //verovatno treba da se promeni u sort i order da po njima sortira
//     // }

//     if(search){
       
//         // products =products.filter(function (el) {
//         //          return el.name.includes(search)  
//         //     }
//         // );
//         let result = [];
//         products.forEach(product => {
//             if (product.name.toLowerCase().includes(search.toLowerCase())) {
//                 result.push(product);
//             }
//         });
//         products.forEach(product => {
//             if (product.serialNumber.toLowerCase().startsWith(search.toLowerCase())) {
//                 result.push(product);
//             }
//         });

//         products = result;

//     }

//     // const filteredProducts = _.orderBy(products, ['name'], ['asc']);

// 	if (page && perPage) {
// 		const totalPages = Math.ceil(products.length / perPage);
// 		const startIndex = (page - 1) * perPage;
// 		const endIndex = startIndex + perPage;
// 		const paginatedProducts = products.slice(startIndex, endIndex);
// 		res.json({ products: paginatedProducts, pagination: { currentPage: page, totalPages } });
// 	} else {
// 		res.json({ products, pagination: {} });
// 	}
// }

// const getProduct = async (req, res) => {

//  	const product = await Product.findById(req.params.id);

// 	if (product) {
// 		res.json(product);
// 	} else {
// 		res.status(404);
// 		throw new Error('Product not found');
// 	}
// };

 

// const createNewProduct = asyncHandler(async (req, res) => {
//     const name = req.body.product.name;
//     const brand = req.body.product.brand;
//     const category = req.body.product.category;
//     const price = parseInt(req.body.product.price);
//     const description = req.body.product.description;
//     const serialNumber = req.body.product.serialNumber;
//     const file = req.body.product.file;

 
 
//     const newProduct = await Product.create({
//          brand,
//          name,
//          category,
//          price,
//          serialNumber,
//          // images: images,
//          description,
//      });
//      await newProduct.save();
 
//      const products = await Product.find({});
 
//      if (newProduct) {
//          res.json(products);
//      } else {
//          res.status(404);
//          throw new Error('Product could not be uploaded.');
//      }
//  });

//  const updateProduct = asyncHandler(async (req, res) => {
// 	//const { brand, name, category, stock, price, id, productIsNew, description } = req.body;
 
//     const name = req.body.name;
//     const brand = req.body.brand;
//     const category = req.body.category;
//     const price = parseFloat(req.body.price);
//     const description = req.body.description;
//     const serialNumber = req.body.serialNumber;
//     const imageName = req.body.imagename;
//     const id = req.body.id;

//     console.log('id:'+id +"\nname:"+name+"\nbrand:"+brand+"\ncategory:"+ category + "\ndescription:"+description+"\nserialNumber:"+serialNumber)

//     console.log('ovde sam')

//     // const  filePath  = "\client/public/images/rezervniDijelovi/vesmasine/proba.jpg" 

//     //     fs.unlink(filePath, (err) => {
//     // if (err) {
//     //     console.error(`Error removing file: ${err}`);
//     //     return;
//     // }
//     // })

//     // console.log(`File ${filePath} has been successfully removed.`);
// 	// const product = await Product.findById(id);

// 	// if (product) {
// 	// 	product.name = name;
// 	// 	product.price = price;
// 	// 	product.description = description;
// 	// 	product.brand = brand;
// 	// 	product.category = category;
	 

// 	//  	await product.save();

// 	// 	const products = await Product.find({});

// 	// 	res.json(products);
// 	// } else {
// 	// 	res.status(404);
// 	// 	throw new Error('Product not found.');
// 	// }
// });

//  const deleteProduct = asyncHandler(async (req, res) => {
// 	const product = await Product.findByIdAndDelete(req.params.id);

// 	if (product) {
// 		res.json(product);
// 	} else {
// 		res.status(404);
// 		throw new Error('Product not found');
// 	}
// });

 
// productRoutes.route('/:page/:perPage/:brand/:category/:search').get(getProducts);

// productRoutes.route('/:page/:perPage/:brand/:category').get(getProducts);
 
// productRoutes.route('/').get(getProducts);
// productRoutes.route('/:page/:perPage').get(getProducts);
 
// ///////// ne znam jel treba ovo
// productRoutes.route('/:page/:perPage/all').get(getProducts);

// ///////////

// productRoutes.route('/:id').get(getProduct);
// productRoutes.route('/').post(createNewProduct);
// productRoutes.route('/:id').delete(deleteProduct);
// productRoutes.route('/').put(updateProduct);

// module.exports = productRoutes;
const express = require('express');
const Product = require('../models/Product.js');
const asyncHandler = require('express-async-handler');
const { protectRoute } = require('../middleware/authMiddleware.js');

const fs = require('fs')
const path = require('path');
const { sendVerificationEmail1 } = require('../middleware/sendVerificationEmail1.js');

let deleteHelpPath = ''

if(process.env.NODE_ENV === 'production'){
  deleteHelpPath = '/home/prodexdo/prodexmd.ba'

} else {
   deleteHelpPath = '\client/public'
}

const productRoutes = express.Router();

// GET /api/products
// GET /api/products
productRoutes.get('/', asyncHandler(async (req, res) => {
    console.log('evo me u ovom getu');

    const {
        page = 1,
        perPage = 10,
        brand,
        category,
        search
    } = req.query;

    //console.log('evo i brendija: ' + perPage);

    const query = {};

    // Special cases for brands
    if (brand === 'Novo u ponudi') {
        query.proizvodJeNov = true;
    } 
    else if (brand === 'Roba na akciji') {
        query.proizvodJeNaAkciji = true;
    }
    else if (brand && brand !== 'all') {
        query.brand = brand;
    }

    // Category filtering
    if (category && category !== 'all') {
        query.category = category;
    }

    // Searching (case-insensitive)
    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { serialNumber: { $regex: '^' + search, $options: 'i' } }
        ];
    }

    let products;
    let totalCount;

    // Special case: Materijal za klimu
    if (brand === 'MATERIJAL ZA MONTAŽU I SERVIS KLIMA UREĐAJA I RASHLADNIH SISTEMA') {
        console.log('evo me boco')
          // Get all products of that brand, sorted by name (alphabetically)
            const allProducts = await Product.find
            ({ brand: 'MATERIJAL ZA MONTAŽU I SERVIS KLIMA UREĐAJA I RASHLADNIH SISTEMA' })
            .sort({ name: 1 });
            totalCount = allProducts.length;

            const startIndex = (page - 1) * perPage;
            const endIndex = startIndex + parseInt(perPage);

            // Slice the sorted array for pagination
    products = allProducts.slice(startIndex, endIndex);
    console.log('evo producata:')
    console.log(products)
    } else {
        // Normal paginated query
        totalCount = await Product.countDocuments(query);

        products = await Product.find(query)
            .skip((page - 1) * perPage)
            .limit(parseInt(perPage));
    }

    res.json({
        products,
        pagination: {
            currentPage: parseInt(page),
            perPage: parseInt(perPage),
            totalPages: Math.ceil(totalCount / perPage),
            totalItems: totalCount
        }
    });
}));



// GET /api/products
productRoutes.get('/filteredproducts', asyncHandler(async (req, res) => {
    //console.log('evo me u ovom getu od searcha')

     

    const {
        page = 1,
        perPage = 20,
        search
    } = req.query;

    // console.log('page ',page)
    // console.log('per page ',perPage)
    // console.log('search ',search)

    const query = {};
    // Searching (case-insensitive)
    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { serialNumber: { $regex: '^' + search, $options: 'i' } }
        ];
    }
 

    const totalCount = await Product.countDocuments(query);

    //const products1 = await Product.find(query)
    //console.log('evo proizvoda:')
    //console.log(products1)

    const products = await Product.find(query)
        .skip((page - 1) * perPage)
        .limit(parseInt(perPage));

    // console.log('evo proizvoda:')
    // console.log(products)

    res.json({
        products,
        pagination: {
            currentPage: parseInt(page),
            perPage: parseInt(perPage),
            totalPages: Math.ceil(totalCount / perPage),
            totalItems: totalCount
        }
    });
    
}));

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});



const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {

      const imagesToDelete = [product.image1, product.image2];
    
     
    
       for (const imgPath of imagesToDelete) {
          if (imgPath) {
              const isUsed = await IsImageUsedForOtherProducts(imgPath, req.params.id);
              const fullPath = path.join(deleteHelpPath, imgPath);
      
              console.log(`Checking image ${imgPath}, is used elsewhere: ${isUsed}`);
      
                  if (!isUsed) {
                      fs.unlink(fullPath, (err) => {
                          if (err) {
                              console.error(`Error removing file ${fullPath}: ${err}`);
                          } else {
                              console.log(`Successfully removed: ${fullPath}`);
                          }
                      });
                  } else {
                      console.log(`Image ${imgPath} is used by other products. Skipping delete.`);
                  }
              }
          }

    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

async function IsImageUsedForOtherProducts(imageName, currentProductId) {

   
     const products = await Product.find({
        _id: { $ne: currentProductId },
        $or: [
            { image1: imageName },
            { image2: imageName }
        ]
    });


    return products.length > 0;
}


productRoutes.route('/:id').delete(deleteProduct);
productRoutes.route('/:id').get(getProduct);

module.exports = productRoutes;
 