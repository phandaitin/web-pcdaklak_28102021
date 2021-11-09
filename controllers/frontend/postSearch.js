const categoryModel     = require('../../models/category')
const postModel         = require('../../models/post')
const collection        = 'postSearch'
const pageIndex		   = 'frontend/pages/'+`${collection}`+'/index'
const pageLayoutBlog    = 'frontend/pages/layoutBlog'


exports.index =  async(req,res,next) =>{
    let objWhere    = {};
    let keyword     =   req.query.keyword 
    if(keyword !== ''){
       objWhere.name = (new RegExp(keyword , 'ig') )
    }
    try {
        //let idPost	= req.params.id 

        let dataCategory = await categoryModel  // lấy ra để hiện ra menu
            .find( {status:'active'}  )                     
            .sort({ order  :  'asc'})
            .select ('name')        
        
        let dataPostSearch = await postModel
            .find( objWhere  )  
            .limit(50)           
            .sort({ updatedAt :  -1}) 
            .select('name thumb')              

        //--------------------------------------------------------
        return res.render(pageIndex,{
            layout: pageLayoutBlog, preloader : false , banner: false , menu: false , menu1: true ,            
            dataCategory    ,
            dataPostSearch  
        })
    } catch (error) {
        next(error)
    }         
} 
 