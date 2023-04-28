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
          background={active ? "#f9efcc" : ""}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: "none", backgroundColor: "#f9efcc" }}
          w={navSize === "large" ? "100%" : ""}
        >
          <MenuButton w="100%">
            <Flex alignItems="center">
              <Icon
                fontSize="xl"
                as={icon}
                color={active ? "#000000d1" : "#00000047"}
              />
              <Text
                ml={5}
                display={navSize === "small" ? "none" : "flex"}
                color={active ? "#000000d1" : "#00000047"}
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
