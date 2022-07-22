import React from "react";
import { Flex } from "@chakra-ui/react";
interface LayoutProps {
  children: React.ReactNode;
}

export const Navbar = ({ children }: LayoutProps) => {
  return (
    <Flex
      align="center"
      justifyContent={"space-between"}
      width="100%"
      p={5}
      // background color should be fresh teal
      backgroundColor="teal.200"
      // text color should be in contrast with the background color
    >
      {children}
    </Flex>
  );
};
