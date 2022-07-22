export interface ChannelSettingsDto {
  channel_name: string;
  channel_id: string;
}

export interface ScheduleSettingsDto {
  schedule: string;
  time: Date;
}

export interface CreateChannelDto {
  name: string;
  channel_id: string;
  categories: string[];
  schedule: string;
  time: Date;
  tenant_id: string;
}
