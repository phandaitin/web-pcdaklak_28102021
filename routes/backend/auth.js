const express = require('express')
const router = express.Router()

const collection    = 'auth'
const myValidate = require('../../validates/'  +`${collection}`)
const checkLoggedIn = require('../../validates/checkLoggedIn' )
const controller = require('../../controllers/backend/'+`${collection}`)

/*
const {checkCurrentUser}= require('../middlewares/checkCurrentUser')
const {register , login ,getCurrentUser }= require('../controllers/auth')
router.route('/').get( checkCurrentUser , getCurrentUser)

router.route('/register').post(register)
router.route('/login').post(login) 
*/


router.get('/login', checkLoggedIn , controller.login )  // mục đích checkLoggedIn là để khi login rồi mà login nữa thì trang trả về trang admin
router.post('/authenticate', myValidate , controller.authenticate )
router.get('/logout', controller.logout )
// thêm chuyên mục
//router.post('/save' ,  myValidate , controller.saveItem  )

//router.route('/register').post(register)
//router.route('/login').post(login) 



module.exports =  router