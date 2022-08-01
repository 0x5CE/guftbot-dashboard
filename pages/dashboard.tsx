import { Box, Grid, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { NavItems } from "../components/nav-items";
import { Navbar } from "../components/Navbar";
import { UpdateSettingsCard } from "../components/update-settings-card";
import { AddChannelCard } from "../components/add-channel-card";
import { useRouter } from "next/router";
import { Tenant } from "../types/tenant";
import { useEffect, useState } from "react";
import { useTenant } from "../hooks/use-tenant";

const Dashboard: NextPage = () => {
  const [tenantId, setTenantId] = useState("");
  const { data: tenant } = useTenant(tenantId ? tenantId : "");
  const router = useRouter();

  useEffect(() => {
    const tId = localStorage.getItem("tenantId");
    if (!tId) {
      return;
    }
    setTenantId(tId);
  }, []);

  return (
    <div>
      <Navbar>
        <Heading textTransform={"lowercase"}>guft Bot</Heading>
        <NavItems />
      </Navbar>
      <Box mt={10}>
        <Heading textAlign={"center"} fontSize="5xl">
          Your guft bot channels
        </Heading>

        <Grid
          templateColumns="repeat(2, 1fr)"
          gridAutoRows={"1fr"}
          gap={6}
          ml={20}
          mr={20}
        >
          {tenant &&
            tenant.__channels__ &&
            tenant.__channels__.length > 0 &&
            tenant.__channels__.map((channel, index) => (
              <UpdateSettingsCard key={index} channel={channel} />
            ))}
          <AddChannelCard />
        </Grid>
      </Box>
    </div>
  );
};

export default Dashboard;
