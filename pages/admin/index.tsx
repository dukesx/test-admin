import {
  AppShell,
  Burger,
  Header,
  Col,
  Group,
  Grid,
  MediaQuery,
  Button,
  Navbar,
  Text,
  Menu,
  useMantineTheme,
} from "@mantine/core";

import { supabase } from "../../lib/initSupabase";
import AdminWrapper from "../../components/global/admin/wrapper";

const AdminIndex = () => {
  // modals.closeModal("mod1");

  return <AdminWrapper>HEllo</AdminWrapper>;
};

export default AdminIndex;
