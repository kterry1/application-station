import {
  Stat,
  StatLabel,
  StatNumber,
  StatArrow,
  StatHelpText,
  Flex,
  Box,
  Divider,
} from "@chakra-ui/react";
import logo from "../assets/svg/three.svg";

const Stats = () => {
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
        <Box bg="" width="100px" height="100px">
          <img src={logo} />
        </Box>
        <Divider orientation="vertical" />
        <Flex justifyContent="center">
          <Stat>
            <StatLabel>Applications</StatLabel>
            <StatNumber>40</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>
        </Flex>
        <Flex justifyContent="center">
          <Stat>
            <StatLabel>Responses</StatLabel>
            <StatNumber>34</StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              23.36%
            </StatHelpText>
          </Stat>
        </Flex>
        <Flex justifyContent="center">
          <Stat>
            <StatLabel>Next Round</StatLabel>
            <StatNumber>19</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>
        </Flex>
        <Flex justifyContent="center">
          <Stat>
            <StatLabel>Rejections</StatLabel>
            <StatNumber>15</StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              23.36%
            </StatHelpText>
          </Stat>
        </Flex>
      </Flex>
    </>
  );
};

export default Stats;
