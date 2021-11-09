const collection    = 'ungdung'
const myModel       = require('../../models/'+`${collection}`)
const systemConfig      = require('../../config/system');  
let linkIndex       = systemConfig.prefixAdmin +`/${collection}/` ;
let pageCollection		= 'backend/pages/'+`${collection}`

// [GET] /colection
getAllItem = async (req, res, next) => {
    try {        
         const data =  await myModel.find({}).sort({'name': 1} )                        
         res.render(`${pageCollection}/list`,{ 
              data
         })            
     } catch (error) {
         //next(error)        
         res.status(400).json({success: false})   
     }
 }
//[GET] /colection/add
addItem = (req, res, next) => {        
    try {                        
        res.render(`${pageCollection}/add`  ,{
            message:''
        })
    } catch (error) {                
        res.status(400).json({success: false})   

    }   
 }

 // [POST] /colection/save
saveItem =  async (req,res,next) =>{       
    try {     
        await myModel.create( req.body )                 
        res.redirect(linkIndex);        
    } catch (error) {               
         res.status(400).json({success: false})         
    }
}

// [GET] /colection/edit/:id
editItem =  async (req,res,next) =>{      
    try {        
        const { id } = req.params                
        const data =  await myModel.findById({_id: id} )         
        res.render(`${pageCollection}/edit`,{ 
          data  ,
          message  : ''    
        })         
    } catch (error) {
        res.status(400).json({success: false})   
    }
}

// [PUT] /colection/:id
updateItem =  async (req,res,next) =>{  
    try {
        const { id } = req.params        
        await myModel.findByIdAndUpdate(id, {...req.body},{new:true, runValidators:true }  )      
        res.redirect(linkIndex);     
    } catch (error) {
        res.render(`${pageCollection}/edit` )  
    }
}



// [DELETE] /colection/:id
deleteItem =  async (req,res,next) =>{  
    try {
        const { id  } = req.params  //await myModel.findByIdAndDelete(id)        
        await myModel.deleteOne({ _id : id  })                
        res.redirect(linkIndex);        
    } catch (error) {
        next(error)      
    }
}
// [PUT] /colection/:id/:status
changestatus =   async (req, res, next) => {
    try {
        let status_			= (req.params.status === "active") ? "inactive" : "active";        
        let id				=  req.params.id     
        await myModel.updateOne({ _id:id} ,{ status: status_ } )             
            res.redirect(linkIndex)          
    } catch (error) {
        next(error)   
    }	 
}
 



module.exports={
    getAllItem  ,

    addItem     ,
    saveItem    ,

    editItem    ,    
    updateItem    ,    

    deleteItem  ,

    changestatus
    
 }
/*
// get One Post
exports.getItem = async (req, res, next) => {
    try {
        const {ItemId} = req.params                 
        const category =  await myModel.findById( ItemId  )
        //const category =  await myModel.findOne( { _id: ItemId })
                                     //.select('content updatedAt')   
                                     //.populate('author','name')        
        res.status(200).json({
            status:'success',            
            data: { category }
        })
    } catch (error) {
        next(error)        
    }
}


 

// update One Post
exports.updateItem = async (req,res,next) =>{
    try {
        const { itemId } = req.params        
        const data =  await myModel.findByIdAndUpdate(itemId, {...req.body},{new:true, runValidators:true }  )
        // const   data =  await myModel.findById({_id: itemId}  )
        
        // res.status(201).json({
        //     status:'success',            
        //     data: { category }
        // })
        res.render(`${pageCollection}list`,{ 
          data     
        })
         
    } catch (error) {
        next(error)
    }
}

// delet One Post
exports.deleteItem = async (req,res,next) =>{
    try {
        const {ItemId} = req.params        
        //await myModel.findByIdAndDelete(ItemId)        
        await myModel.deleteOne({ _id:ItemId })        
        res.status(200).json({
            status:'success',            
            message:'Item has been delete...'
        })
    } catch (error) {
        next(error)      
    }
}



*/
 
 
 
