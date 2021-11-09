const systemConfig      = require('../../config/system');  
let linkDashboard       = systemConfig.prefixAdmin  ;
let linkMainBlog        = systemConfig.prefixBlog  ;

const myModel           = require('../../models/user')
const pageLogin         = 'backend/pages/login'
const pageLayoutLogin     = 'backend/pages/layoutlogin'

const jwt = require('jsonwebtoken')



//[GET] /login
login = (req, res, next) => {        
    try {                           
        res.render(pageLogin,{ 
            layout: pageLayoutLogin,
            data :'',
            message  : ''
        })
    } catch (error) {                
        res.status(400).json({success: false})   
    }   
 }

 //[POST] /authentication
 authenticate = (req, res, next) => {        
    try { 
        res.redirect( linkDashboard )        
    } catch (error) {                
        res.status(400).json({success: false})   
    }   
 }

 //[GET] /logout
 logout =  (req,res,next) => {     
    req.session.destroy(() =>{
        res.redirect(linkMainBlog);
     })
}

 
module.exports =   {
    login      ,
    authenticate ,
    logout
 }
