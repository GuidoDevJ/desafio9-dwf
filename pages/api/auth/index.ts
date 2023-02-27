import { sendCode } from "controllers/auth"
import { User } from "models/user"
import methods from "micro-method-router"
import * as yup from "yup"
import type { NextApiRequest,NextApiResponse } from "next"

let authSchema = yup.object().shape({
    email: yup.string().required(),
})


export default methods({
    async post(req:NextApiRequest,res:NextApiResponse){
        let email = req.body
        try {
            let validate = await authSchema.validate(email)
            let user = await sendCode(validate.email)
            res.json({
               user:user.data
            })
        } catch (error) {
            res.status(400).json({error:error.errors[0]})
        }
    }
})