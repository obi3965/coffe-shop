// const tryCatchError = require('../middleware/tryCatchError');
// const Order = require('../models/order');
// const ErrorHandler = require('../util/errorHandler');
// const Product = require('../models/products')


// exports.create = tryCatchError(async(req,res,next) => {
//   const {
//     shippingInfo,
//     orderItems,
//     paymentInfo,
//     itemsPrice,
//     taxPrice,
//     shippingPrice,
//     totalPrice,
//   } = req.body

//           const newOrder = new Order({
//     shippingInfo,
//     orderItems,
//     paymentInfo,
//     itemsPrice,
//     taxPrice,
//     shippingPrice,
//     totalPrice,
//     paidAt: Date.now(),
//     user: req.user._id,
//           });
        
//           const savedOrder = await newOrder.save();
//           res.status(201).json({
//             success: true,
//             savedOrder
//           });      
// })



// exports.singleOrder = tryCatchError(async(req,res,next) => {
   
//         const singleOrder =  await Order.findById(req.params.id)
//         .populate('user', 'name email')
//         if(!singleOrder){
//           return next (new ErrorHandler('order is not found', 404))
//         }
//           res.status(200).json({
//             message:'success',
//             singleOrder
//           });     
      
// }) 

// exports.allOrders = tryCatchError(async (req,res,next) => {
//   const orders = await Order.find({ user: req.user._id });

//   res.status(200).json({
//     success: true,
//     orders,
//   });
// })  

// //all admin orders
// exports.allAdminOrders = tryCatchError(async (req,res,next) => {
//   const orders = await Order.find();
   
//   let totalAmount = 0;

//   orders.forEach((order) => {
//     totalAmount += order.totalPrice
//   })
//   res.status(200).json({
//     success: true,
//     totalAmount,
//     orders,
//   });
// })


// //update admin orders
// exports.updateAdminOrders = tryCatchError(async (req,res,next) => {
//   const order = await Order.findById(req.params.id);

//   if (!order) {
//     return next(new ErrorHandler("Order not found with this Id", 404));
//   }

//   if (order.orderStatus === "Delivered") {
//     return next(new ErrorHandler("You have already delivered this order", 400));
//   }

//   if (req.body.status === "Shipped") {
//     order.orderItems.forEach(async (o) => {
//       await updateStock(o.product, o.quantity);
//     });
//   }
//   order.orderStatus = req.body.status;

//   if (req.body.status === "Delivered") {
//     order.deliveredAt = Date.now();
//   }

//   await order.save({ validateBeforeSave: false });
//   res.status(200).json({
//     success: true,
//   });
// })

// async function updateStock(id, quantity) {
//   const product = await Product.findById(id);

//   product.Stock -= quantity;

//   await product.save({ validateBeforeSave: false });
// }

// // delete Order -- Admin
// exports.deleteOrder = tryCatchError(async (req, res, next) => {
//   const order = await Order.findById(req.params.id);

//   if (!order) {
//     return next(new ErrorHandler("Order not found with this Id", 404));
//   }

//   await order.remove();

//   res.status(200).json({
//     success: true,
//   });
// });