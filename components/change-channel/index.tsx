import { Flex, Heading, Select, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { BotApiClient, NextApiClient } from "../axios";
import {
  accessTokenSelector,
  joinedChannelIdsSelector,
  tenantState,
} from "../states";
import { ChannelsListResponse } from "@slack/web-api";
import { Channel } from "@slack/web-api/dist/response/AdminUsergroupsListChannelsResponse";
import { UpdateChannelNameDto } from "../../types/update_channel_name";
import { useRouter } from "next/router";
import { Tenant } from "../../types/tenant";
import { useQueryClient } from "@tanstack/react-query";

const ChangeChannel = () => {
  const [channel, setChannel] = useState<Channel | null>(null);
  const [availableChannels, setAvailableChannels] = useState<Channel[]>([]);
  const accessToken = useRecoilValue(accessTokenSelector);
  const joinedChannels = useRecoilValue(joinedChannelIdsSelector);
  const { channelId } = useRouter().query;
  const [_, setTenant] = useRecoilState(tenantState);
  const queryClient = useQueryClient();

  const handleUpdateClick = () => {
    const updateChannelNameDto: UpdateChannelNameDto = {
      id: channelId as string,
      slack_id: channel?.id as string,
      name: channel?.name as string,
    };

    BotApiClient.put<Tenant>("/channel/name", updateChannelNameDto)
      .then((res) => res.data)
      .then((tenant) => {
        setTenant(tenant);
        localStorage.setItem("tenant", JSON.stringify(tenant));
        queryClient.invalidateQueries([`channel-${channelId}`]);
      });
  };

  const fetchChannels = () => {
    return NextApiClient.post<ChannelsListResponse>("channel_list", {
      accessToken,
    }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        const channels = res.data.channels;

        if (channels) {
          setAvailableChannels(() => {
            return channels.filter(
              (c) => !joinedChannels.includes(c.id as string)
            );
          });
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
      <Button disabled={!channel} onClick={handleUpdateClick}>
        Update
      </Button>
    </Flex>
  );
};

export { ChangeChannel };
