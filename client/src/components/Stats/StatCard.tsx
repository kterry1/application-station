import {
  Flex,
  Card,
  CardHeader,
  Heading,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  TabIndicator,
} from "@chakra-ui/react";

const StatCard = ({ icon, title, stats, backgroundColor, cardStatKey }) => {
  return (
    <>
      <Card
        bg={backgroundColor}
        color="#2c2c2c"
        maxW="sm"
        w="11em"
        minW="10em"
        h="14em"
        borderRadius="15px"
      >
        <CardHeader p="20px 10px 25px 10px">
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
          variant="unstyled"
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
            <Tab borderRadius="5px" fontSize="11px" p="10px" w="45px">
              Last Week
            </Tab>
            <Tab borderRadius="5px" fontSize="11px" p="10px" w="45px">
              This Week
            </Tab>
            <Tab borderRadius="5px" fontSize="11px" p="10px" w="45px">
              Total
            </Tab>
            <TabIndicator height="2px" bg="#5f5f5f" borderRadius="1px" />
          </TabList>
        </Tabs>
      </Card>
    </>
  );
};

export default StatCard;
