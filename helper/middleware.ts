import { NextApiRequest, NextApiResponse } from "next"
import parseBearerToken from 'parse-bearer-token'
import { decodeToken } from "./jsonToken"
import NextCors from 'nextjs-cors';


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
export function handlerCORS(callback) {
    return async function (req: NextApiRequest, res: NextApiResponse) {
      // Run the cors middleware
      // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
      await NextCors(req, res, {
        // Options
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
      });
  
      // Rest of the API logic
      callback(req, res);
      //res.json({ message: "Hello NextJs Cors!" });
    };
  }
  