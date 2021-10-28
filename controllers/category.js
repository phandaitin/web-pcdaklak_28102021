
const categoryModel = require('../models/category')

// get All Posts
exports.getAllCategory = async (req, res, next) => {
    try {
        const category =  await categoryModel.find() //.find({})
                                     //.select('content updatedAt')   
                                     //.populate('author','name')
        res.status(200).json({
            status:'success',
            result:category.length, 
            data: {category  }
        })
    } catch (error) {
        next(error)        
    }
}

// get One Post
exports.getOneCategory = async (req, res, next) => {
    try {
        const {categoryId} = req.params                 
        const category =  await categoryModel.findById( categoryId  )
        //const category =  await categoryModel.findOne( { _id: categoryId })
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
// create One Post 
exports.createOneCategory =  async (req,res,next) =>{  
    try {        
        const category =  categoryModel.create( req.body ) 
        //const category =  await new categoryModel({...req.body} ) 
        //category.save()
        res.status(201).json({
            status:'success',            
            data: { category }
        })
    } catch (error) {        
         next(error)   
    }
}

 

// update One Post
exports.updateOneCategory = async (req,res,next) =>{
    try {
        const {categoryId} = req.params        
        const category =  await categoryModel.findByIdAndUpdate(categoryId, {...req.body},{new:true, runValidators:true }  )
        //const category =  await categoryModel.updateOne({_id: categoryId},{...req.body},{new:true, runValidators:true }  )        
        res.status(201).json({
            status:'success',            
            data: { category }
        })
    } catch (error) {
        next(error)
    }
}

// delet One Post
exports.deleteOneCategory = async (req,res,next) =>{
    try {
        const {categoryId} = req.params        
        //await categoryModel.findByIdAndDelete(categoryId)        
        await categoryModel.deleteOne({ _id:categoryId })        
        res.status(200).json({
            status:'success',            
            message:'Category has been delete...'
        })
    } catch (error) {
        next(error)      
    }
}
 
 
 
