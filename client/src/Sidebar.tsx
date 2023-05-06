import { HamburgerIcon } from "@chakra-ui/icons";
import { Divider, Flex, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import NavItem from "./NavItem";
import { FaChartBar, FaHome } from "react-icons/fa";
import GoogleLoginButton from "./GoogleLoginButton/GoogleLoginButton.js";
import CompanyLogo from "./assets/company-logo.svg";

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
      bg="#536061"
      color="#232828"
    >
      <Flex
        p="5%"
        flexDir="column"
        alignItems={navSize === "small" ? "center" : "flex-start"}
        as="nav"
      >
        <Flex
          width="70%"
          justifyContent="space-between"
          alignItems="center"
          mt={5}
        >
          <IconButton
            background="none"
            mr="10px"
            _hover={{ background: "#f9efcc" }}
            aria-label=" hamburger icon button"
            icon={<HamburgerIcon />}
            onClick={handleNavIconClick}
          />
          {navSize === "large" && <img width={100} src={CompanyLogo} />}
        </Flex>
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
        <GoogleLoginButton navSize={navSize} />
      </Flex>
    </Flex>
  );
};

export default Sidebar;
