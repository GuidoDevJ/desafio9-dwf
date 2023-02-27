import { getProductById } from "controllers/algoliaControllers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    let idProduct = req.query.id as string;
    let product = await getProductById(idProduct);
    if(product === null) throw {error:"product not found"}
    res.json(product);
  } catch (error) {
    res.status(404).json({msg:error.error});
  }
}
