import { Order } from "models/orders";
import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router"
import authMiddleware from "helper/middleware";
  async function handlerGetAllOrders(req:NextApiRequest,res:NextApiResponse,token:string){
    try {
        let results = await Order.getAllOrdersByUserId(token) as any
        if (results.msg) throw {msg:results.msg}
        res.status(201).json(results)
    } catch (error) {
        res.status(404).json({msg:error.msg})
    }
   
}

const handler = methods({
    get:handlerGetAllOrders
})

export default authMiddleware(handler)