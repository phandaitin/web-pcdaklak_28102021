const express = require('express')
const router = express.Router()
const collection    = 'khangtpham'
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
 

module.exports = router 
 