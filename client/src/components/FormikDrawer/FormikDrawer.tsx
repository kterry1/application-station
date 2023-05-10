import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  FormLabel,
  Input,
  Textarea,
  DrawerFooter,
  Box,
  Flex,
  FormControl,
  SimpleGrid,
  Switch,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRef } from "react";
import {
  ADD_SINGLE_COMPANY_APPLICATION,
  UPDATE_SINGLE_COMPANY_APPLICATION,
} from "../../apollo/queries-and-mutations";
import { useMutation } from "@apollo/client";
const appliedAtTransformer = (appliedAt: Date) => {
  if (appliedAt) {
    return new Date(appliedAt).toISOString().substring(0, 10);
  }
  return;
};

function DrawerExample(props: any) {
  const {
    id,
    companyName,
    position,
    awaitingResponse,
    rejected,
    nextRound,
    receivedOffer,
    appliedAt,
    notes,
    openDrawer,
    setOpenDrawer,
  } = props;
  const firstField = useRef();
  const [
    addSingleCompanyApplication,
    {
      loading: loadingAddSingleCompanyApplication,
      error: errorAddSingleCompanyApplication,
    },
  ] = useMutation(ADD_SINGLE_COMPANY_APPLICATION);
  const [
    updateSingleCompanyApplication,
    {
      loading: loadingUpdateSingleCompanyApplication,
      error: errorUpdateSingleCompanyApplication,
    },
  ] = useMutation(UPDATE_SINGLE_COMPANY_APPLICATION);
  const todayDate = new Date().toISOString().substring(0, 10);
  const formik = useFormik({
    initialValues: {
      companyName: companyName || "",
      position: position || "",
      awaitingResponse: awaitingResponse || false,
      rejected: rejected || false,
      nextRound: nextRound || false,
      receivedOffer: receivedOffer || false,
      appliedAt: appliedAtTransformer(appliedAt) || todayDate,
      notes: notes || "",
    },
    onSubmit: async (values) => {
      if (id) {
        const result = await updateSingleCompanyApplication({
          variables: {
            input: {
              ...values,
              appliedAt: new Date(formik.values.appliedAt),
              id: id,
            },
          },
        });
        if (result) {
          setOpenDrawer({
            reason: "",
            status: false,
          });
        }
      } else {
        const result = await addSingleCompanyApplication({
          variables: {
            input: {
              ...values,
              appliedAt: new Date(formik.values.appliedAt),
            },
          },
        });
        if (result) {
          setOpenDrawer({
            reason: "",
            status: false,
          });
        }
      }
    },
    enableReinitialize: true,
  });

  return (
    <>
      <Drawer
        isOpen={openDrawer.status}
        placement="bottom"
        onClose={() =>
          setOpenDrawer({
            reason: "",
            status: false,
          })
        }
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            {openDrawer.reason.toUpperCase()}
          </DrawerHeader>
          <form onSubmit={formik.handleSubmit}>
            <DrawerBody>
              <Stack spacing="12px">
                <Box>
                  <Flex flexDir="row">
                    <Box mr="12px">
                      <FormLabel htmlFor="companyName">Company</FormLabel>
                      <Input
                        w="300px"
                        isRequired={true}
                        focusBorderColor="gray.400"
                        errorBorderColor="red.500"
                        id="companyName"
                        placeholder="Company Name"
                        {...formik.getFieldProps("companyName")}
                      />
                    </Box>
                    <Box mr="12px">
                      <FormLabel htmlFor="position">Position</FormLabel>
                      <Input
                        w="350px"
                        isRequired={true}
                        focusBorderColor="gray.400"
                        errorBorderColor="red.500"
                        // value={position}
                        id="position"
                        placeholder="Position"
                        {...formik.getFieldProps("position")}
                      />
                    </Box>
                    <Box>
                      <FormLabel htmlFor="appliedAt">Applied Date</FormLabel>
                      <Input
                        {...formik.getFieldProps("appliedAt")}
                        id="appliedAt"
                        placeholder="Select Date"
                        size="md"
                        type="date"
                        focusBorderColor="gray.400"
                        errorBorderColor="red.500"
                      />
                    </Box>
                  </Flex>
                </Box>
                <Box>
                  <FormControl as={SimpleGrid} columns={{ base: 2, lg: 4 }}>
                    <FormLabel htmlFor="awaitingResponse">
                      Awaiting Response:
                    </FormLabel>
                    <Switch
                      {...formik.getFieldProps("awaitingResponse")}
                      isChecked={formik.values.awaitingResponse}
                      colorScheme="greenSwitch"
                      id="awaitingResponse"
                    />

                    <FormLabel htmlFor="rejected">Rejected:</FormLabel>
                    <Switch
                      {...formik.getFieldProps("rejected")}
                      isChecked={formik.values.rejected}
                      colorScheme="greenSwitch"
                      id="rejected"
                    />

                    <FormLabel htmlFor="isFocusable">Next Round:</FormLabel>
                    <Switch
                      {...formik.getFieldProps("nextRound")}
                      isChecked={formik.values.nextRound}
                      colorScheme="greenSwitch"
                      id="isFocusable"
                    />

                    <FormLabel htmlFor="receivedOffer">
                      Received Offer:
                    </FormLabel>
                    <Switch
                      {...formik.getFieldProps("receivedOffer")}
                      isChecked={formik.values.receivedOffer}
                      colorScheme="greenSwitch"
                      id="receivedOffer"
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormLabel htmlFor="notes">Notes</FormLabel>
                  <Textarea
                    {...formik.getFieldProps("notes")}
                    value={formik.values.notes}
                    focusBorderColor="gray.400"
                    errorBorderColor="red.500"
                    id="notes"
                  />
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button
                colorScheme="red"
                variant="outline"
                mr={3}
                onClick={() =>
                  setOpenDrawer({
                    reason: "",
                    status: false,
                  })
                }
              >
                Cancel
              </Button>
              <Button type="submit" colorScheme="greenSwitch">
                Submit
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerExample;
