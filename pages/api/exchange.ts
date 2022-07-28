import { NextApiRequest, NextApiResponse } from "next";
import { oauthExchangeCode } from "../../api/oauth_exchange_code";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await oauthExchangeCode(req.body.code);
  console.log("got this", response.access_token);
  res.json({ response });
}
