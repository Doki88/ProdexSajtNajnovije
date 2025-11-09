const express = require('express');
const asyncHandler = require('express-async-handler');
const Catalog = require('../models/Catalog.js');
const Product = require('../models/Product.js');
require('fs')
const multer = require('multer');
const path = require('path');

let pathForImage = ''

if(process.env.NODE_ENV === 'production'){
  pathForImage = '/home/prodexdo/prodexmd.ba/images/catalogs'
} else {
  //pathForImage =  '\client/public/images/rezervniDijelovi/vesmasine'
  pathForImage =  '\client/public/images/catalogs'

}

// setup storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, pathForImage),
  filename: (req, file, cb) => {
    const uniqueName = file.originalname;
    cb(null, uniqueName);
  }
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     try {
//       const catalogName = req.body.name;
//       if (!catalogName) throw new Error("Missing catalogName in form data");

//       const safeCatalogName = catalogName.replace(/[^a-z0-9_\-]/gi, '_'); // sanitize
//       const basePath = path.join(__dirname, '..', 'client', 'public', 'images', 'catalogs');
//       const dynamicPath = path.join(basePath, safeCatalogName);

//       fs.mkdirSync(dynamicPath, { recursive: true });
//       cb(null, dynamicPath);
//     } catch (err) {
//       console.error(err);
//       cb(new Error('Failed to create directory based on catalog name'), null);
//     }
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   }
// });
const upload = multer({ storage });

const catalogRoutes = express.Router();

 catalogRoutes.get('/admin', asyncHandler(async (req, res) => {
    const {
        page = 1,
        perPage = 10,
        search = ""
       
    } = req.query;

    //console.log('evo searcha baja:'+search)
    const query = {};

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } }
        ];
    }
 

    const totalCount = await Catalog.countDocuments();

    const catalogs = await Catalog.find(query)
        .populate('catalogs')
        .skip((page - 1) * perPage)
        .limit(parseInt(perPage));

    res.json({
        catalogs,
        pagination: {
            currentPage: parseInt(page),
            perPage: parseInt(perPage),
            totalPages: Math.ceil(totalCount / perPage),
            totalItems: totalCount
        }
    });
}));
// catalogRoutes.get('/', asyncHandler(async (req, res) => {

 
//     // Get all catalogs
//     const allCatalogs = await Catalog.find({});

   
//     const childIds = new Set(allCatalogs.flatMap(c => c.catalogs.map(id => id.toString())));
   
//     // Root catalogs = not children of any other
//     const rootCatalogs = allCatalogs.filter(c => !childIds.has(c._id.toString()));
    
//     // Recursively populate subcatalogs
//     const populatedRoots = await Promise.all(rootCatalogs.map(c => populateCatalogTree(c)));
     

//     res.json({ catalogs: populatedRoots });
// }));

// // Helper function
// async function populateCatalogTree(catalog) {
//   await catalog.populate('catalogs'); // populate 1st level
//   for (let i = 0; i < catalog.catalogs.length; i++) {
//     catalog.catalogs[i] = await populateCatalogTree(catalog.catalogs[i]); // Recursively populate deeper levels
//   }
//   return catalog;
// }

// catalogRoutes.get('/', asyncHandler(async (req, res) => {
//   const allCatalogs = await Catalog.find({}).lean();

//   const childIds = new Set(allCatalogs.flatMap(c => c.catalogs.map(id => id.toString())));

//   const rootCatalogs = allCatalogs.filter(c => !childIds.has(c._id.toString()));

//   res.json({ catalogs: rootCatalogs });
// }));

// catalogRoutes.js
catalogRoutes.get('/', asyncHandler(async (req, res) => {

  //console.log('ovo gadjam sad')
   
  const catalogs = await Catalog.find({});

  // Get all catalog IDs that are used as children
  const childIds = new Set(catalogs.flatMap(c => c.catalogs.map(id => id.toString())));

  const rootCatalogs = catalogs.filter(c => !childIds.has(c._id.toString()));

  // Add hasChildren info to each catalog
  const catalogsWithChildren = rootCatalogs.map(catalog => ({
    ...catalog.toObject(),
    hasChildren: catalog.catalogs.length > 0,
  }));

  res.json({ catalogs: catalogsWithChildren });
}));


catalogRoutes.get('/:id/children', asyncHandler(async (req, res) => {
  // console.log('Pogodio sam ovo')
  const parentId = req.params.id;

  const catalog = await Catalog.findById(parentId).populate('catalogs').lean();

  if (!catalog) {
    return res.status(404).json({ message: 'Catalog not found' });
  }

  const children = catalog.catalogs || [];

  const childrenWithFlags = children.map(c => ({
    ...c,
    hasChildren: (c.catalogs && c.catalogs.length > 0)
  }));

  res.json({ children: childrenWithFlags });
}));


catalogRoutes.get('/leaves', asyncHandler(async (req, res) => {
  //console.log('evo me')
  // Find catalogs that do not have subcatalogs (leaf nodes)
  const leafCatalogs = await Catalog.find({ $or: [{ catalogs: { $exists: false } }, { catalogs: { $size: 0 } }] });

  res.json(leafCatalogs);
}));


// protected route
// catalogRoutes.post('/', upload.single('image'), async (req, res) => {
 
//   const { name, imagename, catalogNames } = req.body;

//   const catalogNamesArray = JSON.parse(catalogNames);


  
//   const image = "/images/catalogs/" + imagename

//   const catalogs = []

//   catalogNamesArray.forEach(async catalogName => {
//     const catalog = await Catalog.findOne({ name: catalogName });  
//     console.log('ovo je katalog:'+catalog)
//     catalogs.push(catalog);
       

