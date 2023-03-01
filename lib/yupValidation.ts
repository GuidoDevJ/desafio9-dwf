import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";


export function schemaMiddleware(
    yupSchema: yup.AnyObjectSchema,
    callback,
    dataLocation: "body" | "query"
  ) {
    return async function (req: NextApiRequest, res: NextApiResponse,token) {
      try {
        await yupSchema.validate(req[dataLocation]);
      } catch (err) {
        return res.status(400).send({ field: dataLocation, err: err.errors[0] });
      }
      callback(req, res,token);
    };
  }
