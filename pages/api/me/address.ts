import authMiddleware, { handlerCORS } from "helper/middleware"
import methods from "micro-method-router"
import type { NextApiRequest,NextApiResponse } from "next"
import { getData, updateAdress, updateData } from "controllers/user"
import * as yup from "yup"
const bodySchema = yup.object().shape({
    newAddress: yup.string().required(),
  });

async function patchAddress(req:NextApiRequest,res:NextApiResponse,token){
    const body = req.body
    console.log(token)
    try {
        let validate = await bodySchema.validate(body)
    } catch (error) {
        res.status(400).send(error.errors[0])
    }

    try {
        await updateAdress(token,body.newAddress)
        res.json({msg:"success"})
    } catch (error) {
        res.json({msg:error})
    }
    

} 
  
const handler = methods({
    patch:patchAddress
})

const authMidd = authMiddleware(handler)
export default handlerCORS(authMidd)