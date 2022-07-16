import { app } from "../components/slack-app";

export const oauthExchangeCode = (code: string) => {
  return app.client.oauth.v2.access({
    client_id: process.env.CLIENT_ID as string,
    client_secret: process.env.CLIENT_SECRET as string,
    code: code,
  });
};
