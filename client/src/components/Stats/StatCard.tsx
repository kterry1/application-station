import {
  Flex,
  Card,
  CardHeader,
  Heading,
  IconButton,
  Image,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";

const StatCard = ({ icon, title, stats, backgroundColor }) => {
  return (
    <>
      <Card
        bg={backgroundColor}
        color="#fff"
        maxW="sm"
        w="14em"
        h="14em"
        borderRadius="30px"
      >
        <CardHeader p="20px 10px 25px 15px">
          <Flex>
            <Flex flex="1" gap="1" alignItems="center" flexWrap="wrap" p="2px">
              {icon}
              <Heading size="xs">{title}</Heading>
            </Flex>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              h="20px"
              icon={<BsThreeDotsVertical />}
            />
          </Flex>
        </CardHeader>
        <Tabs
          size="sm"
          display="flex"
          flexDir="column"
          justifyContent="space-between"
          h="60%"
          align="center"
          variant="soft-rounded"
          colorScheme="black"
        >
          <TabPanels textAlign="center" w="cover">
            <TabPanel p="2px">
              <Text fontSize="4xl">45</Text>
            </TabPanel>
            <TabPanel p="2px">
              <Text fontSize="4xl">30</Text>
            </TabPanel>
            <TabPanel p="2px">
              <Text fontSize="4xl">100</Text>
            </TabPanel>
          </TabPanels>
          <TabList px="10px">
            <Tab color="#fff" borderRadius="5px" fontSize="11px">
              Last Week
            </Tab>
            <Tab color="#fff" borderRadius="5px" fontSize="11px">
              This Week
            </Tab>
            <Tab color="#fff" borderRadius="5px" fontSize="11px">
              Total
            </Tab>
          </TabList>
        </Tabs>
      </Card>
    </>
  );
};

export default StatCard;
