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
import { useState, useRef } from "react";

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
  const [companyApplicationDraft, setCompanyApplicationDraft] = useState({});
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
                      w="250px"
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
                  <Box mr="12px">
                    <FormLabel htmlFor="position">Position</FormLabel>
                    <Input
                      w="250px"
                      isRequired={true}
                      focusBorderColor="gray.400"
                      errorBorderColor="red.500"
                      // @ts-ignore-next-line
                      ref={firstField}
                      value={position}
                      id="position"
                      placeholder="Position"
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
                  <FormLabel htmlFor="awaitingResponse">
                    Awaiting Response:
                  </FormLabel>
                  <Switch
                    isChecked={awaitingResponse}
                    colorScheme="greenSwitch"
                    id="awaitingResponse"
                  />

                  <FormLabel htmlFor="rejected">Rejected:</FormLabel>
                  <Switch
                    isChecked={rejected}
                    colorScheme="greenSwitch"
                    id="rejected"
                  />

                  <FormLabel htmlFor="isFocusable">Next Round:</FormLabel>
                  <Switch
                    isChecked={nextRound}
                    colorScheme="greenSwitch"
                    id="isFocusable"
                  />

                  <FormLabel htmlFor="receivedOffer">Received Offer:</FormLabel>
                  <Switch
                    isChecked={receivedOffer}
                    colorScheme="greenSwitch"
                    id="receivedOffer"
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
