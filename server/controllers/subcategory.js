const SubCategory = require('../models/subcategory')
const slugify = require('slugify')



exports.create = async(req,res) =>{
  try {
    const { name, parent } = req.body;
    const subCategory = await SubCategory.findOne({name, parent})
    if(subCategory) return res.status(400).json({
      msg:'sub category already exist'
    })
    res.json(await new SubCategory({ name, parent, slug: slugify(name) }).save());
  } catch (err) {
    console.log("SUB CREATE ERR ----->", err);
   return res.status(500).json({msg:err.message});
  }
       
} 


exports.list = async (req, res) =>{ 
  try {
    const subs = await SubCategory.find().sort({ createdAt: -1 }).exec()
    res.json(subs)
  } catch (error) {
    res.status(400).send('sub category not found')
  }
}

exports.read = async (req, res) => {
  try {
     const sub = await SubCategory.findOne({ slug: req.params.slug }).exec();
  res.json(sub);
  } catch (err) {
    return res.status(500).json({err:'server error'});
  }
 

};

exports.update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Sub update failed");
  }
};

exports.remove = async (req, res) => {
    try {
      const deleted = await SubCategory.findOneAndDelete({ slug: req.params.slug });
      res.json(deleted);
    } catch (err) {
      res.status(400).send("sub Category delete failed");
    }
  };