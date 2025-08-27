const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'This is field is required']
    },
    description:{
        type:String,
        required:[true,'This is field is required']
    },
    email:{
        type:String,
        required:[true,'This is field is required']
    },
    ingredients:{
        type:Array,
        required:[true,'This is field is required']
    },
    category:{
        type:String,
        enum: ['Thai','American','Chinese','Mexican','Indian','Spanish'],
        required:[true,'This is field is required']
    },
    image:{
        type:String,
        required:[true,'This is field is required']
    }
});
recipeSchema.index({name:'text',ingredients:'text'});

module.exports = mongoose.model('Recipe',recipeSchema);