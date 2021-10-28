const express = require('express')
const {verifyToken} = require('../middlewares/verifyToken')
const {getAllCategory,   createOneCategory,getOneCategory, updateOneCategory, deleteOneCategory } = require('../controllers/category')
const router = express.Router()

//router.route('/').get(getAllPosts)
router.get('/', getAllCategory)

//router.route('/').post(verifyToken , createOnePost)        
router.post('/', verifyToken , createOneCategory)        

//router.route('/:postId').get(getOnePost)
router.get( '/:categoryId' , getOneCategory)

//router.route('/:postId').put(verifyToken , updateOnePost)
router.put('/:categoryId',verifyToken , updateOneCategory)

//router.route('/:postId').delete(verifyToken ,deleteOnePost)
router.delete('/:categoryId',verifyToken ,deleteOneCategory)

        

module.exports = router 