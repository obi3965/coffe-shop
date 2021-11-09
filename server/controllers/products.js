const Product = require("../models/products");
const cloudinary = require("cloudinary").v2;
const tryCatchError = require("../middleware/tryCatchError");
const ApiFeatures = require("../util/apiFeature");
const ErrorHandler = require("../util/errorHandler");


// create products in admin
exports.create = tryCatchError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  })
});


//update the product in admin
exports.update = tryCatchError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
      return next(new ErrorHandler('Product not found', 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
});
  res.status(201).json(product);
});


//delete the product
exports.remove = tryCatchError( async (req, res,next) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if(!product){
      return next( ErrorHandler('product is not deleted', 401))
    }
    res.status(200).json({
      success:true,
      product,
      message:'you have deleted the products'
    });   
  
});


//get product by id
exports.read = tryCatchError (  async (req, res) => {
  const id = req.params.id;

    const product = await Product.findById(id);
    if(!product){
      return next(new ErrorHandler('product not found', 404))
    }
    res.status(200).json({
      success:true,
      product,
    });
  
});


//get all products in admin
exports.getAdminProduct= tryCatchError ( async(req, res) => {
  const adminProducts = await Product.find()
    res.status(200).json({
      success:true,
      count:adminProducts.length,
      adminProducts
    });
  
   
})  ;

exports.allProducts = tryCatchError(async (req, res, next) => {
  const resPerPage = 8
  
  const productsCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
  .search()
  .filter()
  .pagination(resPerPage)

     let products = await apiFeatures.query;
      res.status(200).json({
        count:products.lenght,
        productsCount,
        products
      });
    
      
    
  }) 

