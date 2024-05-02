import jwt from "jsonwebtoken"

const protectRoutes=(request,response,next)=>{
    try {
        const token= request.cookies.jwt
        if (!token) {
            return response.status(404).send({message:"Not authorized - No token Provided"})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return response.status(404).send({message:"Not authorized - Invalid token"})
        }
        next()
    } catch (error) {
        console.log(`Error in protectRoutes middleware : ${error.message}`);
        response.status(404).send({message:error.message})
    }
}

export default protectRoutes