import mongoose from "mongoose";

const todoSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    }
},{timestamps:true})



export default mongoose.model("todo",todoSchema)