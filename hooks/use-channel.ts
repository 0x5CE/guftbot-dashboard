import { useQuery } from "@tanstack/react-query";
import { BotApiClient } from "../components/axios";
import { Channel } from "../types/channel";

export const useChannel = (channelId: string) => {
  const fetchChannel = (channelId: string) => {
    return BotApiClient.get<Channel>(`/channel?id=${channelId}`).then(
      (res) => res.data
    );
  };
  return useQuery(["channel"], () => fetchChannel(channelId), {
    enabled: !!channelId,
  });
};