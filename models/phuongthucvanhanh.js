const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    name: String,        
    thumb: String    
    },
    { timestamps: true} 
);    
module.exports = mongoose.model('phuongthucvanhanh', schema );   //lichdieudongxe i a colectiton in db mongo
    
    