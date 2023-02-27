import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { searchProducts } from "controllers/algoliaControllers";

async function search(req: NextApiRequest, res: NextApiResponse) {
  try {
    let { results, offset, limit } = await searchProducts(req);
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

let handler = methods({
  get: search,
});

export default handler;
