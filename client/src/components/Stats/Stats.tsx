import {
  Stat,
  StatLabel,
  StatNumber,
  Flex,
  Box,
  Divider,
  StatHelpText,
  StatArrow,
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
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
import logo from "../../assets/svgs/three.svg";
import { useQuery } from "@apollo/client";
import { BsThreeDotsVertical } from "react-icons/bs";
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

  const compareWeeks = (stat: string) => {
    if (!!loggedInUserData?.loggedInUser) {
      return (
        data?.getWeeklyStats?.thisWeek[stat] -
        data?.getWeeklyStats?.lastWeek[stat]
      );
    } else return 0;
  };

  const compareWeeksawaitingResponseCount: number = compareWeeks(
    "awaitingResponseCount"
  );
  const companyWeeksApplicationCount: number = compareWeeks("applicationCount");
  const compareWeeksNextRoundCount: number = compareWeeks("nextRoundCount");
  const compareWeeksrejectedCount: number = compareWeeks("rejectedCount");

  return (
    <Flex
      width="100%"
      justifyContent="space-around"
      bgColor="#9138004d"
      p="30px"
      borderRadius="30px"
      mx="20px"
      gap="30px"
      color="#fff"
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
        backgroundColor="#fba36c"
      />
      <StatCard
        icon={<IoMdClock />}
        title="Awaiting Reply"
        stats={data}
        backgroundColor="#000000a3"
      />
      <StatCard
        icon={<IoReturnUpForwardOutline />}
        title="Next Round"
        stats={data}
        backgroundColor="#2b6cb0"
      />
      <StatCard
        icon={<MdCancelPresentation />}
        title="Rejected"
        stats={data}
        backgroundColor="#f85e5e"
      />
    </Flex>
  );
};

export default Stats;
