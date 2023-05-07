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

import logo from "../assets/svg/three.svg";
import { useQuery } from "@apollo/client";
import { GET_WEEKLY_STATS } from "../queries-and-mutations";
import { useEffect } from "react";

const Stats = ({ loggedInUserData }) => {
  const { loading, error, data, refetch } = useQuery(GET_WEEKLY_STATS);

  useEffect(() => {
    refetch();
  }, [loggedInUserData]);

  const compareWeeksResponseCount =
    !!loggedInUserData?.loggedInUser &&
    data?.getWeeklyStats?.thisWeek.responseCount -
      data?.getWeeklyStats?.lastWeek.responseCount;
  const companyWeeksApplicationCount =
    !!loggedInUserData?.loggedInUser &&
    data?.getWeeklyStats?.thisWeek.applicationCount -
      data?.getWeeklyStats?.lastWeek.applicationCount;
  const compareWeeksNextRoundCount =
    !!loggedInUserData?.loggedInUser &&
    data?.getWeeklyStats?.thisWeek.nextRoundCount -
      data?.getWeeklyStats?.lastWeek.nextRoundCount;
  const compareWeeksRejectionCount =
    !!loggedInUserData?.loggedInUser &&
    data?.getWeeklyStats?.lastWeek.rejectionCount -
      data?.getWeeklyStats?.lastWeek.rejectionCount;

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
              {Math.abs(companyWeeksApplicationCount) || 0}
            </StatHelpText>
          </Stat>
        </Flex>
        <Flex justifyContent="center">
          <Stat>
            <StatLabel textColor="gray">Responses</StatLabel>
            <StatNumber fontSize="30px">
              {(!!loggedInUserData?.loggedInUser &&
                data?.getWeeklyStats?.thisWeek.responseCount) ||
                0}
            </StatNumber>
            <StatHelpText>
              <StatArrow
                type={compareWeeksResponseCount > 0 ? "increase" : "decrease"}
              />
              {Math.abs(compareWeeksResponseCount) || 0}
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
              {Math.abs(compareWeeksNextRoundCount) || 0}
            </StatHelpText>
          </Stat>
        </Flex>
        <Flex justifyContent="center">
          <Stat>
            <StatLabel textColor="gray">Rejections</StatLabel>
            <StatNumber fontSize="30px">
              {(!!loggedInUserData?.loggedInUser &&
                data?.getWeeklyStats?.thisWeek.rejectionCount) ||
                0}
            </StatNumber>
            <StatHelpText>
              <StatArrow
                type={compareWeeksRejectionCount > 0 ? "increase" : "decrease"}
              />
              {Math.abs(compareWeeksRejectionCount) || 0}
            </StatHelpText>
          </Stat>
        </Flex>
      </Flex>
    </>
  );
};

export default Stats;
