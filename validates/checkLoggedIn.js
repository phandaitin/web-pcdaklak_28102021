const myModel       = require('../models/user')
const bcrypt = require('bcryptjs')

const systemConfig      = require('../config/system');  
const linkDashboard       = systemConfig.prefixAdmin  ;

const linkLogin		    = 'backend/pages/login'
const linkLayoutLogin	= 'backend/pages/layoutLogin'

 
module.exports =  async (req, res, next) => {
    
        if( req.session.userId )
            return res.redirect(linkDashboard)
            

next()
}
   