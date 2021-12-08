 const Product = require('../models/product')
 const slugify = require('slugify')



 exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    // res.status(400).send("Create product failed");
    res.status(400).json({
      err: err.message,
    });
  }
};


exports.list = async (req, res) => {
  // try {
  //   const products = await Product.find({})
  //   .limit(parseInt(req.params.count))
  //   .populate("category")
  //   .populate("subs").sort([["createdAt", "desc"]]).exec()
  //   if(!products) return res.status(400).json({
  //     msg:'products not found'
  //   })
  //   res.status(200).json(products);
    
  // } catch (err) {
  //   return res.status(500).json({msg: err.message})
  // }
  let products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};
 


exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.staus(400).send("Product delete failed");
  }
}


exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subs")
    .exec();
  res.json(product);
};


exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    if (!updated) return res.status(400).json({ msg: 'product already updated' })
    res.json({
      updated: updated
    })
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};