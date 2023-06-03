import { HamburgerIcon } from "@chakra-ui/icons";
import { Divider, Flex, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import NavItem from "../NavItem/NavItem.js";
import { FaHome } from "react-icons/fa";
import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton.js";

const Sidebar = ({
  logOutUser,
  loggedInUserRefetch,
  authenticateWithGoogle,
  loggedInUserData,
  client,
  handleDemoAccountBtnClick,
}: any) => {
  const [navSize, setNavSize] = useState("large");

  const handleNavIconClick = () => {
    return navSize === "small" ? setNavSize("large") : setNavSize("small");
  };
  return (
    <Flex
      pos="sticky"
      left="0"
      h="100vh"
      w={navSize === "small" ? "75px" : "200px"}
      minW={navSize === "small" ? "70px" : "178px"}
      flexDir="column"
      justifyContent="space-between"
      bg="#000000"
      color="gray"
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
            borderRadius={4}
            mr={navSize === "large" ? "10px" : "0px"}
            w="44px"
            h="44px"
            _hover={{ background: "#fff" }}
            aria-label=" hamburger icon button"
            icon={<HamburgerIcon />}
            onClick={handleNavIconClick}
          />
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
          handleDemoAccountBtnClick={handleDemoAccountBtnClick}
        />
      </Flex>
    </Flex>
  );
};

export default Sidebar;
