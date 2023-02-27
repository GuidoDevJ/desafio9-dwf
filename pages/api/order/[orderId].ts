import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router"
import authMiddleware from "helper/middleware";
import { getOrderById } from "controllers/order";

async function handlerGetAnOrder(req:NextApiRequest,res:NextApiResponse){
    let id = req.query.orderId
    let order = await getOrderById(id)
    if(order === null){
        res.status(404).json({msg:"La orden no se encuentra"})
    }
    res.json({order})
}

const handler = methods({
    get:handlerGetAnOrder
})

export default authMiddleware(handler)