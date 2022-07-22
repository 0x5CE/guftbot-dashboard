import { NextApiRequest, NextApiResponse } from "next";
import { oauthExchangeCode } from "../../api/oauth_exchange_code";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body.code);
  const response = await oauthExchangeCode(req.body.code);
  res.json({ response });
}
