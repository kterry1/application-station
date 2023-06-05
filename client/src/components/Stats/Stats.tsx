import { Flex, Box, Heading, Text } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { IoNewspaperOutline, IoReturnUpForwardOutline } from "react-icons/io5";
import { IoMdClock } from "react-icons/io";
import { MdCancelPresentation } from "react-icons/md";
import { GET_WEEKLY_STATS } from "../../apollo/queries-and-mutations";
import { useContext, useEffect } from "react";
import StatCard from "./StatCard";
import { Context } from "../../main";

const Stats = ({ loggedInUserData }: any) => {
  const { data, refetch } = useQuery(GET_WEEKLY_STATS);
  const { toggleForImport } = useContext(Context);

  useEffect(() => {
    refetch();
  }, [loggedInUserData, toggleForImport]);

  return (
    <Flex
      w="100%"
      h="100%"
      justifyContent="space-around"
      bgColor="#f6f6f6"
      p="15px"
      borderRadius="15px"
      gap="15px"
      color="#2c2c2c"
    >
      <Box>
        <Heading size="md">Stats</Heading>
        <Text pt="2" fontSize="sm" color="#5f5f5f">
          View recent weeks and totals.
        </Text>
      </Box>
      <StatCard
        icon={<IoNewspaperOutline />}
        title="Applications"
        stats={data}
        backgroundColor="#fff"
        cardStatKey="applicationCount"
        loggedInUserData={loggedInUserData}
      />
      <StatCard
        icon={<IoMdClock />}
        title="Awaiting Response"
        stats={data}
        backgroundColor="#fff"
        cardStatKey="awaitingResponseCount"
        loggedInUserData={loggedInUserData}
      />
      <StatCard
        icon={<IoReturnUpForwardOutline />}
        title="Next Round"
        stats={data}
        backgroundColor="#fff"
        cardStatKey="nextRoundCount"
        loggedInUserData={loggedInUserData}
      />
      <StatCard
        icon={<MdCancelPresentation />}
        title="Rejected"
        stats={data}
        backgroundColor="#fff"
        cardStatKey="rejectedCount"
        loggedInUserData={loggedInUserData}
      />
    </Flex>
  );
};

export default Stats;
