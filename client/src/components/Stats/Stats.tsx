import {
  Stat,
  StatLabel,
  StatNumber,
  Flex,
  Box,
  Divider,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";
import logo from "../../assets/svgs/three.svg";
import { useQuery } from "@apollo/client";
import { GET_WEEKLY_STATS } from "../../apollo/queries-and-mutations";
import { useEffect } from "react";

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
    <>
      <Flex
        bg="#fff"
        width="60%"
        minW="540px"
        justifyContent="space-around"
        alignItems="center"
        boxShadow="base"
        borderRadius="5px"
        px="30px"
        py="10px"
      >
        <Box width="100px" height="100px">
          <img src={logo} />
        </Box>
        <Divider orientation="vertical" />
        <Flex justifyContent="center">
          <Stat>
            <StatLabel textColor="gray">Applications</StatLabel>
            <StatNumber fontSize="30px">
              {(!!loggedInUserData?.loggedInUser &&
                data?.getWeeklyStats?.thisWeek.applicationCount) ||
                0}
            </StatNumber>
            <StatHelpText>
              <StatArrow
                type={
                  companyWeeksApplicationCount > 0 ? "increase" : "decrease"
                }
              />
              {Math.abs(companyWeeksApplicationCount)}
            </StatHelpText>
          </Stat>
        </Flex>
        <Flex justifyContent="center">
          <Stat>
            <StatLabel textColor="gray">Responses</StatLabel>
            <StatNumber fontSize="30px">
              {(!!loggedInUserData?.loggedInUser &&
                data?.getWeeklyStats?.thisWeek.awaitingResponseCount) ||
                0}
            </StatNumber>
            <StatHelpText>
              <StatArrow
                type={
                  compareWeeksawaitingResponseCount > 0
                    ? "increase"
                    : "decrease"
                }
              />
              {Math.abs(compareWeeksawaitingResponseCount)}
            </StatHelpText>
          </Stat>
        </Flex>
        <Flex justifyContent="center">
          <Stat>
            <StatLabel textColor="gray">Next Round</StatLabel>
            <StatNumber fontSize="30px">
              {data?.getWeeklyStats?.thisWeek.nextRoundCount || 0}
            </StatNumber>
            <StatHelpText>
              <StatArrow
                type={compareWeeksNextRoundCount > 0 ? "increase" : "decrease"}
              />
              {Math.abs(compareWeeksNextRoundCount)}
            </StatHelpText>
          </Stat>
        </Flex>
        <Flex justifyContent="center">
          <Stat>
            <StatLabel textColor="gray">Rejections</StatLabel>
            <StatNumber fontSize="30px">
              {(!!loggedInUserData?.loggedInUser &&
                data?.getWeeklyStats?.thisWeek.rejectedCount) ||
                0}
            </StatNumber>
            <StatHelpText>
              <StatArrow
                type={compareWeeksrejectedCount > 0 ? "increase" : "decrease"}
              />
              {Math.abs(compareWeeksrejectedCount)}
            </StatHelpText>
          </Stat>
        </Flex>
      </Flex>
    </>
  );
};

export default Stats;
