'use strict';
const app=require('express').Router()
const diagonsticForm=require('../models/Diagnostic form.model')
const auth = require('../middelware/auth')
const jwt = require('jsonwebtoken');
var multer = require('multer');
//the image will be shown with its name when we transfer from local to upload
//to save image in disk storage
var storage = multer.diskStorage({ 
  destination: (req, file, cb) => { 
    cb(null, './uploads') 
  }, 
  filename: (req, file, cb) => { 
    cb(null,Date.now()+"-"+Math.random()*100 +file.originalname)} 
}); 
//file filter
function fileFilter (req, file, cb) {

  // To accept this file pass false, like so:
  if(file.mimetype=='image/png'||file.mimetype=='image/jpg'
   ||file.mimetype=='image/jpeg'){
    cb(null, true)
   }
   else {
    cb(null, false)
   }
}
const upload = multer ({storage:storage,fileFilter}).single('receipt');
app.get('/home',async(req,res)=>{
  let userID=req.header('userID')
  let token=req.header('token')
  jwt.verify(token ,'patient',async(err,decoded)=>{
    if(err){
      res.json({err});
    } else{
         req.userID = decoded.userID;
     
    let images=await diagonsticForm.find({ userID})
    res.json(images)
    }
  })
 
})

app.post('/upload',upload, auth ,async(req,res)=>{

 //console.log(req.file)
 const{userID,token}=req.body
 try{
  await diagonsticForm.insertMany({
    path:req.file.path,
   userID
   })
   res.json({message:"sucsses"})  
  // res.json({imageID:formUpload._id)
   //const{file}= req;
   // res.send({
   //   file:file.originalname,
   //   path:file.path,
  //})
}
 catch(error){
  res.json({error})
 }
})
app.delete('/deleteImage',async(req,res)=>{
  const{_id}=req.body;
  await diagonsticForm.findByIdAndDelete({_id})
  res.json({message:"deleted"})  
})
// // app.put('/updateImage',auth,async(req,res)=>{
// // const{_id}=req.body
// // //const{path}=req.file
// try{
// // await diagonsticForm.findOneAndUpdate({_id},
// //   {path:req.file.path}
// //   )
// // res.json({message:"updated"})
// // })
// }catch(error){
//   res.json({error})
// }


  

module.exports=app;
