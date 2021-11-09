const express = require('express')
const router = express.Router()


const collection    = 'dieudongxe'
const controller = require('../../controllers/frontend/'+`${collection}`)
router.get('/dieu-dong-xe' , controller.index )

module.exports =  router  // export ra cho app sử dụng