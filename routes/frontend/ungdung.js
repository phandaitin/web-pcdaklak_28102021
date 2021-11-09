const express = require('express')
const router = express.Router()


const collection    = 'ungdung'
const controller = require('../../controllers/frontend/'+`${collection}`)
router.get('/ung-dung-noi-bo' , controller.index )

module.exports =  router  // export ra cho app sử dụng