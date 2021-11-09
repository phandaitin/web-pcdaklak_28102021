const express = require('express')
const router = express.Router()

const collectionMain    = 'category'
const collection    = 'post'
const systemConfig      = require('../../config/system');  
let linkIndex           = systemConfig.prefixAdmin +`/${collection}/` ;
const myValidate       = require('../../validates/'  +`${collection}`)
const mainModel         = require('../../models/'+`${collectionMain}`)
const myModel           = require('../../models/' +`${collection}`)
const uploadFileMiddleware    = require('../../middlewares/uploadFile')
let pageCollection		= 'backend/pages/'+`${collection}`
let folderUpload        =  __path_upload  +'/images/' ;


// Xử lý trực tiếp ở đây luôn - không cần qua Controller
// [GET] /colection
router.get('/' , async (req, res, next)  => {
    try    {        
        const data =  await myModel.find({}).sort({'createdAt': -1} )                        
        res.render(`${pageCollection}/list`,{ 
             data,
             message:'',
        })            
    } catch (error) {              
       next(error)
    }
})

//[GET] /colection/add
router.get('/add' , async (req, res, next)  => {
    const data={}
    const dataMain =  await mainModel.find({},{ _id : 1 , name : 1 }); // dataMain.unshift({_id: 'novalue', name: 'SELECT CATEGORY'});  
    try {                        
        res.render(`${pageCollection}/add`  ,{
            data,
            dataMain,
            message:'',
        })
    } catch (error) {                
        next(error)
    }   
 })

// [POST] /colection/save
 router.post('/save' , uploadFileMiddleware.uploadFile('thumb' , 'images') , myValidate, async  (req,res,next) =>{       
    try {     
        if ( req.file == undefined || !req.file ){ // nếu không chọn thì lưu hình mặc định
            req.body.thumb = 'no_avatar.png';
        }else{
            req.body.thumb =req.file.filename ;  
        }
        await myModel.create(  {...req.body, author: req.session.userName  } )                 
        res.redirect(linkIndex);        
    } catch (error) {               
        next(error)  
    }
})
   
// [GET] /colection/edit/:id
router.get('/edit/:id' , async (req, res, next)  => {
    try {        
        const { id } = req.params                
        const data =  await myModel.findById({_id: id} )       
        res.render(`${pageCollection}/edit`,{ 
          data  ,        
          message  : ''    
        })         
    } catch (error) {
        next(error)   
    }
})

// [PUT] /colection/:id
//updateItem =  async (req,res,next) =>{  
router.put('/:id' , async (req, res, next)  => { // chưa sửa hình dc -> sai phai xóa làm lại
    try {
        const { id } = req.params                        
        await myModel.findByIdAndUpdate(id, { ...req.body },{new:true, runValidators:true }  )    
        res.redirect(linkIndex);     
    } catch (error) {
        next(error)  
    }
})

 


// [DELETE] /colection/:id
//deleteItem =  async (req,res,next) =>{  
router.delete('/:id' , async (req, res, next)  => {
    try {
        const { id  } = req.params  
        // xóa hình trước
        const data = await myModel.findById({_id :id})
        if ( data.thumb !=='no_avatar.png'){
            uploadFileMiddleware.removeFile(folderUpload, data.thumb)  
        }
        // xóa dữ liệu        
        await myModel.deleteOne({ _id : id  }) //await myModel.findByIdAndDelete(id)        
        res.redirect(linkIndex);        
    } catch (error) {
        next(error)      
    }
})

// [PUT] /colection/:id/:status
//changestatus =   async (req, res, next) => {
router.put('/:id/:status' , async (req, res, next)  => {
    try {
        let status_			= (req.params.status === "active") ? "inactive" : "active";        
        let id				=  req.params.id     
        await myModel.updateOne({ _id:id} ,{ status: status_ } )             
            res.redirect(linkIndex)          
    } catch (error) {
        next(error)   
    }	 
})
  
module.exports = router 
 