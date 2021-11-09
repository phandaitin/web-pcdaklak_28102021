const collection    = 'ungdung'
const myModel       = require('../models/'+`${collection}`)
let pageCollection		= 'backend/pages/'+`${collection}`
module.exports =  async  (req, res, next) => {        
    let data = Object.assign(req.body);     

    if(data.name =='' || data.name == null){
         req.flash('error','Name is required...')   
         return res.render(`${pageCollection}/add` ,{
            data,
            message: req.flash('error')         
         })        
    }    
  
    if(data.link =='' || data.link == null){
        req.flash('error','Link is required...')   
        return res.render(`${pageCollection}/add` ,{
           data,
           message: req.flash('error')         
        })        
   }    

    
    next()
}