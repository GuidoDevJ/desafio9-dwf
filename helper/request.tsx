import { NextApiRequest,NextApiResponse } from "next"

export const getLimitAndOffsetFromQuery =(req:NextApiRequest,maxOffset:number,maxLimit:number)=>{
    let queryLimit = parseInt (req.query.limit as string)
    let queryOffset =parseInt(req.query.offset as string) 
    let limit = queryLimit <=maxLimit ? queryLimit : maxLimit
    let offset = queryOffset < maxOffset ? queryOffset : 0
    return{
        limit,
        offset
    }
}
