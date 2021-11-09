const categoryModel     = require('../../models/category')
const postModel         = require('../../models/post')
const collection        = 'post'
const pageIndex		   = 'frontend/pages/'+`${collection}`+'/index'
const pageLayoutBlog    = 'frontend/pages/layoutBlog'


exports.index =  async(req,res,next) =>{
    try {
        let idPost	= req.params.id 

        let dataCategory = await categoryModel  // lấy ra để hiện ra menu
            .find( {status:'active'}  )                     
            .sort({ order  :  'asc'})
            .select ('name')        
        
        let dataDetailPost = await postModel
            .find( {status:'active', _id : idPost} )            
            .select('category name title content thumb author updatedAt view slug')
            await postModel.updateOne({ _id : idPost },{view: parseInt(dataDetailPost[0].view) +1} )            
                       
            
        let dataDetailPostRelated = await postModel            
            .find( {status:'active', _id: {$ne: idPost} , 'category' : dataDetailPost[0].category  })    // phai thuộc chuyên mục liên quan       
            //.find( {status:'active', _id: {$ne: idPost} , category : 'KINH DOANH' } )    // phai thuộc chuyên mục liên quan       
            .limit(30) 
            .sort({ updatedAt :  -1})
            .select('category name title content thumb author createdAt view slug')             

        //--------------------------------------------------------
        return res.render(pageIndex,{
            layout: pageLayoutBlog, preloader : false , banner: false , menu: false , menu1: true ,
            
            dataCategory    ,
            dataDetailPost  ,
            dataDetailPostRelated  ,
        })
    } catch (error) {
        next(error)
    }         
} 
 