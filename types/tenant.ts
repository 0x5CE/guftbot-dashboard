import { BillingHistory } from "./billing_history";
import { Category } from "./category";
import { Channel } from "./channel";

export interface Tenant {
  id: string;
  access_token: string;
  email: string;
  workspace_name: string;
  workspace_id: string;
  is_enterprise: boolean;
  is_paid_plan: boolean;
  billingHistory: BillingHistory[];
  __channels__: Channel[];
  bot_user_id: string;
  user_slack_id: string;
  schedule: string;
  time: string;
  timezone: string;
  categories: Category[];
  createdAt: Date;
  updatedAt: Date;
}
