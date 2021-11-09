const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    name    : String,        
    idVideo   : String       
},{ timestamps: true} 
);    
module.exports = mongoose.model('video', schema );   