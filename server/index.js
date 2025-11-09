// const express = require('express')
// var cors = require('cors')

// var connectToDatabase = require('./db.js')

// var dotenv = require('dotenv')

// ///////////////
// const axios = require('axios');

// axios.get('https://api.ipify.org?format=json')
//   .then(response => {
//     console.log("Your server's public IP is:", response.data.ip);
//   })
//   .catch(error => {
//     console.error("Could not fetch IP:", error);
//   });



// ///////////////

// dotenv.config()

// connectToDatabase()
// const app = express()
// app.use(express.json())
// app.use(cors())


// const myRoutes = require('./routes/myroutes.js')

// // console.log('evo ih:'+myRoutes)

//  app.use('/api/products', myRoutes)


// const port = 5000

// app.get('/', (req, res) => {
//     res.send('Api is running...')
// })

// app.listen(port, () => {
//     console.log(`Server runs on port ${port}`)
// })

console.log('ziv sam')
const dotenv = require('dotenv')
dotenv.config()
const connectToDatabase = require('./db.js')
const express = require('express')
const cors = require('cors')
const path = require('path')
const Product = require('./models/Product.js')
const asyncHandler = require('express-async-handler')
const fs = require('fs')

 
//import fs from 'fs'
let pathForImage = ''
let deleteHelpPath = ''

if(process.env.NODE_ENV === 'production'){
  pathForImage = '/home/prodexdo/prodexmd.ba/images/products'
  deleteHelpPath = '/home/prodexdo/prodexmd.ba'

} else {
  pathForImage =  '\client/public/images/products'
   deleteHelpPath = '\client/public'

}
  //pathForImage =  '\client/public/images/products'

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, pathForImage)
    },
    filename: function (req, file, cb) {
     
      cb(null, file.originalname)
    }
  })
const upload = multer({ storage })

 
 

//Routes
 
const productRoutes = require('./routes/productRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const catalogRoutes = require('./routes/catalogRoutes.js')
const orderRoutes = require('./routes/orderRoutes.js')


connectToDatabase()
const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/catalogs', catalogRoutes)
app.use('/api/orders', orderRoutes)

// localhost: 5000/api/products

const port = 5000;

// const __dirname = path.resolve();

// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// if(process.env.NODE_ENV == 'production'){
//     app.use(express.static(path.join(__dirname, "/client/build")))
   
//     app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
// }


app.get('/', (req, res) =>{
    res.send('APi is running...')
})

app.listen(port, () => {
    console.log(`Server runs on port ${port}`)
}) 

 //app.post('/api/upload', upload.single('image'), asyncHandler(async (req, res) => {
  app.post('/api/upload', upload.array('images', 10), asyncHandler(async (req, res) => {

    // console.log(req.body)
    // console.log(req.image)
    console.log('pogodio sam')

       const name = req.body.name;
       const brand = req.body.brand;
       //const category = req.body.category;
       const price = parseFloat(req.body.price);
       const description = req.body.description;
       const serialNumber = req.body.serialNumber;
       //const imageName = req.body.imagename;

       //let image1 = "/images/products/" + imageName

       //console.log("evo slike: " + image1)

       
   
    //    console.log("brand"+brand)
    //    console.log("name"+name)
    //    console.log("price"+price)
    //    console.log("serialNumber"+serialNumber)
    //    console.log("imagename"+imagename)

       let imagePaths = [];

        if (req.files && req.files.length > 0) {
            imagePaths = req.files.map(file => "/images/products/" + file.originalname);
        } 
        // else {
        //     return res.status(400).json({ message: "No images uploaded" });
        // }
    
       const newProduct = await Product.create({
            brand,
            name,
            price,
            serialNumber,
            image1: imagePaths[0],  
            image2: imagePaths[1],  
            description,
        });
        await newProduct.save();
    
        const products = await Product.find({});
    
        if (newProduct) {
            res.json(products);
        } else {
            res.status(404);
            throw new Error('Product could not be uploaded.');
        }
}))

app.put('/api/upload',  upload.array('images', 10), asyncHandler(async (req, res) => {

    console.log('ovde sam jarane')
 
     const name = req.body.name;
     const brand = req.body.brand;
     const category = req.body.category;
     const price = parseFloat(req.body.price);
     const description = req.body.description;
     const serialNumber = req.body.serialNumber;
     const proizvodJeNov = req.body.proizvodJeNov;
     const proizvodJeNaAkciji = req.body.proizvodJeNaAkciji;

     console.log('evo ga sade:')
     console.log(proizvodJeNaAkciji)

     //const imageName = req.body.imagename;
     const id = req.body.id;
 
    //  console.log('id:'+id +"\nname:"+name +"\nprice:"+price)
    //  console.log('image: ' +imageName)
 
  

   let imagePaths = [];

        if (req.files && req.files.length > 0) {
            imagePaths = req.files.map(file => "/images/products/" + file.originalname);
        } 
        
        // else {
        //     return res.status(400).json({ message: "No images uploaded" });
        // }
 
   
  const product = await Product.findById(id);

  //console.log('evo productica: ' + product)
 
  if (product) {

   

    // if(imagePaths){

    //   const  filePath  = ""

    //   if(process.env.NODE_ENV === 'production'){
    //    filePath = '/home/prodexdo/prodexmd.ba/images/products' 
    //   } else {
    //   //pathForImage =  '\client/public/images/rezervniDijelovi/vesmasine'
    //    filePath =  '\client/public/images/products'

    //   }

    //   //const  filePath  = "\client/public" + product.image1 

    //     fs.unlink(filePath, (err) => {
    //       if (err) {
    //           console.error(`Error removing file: ${err}`);
    //           return;
    //       }
    //       })
      
    //       console.log(`File ${filePath} has been successfully removed.`);
    //  }

    if (imagePaths.length > 0) {
     const imagesToDelete = [product.image1, product.image2];

     //console.log('evo i  njija: ' + imagesToDelete[0])

    for (const imgPath of imagesToDelete) {
    if (imgPath) {
        const isUsed = await IsImageUsedForOtherProducts(imgPath, id);
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
    }


   
  	product.name = name;
  	product.price = price;
  	product.description = description;
    product.serialNumber = serialNumber;
    product.brand = brand;
    product.proizvodJeNov = proizvodJeNov;
    product.proizvodJeNaAkciji = proizvodJeNaAkciji;

    if(imagePaths[0]){
        product.image1 = imagePaths[0];
    }

    if(imagePaths[1]){
        product.image2 = imagePaths[1];
    }

   	await product.save();
 
  	const products = await Product.find({});
 
  	res.json(products);
  } else {
  	res.status(404);
  	throw new Error('Product not found.');
  }


  
     
}))

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
