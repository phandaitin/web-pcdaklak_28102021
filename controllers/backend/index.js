
const systemConfig      = require('../../config/system')   
const linkLogin       = systemConfig.prefixAdmin +'/'
const pageDashboard		    = 'backend/pages/dashboard'
exports.index =  (req,res) =>{
      if(req.session.userId !== undefined){          
         return res.render(pageDashboard)
      }else{
          res.redirect(linkLogin);
      }      
   } 
