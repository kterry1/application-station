import { Image, ListItem, Box, Flex, Heading, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

interface SiteListItemProps {
  name: string;
  icon: string;
  link: string;
}

const SiteListItem = ({ name, icon, link }: SiteListItemProps) => {
  return (
    <ListItem display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" alignItems="center">
        <Image boxSize="40px" src={icon} alt="LinkedIn" mr="1rem" />
        <Flex flexDir="column">
          <Heading size="md">{name}</Heading>
        </Flex>
      </Box>
      <Flex>
        <Link href={link} isExternal>
          <ExternalLinkIcon mx="1rem" />
        </Link>
      </Flex>
    </ListItem>
  );
};

export default SiteListItem;
