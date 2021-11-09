
const categoryModel     = require('../../models/category')
const collection    = 'dienluc'
const pageIndex		   = 'frontend/pages/'+`${collection}`+'/index'
const pageLayoutBlog    = 'frontend/pages/layoutBlog'
      
exports.index =  async(req,res,next) =>{
    try {
        let dataCategory = await categoryModel  // lấy ra để hiện ra menu
        .find( {status:'active'}  )                     
        .sort({ order  :  'asc'})
        .select ('name')
        //--------------------------------------------------------
        return res.render(pageIndex,{
            layout: pageLayoutBlog, preloader : false , banner: true , menu: true , menu1: false ,
            dataCategory
        })
    } catch (error) {
        next(error)
    }         
} 