const express = require('express')
const router = express.Router()


const collection    = 'moihop'
const controller = require('../../controllers/frontend/'+`${collection}`)
router.get('/moi-hop' , controller.index )

module.exports =  router  // export ra cho app sử dụng