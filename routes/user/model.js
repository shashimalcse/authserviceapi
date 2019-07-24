const mongoose = require('mongoose');

const userSchema=mongoose.Schema({
    forename:{
        type:String,
        require:true
    },
    surename:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
});