const express = require('express')

const router = express.Router()

const {upload, remove } = require('../controllers/cloudinary')
const { isAuthenticatedUser, isAuthenticatedAdmin } = require('../middleware/auth');

router.post('/uploadimages',isAuthenticatedUser,isAuthenticatedAdmin, upload)
router.post('/removeimages',isAuthenticatedUser,isAuthenticatedAdmin, remove)
module.exports = router