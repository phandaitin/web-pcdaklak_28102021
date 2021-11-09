const collection    = 'video'
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
         next(error)                 
     }
 }
//[GET] /colection/add
addItem = (req, res, next) => {        
    try {                        
        res.render(`${pageCollection}/add`  ,{
            data:{},
            message:''
        })
    } catch (error) {                
        next(error) 
    }   
 }

 // [POST] /colection/save
saveItem =  async (req,res,next) =>{       
    try {     
        await myModel.create( req.body )                 
        res.redirect(linkIndex);        
    } catch (error) {               
        next(error) 
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
        //res.status(400).json({success: false})   
        next(error) 
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
 
 



module.exports={
    getAllItem  ,

    addItem     ,
    saveItem    ,

    editItem    ,    
    updateItem    ,    

    deleteItem       
 } 
