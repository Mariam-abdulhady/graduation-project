const app=require('express').Router()
const userModel =require('../models/user.model')
const bcrypt =require('bcrypt')
//const auth = require('../middelware/auth')
//jwt
//const jwt =require('jsonwebtoken')

 app.post('/signin',async  (req,res)=>{
    const{email,password}=req.body
    let user =await userModel.findOne({email})
    if(user){
        const match = await bcrypt.compare(password, user.password);
        //password
        if (match) {
           // token
         //1-install jwt
   // let token=jwt.sign({user:user._id,role:"user"},'patient')
         //res.json({token})
       res.json({userID:user._id})

      } else {
        
          res.json({message:" incorrect password "})
              //feedback password 8lt
      }
  } else {


      //feedback message
   
      res.json({message:'email doesnt exist'})

  }
   
 })
 //delete users
app.delete('/delete' ,async (req,res)=>{
    try {
      console.log(req.body);
    const{_id} = req.body;
        await userModel.findByIdAndDelete({_id});
        res.json({message:"user is deleted successfully"});
     
    } catch (error) {
      res.json({error})
    }
    
  })
 module.exports=app
