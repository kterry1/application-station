import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Text,
  Tr,
  useToast,
  Center,
  List,
  useMediaQuery,
  useTheme,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SingleCheckbox from "../SingleCheckbox/SingleCheckbox";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import Pagination from "../Pagination/Pagination";
import {
  DELETE_COMPANY_APPLICATIONS,
  GET_COMPANY_APPLICATIONS,
  IMPORT_PROGRESS,
} from "../../apollo/queries-and-mutations";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import ImportCompanyApplications from "../ImportCompanyApplications/ImportCompanyApplications";
import Stats from "../Stats/Stats";
import FormikDrawer from "../FormikDrawer/FormikDrawer";
import { toastNotification } from "../../utils/toastNotication/toastNotification";
import LinkedInPNG from "../../assets/icons/linkedin.png";
import GlassdoorPNG from "../../assets/icons/glassdoor.png";
import IndeedPNG from "../../assets/icons/indeed.png";
import AngelListSVG from "../../assets/icons/angellist.svg";
import ZiprecruiterSVG from "../../assets/icons/ziprecruiter.svg";
import BehanceSVG from "../../assets/icons/behance.svg";
import SiteListItem from "./TopJobList/SiteListItem";

type Props = {};

const tableTestFunc = (property: boolean) => {
  return property ? "Yes" : "No";
};

const truncateString = (str: string, maxLength: number = 20) => {
  if (str.length <= maxLength) {
    return str;
  }

  return `${str.slice(0, maxLength)}...`;
};

