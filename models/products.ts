import { SearchIndex } from "algoliasearch";
import { products } from "lib/algolia";


export class Product {
  id: string;
  data: any;
  constructor(id:string) {
    this.id = id;
  }
  async pullById() {
    const data = await products.getObject(this.id);
    this.data = data 
  }
static async getAllProductsByQuery(searchQuery:string,limit,offset){
    try {
        const results = await products.search(searchQuery as string, {
            offset: offset,
            length: limit,
          });
          return results;
    } catch (error) {
        return error
    }
    
}
static async getAll() {
  let hits = [];
  await products.browseObjects({
    query: "", // Empty query will match all records

    batch: (batch) => {
      console.log(batch)
      hits = hits.concat(batch);
    },
  });
  
  
  return  hits;
 
}

}
