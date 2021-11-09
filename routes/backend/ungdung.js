const express = require('express')
const router = express.Router()
const collection    = 'ungdung'
const  myValidate = require('../../validates/'  +`${collection}`)
const controller = require('../../controllers/backend/'+`${collection}`)

// hiển thị tất cả chuyên mục
router.get('/'  , controller.getAllItem   )

// hiển thi form để thêm mới
router.get('/add' ,  controller.addItem  )

// thêm chuyên mục
router.post('/save' ,  myValidate , controller.saveItem  )

// hiển thi form để sửa
router.get('/edit/:id' , controller.editItem  )

// update form sửa 
router.put('/:id' , myValidate ,controller.updateItem  )

// xóa
router.delete('/:id' , controller.deleteItem  )

// update status
router.put('/status/:id/:status' , controller.changestatus  )

module.exports = router 

/*
//router.route('/').post(verifyToken , createOnePost)        
//router.post('/', verifyToken , createOneItem)        
router.post('/add', createItem)        

//router.route('/:postId').get(getOnePost)
router.get( '/form/:itemId' , getItem)

//router.route('/:postId').put(verifyToken , updateOnePost)
router.get('/:itemId' , updateItem)
// router.put('/edit/:ItemId',verifyToken , updateOneItem)


//router.route('/:postId').delete(verifyToken ,deleteOnePost)
router.delete('/:itemId',verifyToken ,deleteItem)

*/

