import { Tenant } from "./tenant";

export interface Channel {
  id: string;
  name: string;

  slack_id: string;

  tenant: Promise<Tenant>;

  schedule: string;

  time: Date;

  createdAt: Date;
  updatedAt: Date;
}
