const mongoose=require("mongoose")

const connect=async()=>{
  mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('connected to mongodb')
  }).catch(()=>{
    console.log('mongodb connection error')
  })
}

module.exports=connect