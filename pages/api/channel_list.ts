import { NextApiRequest, NextApiResponse } from "next";
import { app } from "../../components/slack-app";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Using this");
  console.log(req.body.accessToken);
  const response = await app.client.conversations.list({
    token: req.body.accessToken,
  });
  res.json(response);
}
