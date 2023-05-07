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

const Stats = () => {
  const { loading, error, data } = useQuery(GET_WEEKLY_STATS);
  const compareWeeksResponseCount =
    data?.getWeeklyStats?.thisWeek.responseCount -
    data?.getWeeklyStats?.lastWeek.responseCount;
  const companyWeeksApplicationCount =
    data?.getWeeklyStats?.thisWeek.applicationCount -
    data?.getWeeklyStats?.lastWeek.applicationCount;
  const compareWeeksNextRoundCount =
    data?.getWeeklyStats?.thisWeek.nextRoundCount -
    data?.getWeeklyStats?.lastWeek.nextRoundCount;
  const compareWeeksRejectionCount =
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
              {data?.getWeeklyStats?.thisWeek.applicationCount}
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
              {data?.getWeeklyStats?.thisWeek.responseCount}
            </StatNumber>
            <StatHelpText>
              <StatArrow
                type={compareWeeksResponseCount > 0 ? "increase" : "decrease"}
              />
              {Math.abs(compareWeeksResponseCount)}
            </StatHelpText>
          </Stat>
        </Flex>
        <Flex justifyContent="center">
          <Stat>
            <StatLabel textColor="gray">Next Round</StatLabel>
            <StatNumber fontSize="30px">
              {data?.getWeeklyStats?.thisWeek.nextRoundCount}
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
              {data?.getWeeklyStats?.thisWeek.rejectionCount}
            </StatNumber>
            <StatHelpText>
              <StatArrow
                type={compareWeeksRejectionCount > 0 ? "increase" : "decrease"}
              />
              {Math.abs(compareWeeksRejectionCount)}
            </StatHelpText>
          </Stat>
        </Flex>
      </Flex>
    </>
  );
};

export default Stats;
