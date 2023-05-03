import { CalendarIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Divider,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import NavItem from "./NavItem";
import { FaChartBar, FaHome } from "react-icons/fa";
import GoogleLoginButton from "./GoogleLoginButton/GoogleLoginButton.js";

type Props = {};

const Sidebar = (props: Props) => {
  const [navSize, setNavSize] = useState("large");

  const handleNavIconClick = () => {
    return navSize === "small" ? setNavSize("large") : setNavSize("small");
  };
  return (
    <Flex
      pos="sticky"
      left="0"
      h="100vh"
      boxShadow="0 4px 12px 0 rgba(0,0,0, 0.10)"
      w={navSize === "small" ? "75px" : "200px"}
      minW={navSize === "small" ? "70px" : "178px"}
      flexDir="column"
      justifyContent="space-between"
      bg="#687879"
      color="#232828"
    >
      <Flex
        p="5%"
        flexDir="column"
        alignItems={navSize === "small" ? "center" : "flex-start"}
        as="nav"
      >
        <IconButton
          background="none"
          mt={5}
          _hover={{ background: "#f9efcc" }}
          aria-label="icon button"
          icon={<HamburgerIcon />}
          onClick={handleNavIconClick}
        />
        <NavItem navSize={navSize} icon={FaHome} title="Dashboard" active />
        <NavItem navSize={navSize} icon={FaChartBar} title="Statistics" />
      </Flex>
      <Flex
        p="20px"
        flexDir="column"
        w="100%"
        alignItems={navSize === "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider />
        <Flex mt={4} align={navSize === "small" ? "center" : "flex-start"}>
          <Avatar size="sm" src="" />
          <Flex
            flexDir="column"
            ml={4}
            display={navSize === "small" ? "none" : "flex"}
          >
            <Heading as="h3" size="sm">
              Kevin Terry
            </Heading>
            <GoogleLoginButton />
            {/* <Text color="#465051">Admin</Text> */}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
