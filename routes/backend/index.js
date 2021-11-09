const express = require('express')
const router = express.Router()

const {index}= require('../../controllers/backend/index')
router.route('/').get(index)

module.exports =  router  // export ra cho app sử dụng