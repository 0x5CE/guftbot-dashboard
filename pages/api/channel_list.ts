import { NextApiRequest, NextApiResponse } from "next";
import { app } from "../../components/slack-app";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await app.client.conversations.list({
    token: req.body.access_token,
  });
  res.json(response);
}
