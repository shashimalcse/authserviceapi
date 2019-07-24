const model = require('./model');
const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports={
    // login:(req,res)=>{
    //     model.findOne({email:req.body.email},(err,user)=>{
    //         if(err) throw err;

    //         user.comparePassword(req.body.password,(err,isMatch)=>{
    //             if(err) throw err;
    //             if(isMatch){
    //                 let token = jwt.sign({id:user._id},config.secret,{ expiresIn:86400});
    //                 res.status(200).send({msg:'Login Successful',token});
    //             }
    //             else{
    //                 res.status(500).send({msg:'Password did not matched'}); 
    //             }
    //         });
    //     });
        
    // },
    login:(req,res)=>{
        model.findOne({email:req.body.email})
            .then(user=>{
                if(!user){
                    res.status(500).send({msg:'User not exist'});
                }
                else{
                    user.comparePassword(req.body.password,(err,isMatch)=>{
                        if(err) throw err;
                        if(isMatch){
                            let token = jwt.sign({id:user._id},config.secret,{ expiresIn:86400});
                            res.status(200).send({msg:'Login Successful',token});
                        }
                        else{
                            res.status(500).send({msg:'Password did not matched'}); 
                        }
                    });
                }

            })
            .catch(err=>console.log(err));
    },
    register:(req,res)=>{
        let newUser = new model({
            forename:req.body.forename,
            surename:req.body.surename,
            email:req.body.email,
            password:req.body.password
        });
        newUser.save()
            .then(result=>{
                console.log(result);
                res.status(200).send({msg:' Register Successfull',user_id:"id"});
            })
            .catch(err=>{
                console.log(err);
                res.status(500).send({msg:' Register Unsuccessfull'});
            });
                
    }
}