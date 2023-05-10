import { HamburgerIcon } from "@chakra-ui/icons";
import { Divider, Flex, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import NavItem from "../NavItem/NavItem.js";
import { FaChartBar, FaHome } from "react-icons/fa";
import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton.js";
import CompanyLogo from "../../assets/svgs/company-logo.svg";

type Props = {};

const Sidebar = ({
  logOutUser,
  loggedInUserRefetch,
  authenticateWithGoogle,
  loggedInUserData,
  client,
}) => {
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
            mr={navSize === "large" ? "10px" : "0px"}
            w="44px"
            h="44px"
            _hover={{ background: "#f9efcc" }}
            aria-label=" hamburger icon button"
            icon={<HamburgerIcon />}
            onClick={handleNavIconClick}
          />
          {navSize === "large" && <img width={100} src={CompanyLogo} />}
        </Flex>
        <NavItem navSize={navSize} icon={FaHome} title="Dashboard" active />
      </Flex>
      <Flex p="20px" flexDir="column" w="100%" alignItems="center" mb={4}>
        <Divider />
        <GoogleLoginButton
          logOutUser={logOutUser}
          loggedInUserRefetch={loggedInUserRefetch}
          authenticateWithGoogle={authenticateWithGoogle}
          loggedInUserData={loggedInUserData}
          client={client}
          navSize={navSize}
        />
      </Flex>
    </Flex>
  );
};

export default Sidebar;
