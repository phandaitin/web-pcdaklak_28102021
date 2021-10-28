const jwt = require('jsonwebtoken')

exports.verifyToken =(req,res,next)=>{
    const authorization = req.header('authorization')

    if(!authorization){
        // error: chuwnsg thuwcj
    }
    // get tokens
    const token = authorization.replace('Bearer ', '')
    //verify token
    const {userId}  = jwt.verify(token, process.env.APP_SECRET)
    // Gan cho req    
    req.user = {userId}
    next()
}
