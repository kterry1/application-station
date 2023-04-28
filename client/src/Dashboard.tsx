import {
  Box,
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
import { fakeTableData } from "./fake-table-data";
import CompanyLogo from "./assets/company-logo.svg";
import { useState } from "react";
import SingleCheckbox from "./assets/SingleCheckbox";
import Drawer from "./Drawer";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import Pagination from "./Pagination";

type Props = {};

const tableTestFunc = (property: boolean) => {
  return property ? "Yes" : "No";
};

const Dashboard = (props: Props) => {
  const [allChecked, setAllChecked] = useState(false);
  const [editRow, setEditRow] = useState({});
  const [openDrawer, setOpenDrawer] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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
          <TableContainer
            boxShadow="0 4px 12px 0 rgba(0,0,0, 0.4)"
            mt=".5rem"
            // @ts-ignore-next-line
            variant="simple"
            colorScheme="teal"
            width="100%"
            height="70.7%"
            maxH="625px"
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
                  <Th>Awaiting Response</Th>
                  <Th>Rejected</Th>
                  <Th>Next Round</Th>
                  <Th>Received Offer</Th>
                  <Th>Accepted Offer</Th>
                </Tr>
              </Thead>

              <Tbody>
                {fakeTableData.map((tableRow) => {
                  const {
                    companyName,
                    awaitingResponse,
                    rejected,
                    nextRound,
                    receivedOffer,
                    acceptedOffer,
                  } = tableRow;

                  return (
                    <Tr
                      _hover={{ backgroundColor: "#AEC8CA", cursor: "pointer" }}
                      onClick={() => {
                        setEditRow({ ...tableRow });
                        setOpenDrawer(true);
                        console.log("Parent Clicked");
                      }}
                    >
                      <Td>
                        <SingleCheckbox
                          colorScheme="red"
                          allChecked={allChecked}
                        />
                      </Td>
                      <Td>{companyName}</Td>
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
