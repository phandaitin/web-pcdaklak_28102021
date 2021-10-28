const express = require('express')
const router = express.Router()

const {verifyToken} = require('../middlewares/verifyToken')
const { getAllPost , createOnePost , getOnePost, updateOnePost, deleteOnePost}  = require('../controllers/post')   //cash 2 tuong ung ben controller

router.get('/', getAllPost )
router.post('/', verifyToken , verifyToken, createOnePost)        
router.get('/:postId', getOnePost )
router.put('/:postId',verifyToken, updateOnePost )
router.delete('/:postId', verifyToken ,deleteOnePost )

module.exports =  router