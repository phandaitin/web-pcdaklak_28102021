const express = require('express')
const router = express.Router()


const collection    = 'baocaovanhanh'
const controller = require('../../controllers/frontend/'+`${collection}`)
router.get('/bao-cao-van-hanh' , controller.index )

module.exports =  router  // export ra cho app sử dụng