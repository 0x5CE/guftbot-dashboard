import { Flex, Heading, Select, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { NextApiClient } from "../axios";
import { accessTokenSelector } from "../states";
import { ChannelsListResponse } from "@slack/web-api";
import { Channel } from "@slack/web-api/dist/response/AdminUsergroupsListChannelsResponse";

const ChangeChannel = () => {
  const [channel, setChannel] = useState<Channel | null>(null);
  const [availableChannels, setAvailableChannels] = useState<Channel[]>([]);
  const accessToken = useRecoilValue(accessTokenSelector);

  const fetchChannels = () => {
    return NextApiClient.post<ChannelsListResponse>("channel_list", {
      accessToken,
    }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        const channels = res.data.channels;
        if (channels) {
          setAvailableChannels(channels);
        }
      }
    });
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  return (
    <Flex
      flexDir={"column"}
      justifyContent="center"
      alignItems={"center"}
      mt={5}
    >
      <Heading>Pick the channel you want to add Banter</Heading>
      <Text textAlign={"center"}>
        We recommend adding Banter to a channel that is already used for small
        talk and getting to know each other. #random or #general are usually
        good fits.
      </Text>
      <Select
        placeholder={"Select a channel to get started..."}
        onChange={(e) =>
          setChannel(availableChannels[parseInt(e.target.value)])
        }
        width="50%"
        my={5}
      >
        {availableChannels.map((channel, index) => {
          return (
            <option key={index} value={index}>{`#${channel.name}`}</option>
          );
        })}
      </Select>
      <Button disabled={!channel}>Update</Button>
    </Flex>
  );
};

export { ChangeChannel };
