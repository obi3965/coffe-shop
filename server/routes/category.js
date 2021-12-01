
const express = require('express');
const { create,read,list,remove,update } = require('../controllers/category');
const { isAuthenticatedUser, isAuthenticatedAdmin } = require('../middleware/auth');



const router = express.Router()


router.post('/category', isAuthenticatedUser,isAuthenticatedAdmin, create)
router.get('/category/:slug', isAuthenticatedUser, read)
router.get('/all', list)
router.put('/category/:slug', isAuthenticatedUser,isAuthenticatedAdmin,update )
router.delete('/category/:slug', isAuthenticatedUser,isAuthenticatedAdmin, remove)


module.exports = router