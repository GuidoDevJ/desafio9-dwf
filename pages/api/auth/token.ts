import methods from "micro-method-router"
import type { NextApiRequest,NextApiResponse } from "next"
import { checkEmailAndCode } from "controllers/auth"
import { generateToken } from "helper/jsonToken"
import { handlerCORS } from "helper/middleware"
const hanlder =  methods({
    async post(req:NextApiRequest,res:NextApiResponse){
        const {email,code} = req.body
        const data:any = await checkEmailAndCode(email,code)
       if(data===null){
        res.status(400).json({msg:"No coinciden el email y el code proporcionado"})
       }
        if(!data){
            res.status(401).json({
                msg:"Ojo ocurrio un error tal vez el codigo ya vencio"
            })
        }else{
            let token = generateToken(data.userId)
            res.status(201).json({token})
        }        
    }
})

export default handlerCORS(hanlder)
