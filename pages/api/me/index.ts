import authMiddleware, { handlerCORS } from "helper/middleware"
import methods from "micro-method-router"
import type { NextApiRequest,NextApiResponse } from "next"
import { getData, updateData } from "controllers/user"
import { schemaMiddleware } from "lib/yupValidation"
import * as yup from "yup"

const userChema = yup.object().shape({
    address:yup.string(),
    ciudad:yup.string(),
    email:yup.string(),
    nombre:yup.string(),
    telefono:yup.number()
}).noUnknown(true).strict()

async function  getUserData(req:NextApiRequest,res:NextApiResponse,token){
    let data = await getData(token)
     res.json({
         ...data
     })
 }

 async function updateUserData(req:NextApiRequest,res:NextApiResponse,token){
    const body = req.body
    try {
        console.log(token)
        await updateData(token,body)
    res.send({msg:"success"})
    } catch (error) {
        res.send({msg:error})
    }
    

} 

const controllerSchema = schemaMiddleware(userChema as any,updateUserData,"body")


const handler = methods({
    get:getUserData,
    patch:controllerSchema
   
})

const authMiddlewarePass = authMiddleware(handler);


export default handlerCORS(authMiddlewarePass);
