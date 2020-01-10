const mongoose=require('mongoose');
const itemSchema = new mongoose.Schema({
    itemName:{
        type:String,
        required:true,
       
    },
    Price:{
        type: Number,
        required: true,
    
    },
    itemImage:{
        type:String
    }
});

module.exports = mongoose.model('item',itemSchema);
