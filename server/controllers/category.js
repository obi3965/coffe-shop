const Category = require('../models/category')
const slugify = require('slugify')



exports.create = async(req,res) =>{
    try {
        const { name } = req.body;
        const category = await Category.findOne({name })
        if(category) return res.status(400).json({msg:"this category already exist"})
        const newCategory = new Category({ name, slug: slugify(name) });
        const categorySaved = await newCategory.save()
        res.status(201).json(categorySaved);
        
      } catch (err) {
        return res.status(500).json({msg: err.message})
      }
       
       
} 


exports.list = async (req, res) =>{ 
  try {
    const lists = await Category.find().sort({ createdAt: -1 }).exec()
    if(!lists){
      return res.status(400).json({msg:'categories not found'})
    }
    res.json(lists)
  } catch (error) {
   return res.status(500).json({msg:err.message})
  }
}

exports.read = async (req, res) => {
  try {
    let category = await Category.findOne({ slug: req.params.slug }).exec();
    if(!category) return res.status(400).json({msg:'category not found'})
   res.json(category);
  } catch (error) {
   return res.status(500).json({msg:err.message})
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
    res.json({
      msg: "category updated successfully",
      updated:updated
  })
  } catch (err) {
   return res.status(500).json({msg:err.message});
  }
};

exports.remove = async (req, res) => {
    try {
      const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
      res.json(deleted);
    } catch (err) {
      res.status(400).send("Create delete failed");
    }
  };