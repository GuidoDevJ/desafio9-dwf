import { syncAlgolia } from "controllers/algoliaControllers";
import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router"
import { handlerCORS } from "helper/middleware";

async function sync(req: NextApiRequest, res: NextApiResponse) {
  const sync = await syncAlgolia();
  if(sync){
      res.status(200).json(sync)
  }else{
    res.status(401).json({msg:"Ocurrio un error"})
  }
}
let handler = methods({
    post:sync
})

export default handlerCORS(handler)


