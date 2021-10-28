
 exports.errorHandler = (err,req,res,next) =>{
    
    //Internal server error
    err.statusCode = err.statusCode || 500 

   // duplicate
   if(err.code === 11000){
       err.statusCode = 400
       for( let p in err.keyValue ){
           err.message =`${p} have to be unique`
       }
   }
   // ObjectID not found
   if(err.kind === "ObjectId"){
       err.statusCode = 404       
       err.message = `The ${req.originalUrl} is not found because wrong ID`
   }
   // Validators
   if(err.errors){
       err.statusCode  =   400
       err.message     =   []
       for( let p in err.errors ){
           err.message.push(err.errors[p].properties.message) 
       }
   }

   //-------------------------------------------
    res.status(err.statusCode).json({
       status  :   'fail',
       message :   err.message 
    }) 

}
