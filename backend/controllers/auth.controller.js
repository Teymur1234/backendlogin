import User from "..//models/user.model.js"
import bcrypt from "bcrypt"

import {generateTokenandsetCookie} from "..//utils/generateTokenandsetCookie.js" 

export const signup=async(request,response)=>{
    try {
    const {username,password,confirmPassword,fullname}=request.body;
    if (!username || !password || !confirmPassword || !fullname) {
        return response.status(404).send({message:"Please fill all fields"})
    }

    const user= await User.findOne({username});
    if (user) {
        return response.status(404).send({message:"User already exist"})
    }

    if (confirmPassword!==password) {
        return response.status(404).send({message:"Password and confirm password is not equal"})
    }
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    const newUser=await User.create({username,password:hashedPassword,fullname})
    generateTokenandsetCookie(newUser._id,response)
    response.status(200).send(newUser)
    } catch (error) {
        console.log(`Error in signup controller ${error.message}`);
        response.status(404).send("Internal server error")    
    }
}
export const login=async(request,response)=>{
    try {
        const {username ,password}=request.body
        if (!username || !password) {
            return response.status(404).send({message:"Please fill all fileds"})
        }

        const user=await User.findOne({username})

        if (!user) {
            return response.status(404).send({message:"Password or email is not correct"})
        }
        const isCorrectPassword=await bcrypt.compare(password,user.password)
        if (!isCorrectPassword) {
            return response.status(404).send({message:"Email or password is not correct"})
        }
        generateTokenandsetCookie(user._id,response)
        response.status(201).send(user)
    } catch (error) {
        console.log(`Error in login controller ${error.message}`);
        response.status(404).send("Internal server error")    
    }
}
export const logout=async(request,response)=>{
    try {
        response.cookie("jwt","")
        response.status(200).send({message:"You log out succesfully"})
    } catch (error) {
        console.log(`Error in logout controller ${error.message}`);
        response.status(404).send("Internal server error")
    }
}