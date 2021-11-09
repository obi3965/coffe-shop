const express = require('express');
const { create, singleOrder, allOrders,allAdminOrders,
    updateAdminOrders } = require('../controllers/order');
const { isAuthenticatedUser,authorizeRoles } = require('../middleware/auth');


const router = express.Router()

router.post('/new/order',isAuthenticatedUser, create)
router.put('/update/orders',isAuthenticatedUser,authorizeRoles('admin'), updateAdminOrders)
//  router.delete('/order/:id' , remove)
 router.get('/all/orders' ,isAuthenticatedUser,authorizeRoles('admin'), allAdminOrders)
 router.get('/order/:id', isAuthenticatedUser,singleOrder)
 router.get('/orders/me',isAuthenticatedUser, allOrders)


module.exports = router