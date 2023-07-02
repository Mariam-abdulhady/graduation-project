const mongoose =require('mongoose')
   const DiagnosticForm =mongoose.Schema({
   path:String,
  userID:mongoose.Schema.Types.ObjectId,
 //imageID:mongoose.Schema.Types.ObjectId
})
module.exports=mongoose.model('formUpload',DiagnosticForm)
