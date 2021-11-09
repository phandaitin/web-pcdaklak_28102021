const express = require('express')
const router = express.Router()


const collection    = 'category'
const controller = require('../../controllers/frontend/'+`${collection}`)
router.get('/tin-tuc-tong-hop' , controller.index )

module.exports =  router  // export ra cho app sử dụng