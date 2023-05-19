import React from "react";
import {
  Image,
  ListItem,
  Box,
  Flex,
  Heading,
  Text,
  WrapItem,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

type Props = {};

const SiteListItem = ({ name, icon, link, description }) => {
  return (
    <ListItem display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" alignItems="center">
        <Image boxSize="40px" src={icon} alt="LinkedIn" mr="1rem" />
        <Flex flexDir="column">
          <Heading size="md">{name}</Heading>
          <Text fontSize="xs" color="#5f5f5f" w="400px">
            connect the world's professionals to make them more productive and
            successful
          </Text>
        </Flex>
      </Box>
      <Flex>
        <Flex flexDir="column">
          <Text as="b" fontSize="sm">
            200 million
          </Text>
          <Text fontSize="xs" color="#5f5f5f">
            Active users
          </Text>
        </Flex>
        <Link href="https://chakra-ui.com" isExternal>
          <ExternalLinkIcon mx="1rem" />
        </Link>
      </Flex>
    </ListItem>
  );
};

export default SiteListItem;
