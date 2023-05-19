import {
  Flex,
  Card,
  CardHeader,
  Heading,
  IconButton,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";

const StatCard = ({ icon, title, stats, backgroundColor, cardStatKey }) => {
  stats?.getWeeklyStats?.thisWeek[cardStatKey];
  stats?.getWeeklyStats?.lastWeek[cardStatKey];
  return (
    <>
      <Card
        bg={backgroundColor}
        color="white"
        maxW="sm"
        w="11em"
        minW="10em"
        h="14em"
        borderRadius="15px"
      >
        <CardHeader p="20px 10px 25px 15px">
          <Flex>
            <Flex flex="1" gap="1" alignItems="center" flexWrap="wrap" p="2px">
              {icon}
              <Heading size="xs">{title}</Heading>
            </Flex>
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
          colorScheme="gray"
          defaultIndex={2}
        >
          <TabPanels textAlign="center" w="cover">
            <TabPanel p="2px">
              <Text fontSize="4xl">
                {stats?.getWeeklyStats?.lastWeek[cardStatKey]}
              </Text>
            </TabPanel>
            <TabPanel p="2px">
              <Text fontSize="4xl">
                {stats?.getWeeklyStats?.thisWeek[cardStatKey]}
              </Text>
            </TabPanel>
            <TabPanel p="2px">
              <Text fontSize="4xl">
                {stats?.getWeeklyStats?.totals[cardStatKey]}
              </Text>
            </TabPanel>
          </TabPanels>
          <TabList px="10px" pos="absolute" bottom="15px" w="100%">
            <Tab
              color="white"
              borderRadius="5px"
              fontSize="11px"
              p="10px"
              w="45px"
            >
              Last Week
            </Tab>
            <Tab
              color="white"
              borderRadius="5px"
              fontSize="11px"
              p="10px"
              w="45px"
            >
              This Week
            </Tab>
            <Tab
              color="white"
              borderRadius="5px"
              fontSize="11px"
              p="10px"
              w="45px"
            >
              Total
            </Tab>
          </TabList>
        </Tabs>
      </Card>
    </>
  );
};

export default StatCard;
