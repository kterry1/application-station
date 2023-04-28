import { AddIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
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
} from "@chakra-ui/react";
import React, { useEffect } from "react";

function DrawerExample(props: any) {
  const {
    companyName,
    awaitingResponse,
    rejected,
    ontoNextRound,
    receivedOffer,
    acceptedOffer,
    openDrawer,
    setOpenDrawer,
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(openDrawer);
  const firstField = React.useRef();

  //   useEffect(() => {
  //     setOpenDraw(false);
  //   }, [openDrawer]);

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
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="companyName">Company</FormLabel>
                <Input
                  // @ts-ignore-next-line
                  ref={firstField}
                  value={companyName}
                  id="companyName"
                  placeholder="Please enter user name"
                />
              </Box>
              <Box>
                <FormLabel htmlFor="notes">Notes</FormLabel>
                <Textarea id="notes" />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button
              variant="outline"
              mr={3}
              onClick={() => setOpenDrawer(false)}
            >
              Cancel
            </Button>
            <Button colorScheme="blue">Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerExample;
