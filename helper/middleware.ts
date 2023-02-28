import { NextApiRequest, NextApiResponse } from "next"
import parseBearerToken from 'parse-bearer-token'
import { decodeToken } from "./jsonToken"

export default function authMiddleware(callback?){
    return function(req:NextApiRequest,res:NextApiResponse){
        const token = parseBearerToken(req)
        if(token === null){
            return res.status(401).send({ message: "token required" });

        }

        const decoded = decodeToken(token)
        if(!decoded){
            return res.status(401).send({ message: "invalid token" });
        }
        callback(req,res,decoded)
    }
}