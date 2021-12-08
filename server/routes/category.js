
const express = require('express');
const { create,read,list,remove,update, getSubs } = require('../controllers/category');
const { isAuthenticatedUser, isAuthenticatedAdmin } = require('../middleware/auth');



const router = express.Router()


router.post('/category', isAuthenticatedUser,isAuthenticatedAdmin, create)
router.get('/category/:slug', read)
router.get('/all', list)
router.put('/category/:slug', isAuthenticatedUser,isAuthenticatedAdmin,update )
router.delete('/category/:slug', isAuthenticatedUser,isAuthenticatedAdmin, remove)
router.get('/category/subs/:_id', getSubs)

module.exports = router