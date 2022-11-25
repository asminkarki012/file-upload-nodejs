const mongoose = require('mongoose');
const FileSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        file:{
            data:Buffer,
            contentType:String
        }
    },{timestamps:true}



);

module.exports = mongoose.model('File',FileSchema);