const app=require('express').Router()
//sacnd step to validator
const userModel =require('../models/user.model')
const { validationResult } = require('express-validator');
const validation=require('..//validation/signUp.validation')
const bcrypt = require('bcrypt');

 app.post('/SignUp',validation,async(req,res)=>{
    const{firstName,lastName,email,password,confirmPassword}=req.body
      const errors= validationResult(req)
      

     if(errors.isEmpty()){
        let user =await userModel.findOne({email})
        if(user){
           res.json({message:"email exists"})
     }
     else{
        bcrypt.hash(password,7,  async  function(err, hash) {
          // Store hash in your password DB.
            await userModel.insertMany({firstName,lastName,email,password:hash})
            // res.json({message:"sucsses"})  
             res.json(user._id)  
        });
           
        }     
     }   
     else{
        res.json({'errors': errors.array()})
      
     }

   // console.log(req.body);
    
 })

 module.exports=app
