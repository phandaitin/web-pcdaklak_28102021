const myModel       = require('../models/user')
const bcrypt = require('bcryptjs')

const systemConfig      = require('../config/system');  
const linkDashboard       = systemConfig.prefixAdmin  ;

const pageLogin		    = 'backend/pages/login'
const pageLayoutLogin	= 'backend/pages/layoutLogin'

 
module.exports =  async (req, res, next) => {
    req.body = JSON.parse(JSON.stringify(req.body));    
    const data = Object.assign(req.body);
    
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;    
    if(!data.email.match(emailRegex) ){   
        req.flash('error','Email định dạng không đúng...')  

        return res.render( pageLogin,{ 
            layout: pageLayoutLogin,
            data,
            message: req.flash('error')  
        })        
   }

    if(data.password =='' || data.password == null){
        req.flash('error','Password is required...')

        return res.render( pageLogin,{ 
            layout: pageLayoutLogin,
            data,
            message: req.flash('error')  
        })           
    }    

    if(data.email =='' || data.email == null){
        req.flash('error','Email is required...')

        return res.render( pageLogin,{ 
            layout: pageLayoutLogin,
            data,
            message: req.flash('error')  
        })           
    }   

    //-------------chứng thực = email xem như user ---------------------------    
    const user = await myModel.findOne( { email: data.email } )  
    if(user){        
        const match =  await bcrypt.compare( data.password , user.password) ;
        if(match){
            req.session.userId  = user._id   
            req.session.userName= user.name
            return res.redirect(linkDashboard)
            //return res.render ('backend/pages/dashboard',{ user})
        }else{
            req.flash('error','Password is wrong...');
            return res.render( pageLogin,{ 
                layout: pageLayoutLogin,
                data,
                message: req.flash('error')  
            })
        }
    }else{
        req.flash('error','Email or password is not match...');

        return res.render( pageLogin,{ 
            layout: pageLayoutLogin,
            data,
            message: req.flash('error')  
        })
    }   
    

next()
}
  

   /*
    let checkExistsUser = await  myModel.findOne( { user: data.user })             
    if(checkExistsUser){
      return  res.render(`${folderView}form`,{
            data,     
            pageTitle: 'Quản trị User' ,
            notify: {err: 'User đã tồn tại dữ liệu ...'}              
        } )
    }
    if(data.user =='' || data.user == null){
        return  res.render(`${folderView}form`,{
              data,     
              pageTitle: 'Quản trị User' ,
              notify: {err: 'User không được trống...'}              
          } )
      }
      if(data.role =='' || data.role == null){
        return  res.render(`${folderView}form`,{
              data,     
              pageTitle: 'Quản trị Role' ,
              notify: {err: 'Role không được trống...'}              
          } )
      }
*/      
    //--------------------------------------------------------
 