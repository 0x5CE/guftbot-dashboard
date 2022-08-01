import { Flex, Heading, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BotApiClient, NextApiClient } from "../components/axios";
import { Navbar } from "../components/Navbar";
import { useTenant } from "../hooks/use-tenant";
import { CreateTenantDto } from "../types/create_tenant.dto";
import { Tenant } from "../types/tenant";
import { createTenantPayload } from "../util";

const Home: NextPage = () => {
  const router = useRouter();
  const [createTenantBody, setCreateTenantBody] =
    useState<CreateTenantDto | null>(null);

  useEffect(() => {
    if (router.query.code) {
      (async () => {
        const response = await NextApiClient.post("exchange", {
          code: router.query.code,
        })
          .then((res) => res.data.response)
          .catch((err) => {
            console.error(err.response.data);
          });

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
      const response = await BotApiClient.post<Tenant>(
        "tenant/add",
        createTenantBody
      );
      if (response.status >= 200 && response.status < 300) {
        localStorage.setItem("tenantId", response.data.id);
        console.log(response.data);
        if (response.data.__channels__.length == 0) {
          router.push("/onboarding");
        } else {
          router.push("/dashboard");
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createTenantBody]);

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
