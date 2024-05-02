import mongoose from "mongoose";
import Todo from "..//models/todo.model.js"

export const getAllTodos=async(request,response)=>{
    try {
        const todos = await Todo.find({})
        if(todos){
            response.status(200).send(todos)
        }
    } catch (error) {
        console.log(`Error in getAllTodo : ${error.message}`);
        response.status(404).send({message: "Internal Server Error"})
    }
}
export const getSingleTodo=async(request,response)=>{
    try {
        const {id}=request.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(404).send({message:"Is valid id"})
        }
        const seachingTodo=await Todo.findById({_id:id})
        if (!seachingTodo) {
            return response.status(404).send({message:"No such Todo"})
        }
        response.status(200).send(seachingTodo)

    } catch (error) {
        console.log(`Error in getSingleTodo : ${error.message}`);
        response.status(404).send({message: "Internal Server Error"})
    }
}
export const createTodo=async(request,response)=>{
    try {
        const {title}=request.body
        if(!title){
            return response.status(404).send({message:"Fill all fields"})
        }
        const newTodo=await Todo.create({title})
        response.status(200).send(newTodo)
    
    } catch (error) {
        console.log(`Error in createTodo : ${error.message}`);
        response.status(404).send({message: "Internal Server Error"})
    }
}
export const deleteTodo=async(request,response)=>{
    try {
        const {id}=request.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(404).send({message:"Is valid id"})
        }
        const seachingTodo=await Todo.findByIdAndDelete({_id:id})
        if (!seachingTodo) {
            return response.status(404).send({message:"No such Todo"})
        }
        response.status(200).send(seachingTodo)

    } catch (error) {
        console.log(`Error in deleteTodo : ${error.message}`);
        response.status(404).send({message: "Internal Server Error"})
    }
}
export const updateTodo=async(request,response)=>{
    try {
        const {id}=request.params
        const {title}=request.body
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(404).send({message:"Is valid id"})
        }
        const seachingTodo=await Todo.findByIdAndUpdate({_id:id},{title})
        if (!seachingTodo) {
            return response.status(404).send({message:"No such Todo"})
        }
        response.status(200).send(seachingTodo)

    } catch (error) {
        console.log(`Error in updateTodo : ${error.message}`);
        response.status(404).send({message: "Internal Server Error"})
    }
}