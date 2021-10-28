
const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const schema = new mongoose.Schema({
    name        :   { type: String ,  trim :true , unique:true,  required:[true,'Name must be required'] },
    slug        :   { type: String, slug: 'name', unique: true },
    status      :   { type: String , default: 'active'},
    order       :   { type: Number    , default : 1}
    } 
)
module.exports = mongoose.model('category', schema ); 