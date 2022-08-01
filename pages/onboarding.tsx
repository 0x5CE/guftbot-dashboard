import { Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect } from "react";
import { NavItems } from "../components/nav-items";
import { Navbar } from "../components/Navbar";
import { Wizard } from "../components/wizard";

const Onboarding: NextPage = () => {
  return (
    <>
      <Navbar>
        <Heading textTransform={"lowercase"}>guft Bot</Heading>
        <NavItems />
      </Navbar>
      <Wizard />
    </>
  );
};
export default Onboarding;
