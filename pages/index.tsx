import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { oauthExchangeCode } from "../api/oauth_exchange_code";
import { NextApiClient } from "../components/axios";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.code) {
      (async () => {
        const response = await NextApiClient.post("exchange", {
          code: router.query.code,
        });
        console.log(response.data);
      })();
    }
  }, [router.query]);

  return <div>Hello World</div>;
};

export default Home;
