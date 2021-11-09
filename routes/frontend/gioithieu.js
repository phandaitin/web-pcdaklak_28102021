const express = require('express')
const router = express.Router()

const collection    = 'gioithieu'
const controller = require('../../controllers/frontend/'+`${collection}`)
router.get('/gioi-thieu' , controller.index )

module.exports =  router  // export ra cho app sử dụng