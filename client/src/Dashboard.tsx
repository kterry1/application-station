import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  CloseButton,
  Flex,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import "./App.css";
import { useEffect, useState } from "react";
import SingleCheckbox from "./assets/SingleCheckbox";
import Drawer from "./Drawer";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import Pagination from "./Pagination";
import {
  DELETE_COMPANY_APPLICATIONS,
  GET_COMPANY_APPLICATIONS,
} from "./queries-and-mutations";
import { useMutation, useQuery } from "@apollo/client";
import ImportCompanyApplications from "./ImportCompanyApplications/ImportCompanyApplications";
import Stats from "./Stats/Stats";
import FormikDrawer from "./FormikDrawer";

type Props = {};

const tableTestFunc = (property: boolean) => {
  return property ? "Yes" : "No";
};

const truncateString = (str: string, maxLength = 20) => {
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
  const toast = useToast();
  const totalPages = 10;

  useEffect(() => {
    refetch();
  }, [loggedInUserData]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleCompanyApplicationsDeletions = async () => {
    try {
      const result = await deleteCompanyApplications();

      const statusCode = await result.data.deleteCompanyApplications.status;
      const message = await result.data.deleteCompanyApplications.message;
      if (statusCode === 200) {
        refetch();
        setSelectedRows([]);
        return toast({
          title: message,
          status: "success",
          position: "top",
          variant: "solid",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      // Handle any errors that occurred during the mutation
    }
  };
  return (
    <Flex py="20px" bg="#f6f6f6a3" flexDir="column" width="100%" height="100vh">
      <Flex justifyContent="center" w="100%">
        <Stats loggedInUserData={loggedInUserData} />
      </Flex>
      <Center width="100%" height="100%">
        <Flex
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Flex width="100%" justifyContent="space-between">
            <Stack
              width="100%"
              direction="row"
              spacing={4}
              justifyContent="flex-start"
            >
              <Button
                size="sm"
                rightIcon={<AddIcon />}
                colorScheme="blue"
                variant="ghost"
                onClick={() => {
                  setEditRow({});
                  setOpenDrawer({
                    reason: "add",
                    status: true,
                  });
                }}
              >
                Add
              </Button>
              <Button
                size="sm"
                rightIcon={<DeleteIcon />}
                colorScheme="red"
                variant="ghost"
                isDisabled={selectedRows.length <= 0}
                isLoading={loadingCompanyApplications}
                onClick={handleCompanyApplicationsDeletions}
              >
                Delete
              </Button>
              {/* <Alert
                px="10px"
                h="30px"
                pos="relative"
                borderRadius="5px"
                status="error"
              >
                <Flex
                  width="100%"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Flex>
                    <AlertIcon />
                    <AlertTitle>Unable to classify 10 applications.</AlertTitle>
                    <AlertDescription>
                      Click on a row to view edit or upgrade.
                    </AlertDescription>
                  </Flex>
                  <CloseButton />
                </Flex>
              </Alert> */}
            </Stack>

            <ImportCompanyApplications refetch={refetch} />
          </Flex>
          <TableContainer
            borderRadius="5px"
            boxShadow="base"
            mt=".5rem"
            mb="1rem"
            h="55vh"
            minH="320px"
            maxH="625px"
            maxW="81vw"
            bgColor="#fff"
            overflowY="unset"
          >
            <Table size="md" width="100%">
              <Thead
                boxShadow="0 4px 12px 0 rgba(0,0,0, 0.10)"
                width="100%"
                pos="sticky"
                top={0}
                bg="#fff"
                zIndex={2}
                bgColor="#eff4f4"
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
                  data?.companyApplications.map((companyApplication: any) => {
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
                          backgroundColor: "#AEC8CA",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setEditRow({ ...companyApplication });
                          setOpenDrawer({
                            reason: "edit",
                            status: true,
                          });
                        }}
                        bg={unableToClassify && "red.100"}
                      >
                        <Td>
                          <SingleCheckbox
                            colorScheme="red"
                            setSelectedRows={setSelectedRows}
                            id={id}
                          />
                        </Td>
                        <Td overflow="hidden">{truncateString(companyName)}</Td>
                        <Td overflow="hidden">{truncateString(position)}</Td>
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
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </Flex>
      </Center>
      {/* <Drawer
        {...editRow}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      /> */}
      <FormikDrawer
        {...editRow}
        status={status}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
    </Flex>
  );
};

export default Dashboard;
