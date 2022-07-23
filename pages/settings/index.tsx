import { Box, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { NavItems } from "../../components/nav-items";
import { Navbar } from "../../components/Navbar";
import { SettingsTabs } from "../../components/settings-content";
import { Sidebar } from "../../components/sidebar";

const Settings: NextPage = () => {
  return (
    <>
      <Navbar>
        <Heading textTransform={"lowercase"}>guft Bot</Heading>
        <NavItems />
      </Navbar>
      <Box display={"flex"}>
        <Sidebar />
        <Box flex="1">
          <SettingsTabs />
        </Box>
      </Box>
    </>
  );
};

export default Settings;