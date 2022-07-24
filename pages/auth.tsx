import { Flex, Heading, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { BotApiClient, NextApiClient } from "../components/axios";
import { Navbar } from "../components/Navbar";
import { tenantState } from "../components/states";
import { CreateTenantDto } from "../types/create_tenant.dto";
import { createTenantPayload } from "../util";

const Home: NextPage = () => {
  const router = useRouter();
  const [createTenantBody, setCreateTenantBody] =
    useState<CreateTenantDto | null>(null);

  const [tenant, setTenant] = useRecoilState(tenantState);

  useEffect(() => {
    if (router.query.code) {
      (async () => {
        const response = await NextApiClient.post("exchange", {
          code: router.query.code,
        }).then((res) => res.data.response);

        if (!response || !response.ok) {
          router.push("/error");
          return;
        }
        setCreateTenantBody(createTenantPayload(response));
      })();
    }
  }, [router, router.query]);

  useEffect(() => {
    if (!createTenantBody) {
      return;
    }
    (async () => {
      const response = await BotApiClient.post("tenant/add", createTenantBody);
      if (response.status >= 200 && response.status < 300) {
        setTenant(response.data);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createTenantBody]);

  useEffect(() => {
    if (!tenant) {
      return;
    }
    router.push("/onboarding");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenant]);

  return (
    <div>
      <Navbar>
        <Heading textTransform={"lowercase"}>guft Bot</Heading>
      </Navbar>
      <Flex mt={20} justifyContent={"center"} alignItems={"center"}>
        <Heading>Redirecting...</Heading>
      </Flex>
    </div>
  );
};

export default Home;