//   });

// //   const imageUrl = `/uploads/${req.file.filename}`;
//  console.log('ovo su katalozi moji:'+catalogs)
  

//   const catalog = new Catalog({ name, image, catalogs });
   
//   await catalog.save();

//   res.status(201).json(catalog);
// });
// protected route

catalogRoutes.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, imagename, catalogNames } = req.body;
    const catalogNamesArray = JSON.parse(catalogNames);

    const image = `/images/catalogs/${imagename}`;


    // Use Promise.all to wait for all async operations
    const catalogs = await Promise.all(
      catalogNamesArray.map(async (catalogName) => {
        const catalog = await Catalog.findOne({ name: catalogName });
        return catalog;
      })
    );

    const catalog = new Catalog({ name, image, catalogs });
    await catalog.save();

    res.status(201).json(catalog);
  } catch (error) {
    console.error('Error saving catalog:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// In catalogRoutes.js
catalogRoutes.get('/search', asyncHandler(async (req, res) => {
  const { q } = req.query;
  const catalogs = await Catalog.find({ name: new RegExp(q, 'i') }).limit(10);
  res.json(catalogs);
}));


// catalogRoutes.put('/:id', upload.single('image'), asyncHandler(async (req, res) => {
//   try {
//     const { name, imagename, catalogNames } = req.body;

    
//     const catalogNamesArray = JSON.parse(catalogNames);

//     // Find the catalog to update
//     const catalog = await Catalog.findById(req.params.id);
//     if (!catalog) {
//       res.status(404);
//       throw new Error('Catalog not found');
//     }

//     // Update fields
//     catalog.name = name || catalog.name;

//     // Only update image if a new one is uploaded
//     if (req.file) {
//       catalog.image = `/images/catalogs/${imagename}`;
//     }

//     // Resolve subcatalog references
//     const catalogs = await Promise.all(
//       catalogNamesArray.map(async (catalogName) => {
//         const sub = await Catalog.findOne({ name: catalogName });
//         return sub;
//       })
//     );

//     const newCatalogs = catalogs.filter(Boolean);

//     // Get current catalog IDs to avoid duplicates
//     const existingIds = catalog.catalogs.map(id => id.toString());
//     const newUniqueCatalogs = newCatalogs.filter(sub => !existingIds.includes(sub._id.toString()));

//     // Append only unique new catalogs
//     catalog.catalogs = [...catalog.catalogs, ...newUniqueCatalogs];

//     await catalog.save();

//     res.json(catalog);
//   } catch (error) {
//     console.error('Error updating catalog:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// }));

catalogRoutes.put('/:id', upload.single('image'), asyncHandler(async (req, res) => {
  try {
    const { name, imagename, catalogNames } = req.body;
    const catalogNamesArray = JSON.parse(catalogNames);

    // 📌 Fetch catalog first
    const catalog = await Catalog.findById(req.params.id);
    if (!catalog) {
      res.status(404);
      throw new Error('Catalog not found');
    }

    // ✅ Extract OLD name before updating
    const oldFullName = catalog.name.trim();
    const oldNameWithoutPrefix = stripPrefix(oldFullName);

    // ✅ Extract NEW name (from request) and its no-prefix version
    const newFullName = name.trim(); // e.g. "46)Prenaponske..."
    const newNameWithoutPrefix = stripPrefix(newFullName); // e.g. "Prenaponske..."

    // ✅ Update catalog name and image
    catalog.name = newFullName;

    if (req.file) {
      catalog.image = `/images/catalogs/${imagename}`;
    }

    // ✅ Update subcatalog references
    const catalogs = await Promise.all(
      catalogNamesArray.map(async (catalogName) => {
        return await Catalog.findOne({ name: catalogName });
      })
    );

    const newCatalogs = catalogs.filter(Boolean);
    const existingIds = catalog.catalogs.map(id => id.toString());
    const newUniqueCatalogs = newCatalogs.filter(sub => !existingIds.includes(sub._id.toString()));
    catalog.catalogs = [...catalog.catalogs, ...newUniqueCatalogs];

    await catalog.save();

    // ✅ Update products that have the old name WITHOUT the prefix
    const escapedOldBrand = escapeRegExp(oldNameWithoutPrefix);
    const result = await Product.updateMany(
      { brand: new RegExp(`^${escapedOldBrand}$`, 'i') },
      { $set: { brand: newNameWithoutPrefix } }
    );

    console.log(`✅ Updated ${result.modifiedCount} products from '${oldNameWithoutPrefix}' to '${newNameWithoutPrefix}'`);

    res.json(catalog);
  } catch (error) {
    console.error('Error updating catalog:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}));


function stripPrefix(name) {
  // Remove leading numbers + ) + optional space (e.g. "45) " or "123)")
  return name.replace(/^\d+\)\s*/, '').trim();
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


const getCatalog = asyncHandler(async (req, res) => {

  

  const catalog = await Catalog.findById(req.params.id).populate('catalogs');  

   
  
  if (catalog) {
    res.json(catalog);
  } else {
    res.status(404);
    throw new Error('Catalog not found');
  }
});


const deleteCatalog = asyncHandler(async (req, res) => {

  const catalog = await Catalog.findById(req.params.id);

  if (catalog) {
    await catalog.deleteOne();
    res.json({ message: 'Catalog removed' });
  } else {
    res.status(404);
    throw new Error('Catalog not found');
  }
});

catalogRoutes.route('/:id').delete(deleteCatalog);
catalogRoutes.route('/:id').get(getCatalog);

module.exports = catalogRoutes;
 