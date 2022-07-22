import { SettingsIcon } from "@chakra-ui/icons";
import { Flex, HStack, Button, Text, GridItem } from "@chakra-ui/react";
import { Channel } from "../../types/channel";

interface UpdateSettingsProps {
  channel: Channel;
}

export const UpdateSettingsCard = ({ channel }: UpdateSettingsProps) => {
  return (
    <GridItem>
      <Flex
        flex={1}
        borderColor="gray.300"
        backgroundColor={"gray.100"}
        borderWidth={1}
        borderRadius={15}
        m={10}
        flexDirection="column"
        alignItems={"center"}
        justifyContent="space-evenly"
        height="100%"
        px={2}
      >
        <Text>Guft happening in</Text>
        <Text fontWeight={"bold"}>{`#${channel.name}`}</Text>
        <HStack>
          <Text fontWeight={"bold"}>{`${channel.schedule} `}</Text>
          <Text>at</Text>
          <Text fontWeight="bold">
            {new Date(channel.time).toLocaleTimeString("hh:mm tt")}
          </Text>
        </HStack>
        <Button size={"sm"} leftIcon={<SettingsIcon />} colorScheme={"teal"}>
          Update Settings
        </Button>
      </Flex>
    </GridItem>
  );
};
