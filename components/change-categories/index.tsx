import {
  Flex,
  Heading,
  VStack,
  Checkbox,
  Button,
  Text,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Category } from "../../types/category";
import { Tenant } from "../../types/tenant";
import { UpdateChannelCategoriesDto } from "../../types/update_channel_categories";
import { BotApiClient } from "../axios";
import { tenantState } from "../states";

export const ChangeCategories = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [availableCategories, setAvailableCategories] = useState<Category[]>(
    []
  );

  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [_, setTenant] = useRecoilState(tenantState);
  const { channelId } = useRouter().query;
  const queryClient = useQueryClient();

  const fetchCategories = () => {
    BotApiClient.get<Category[]>("category/all").then((res) => {
      setAvailableCategories(res.data);
      setSelectedCategories(res.data.map((c) => c.id));
    });
  };

  const handleUpdateClick = () => {
    const updateChannelCategories: UpdateChannelCategoriesDto = {
      id: channelId as string,
      categories: selectedCategories,
    };

    BotApiClient.put<Tenant>("/channel/categories", updateChannelCategories)
      .then((res) => res.data)
      .then((tenant) => {
        setTenant(tenant);
        localStorage.setItem("tenant", JSON.stringify(tenant));
        queryClient.invalidateQueries([`channel-${channelId}`]);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Flex
      flexDir={"column"}
      justifyContent="center"
      alignItems={"center"}
      mt={5}
    >
      <Heading textAlign={"center"}>
        Select the categories from which you want to receive questions
      </Heading>
      <Text textAlign={"center"}>
        We recommend using all categories to ensure that you receive all types
        of questions.
      </Text>
      <VStack my={5} alignItems={"flex-start"} justifyContent={"flex-start"}>
        {availableCategories.map((category) => {
          return (
            <Checkbox
              key={category.id}
              isChecked={selectedCategories.includes(category.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedCategories([...selectedCategories, category.id]);
                } else {
                  setSelectedCategories(
                    selectedCategories.filter((c) => c !== category.id)
                  );
                }
                !unsavedChanges && setUnsavedChanges(true);
              }}
            >
              {category.name}
            </Checkbox>
          );
        })}
      </VStack>
      <Button
        disabled={selectedCategories.length === 0 || !unsavedChanges}
        onClick={handleUpdateClick}
      >
        Update
      </Button>
    </Flex>
  );
};
