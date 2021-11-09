const collection    = 'post'
//const myModel       = require('../models/'+`${collection}`)
const collectionMain    = 'category'
const mainModel         = require('../models/'+`${collectionMain}`)

let pageCollection		= 'backend/pages/'+`${collection}`

module.exports =  async  (req, res, next) => {          
    let data = req.body    
    //--------------------------------------------
    const dataMain =  await mainModel.find({},{ _id : 1 , name : 1 });
    //dataMain.unshift({_id: 'novalue', name: 'SELECT CATEGORY'});  
    if(data.name =='' || data.name == null){
         req.flash('error','Name is required...')   
         return res.render(`${pageCollection}/add` ,{
            data,
            dataMain,
            message: req.flash('error')         
         })        
    }    
 
    if(data.content =='' || data.content == null){
        req.flash('error','Content is required...')   
        return res.render(`${pageCollection}/add` ,{
           data,
           dataMain,
           message: req.flash('error')         
        })        
    }   
  
    // if( id ){
    //     req.flash('error','Content is required...')   
    //     return res.render(`${pageCollection}/edit` ,{
    //        data,
    //        dataMain,
    //        message: req.flash('error')         
    //     })        
    // }  
     
    next()
}