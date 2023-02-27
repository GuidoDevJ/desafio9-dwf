import authMiddleware from "helper/middleware"
import methods from "micro-method-router"
import type { NextApiRequest,NextApiResponse } from "next"
import { getData, updateData } from "controllers/user"

const handler = methods({
    async get(req:NextApiRequest,res:NextApiResponse,token){
       let data = await getData(token)
        res.json({
            ...data
        })
    },
    async patch(req:NextApiRequest,res:NextApiResponse,token){
        const body = req.body
        try {
            await updateData(token,body)
        res.json({msg:"success"})
        } catch (error) {
            res.json({msg:error})
        }
        

    } 
})

export default authMiddleware(handler)