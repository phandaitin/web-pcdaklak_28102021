
// const systemConfig      = require('../../config/system')   
// const linkLogin         = systemConfig.prefixBlog

const categoryModel     = require('../../models/category')
const postModel         = require('../../models/post')
const videoModel        = require('../../models/video')


const collection        = 'home'
const pageIndex		    = 'frontend/pages/'+`${collection}` 
const pageLayoutBlog    = 'frontend/pages/layoutBlog'

exports.index =  async (req,res,next) =>{
         try {
            let dataCategory = await categoryModel  // lấy ra để hiện ra menu
                .find( {status:'active'}  )                     
                .sort({ order  :  'asc'})
                .select ('name')

            let dataNewPost = await postModel
            .find( {status:'active', category: {$ne:'TIÊU ĐIỂM'} } )            
            .limit(5) 
            .sort({ createdAt :  -1})
            .select('category name title content thumb author createdAt view slug')

            let dataTieudiemPost = await postModel
            .find( {status:'active', category: 'TIÊU ĐIỂM' } )           
            .limit(4) 
            .sort({ updatedAt :  -1})
            .select('category name title content thumb author createdAt view slug')
            
            let video = await videoModel
            .find( {} )          
            .limit(8)
            .sort({ updatedAt :  -1})                         
            .select ('name idVideo updatedAt')

            // ------------------------------------------------------------------
            return res.render(pageIndex,{
                layout: pageLayoutBlog, preloader : false , banner: true , menu: true , menu1: false , 
                dataCategory    ,
                dataNewPost     ,
                dataTieudiemPost,
                video           
            })        
        } catch (error) {
            res.status(400).json({success: false  })        
        }
} 
 