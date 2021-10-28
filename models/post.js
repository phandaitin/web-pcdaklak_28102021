const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const schema = new mongoose.Schema({
    name    :   {type: String ,  trim :true },
    slug    :   { type: String, slug: 'name', unique: true },
    title   :   {type: String ,  trim :true },    
    content :   {type: String ,  trim :true ,  required:[true,'Post must have content'] },
    thumb   :   String,
    status  :   { type: String , default: 'active'},    
    position: String,    
    view    :   {type: Number , default :1},
    category:   {type: String ,  trim :true },
    author  : {
            type: mongoose.Schema.Types.ObjectId ,
            ref : 'user'
    } 
},{ timestamps: true} 
);    

module.exports = mongoose.model('post', schema );   //post i a colectiton in db mongo

 