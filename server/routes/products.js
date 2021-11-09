const express = require('express');
const { create, update, remove, read, getAdminProduct, allProducts } = require('../controllers/products');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');


const router = express.Router()

router.post('/admin/create/products',isAuthenticatedUser,authorizeRoles('admin'), create)
router.get('/products', allProducts)
router.get('/product/:id', read)
router.delete('/admin/product/:id',isAuthenticatedUser,authorizeRoles('admin'), remove)
router.put('/admin/product/:id',isAuthenticatedUser,authorizeRoles('admin'), update)

router.get('/admin/products',isAuthenticatedUser,authorizeRoles('admin'), getAdminProduct)



module.exports = router