import {
  Center,
  Checkbox,
  Flex,
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

type Props = {};

const tableTestFunc = (property: boolean) => {
  return property ? "Yes" : "No";
};

const Dashboard = (props: Props) => {
  const [allChecked, setAllChecked] = useState(false);
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
        <TableContainer
          boxShadow="0 4px 12px 0 rgba(0,0,0, 0.4)"
          variant="simple"
          colorScheme="teal"
          width="95%"
          height="79.7%"
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
                    colorScheme="customColor"
                    isChecked={allChecked}
                    onChange={() => setAllChecked(!allChecked)}
                  />
                </Th>
                <Th>Company</Th>
                <Th>Awaiting Response</Th>
                <Th>Rejected</Th>
                <Th>Onto Next Round</Th>
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
                  ontoNextRound,
                  receivedOffer,
                  acceptedOffer,
                } = tableRow;

                return (
                  <Tr
                    _hover={{ backgroundColor: "#AEC8CA", cursor: "pointer" }}
                  >
                    <Td>
                      <SingleCheckbox
                        colorScheme="customColor"
                        allChecked={allChecked}
                      />
                    </Td>
                    <Td>{companyName}</Td>
                    <Td>{tableTestFunc(awaitingResponse)}</Td>
                    <Td>{tableTestFunc(rejected)}</Td>
                    <Td>{tableTestFunc(ontoNextRound)}</Td>
                    <Td>{tableTestFunc(receivedOffer)}</Td>
                    <Td>{tableTestFunc(acceptedOffer)}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Center>
    </Flex>
  );
};

export default Dashboard;
