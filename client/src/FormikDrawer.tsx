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
import { useState, useRef } from "react";
const appliedAtTransformer = (appliedAt: Date) => {
  if (appliedAt) {
    return new Date(appliedAt).toISOString().substring(0, 10);
  }
  return;
};

function DrawerExample(props: any) {
  const {
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
  const formik = useFormik({
    initialValues: {
      companyName: companyName || "",
      position: position || "",
      awaitingResponse: awaitingResponse || false,
      rejected: rejected || false,
      nextRound: nextRound || false,
      receivedOffer: receivedOffer || false,
      appliedAt:
        appliedAtTransformer(appliedAt) ||
        new Date().toISOString().substring(0, 10),
      notes: notes || "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    enableReinitialize: true,
  });

  return (
    <>
      <Drawer
        isOpen={openDrawer.status}
        placement="bottom"
        // @ts-ignore-next-line
        initialFocusRef={firstField}
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
                        w="250px"
                        isRequired={true}
                        focusBorderColor="gray.400"
                        errorBorderColor="red.500"
                        // @ts-ignore-next-line
                        ref={firstField}
                        // value={companyName}
                        id="companyName"
                        placeholder="Company Name"
                        {...formik.getFieldProps("companyName")}
                      />
                    </Box>
                    <Box mr="12px">
                      <FormLabel htmlFor="position">Position</FormLabel>
                      <Input
                        w="250px"
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
                        // value={appliedAtTransformer()}
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
