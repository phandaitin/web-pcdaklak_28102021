const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    name: String,        
    link: String ,
    order: Number
    },
    { timestamps: true} 
);    
module.exports = mongoose.model('ungdung', schema );   //lichdieudongxe i a colectiton in db mongo
    
    