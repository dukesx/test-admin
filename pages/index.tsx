/* eslint-disable @next/next/no-img-element */
import {
  AppShell,
  Card,
  Header,
  Container,
  Input,
  InputWrapper,
  Center,
  Grid,
  Button,
  Loader,
  Col,
  Text,
  Group,
} from "@mantine/core";
import { useFormik } from "formik";
import { supabase } from "../lib/initSupabase";
import Wrapper from "../components/global/wrapper";
import { useModals } from "@mantine/modals";
import { CheckCircle, XCircle } from "phosphor-react";
const Index = () => {
  const modals = useModals();

  const validate = (values) => {
    var errors: any = {};

    if (!values.phone) {
      errors.phone = "phone is required";
    } else if (
      !values.phone.match(
        /([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?/i
      )
    ) {
      errors.phone = "This is not an phone";
    }

    if (!values.password) {
      errors.password = "Password cannot be empty";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      modals.openModal({
        id: "mod1",
        // title: "Checking your credentials....",
        hideCloseButton: true,
        children: (
          <div className="flex flex-col align-middle mt-10">
            <Loader variant="bars" className="mx-auto" size={40} />
            <Text size="lg" mt={20} weight={600} className="text-center">
              Please wait...
            </Text>
          </div>
        ),
      });
      const { error, user } = await supabase.auth.signIn({
        phone: formik.values.phone,
        password: formik.values.password,
      });

      if (error) {
        console.log(error.message);
        modals.openModal({
          id: "mod2",
          // title: "Checking your credentials....",
          hideCloseButton: true,
          children: (
            <div className="flex flex-col align-middle mt-10">
              <XCircle
                size={60}
                weight="fill"
                className="text-red-500 text-center mx-auto"
              />
              <Text size="md" mt={10} weight={600} className="text-center">
                Invalid Username or Password
              </Text>
            </div>
          ),
          onClose: () => modals.closeAll(),
        });
      } else {
        modals.closeAll();
      }
    },
  });
  return (
    <Wrapper>
      <AppShell
        padding="md"
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
                  <Button size="sm" variant="light">
                    Sign up
                  </Button>
                </Group>
              </Col>
            </Grid>
          </Header>
        }
        styles={{
          main: {
            padding: "0px 0px",
          },
        }}
      >
        <Container
          size="xl"
          className="max-w-full px-20 xs:px-0"
          mx={0}
          padding={0}
        >
          <Center>
            <Card
              shadow="md"
              className=" lg:mt-12 xl:mt-12 md:mt-0 sm:mt-12 xs:mt-0 xl:max-w-[70%] w-full md:max-w-full p-0"
              radius="sm"
            >
              <Grid className="w-full">
                <Col
                  span={12}
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  className="p-0 m-0"
                >
                  <img
                    alt=""
                    width="100%"
                    src="/login_cover.jpg"
                    className="object-cover h-[400px] sm:h-[700px] md:h-[700px] lg:h-[700px] xl:h-[700px]"
                  />
                </Col>
                <Col
                  span={12}
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  className="pt-4 pb-8 md:px-6 xs:px-8"
                >
                  <div className="max-w-[400px] mx-auto mb-20">
                    <div className="flex">
                      <Text
                        size="lg"
                        weight={900}
                        className="text-center text-lg"
                        mt={10}
                      >
                        FITLIVE
                      </Text>
                    </div>
                    <Text
                      weight={500}
                      className="text-center text-xl"
                      mt={60}
                      mb={40}
                    >
                      Authenticate
                    </Text>
                    <form onSubmit={formik.handleSubmit}>
                      <InputWrapper
                        required
                        label="Phone"
                        description="Your secure username"
                      >
                        <Input
                          name="phone"
                          required
                          onChange={formik.handleChange}
                          value={formik.values.phone}
                        />
                        {formik.errors.phone ? (
                          <Text color="red" weight={600} mt={8} size="xs">
                            {formik.errors.phone}
                          </Text>
                        ) : null}
                      </InputWrapper>

                      <InputWrapper
                        required
                        label="Password"
                        description="Your secure password"
                        className="mt-6"
                      >
                        <Input
                          name="password"
                          required
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          type="password"
                        />
                        {formik.errors.password ? (
                          <Text color="red" weight={600} mt={8} size="xs">
                            {formik.errors.password}
                          </Text>
                        ) : null}
                      </InputWrapper>

                      <Button type="submit" className="mt-8 w-full">
                        Sign in
                      </Button>
                    </form>
                  </div>
                </Col>
              </Grid>
            </Card>
          </Center>
        </Container>
      </AppShell>
    </Wrapper>
  );
};

export default Index;
