import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { SettingsOverview } from "../settings-overview";

const SettingsTabs = () => {
  return (
    <Tabs variant="line" colorScheme={"teal"}>
      <TabList>
        <Tab>Overview</Tab>
        <Tab>Change Channel</Tab>
        <Tab>Change Topics</Tab>
        <Tab>Change Schedule</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <SettingsOverview />
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export { SettingsTabs };
