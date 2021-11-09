const express = require('express');
const { create, remove, all } = require('../controllers/order');
const { isAuthenticatedUser } = require('../middleware/auth');


const router = express.Router()

router.post('/new/order',isAuthenticatedUser, create)
// router.put('/update/movies',verify, update)
 router.delete('/delete/movies/:id' , remove)
// router.get('/find/movies/:id' ,verify, read)
// router.get('/random/movies' ,verify, random)
 router.get('/lists', all)


module.exports = router