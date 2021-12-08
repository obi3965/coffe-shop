
const express = require('express');
const { create,read,list,remove,update } = require('../controllers/products');
const { isAuthenticatedUser, isAuthenticatedAdmin } = require('../middleware/auth');



const router = express.Router()


router.post('/product', isAuthenticatedUser,isAuthenticatedAdmin, create)
router.get('/product/:slug', read)
 router.get('/products/:count', list)
 router.put('/product/:slug', isAuthenticatedUser,isAuthenticatedAdmin,update )
 router.delete('/product/:slug', isAuthenticatedUser,isAuthenticatedAdmin, remove)


module.exports = router