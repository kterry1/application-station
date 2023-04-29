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
    openDrawer,
    setOpenDrawer,
  } = props;
  const firstField = React.useRef();

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
                  <Switch colorScheme="green" id="isChecked" />

                  <FormLabel htmlFor="isDisabled">Rejected:</FormLabel>
                  <Switch colorScheme="green" id="isDisabled" />

                  <FormLabel htmlFor="isFocusable">Next Round:</FormLabel>
                  <Switch colorScheme="green" id="isFocusable" />

                  <FormLabel htmlFor="isInvalid">Received Offer:</FormLabel>
                  <Switch colorScheme="green" id="isInvalid" />

                  <FormLabel htmlFor="isReadOnly">Accepted Offer:</FormLabel>
                  <Switch colorScheme="green" id="isReadOnly" />
                </FormControl>
              </Box>
              <Box>
                <FormLabel htmlFor="notes">Notes</FormLabel>
                <Textarea
                  focusBorderColor="gray.400"
                  errorBorderColor="red.500"
                  id="notes"
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button
              colorScheme="black"
              variant="outline"
              mr={3}
              onClick={() => setOpenDrawer(false)}
            >
              Cancel
            </Button>
            <Button colorScheme="green">Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerExample;
