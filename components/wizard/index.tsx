import { Flex } from "@chakra-ui/react";
import { Channel } from "@slack/web-api/dist/response/AdminUsergroupsListChannelsResponse";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ChannelSettingsDto,
  CreateChannelDto,
  ScheduleSettingsDto,
} from "../../types/create_channel_dto";
import { Tenant } from "../../types/tenant";
import { AddChannel } from "../add-channel";
import { BotApiClient } from "../axios";
import { SelectCategories } from "../select-categories";
import { SelectTime } from "../select-time";
import { tenantIdSelector, tenantState } from "../states";

const steps = [
  {
    label: "Add Channel",
  },
  {
    label: "Select Categories",
  },
  {
    label: "Select Time",
  },
];

export const Wizard = () => {
  const { nextStep, activeStep } = useSteps({
    initialStep: 0,
  });

  const router = useRouter();

  const tenantId = useRecoilValue(tenantIdSelector);
  const [_, setTenant] = useRecoilState(tenantState);

  const [isNewChannelCreated, setIsNewChannelCreated] = useState(false);
  const [channelSettings, setChannelSettings] =
    useState<ChannelSettingsDto | null>(null);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSchedule, setSelectedSchedule] =
    useState<ScheduleSettingsDto | null>(null);

  const [createChannelDto, setCreateChannelDto] =
    useState<CreateChannelDto | null>(null);

  const updateChannelSettings = (channel: Channel) => {
    setChannelSettings({
      channel_id: channel.id as string,
      channel_name: channel.name as string,
    });

    nextStep();
  };

  const updateCategoriesSettings = (categories: string[]) => {
    setSelectedCategories(categories);
    nextStep();
  };

  const updateTimeSettings = (time: Date, schedule: string) => {
    setSelectedSchedule({
      time,
      schedule,
    });
  };

  const createDtoForChannelCreation = () => {
    if (channelSettings && selectedSchedule) {
      setCreateChannelDto({
        name: channelSettings.channel_name as string,
        channel_id: channelSettings.channel_id as string,
        categories: selectedCategories,
        schedule: selectedSchedule.schedule as string,
        time: selectedSchedule.time,
        tenant_id: tenantId as string,
      });
    }
  };

  const sendCreateChannelRequest = async () => {
    const res = await BotApiClient.post<Tenant>(
      "channel/add",
      createChannelDto
    );
    if (res.status > 200 && res.status < 300) {
      setIsNewChannelCreated(true);
      setTenant(res.data);
    }
  };

  useEffect(() => {
    if (selectedSchedule) {
      createDtoForChannelCreation();
    }
  }, [selectedSchedule]);

  useEffect(() => {
    if (createChannelDto) {
      sendCreateChannelRequest();
    }
  }, [createChannelDto]);

  useEffect(() => {
    if (isNewChannelCreated) router.replace("/dashboard");
  }, [isNewChannelCreated]);

  return (
    <Flex flexDir="column" mt={20} mx={30}>
      <Steps activeStep={activeStep}>
        {steps.map(({ label }) => (
          <Step label={label} key={label}>
            {label === "Add Channel" && (
              <AddChannel updateChannel={updateChannelSettings} />
            )}
            {label === "Select Categories" && (
              <SelectCategories updateCategories={updateCategoriesSettings} />
            )}
            {label === "Select Time" && (
              <SelectTime updateTime={updateTimeSettings} />
            )}
          </Step>
        ))}
      </Steps>
    </Flex>
  );
};
