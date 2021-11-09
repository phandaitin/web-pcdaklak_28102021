const collection    = 'khangtpham'
const myModel       = require('../models/'+`${collection}`)
let pageCollection		= 'backend/pages/'+`${collection}`


module.exports =  async  (req, res, next) => {        
    let data = Object.assign(req.body);     
   let checkExistsName =  await  myModel.findOne( { name: data.name})    
    let id              =  req.params.id 

    if(data.name =='' || data.name == null){
         req.flash('error','Điện lực is required...')   
         return res.render(`${pageCollection}/add` ,{
            data,
            message: req.flash('error')         
         })        
    }    
    if(data.khang  =='' || data.khang == null){
      req.flash('error','Khang is required...')   
      return res.render(`${pageCollection}/add` ,{
         data,
         message: req.flash('error')         
      })        
   }    

    if(data.tpham =='' || data.tpham == null){
        req.flash('error','Tpham is required...')   
        return res.render(`${pageCollection}/add` ,{
           data,
           message: req.flash('error')         
        })        
   } 
        
   if(checkExistsName && !id ){
      req.flash('error','Điện lực is exists... ')   
      return res.render(`${pageCollection}/add` ,{
          data,
          message: req.flash('error')         
      })
   }
    next()
}