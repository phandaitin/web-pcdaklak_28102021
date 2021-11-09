const express = require('express')
const router = express.Router()

const collection    = 'dienluc'
const controller = require('../../controllers/frontend/'+`${collection}`)
router.get('/dien-luc-truc-thuoc' , controller.index )

module.exports =  router  // export ra cho app sử dụng