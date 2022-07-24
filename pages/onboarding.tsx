import { Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { NavItems } from "../components/nav-items";
import { Navbar } from "../components/Navbar";
import { tenantState } from "../components/states";
import { Wizard } from "../components/wizard";

const Onboarding: NextPage = () => {
  const [tenant, setTenant] = useRecoilState(tenantState);
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
