import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { searchProducts } from "controllers/algoliaControllers";
import { schemaMiddleware } from "lib/yupValidation";
import * as yup from "yup"
import { handlerCORS } from "helper/middleware";
const schemaQueryLimitAndOffser = yup.object().shape({
  q:yup.string().required(),
  offset:yup.string(),
  limit:yup.string()
}).noUnknown(true).strict()

async function search(req: NextApiRequest, res: NextApiResponse) {
  console.log(req)
  try {
    let { results, offset, limit } = await searchProducts(req);
    console.log(results)
    res.json({
      results: results.hits.map((p) => {
        return {
          objectID: p.objectID,
          title: p["Name"],
          descripion: p["Description"],
          price: p["Unit cost"],
          images: p["Images"].map((img: any) => img.url),
          stock: p["In stock"] || false,
        };
      }),
      pagination: {
        limit,
        offset,
        total: results.nbHits,
      },
    });
  } catch (error) {
    res.status(402).json({ msg: "Ocurrio un error" });
  }
}


const schemaSearch = schemaMiddleware(schemaQueryLimitAndOffser as any,search,"query")


let handler = methods({
  get: schemaSearch,
});

export default handlerCORS(handler);
