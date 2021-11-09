const express = require('express')
const router = express.Router()


const collection    = 'postSearch'
const controller = require('../../controllers/frontend/'+`${collection}`)
router.get('/bai-viet-search/' , controller.index )

module.exports =  router  // export ra cho app sử dụng