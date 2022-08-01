import { useQuery } from "@tanstack/react-query";
import { BotApiClient } from "../components/axios";
import { Tenant } from "../types/tenant";

export const useTenant = (tenantId: string) => {
  const fetchTenant = (tenantId: string) => {
    return BotApiClient.get<Tenant>(`/tenant?id=${tenantId}`).then(
      (res) => res.data
    );
  };
  return useQuery([`channel-${tenantId}`], () => fetchTenant(tenantId), {
    enabled: !!tenantId,
  });
};
