import { sendCode } from "controllers/auth";
import * as yup from "yup";
import type { NextApiRequest, NextApiResponse } from "next";
import { schemaMiddleware } from "lib/yupValidation";


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

// const handler: any = methods ({
//     post: (handlerAuth)=>authMiddleware(handlerAuth),
//  })

// const middleware = authMiddleware(handler)

export default schemaMiddleware(authSchema as any, handlerAuth, "body");
