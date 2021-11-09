const tryCatchError = require('../middleware/tryCatchError');
const Order = require('../models/order')



exports.create = tryCatchError(async(req,res,next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

          const newOrder = new Order({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
          });
        
          const savedOrder = await newOrder.save();
          res.status(201).json({
            success: true,
            savedOrder
          });      
})



exports.remove = async (req,res) => {
    if (req.user.isAdmin) {
        try {
          await Order.findByIdAndDelete(req.params.id);
          res.status(201).json("The Order has been delete...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("You are not allowed!");
      }
}

exports.all = async (req,res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let Order = [];
    try {
      if (typeQuery) {
        if (genreQuery) {
          Order = await Order.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery, genre: genreQuery } },
          ]);
        } else {
          Order = await Order.aggregate([
            { $sample: { size: 5 } },
            { $match: { type: typeQuery } },
          ]);
        }
      } else {
        Order = await Order.aggregate([{ $sample: { size: 5 } }]);
      }
      res.status(200).json(Order);
    } catch (err) {
      res.status(500).json(err);
    }
}