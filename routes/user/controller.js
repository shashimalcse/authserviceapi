const model = require('./model');

module.exports={
    login:(req,res)=>{
        res.status(200).send({msg:'Login Successful'});
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