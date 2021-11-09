const express = require('express')
const router = express.Router()


const collection    = 'phuongthucvanhanh'
const controller = require('../../controllers/frontend/'+`${collection}`)
router.get('/phuong-thuc-van-hanh' , controller.index )

module.exports =  router  // export ra cho app sử dụng