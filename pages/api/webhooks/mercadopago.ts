import { NextApiRequest, NextApiResponse } from "next"
import methods from "micro-method-router"
import { checkMerchantOrders } from "lib/mercadopago"
import { Order } from "models/orders"
import { sendStatusPay } from "helper/sendEmailPay"
const postHandler=async (req:NextApiRequest,res:NextApiResponse)=>{
    const {id,topic} = req.query
    if(topic=="merchant_order"){
        let order = await checkMerchantOrders(id.toString())
        console.log(order)
        if(order.order_status =="paid"){
            const orderId = order.external_reference
            let myOrder = new Order(orderId)
            await myOrder.pull()
            myOrder.data.status ="closed",
            await myOrder.push()
            // ENVIAR CORREO AL USUARIO
            let sent = await sendStatusPay(myOrder.data.userId,myOrder.data.status,orderId)
            // ENVIAR CORREO INTERNO
            res.json(order)
        }
    }
   
    
}

const handler = methods({
    post:postHandler
})

export default handler