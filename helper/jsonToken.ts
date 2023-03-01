import jwt from "jsonwebtoken"
const secret = process.env.SECRET_PASS

export function generateToken(obj){
    return jwt.sign(obj, secret);
}

export function decodeToken(token){
    
    try {
      return jwt.verify(token,process.env.SECRET_PASS)
      } catch(err) {
        console.error("token invalido")
        return false
      }
}