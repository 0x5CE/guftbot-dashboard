import { Flex, Heading, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { NextApiClient } from "../components/axios";
import { Navbar } from "../components/Navbar";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.code) {
      (async () => {
        const response = await NextApiClient.post("exchange", {
          code: router.query.code,
        });
      })();
    }
  }, [router.query]);

  return (
    <div>
      <Navbar>
        <Heading textTransform={"lowercase"}>guft Bot</Heading>
      </Navbar>
      <Flex mt={20}>
        <Flex
          direction="column"
          alignItems={"center"}
          flex={1}
          p={25}
          borderRightWidth={1}
          borderRightColor="gray.400"
        >
          <Text mb={10} fontSize={"2xl"} textAlign="center">
            If you haven&apos;t yet added the app to Slack, click on Add to
            Slack to get started!
          </Text>
          <Link href="https://slack.com/oauth/v2/authorize?client_id=2964626451557.3801398660102&scope=channels:join,chat:write,im:history,channels:history,channels:manage,channels:read,groups:read,im:write,users:read.email,users:read&user_scope=identity.basic&amp;redirect_uri=https%3A%2F%2F3b50-2400-adc7-93b-7400-00-2.ngrok.io%2Fadd&amp;">
            <Image
              alt="Add to Slack"
              height="40"
              width="139"
              src="https://platform.slack-edge.com/img/add_to_slack.png"
            />
          </Link>
        </Flex>
        <Flex direction={"column"} alignItems={"center"} flex={1} p={25}>
          <Text mb={10} fontSize={"2xl"} textAlign="center">
            If you already are registered with Guft Bot, sign in with slack to
            access dashboard
          </Text>
          <Link href="https://slack.com/openid/connect/authorize?scope=openid&amp;response_type=code&amp;redirect_uri=https%3A%2F%2F3b50-2400-adc7-93b-7400-00-2.ngrok.io%2Flogin&amp;client_id=2964626451557.3801398660102">
            <Image
              alt="Sign in with Slack"
              height="40"
              width="139"
              src="https://platform.slack-edge.com/img/sign_in_with_slack@2x.png"
            />
          </Link>
        </Flex>
      </Flex>
    </div>
  );
};

export default Home;
