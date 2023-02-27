import authMiddleware from "helper/middleware"
import methods from "micro-method-router"
import type { NextApiRequest,NextApiResponse } from "next"
import { getData, updateAdress, updateData } from "controllers/user"
import * as yup from "yup"
const bodySchema = yup.object().shape({
    newAddress: yup.string().required(),
  });


const handler = methods({
    async patch(req:NextApiRequest,res:NextApiResponse,token){
        const body = req.body
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
})

export default authMiddleware(handler)