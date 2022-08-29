const mongoose =require('mongoose')

const URLSchema = mongoose.Schema({

    LongUrl:{
        type:String
    },
    sortUrl:{
        type:String,
        unique:true
    },
    ClickCount:{
        type:Number,
        default:0
    }


})
module.exports = mongoose.model('urlshort',URLSchema)
