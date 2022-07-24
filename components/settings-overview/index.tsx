import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useChannel } from "../../hooks/use-channel";
import { Schedule } from "../schedule";

export const SettingsOverview = () => {
  const { channelId: chId } = useRouter().query;
  const [channelId, setChannelId] = useState(chId);
  const {
    data: channel,
    isLoading,
    isError,
    error,
  } = useChannel(channelId as string);

  useEffect(() => {
    console.log({ channel });
  }, [channel]);

  useEffect(() => {
    if (chId) {
      setChannelId(chId);
    }
  }, [chId]);

  return (
    <Box>
      <HStack backgroundColor="gray.100" p={5} ml={3} my={10}>
        <Text fontSize={" 3xl"}>Guft is happening </Text>
        <Text fontSize={"3xl"} fontWeight={"black"} textDecoration="underline">
          {`${channel?.schedule.toLowerCase()} ${
            channel
              ? new Date(channel.time).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""
          }`}
        </Text>
        <Text fontSize={" 3xl"}>in </Text>
        <Text fontSize={"3xl"} fontWeight={"black"} textDecoration="underline">
          {`#${channel?.name}`}
        </Text>
      </HStack>

      <Heading>
        The next {`${channel?.questionsQueue.length}`} upcoming Guft messages!
      </Heading>
      {!isLoading && !isError && channel && (
        <Schedule questions={channel.questionsQueue} />
      )}
    </Box>
  );
};
