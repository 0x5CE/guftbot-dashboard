import { Box, Button, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useChannel } from "../../hooks/use-channel";
import { QueuedQuestions } from "../../types/question";
import { Schedule } from "../schedule";

export const SettingsOverview = () => {
  const { channelId: chId } = useRouter().query;
  const [channelId, setChannelId] = useState(chId);
  const [questions, setQuestions] = useState<QueuedQuestions[]>([]);
  const {
    data: channel,
    isLoading,
    isError,
    error, // TODO: use this to show errors
  } = useChannel(channelId as string);

  useEffect(() => {
    if (!isLoading && !isError && channel) {
      setQuestions(channel.questionsQueue);
    }
  }, [channel, isLoading, isError]);

  useEffect(() => {
    if (chId) {
      setChannelId(chId);
    }
  }, [chId]);

  const [unsavedChanges, setUnsavedChanges] = useState(false);

  return (
    <Box>
      <Flex alignItems={"center"}>
        <HStack backgroundColor="gray.100" p={5} ml={3} my={10} flex="1">
          <Text fontSize={" 3xl"}>Guft is happening </Text>
          <Text
            fontSize={"3xl"}
            fontWeight={"black"}
            textDecoration="underline"
          >
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
          <Text
            fontSize={"3xl"}
            fontWeight={"black"}
            textDecoration="underline"
          >
            {`#${channel?.name}`}
          </Text>
        </HStack>
        <Button disabled={!unsavedChanges} colorScheme={"teal"} m={10}>
          Save Changes
        </Button>
      </Flex>

      <Heading>
        The next {`${channel?.questionsQueue.length}`} upcoming Guft messages!
      </Heading>
      {unsavedChanges && (
        <Text ml={3} fontSize="sm" color={"GrayText"}>
          *unsaved changes made to the queue
        </Text>
      )}
      {!isLoading && !isError && questions.length > 0 && (
        <Schedule
          setUnsavedChanges={setUnsavedChanges}
          questions={questions}
          setQuestions={setQuestions}
        />
      )}
    </Box>
  );
};
