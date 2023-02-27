import authMiddleware from "helper/middleware";
import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { orderById } from "controllers/order";

async function postHandler(req: NextApiRequest, res: NextApiResponse, token) {
  try {
    let { productId } = req.query as any;
    const body = req.body;
    const {pref,external_reference} = await orderById(productId,body,token);
    if(pref.msg) throw {msg:"No existe el producto"};
    res.json({
      url:pref.init_point,
      orderId:external_reference
    });
  } catch (error) {
    res.json(error)
  }

}

const handler = methods({
  post: postHandler,
});
// "https://mercadopago-pi.vercel.app/api/webhooks/mercadopago"
export default authMiddleware(handler);

