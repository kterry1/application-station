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
import React from "react";

function DrawerExample(props: any) {
  const {
    companyName,
    awaitingResponse,
    rejected,
    nextRound,
    receivedOffer,
    acceptedOffer,
    appliedAt,
    notes,
    openDrawer,
    setOpenDrawer,
  } = props;
  const firstField = React.useRef();

  const appliedAtTransformer = () => {
    if (appliedAt) {
      return new Date(appliedAt).toISOString().substring(0, 10);
    }
    return;
  };

  return (
    <>
      <Drawer
        isOpen={openDrawer}
        placement="bottom"
        // @ts-ignore-next-line
        initialFocusRef={firstField}
        onClose={() => setOpenDrawer(false)}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Edit</DrawerHeader>

          <DrawerBody>
            <Stack spacing="12px">
              <Box>
                <Flex flexDir="row">
                  <Box mr="12px">
                    <FormLabel htmlFor="companyName">Company</FormLabel>
                    <Input
                      isRequired={true}
                      focusBorderColor="gray.400"
                      errorBorderColor="red.500"
                      // @ts-ignore-next-line
                      ref={firstField}
                      value={companyName}
                      id="companyName"
                      placeholder="Company Name"
                    />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="appliedDate">Applied Date</FormLabel>
                    <Input
                      value={appliedAtTransformer()}
                      id="appliedDate"
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
                  <FormLabel htmlFor="isChecked">Awaiting Response:</FormLabel>
                  <Switch
                    isChecked={awaitingResponse}
                    colorScheme="greenSwitch"
                    id="isChecked"
                  />

                  <FormLabel htmlFor="isDisabled">Rejected:</FormLabel>
                  <Switch
                    isChecked={rejected}
                    colorScheme="greenSwitch"
                    id="isDisabled"
                  />

                  <FormLabel htmlFor="isFocusable">Next Round:</FormLabel>
                  <Switch
                    isChecked={nextRound}
                    colorScheme="greenSwitch"
                    id="isFocusable"
                  />

                  <FormLabel htmlFor="isInvalid">Received Offer:</FormLabel>
                  <Switch
                    isChecked={receivedOffer}
                    colorScheme="greenSwitch"
                    id="isInvalid"
                  />

                  <FormLabel htmlFor="isReadOnly">Accepted Offer:</FormLabel>
                  <Switch
                    isChecked={receivedOffer}
                    colorScheme="greenSwitch"
                    id="isReadOnly"
                  />
                </FormControl>
              </Box>
              <Box>
                <FormLabel htmlFor="notes">Notes</FormLabel>
                <Textarea
                  value={notes}
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
              onClick={() => setOpenDrawer(false)}
            >
              Cancel
            </Button>
            <Button colorScheme="greenSwitch">Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerExample;
