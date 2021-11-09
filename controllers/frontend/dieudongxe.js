
const categoryModel     = require('../../models/category')
const khangtphamModel   = require('../../models/khangtpham');

const dieudongxeModel     = require('../../models/dieudongxe')

const collection        = 'dieudongxe'
const pageIndex		   = 'frontend/pages/'+`${collection}`+'/index'
const pageLayoutBlog    = 'frontend/pages/layoutBlog'
      
exports.index =  async(req,res,next) =>{
    try {
        let dataCategory = await categoryModel  // lấy ra để hiện ra menu
            .find( {status:'active'}  )                     
            .sort({ order  :  'asc'})
            .select ('name')

        let dataDieudongxe = await dieudongxeModel
            .find({})                                          
            .limit(30) 
            .sort({ updatedAt :  -1})
            .select ('name thumb updatedAt') 
        //--------------------------------------------------------
        let dataKhangTpham = await khangtphamModel
            .find( {} )                           
            .sort({ name  :  'asc'})            
            .select ('name khang tpham updatedAt')

        //--------------------------------------------------------
        return res.render(pageIndex,{
            layout: pageLayoutBlog, preloader : false , banner: false , menu: false , menu1: true ,
            dataCategory    , 
            dataDieudongxe ,

            dataKhangTpham  ,


        })
    } catch (error) {
        next(error)
    }         
} 