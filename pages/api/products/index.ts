import { Product } from "models/products";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getAll(req:NextApiRequest,res:NextApiResponse){
    let result = await Product.getAll()
    res.json(result)
}