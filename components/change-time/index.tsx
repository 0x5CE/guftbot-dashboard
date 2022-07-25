import { Flex, Heading, HStack, Select, Input, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useChannel } from "../../hooks/use-channel";
import { possibleSchedules } from "../select-time";

export const ChangeTime = () => {
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const { channelId: chId } = useRouter().query;
  const [channelId, setChannelId] = useState(chId);

  const {
    data: channel,
    isLoading,
    isError,
    error, // TODO: use this to show errors
  } = useChannel(channelId as string);

  useEffect(() => {
    if (chId) {
      setChannelId(chId);
    }
  }, [chId]);

  useEffect(() => {
    if (!isLoading && !isError && channel) {
      setSelectedTime(new Date(channel.time));
      setSelectedSchedule(channel.schedule);
    }
  }, [channel, isLoading, isError]);

  return (
    <Flex
      flexDir={"column"}
      justifyContent="center"
      alignItems={"center"}
      mt={5}
    >
      <Heading>Set the schedule for which you want to receive messages</Heading>
      <HStack my={5}>
        <Select
          placeholder={"Select Frequency"}
          value={selectedSchedule}
          onChange={(e) => {
            setSelectedSchedule(e.target.value);
            !unsavedChanges && setUnsavedChanges(true);
          }}
        >
          {possibleSchedules.map((schedule) => {
            return (
              <option key={schedule} value={schedule}>
                {schedule}
              </option>
            );
          })}
        </Select>
        <Input
          type={"time"}
          onChange={(e) => {
            setSelectedTime(e.target.valueAsDate);
            !unsavedChanges && setUnsavedChanges(true);
          }}
          value={
            selectedTime
              ?.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })
              .split(" ")[0]
          }
        ></Input>
      </HStack>
      <Button
        disabled={!selectedSchedule || !selectedTime || !unsavedChanges}
        onClick={() => {}}
      >
        Update
      </Button>
    </Flex>
  );
};
