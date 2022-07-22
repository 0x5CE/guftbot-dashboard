import { UnorderedList, ListItem, Select, Box } from "@chakra-ui/react";
import Link from "next/link";

export const NavItems = () => {
  return (
    <Box>
      <UnorderedList styleType={"none"} m={0} p={0}>
        <ListItem display={"inline-block"} p={2}>
          <Link href="/dashboard/billing">Billing</Link>
        </ListItem>
        <ListItem display={"inline-block"} p={2}>
          <Link href="/dashboard/help">Help</Link>
        </ListItem>
        <ListItem display={"inline-block"} p={2}>
          <Select
            border={"none"}
            placeholder="Development (m.owais4014@gmail.com)"
            onChange={(e) => {
              if (e.target.value == "logout") console.log("Logout");
            }}
          >
            <option value={"logout"}>Logout</option>
          </Select>
        </ListItem>
      </UnorderedList>
    </Box>
  );
};
