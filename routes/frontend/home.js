const express = require('express')
const router = express.Router()


const collection    = 'home'
const controller = require('../../controllers/frontend/'+`${collection}`)
router.get('/'  , controller.index )

module.exports =  router  // export ra cho app sử dụng
  