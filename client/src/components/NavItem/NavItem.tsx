import { Flex, Icon, Link, Menu, MenuButton, Text } from "@chakra-ui/react";

type Props = {
  navSize: string;
  icon: any;
  title: string;
  active?: boolean;
};

const NavItem = ({ navSize, icon, title, active }: Props) => {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize === "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Link
          display="flex"
          background={active ? "#91380036" : ""}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: "none", backgroundColor: "#91380036" }}
          w={navSize === "large" ? "100%" : ""}
        >
          <MenuButton w="100%">
            <Flex alignItems="center">
              <Icon fontSize="xl" as={icon} color={"#232828"} />
              <Text
                ml={5}
                display={navSize === "small" ? "none" : "flex"}
                color={"#232828"}
              >
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
};

export default NavItem;
