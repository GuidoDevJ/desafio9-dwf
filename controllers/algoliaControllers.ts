import { base } from "lib/airtable";
import { products } from "lib/algolia";
import { Product } from "models/products";
import { NextApiRequest } from "next";
import { getLimitAndOffsetFromQuery } from "../helper/request";
export async function syncAlgolia() {
  let productsAirtable = [];
  try {
    base("Furniture")
      .select({})
      .eachPage(
        function page(records, fetchNextPage) {
          productsAirtable = records.map((record) => {
            return {
              objectID: record.id,
              ...record.fields,
            };
          });

          fetchNextPage();
        },
        async function done(err) {
          if (err) {
            return err;
          }
          await products.saveObjects(productsAirtable);
          return true;
        }
      );
    return true;
  } catch (error) {
    return error;
  }
}

export async function searchProducts(req: NextApiRequest) {
  const { limit, offset } = getLimitAndOffsetFromQuery(req, 10000, 10);
  const searchQuery = req.query.q as string;
  const results = await Product.getAllProductsByQuery(searchQuery,limit,offset) 
  return { results, offset, limit };
}


export async function getProductById(id:string){
  const product = new Product(id)
  try {
    await product.pullById()
    return {
      objectID: product.data.objectID,
      title: product.data["Name"],
      descripion: product.data["Description"],
      price: product.data["Unit cost"],
      images: product.data["Images"].map((img: any) => img.url),
      stock: product.data["In stock"] || false,
    }
  } catch (error) {
    return null
  }
    
}