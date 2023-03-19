import { sendCode } from "controllers/auth";
import * as yup from "yup";
import type { NextApiRequest, NextApiResponse } from "next";
import { schemaMiddleware } from "lib/yupValidation";
import { handlerCORS } from "helper/middleware";


let authSchema = yup
  .object()
  .shape({
    email: yup.string().required(),
  })
  .noUnknown()
  .strict();

async function handlerAuth(req: NextApiRequest, res: NextApiResponse) {
  let email = req.body.email;
  let user = await sendCode(email);
  res.json({
    user: user.data,
  });
}
const handler = schemaMiddleware(authSchema as any, handlerAuth, "body");
export default handlerCORS(handler)
