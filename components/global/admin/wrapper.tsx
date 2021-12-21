import { useEffect, useState } from "react";
import {
  AppShell,
  Header,
  Col,
  Group,
  Avatar,
  Grid,
  Divider,
  Navbar,
  Text,
  Menu,
  ScrollArea,
  useMantineTheme,
  useMantineColorScheme,
} from "@mantine/core";
import { supabase } from "../../../lib/initSupabase";
import Wrapper from "../../../components/global/wrapper";
import { useModals } from "@mantine/modals";
import {
  CaretDown,
  Article,
  Users,
  SignOut,
  ArrowRight,
  MoonStars,
  Sun,
  UserCircle,
} from "phosphor-react";
import ListItem from "../listItem";

const AdminWrapper = (props) => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const modals = useModals();
  const session = supabase.auth.session();
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchUser() {
      var usera;
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("id", supabase.auth.user().id);

      if (error) {
        return error;
      } else {
        setUser(data[0]);
      }
    }

    fetchUser();
  }, []);

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Wrapper>
      <AppShell
        // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
        navbarOffsetBreakpoint="sm"
        // fixed prop on AppShell will be automatically added to Header and Navbar
        fixed
        navbar={
          <Navbar
            padding="md"
            // Breakpoint at which navbar will be hidden if hidden prop is true
            hiddenBreakpoint="sm"
            // Hides navbar when viewport size is less than value specified in hiddenBreakpoint
            hidden={!opened}
            // when viewport size is less than theme.breakpoints.sm navbar width is 100%
            // viewport size > theme.breakpoints.sm – width is 300px
            // viewport size > theme.breakpoints.lg – width is 400px
            width={{ sm: 300, lg: 400 }}
          >
            <Navbar.Section>Ore</Navbar.Section>
            <Navbar.Section
              grow
              mt={20}
              component={ScrollArea}
              type="hover"
              ml={-10}
              mr={-10}
              sx={{ paddingLeft: 10, paddingRight: 10 }}
            >
              <ListItem
                title="Articles"
                leading={<Article size={25} />}
                description="Management of articles"
                trailing={
                  <ArrowRight className="align-baseline ml-auto" size={19} />
                }
                path="/admin/articles"
              />
              <ListItem
                title="Users"
                leading={<Users size={25} />}
                description="Management of users"
                trailing={
                  <ArrowRight className="align-baseline ml-auto" size={19} />
                }
                path="/admin/users"
              />
            </Navbar.Section>
          </Navbar>
        }
        header={
          <Header height="55px" padding="xs">
            <Grid grow align="center">
              <Col span={4}>
                <Group position="left">
                  <Text weight={700} className="text-xl">
                    FITLIVE P&H
                  </Text>
                </Group>
              </Col>
              <Col span={4}>
                <Group position="right">
                  {colorScheme == "dark" ? (
                    <Sun
                      className="hover:bg-gray-800 rounded-full p-1.5 text-yellow-400 cursor-pointer"
                      size={35}
                      onClick={() => toggleColorScheme()}
                    />
                  ) : (
                    <MoonStars
                      className="hover:bg-gray-700 rounded-full p-1 hover:text-white cursor-pointer"
                      size={32}
                      onClick={() => toggleColorScheme()}
                    />
                  )}
                  <Menu
                    control={
                      <Group
                        className="hover:bg-gray-100 dark:hover:bg-zinc-800 py-0.5 px-3 cursor-pointer rounded-md"
                        spacing="xs"
                      >
                        <Avatar size={32} color="blue" radius="xl" />
                        <Text size="sm" weight={500}>
                          {user ? user.full_name : "Loading..."}
                        </Text>
                        <CaretDown size={15} />
                      </Group>
                    }
                  >
                    <Menu.Label weight={500} size="sm">
                      Account Options
                    </Menu.Label>
                    <Divider orientation="horizontal" />
                    <Menu.Item
                      icon={
                        <UserCircle
                          weight="duotone"
                          className="text-blue-400"
                          size={20}
                        />
                      }
                    >
                      <Text
                        weight={500}
                        size="xs"
                        onClick={async () => await supabase.auth.signOut()}
                      >
                        Profile
                      </Text>
                    </Menu.Item>
                    <Menu.Item icon={<SignOut size={20} />}>
                      <Text
                        weight={500}
                        size="xs"
                        onClick={async () => await supabase.auth.signOut()}
                      >
                        Sign out
                      </Text>
                    </Menu.Item>
                  </Menu>
                </Group>
              </Col>
            </Grid>
          </Header>
        }
      >
        {props.children}
      </AppShell>
    </Wrapper>
  );
};

export default AdminWrapper;
