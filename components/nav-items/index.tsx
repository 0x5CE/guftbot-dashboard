import { UnorderedList, ListItem, Select, Box } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTenant } from "../../hooks/use-tenant";

export const NavItems = () => {
  const [tenantId, setTenantId] = useState("");
  const { data: tenant } = useTenant(tenantId);
  const router = useRouter();

  useEffect(() => {
    const tId = localStorage.getItem("tenantId");
    if (tId) {
      setTenantId(tId);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("tenantId");
    setTenantId("");
    router.push("/");
  };

  return (
    <Box>
      <UnorderedList styleType={"none"} m={0} p={0}>
        <ListItem display={"inline-block"} p={2}>
          <Link href="/dashboard/billing">Billing</Link>
        </ListItem>
        <ListItem display={"inline-block"} p={2}>
          <Link href="/dashboard/help">Help</Link>
        </ListItem>
        {tenant && (
          <ListItem display={"inline-block"} p={2}>
            <Select
              border={"none"}
              placeholder={tenant.workspace_name}
              onChange={(e) => {
                if (e.target.value == "logout") handleLogout();
              }}
              _hover={{
                cursor: "pointer",
              }}
            >
              <option value={"logout"}>Logout</option>
            </Select>
          </ListItem>
        )}
      </UnorderedList>
    </Box>
  );
};
