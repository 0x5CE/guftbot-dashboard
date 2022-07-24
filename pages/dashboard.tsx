import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { NavItems } from "../components/nav-items";
import { Navbar } from "../components/Navbar";
import { tenantState } from "../components/states";
import { UpdateSettingsCard } from "../components/update-settings-card";
import { AddChannelCard } from "../components/add-channel-card";

const Dashboard: NextPage = () => {
  const [tenant, _] = useRecoilState(tenantState);

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
            tenant.__channels__.map((channel) => (
              <UpdateSettingsCard channel={channel} />
            ))}
          <AddChannelCard />
        </Grid>
      </Box>
    </div>
  );
};

export default Dashboard;
