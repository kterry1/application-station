import {
  Image,
  ListItem,
  Box,
  Flex,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import React from "react";

interface SiteListItemProps {
  name: string;
  icon: React.SVGProps<SVGSVGElement>;
  link: string;
  description: string;
}

const SiteListItem = ({ name, icon, link, description }: SiteListItemProps) => {
  return (
    <ListItem display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" alignItems="center">
        <Image boxSize="40px" src={icon} alt="LinkedIn" mr="1rem" />
        <Flex flexDir="column">
          <Heading size="md">{name}</Heading>
          <Text fontSize="xs" color="#5f5f5f" w="250px">
            {description}
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
        <Link href={link} isExternal>
          <ExternalLinkIcon mx="1rem" />
        </Link>
      </Flex>
    </ListItem>
  );
};

export default SiteListItem;
