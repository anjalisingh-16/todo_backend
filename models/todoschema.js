const mongoose=require("mongoose");
const data=new mongoose.Schema({
    heading:
    {
        type:String,
    

    },
    subheading:{
        type:String,
    
    },
    date:{
        type:String,
    
    },
})
const Task=new mongoose.model("task",data);
module.exports=Task;