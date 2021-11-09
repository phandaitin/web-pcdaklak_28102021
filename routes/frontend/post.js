const express = require('express')
const router = express.Router()


const collection    = 'post'
const controller = require('../../controllers/frontend/'+`${collection}`)
router.get('/bai-viet/:id' , controller.index )

module.exports =  router  // export ra cho app sử dụng