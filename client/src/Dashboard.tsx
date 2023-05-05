import {
  Button,
  Center,
  Checkbox,
  Flex,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import "./App.css";
import CompanyLogo from "./assets/company-logo.svg";
import { useState } from "react";
import SingleCheckbox from "./assets/SingleCheckbox";
import Drawer from "./Drawer";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import Pagination from "./Pagination";
import { GET_COMPANY_APPLICATIONS } from "./getUserCompanyApplications";
import { useQuery } from "@apollo/client";
import ImportCompanyApplications from "./ImportCompanyApplications/ImportCompanyApplications";

type Props = {};

const tableTestFunc = (property: boolean) => {
  return property ? "Yes" : "No";
};

const Dashboard = (props: Props) => {
  const [allChecked, setAllChecked] = useState(false);
  const [editRow, setEditRow] = useState({});
  const [openDrawer, setOpenDrawer] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data, refetch } = useQuery(GET_COMPANY_APPLICATIONS);
  const totalPages = 10;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  return (
    <Flex py="20px" bg="#f6f6f6a3" flexDir="column" width="100%" height="100vh">
      <Flex
        px="5%"
        height="10%"
        width="100%"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <img width={230} src={CompanyLogo} />
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
                variant="outline"
                onClick={() => {
                  setEditRow({});
                  setOpenDrawer(true);
                }}
              >
                Add
              </Button>
              <Button
                size="sm"
                rightIcon={<DeleteIcon />}
                colorScheme="red"
                variant="outline"
              >
                Delete
              </Button>
            </Stack>
            <ImportCompanyApplications refetch={refetch} />
          </Flex>
          <TableContainer
            boxShadow="0 4px 12px 0 rgba(0,0,0, 0.4)"
            mt=".5rem"
            mb="1rem"
            // @ts-ignore-next-line
            variant="simple"
            width="80vw"
            height="60%"
            maxH="625px"
            maxW="80vw"
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
                  <Th>
                    <Checkbox
                      colorScheme="red"
                      isChecked={allChecked}
                      onChange={() => setAllChecked(!allChecked)}
                    />
                  </Th>
                  <Th>Company</Th>
                  <Th>Position</Th>
                  <Th>Awaiting Response</Th>
                  <Th>Rejected</Th>
                  <Th>Next Round</Th>
                  <Th>Received Offer</Th>
                  <Th>Accepted Offer</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.companyApplications.map((companyApplication: any) => {
                  const {
                    companyName,
                    position,
                    awaitingResponse,
                    rejected,
                    nextRound,
                    receivedOffer,
                    acceptedOffer,
                  } = companyApplication;

                  return (
                    <Tr
                      _hover={{
                        backgroundColor: "#AEC8CA",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setEditRow({ ...companyApplication });
                        setOpenDrawer(true);
                      }}
                    >
                      <Td>
                        <SingleCheckbox
                          colorScheme="red"
                          allChecked={allChecked}
                        />
                      </Td>
                      <Td maxW="180px" overflow="hidden">
                        {companyName}
                      </Td>
                      <Td maxW="180px" overflow="hidden">
                        {position}
                      </Td>
                      <Td>{tableTestFunc(awaitingResponse)}</Td>
                      <Td>{tableTestFunc(rejected)}</Td>
                      <Td>{tableTestFunc(nextRound)}</Td>
                      <Td>{tableTestFunc(receivedOffer)}</Td>
                      <Td>{tableTestFunc(acceptedOffer)}</Td>
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
      <Drawer
        {...editRow}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
    </Flex>
  );
};

export default Dashboard;
