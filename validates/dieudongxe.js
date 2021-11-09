const collection    = 'dieudongxe'
const myModel       = require('../models/'+`${collection}`)
let pageCollection		= 'backend/pages/'+`${collection}`
module.exports =  async  (req, res, next) => {        
    let data = Object.assign(req.body);     
    //let data =  req.body ;     
    
    if(data.name =='' || data.name == null){
         req.flash('error','Name is required...')   
         return res.render(`${pageCollection}/add` ,{
            data,
            message: req.flash('error')         
         })        
    }    
 
   
    next()
}