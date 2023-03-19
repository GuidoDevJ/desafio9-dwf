import { NextApiRequest,NextApiResponse } from "next"
import { getLimitAndOffsetFromQuery } from "../../../helper/request"

const getLista=()=>{
    let listas = [...Array(10000).keys() as any]
    return listas.map((val,index)=>{
        return {
            index:val
        }
    })
}



export default function(req:NextApiRequest,res:NextApiResponse){
    let lista = getLista()
    let {limit,offset} = getLimitAndOffsetFromQuery(req,lista.length,20)
    let shrinkList = lista.slice(offset,offset+limit)
    res.send({
        results:shrinkList,
        pagination:{
            limit,
            offset,
            total:lista.length
        }
    })
}