const Dashboard = ({ loggedInUserData, logOutUser }) => {
  const [editRow, setEditRow] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  const [openDrawer, setOpenDrawer] = useState({
    reason: "",
    status: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data, refetch } = useQuery(GET_COMPANY_APPLICATIONS);
  const [
    deleteCompanyApplications,
    {
      loading: loadingCompanyApplications,
      error: errorDeleteCompanyApplications,
    },
  ] = useMutation(DELETE_COMPANY_APPLICATIONS, {
    variables: {
      input: {
        ids: selectedRows,
      },
    },
  });
  const { data: dataImportProgress, loading: loadingImportProgress } =
    useSubscription(IMPORT_PROGRESS);
  const toast = useToast();
  const itemsPerPage = 15;
  const totalPages =
    Math.ceil(data?.companyApplications.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPageApplications = data?.companyApplications.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const theme = useTheme();
  const [isSmallerThan3xl] = useMediaQuery(
    `(max-width): ${theme.breakpoints["3xl"]}`
  );

  useEffect(() => {
    refetch();
  }, [loggedInUserData]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleCompanyApplicationsDeletions = async () => {
    try {
      const result = await deleteCompanyApplications();

      const statusCode = result.data.deleteCompanyApplications.status;
      const message = result.data.deleteCompanyApplications.message;
      if (statusCode === 200) {
        refetch();
        setSelectedRows([]);
        return toastNotification({ toast, message, status: "success" });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Flex p="20px" bg="#fff" flexDir="column" width="100%" height="100vh">
      <Flex justifyContent="center" w="100%">
        <Box p="40px 80px" width="80%" color="#2c2c2c">
          <Heading size="xl">Application Station</Heading>
          <Text pt="3" fontSize="md" color=" #5f5f5f">
            Manage your applications with ease by importing them into the
            classifier.
          </Text>
        </Box>
        <Stats loggedInUserData={loggedInUserData} />
      </Flex>
      <Flex
        width="100%"
        justifyContent="space-between"
        flex="1"
        mt="1rem"
        h="100%"
        minH="450px"
      >
        <Box
          bgColor="#f6f6f6"
          borderRadius="15px"
          p="15px"
          color="#2c2c2c"
          flex="1"
          h="100%"
          w="100%"
        >
          <Box>
            <Heading size="md">Company Applications Tracker</Heading>
            <Text pt="2" fontSize="sm" color="#5f5f5f">
              Add, edit, delete, and track all your applications with this
              simple tool.
            </Text>
          </Box>
          <Flex
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            height="90%"
            w="100%"
          >
            <Flex width="100%" mt="2rem" justifyContent="space-between">
              <Stack
                width="100%"
                direction="row"
                spacing={4}
                justifyContent="flex-start"
              >
                <Button
                  size="sm"
                  rightIcon={<AddIcon />}
                  color="#1668fc"
                  variant="ghost"
                  onClick={() => {
                    setEditRow({});
                    setOpenDrawer({
                      reason: "add",
                      status: true,
                    });
                  }}
                  isDisabled={!loggedInUserData?.loggedInUser}
                >
                  Add
                </Button>
                <Button
                  size="sm"
                  rightIcon={<DeleteIcon />}
                  color="#f24d62"
                  variant="ghost"
                  isDisabled={selectedRows.length <= 0}
                  isLoading={loadingCompanyApplications}
                  onClick={handleCompanyApplicationsDeletions}
                >
                  Delete
                </Button>
              </Stack>
              <ImportCompanyApplications
                isUserLoggedIn={!!loggedInUserData?.loggedInUser}
                importProgress={dataImportProgress?.importProgress}
                refetch={refetch}
              />
            </Flex>

            <TableContainer
              mt=".5rem"
              h="100%"
              minH="200px"
              maxH="450px"
              p="0px 9px 9px 9px"
              w="100%"
              bgColor="#fff"
              boxShadow="base"
              borderRadius="15px"
              overflowY="auto"
            >
              <Table variant="simple" size="sm" width="100%" overflowY="scroll">
                <Thead
                  width="100%"
                  height="40px"
                  pos="sticky"
                  top={0}
                  zIndex={2}
                  bgColor="#fff"
                  sx={{
                    "& th": {
                      color: "#2c2c2c",
                    },
                  }}
                >
                  <Tr>
                    <Th></Th>
                    <Th>Company</Th>
                    <Th>Position</Th>
                    <Th>Awaiting Reply</Th>
                    <Th>Rejected</Th>
                    <Th>Next Round</Th>
                    <Th>Received Offer</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {!!loggedInUserData?.loggedInUser &&
                    currentPageApplications?.map((companyApplication: any) => {
                      const {
                        id,
                        companyName,
                        position,
                        awaitingResponse,
                        rejected,
                        nextRound,
                        receivedOffer,
                        unableToClassify,
                      } = companyApplication;
                      return (
                        <Tr
                          key={id}
                          _hover={{
                            backgroundColor: "#f6f6f6",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setEditRow({ ...companyApplication });
                            setOpenDrawer({
                              reason: "edit",
                              status: true,
                            });
                          }}
                          bg={unableToClassify && "#fadcda"}
                        >
                          <Td>
                            <SingleCheckbox
                              color="#f24d62"
                              setSelectedRows={setSelectedRows}
                              id={id}
                            />
                          </Td>
                          <Td maxW="120px" overflow="hidden">
                            {truncateString(companyName)}
                          </Td>
                          <Td maxW="120px" overflow="hidden">
                            {truncateString(position)}
                          </Td>
                          <Td>{tableTestFunc(awaitingResponse)}</Td>
                          <Td>{tableTestFunc(rejected)}</Td>
                          <Td>{tableTestFunc(nextRound)}</Td>
                          <Td>{tableTestFunc(receivedOffer)}</Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              </Table>
            </TableContainer>
            <Pagination
              setCurrentPage={setCurrentPage}
              currentPageApplications={currentPageApplications}
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </Flex>
        </Box>
        <Box
          bgColor="#f6f6f6"
          borderRadius="15px"
          p="15px"
          color="#2c2c2c"
          ml="1rem"
          w="300px"
        >
          <Box>
            <Heading size="md">Top Job Sites</Heading>
            <Text pt="2" fontSize="sm" color="#5f5f5f">
              List of most commonly used websites for job searching.
            </Text>
          </Box>
          <Center h="90%" w="100%">
            <Box
              bgColor="#fff"
              boxShadow="base"
              borderRadius="15px"
              mt={isSmallerThan3xl ? "2rem" : ".3rem"}
              p="20px"
              w="100%"
              maxH="95%"
              minH="85%"
            >
              <List spacing={[1, 1, 1, 2, 2, 3, 12]}>
                <SiteListItem icon={LinkedInPNG} name="LinkedIn" />
                <SiteListItem icon={GlassdoorPNG} name="Glassdoor" />
                <SiteListItem icon={IndeedPNG} name="Indeed" />
                <SiteListItem icon={AngelListSVG} name="Angel List" />
                <SiteListItem icon={ZiprecruiterSVG} name="Zip Recruiter" />
                <SiteListItem icon={BehanceSVG} name="Behance" />
              </List>
            </Box>
          </Center>
        </Box>
      </Flex>
      <FormikDrawer
        {...editRow}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
    </Flex>
  );
};

export default Dashboard;
