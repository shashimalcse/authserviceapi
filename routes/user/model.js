const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema=mongoose.Schema({
    forename:{
        type:String,
        required:true
    },
    surename:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    account_created:{
        type:Date,
        default:Date.now()
    }
});


userSchema.pre('save',function(next){
    let user = this;
    if(!user.isModified('password')) return next();

    bcrypt.genSalt(10,function(err,salt){
        if(err) return next(err);
        bcrypt.hash(user.password,salt,function(err,hash){
            if(err) return next(err);

            user.password=hash;
            next();
        });
    });

});


userSchema.methods.comparePassword=function(candidatePassword,callback){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return callback(err);
        callback(null,isMatch);
    });    
}

const userModel =mongoose.model('user',userSchema);

module.exports = userModel;