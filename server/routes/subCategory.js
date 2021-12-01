
const express = require('express');
const { create,read,list,remove,update } = require('../controllers/subCategory');
const { isAuthenticatedUser, isAuthenticatedAdmin } = require('../middleware/auth');



const router = express.Router()


router.post('/sub', isAuthenticatedUser,isAuthenticatedAdmin, create)
router.get('/sub/:slug', read)
router.get('/subs', list)
router.put('/sub/:slug', isAuthenticatedUser,isAuthenticatedAdmin,update )
router.delete('/sub/:slug', isAuthenticatedUser,isAuthenticatedAdmin, remove)


module.exports = router