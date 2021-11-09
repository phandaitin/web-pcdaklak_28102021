
const categoryModel     = require('../../models/category')
const postModel         = require('../../models/post')
const khangtphamModel   = require('../../models/khangtpham');

const collection        = 'category'
const pageIndex		   = 'frontend/pages/'+`${collection}`+'/index'
const pageLayoutBlog    = 'frontend/pages/layoutBlog'
      
exports.index =  async(req,res,next) =>{
    try {
        let dataCategory = await categoryModel  // lấy ra để hiện ra menu
            .find( {status:'active'}  )                     
            .sort({ order  :  'asc'})
            .select ('name')
        

        let dataRandomPost = await postModel.aggregate([
            { $match: { status: 'active' }},            
             { $project : {_id:1 , category:1 ,  name:1 ,  title:1 ,  content:1 ,  thumb:1 ,  author:1 ,  createdAt:1 ,  view:1 ,  slug:1 }  },                        
            { $sample: {size: 3}}
        ])

        let dataKinhdoanhPost = await postModel
            .find( {status:'active', category: 'KINH DOANH' } )            
            .limit(3) 
            .sort({ updatedAt :  -1})
            .select('category name title content thumb author createdAt view slug')

        let dataKythuatPost = await postModel
            .find( {status:'active', category: 'KỸ THUẬT' } )            
            .limit(3) 
            .sort({ createdAt :  -1})
            .select('category name title content thumb author createdAt view slug')

        let dataCongNgheCDS = await postModel
            .find( {status:'active', category: 'CÔNG NGHỆ - CĐS' } )            
            .limit(3) 
            .sort({ createdAt :  -1})
            .select('category name title content thumb author createdAt view slug')

        let dataNhanVatSuKien = await postModel
            .find( {status:'active', category: 'NHÂN VẬT SỰ KIỆN' } )            
            .limit(3) 
            .sort({ createdAt :  -1})
            .select('category name title content thumb author createdAt view slug')

        let dataVHDNTAKH = await postModel
            .find( {status:'active', category: 'VĂN HÓA DOANH NGHIỆP - TRI ÂN KHÁCH HÀNG' } )            
            .limit(3) 
            .sort({ createdAt :  -1})
            .select('category name title content thumb author createdAt view slug')
            
        let dataDangdoanthe = await postModel
            .find( {status:'active', category: 'ĐẢNG ĐOÀN THỂ' } )            
            .limit(3) 
            .sort({ createdAt :  -1})
            .select('category name title content thumb author createdAt view slug')
            
        let dataCongdoan = await postModel
            .find( {status:'active', category: 'CÔNG ĐOÀN' } )            
            .limit(3) 
            .sort({ createdAt :  -1})
            .select('category name title content thumb author createdAt view slug')

        let dataDoanCoSo = await postModel
            .find( {status:'active', category: 'ĐOÀN CƠ SỞ' } )            
            .limit(3) 
            .sort({ createdAt :  -1})
            .select('category name title content thumb author createdAt view slug')

        let dataThoVan = await postModel
            .find( {status:'active', category: 'THƠ VĂN' } )            
            .limit(3) 
            .sort({ createdAt :  -1})
            .select('category name title content thumb author createdAt view slug')
            
        //--------------------------------------------------------
        let dataKhangTpham = await khangtphamModel
        .find( {} )                           
        .sort({ name  :  'asc'})            
        .select ('name khang tpham updatedAt')

        //--------------------------------------------------------
        return res.render(pageIndex,{
            layout: pageLayoutBlog, preloader : false , banner: false , menu: false , menu1: true ,
            dataCategory    ,
            dataRandomPost  ,            
            dataKinhdoanhPost,
            dataKythuatPost ,
            dataCongNgheCDS,
            dataNhanVatSuKien,
            dataVHDNTAKH,
            dataDangdoanthe,    
            dataCongdoan,
            dataDoanCoSo,
            dataThoVan ,

            dataKhangTpham  ,


        })
    } catch (error) {
        next(error)
    }         
} 