import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import { Schedule } from "../schedule";

export const SettingsOverview = () => {
  return (
    <Box>
      <HStack backgroundColor="gray.100" p={5} ml={3} my={10}>
        <Text fontSize={" 3xl"}>Guft is happening </Text>
        <Text fontSize={"3xl"} fontWeight={"black"} textDecoration="underline">
          every other weekday 01:13 pm{" "}
        </Text>
        <Text fontSize={" 3xl"}>in </Text>
        <Text fontSize={"3xl"} fontWeight={"black"} textDecoration="underline">
          #general
        </Text>
      </HStack>

      <Heading>The next 4 upcoming Guft messages!</Heading>
      <Schedule />
    </Box>
  );
};
