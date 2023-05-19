import { Flex, Box, Heading, Text } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { IoNewspaperOutline, IoReturnUpForwardOutline } from "react-icons/io5";
import { IoMdClock } from "react-icons/io";
import { MdCancelPresentation } from "react-icons/md";
import { GET_WEEKLY_STATS } from "../../apollo/queries-and-mutations";
import { useEffect } from "react";
import StatCard from "./StatCard";

const Stats = ({ loggedInUserData }) => {
  const { loading, error, data, refetch } = useQuery(GET_WEEKLY_STATS);

  useEffect(() => {
    refetch();
  }, [loggedInUserData]);
  console.log("stats", data);

  return (
    <Flex
      width="100%"
      justifyContent="space-around"
      bgColor="gray"
      p="15px"
      borderRadius="15px"
      gap="15px"
      color="white"
    >
      <Box>
        <Heading size="md">Stats</Heading>
        <Text pt="2" fontSize="sm">
          View recent weeks and totals.
        </Text>
      </Box>
      <StatCard
        icon={<IoNewspaperOutline />}
        title="Applications"
        stats={data}
        backgroundColor="lightgray"
        cardStatKey="applicationCount"
      />
      <StatCard
        icon={<IoMdClock />}
        title="Awaiting Reply"
        stats={data}
        backgroundColor="lightgray"
        cardStatKey="awaitingResponseCount"
      />
      <StatCard
        icon={<IoReturnUpForwardOutline />}
        title="Next Round"
        stats={data}
        backgroundColor="lightgray"
        cardStatKey="nextRoundCount"
      />
      <StatCard
        icon={<MdCancelPresentation />}
        title="Rejected"
        stats={data}
        backgroundColor="lightgray"
        cardStatKey="rejectedCount"
      />
    </Flex>
  );
};

export default Stats;
