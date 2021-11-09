
const categoryModel     = require('../../models/category')
const ungdungModel         = require('../../models/ungdung')
const khangtphamModel   = require('../../models/khangtpham');

const collection        = 'ungdung'
const pageIndex		   = 'frontend/pages/'+`${collection}`+'/index'
const pageLayoutBlog    = 'frontend/pages/layoutBlog'
      
exports.index =  async(req,res,next) =>{
    try {
        let dataCategory = await categoryModel  // lấy ra để hiện ra menu
            .find( {status:'active'}  )                     
            .sort({ order  :  'asc'})
            .select ('name')

        let dataUngdung = await ungdungModel
            .find({})                                          
            .limit(30) 
            .sort({ order :  1})
            .select ('name link order updatedAt') 
            
        //--------------------------------------------------------
        let dataKhangTpham = await khangtphamModel
        .find( {} )                           
        .sort({ name  :  'asc'})            
        .select ('name khang tpham updatedAt')

        //--------------------------------------------------------
        return res.render(pageIndex,{
            layout: pageLayoutBlog, preloader : false , banner: false , menu: false , menu1: true ,
            
            dataCategory    ,
            dataUngdung   ,
            dataKhangTpham  ,


        })
    } catch (error) {
        next(error)
    }         
} 