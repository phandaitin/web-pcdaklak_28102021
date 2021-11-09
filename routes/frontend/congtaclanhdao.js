const express = require('express')
const router = express.Router()


const collection    = 'congtaclanhdao'
const controller = require('../../controllers/frontend/'+`${collection}`)
router.get('/cong-tac-lanh-dao' , controller.index )

module.exports =  router  // export ra cho app sử dụng