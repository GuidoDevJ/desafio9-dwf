import { handlerCORS } from "helper/middleware";
import { Product } from "models/products";
import { NextApiRequest, NextApiResponse } from "next";

async function getAll(req:NextApiRequest,res:NextApiResponse){
    let result = await Product.getAll()
    res.json(result)
}

export default handlerCORS(getAll)
