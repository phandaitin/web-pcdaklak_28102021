const express = require('express')
const router = express.Router()

const {checkCurrentUser}= require('../middlewares/checkCurrentUser')
const {register , login ,getCurrentUser, getAllUser}= require('../controllers/auth')


router.route('/register').post(register)
router.route('/login').post(login) 
router.route('/').get( checkCurrentUser , getCurrentUser)
router.route('/all').get( getAllUser)


module.exports =  router