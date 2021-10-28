const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
exports.register = async (req,res,next)=>{
    try {
        //const user = await userModel.create(req.body)                
        const user = await new userModel(req.body)  
        user.save()          
        const token = jwt.sign( { userId: user._id}, process.env.APP_SECRET)        
        res.status(200).json({
            status : "success",
            data  :{token, userName: user.name}
        })        
    } catch (error) {
        next(error)
    }
}    

//login
exports.login = async (req,res,next) =>{
    try {        
        const user = await userModel.findOne({email: req.body.email})
        if(!user){
           // Email: Email is not correct  
           const err =  new Error('Email is not correct')
           err.statusCode = 400
           return next(err)
        }
        if(bcrypt.compareSync( req.body.password , user.password)){
            const token = jwt.sign( { userId: user._id}, process.env.APP_SECRET)                    
            res.status(200).json({
                status : "success",
                data  :{ token, userName: user.name }
            })        
        }else {
            // Error: Password is not correct  
            const err =  new Error('Password is not correct')
            err.statusCode = 400
            return next(err)
        }
    } catch (error) {
        res.json(error)
    }
}

// get Current User
exports.getCurrentUser = async (req,res,next) =>{
    try {        
        const data = {user : null}
        if(req.user){
            const user = await userModel.findOne({_id : req.user.userId })
            data.user= {userName : user.name}
        }
        res.status(200).json({
            status:'success' ,
            data: data
        })         
    }catch (error) {
        res.json(error)
    }
}

// get Current User
exports.getAllUser = async (req,res,next) =>{
    try {                
        const users =  await userModel.find({})
        res.status(200).json({
            status:'success',
            result:user.length, 
            data: {user  }
        })
    } catch (error) {
        next(error)        
    }            
}
