import { atom, selector } from "recoil";
import { Tenant } from "../../types/tenant";

export const tenantState = atom<Tenant | null>({
  key: "tenant",
  default: null,
});

export const accessTokenSelector = selector<string | undefined>({
  key: "accessToken",
  get: ({ get }) => {
    const tenant = get(tenantState);
    return tenant?.access_token;
  },
});

export const tenantIdSelector = selector<string | undefined>({
  key: "tenantId",
  get: ({ get }) => {
    const tenant = get(tenantState);
    return tenant?.id;
  },
});
