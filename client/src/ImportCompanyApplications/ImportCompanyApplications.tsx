import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { IMPORT_MULTIPLE_COMPANY_APPLICATIONS } from "../getUserCompanyApplications";
import { Button } from "@chakra-ui/react";

type Props = {};

const ImportCompanyApplications = (props: Props) => {
  const toast = useToast();
  const [importCompanyApplications, { loading: load, error: err }] =
    useMutation(IMPORT_MULTIPLE_COMPANY_APPLICATIONS);
  const handleImport = async () => {
    try {
      const result = await importCompanyApplications();

      const statusCode = await result.data.importCompanyApplications.status;
      const message = await result.data.importCompanyApplications.message;
      if (statusCode === 200) {
        return toast({
          title: message,
          status: "success",
          variant: "solid",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      // Handle any errors that occurred during the mutation
    }
  };

  return <Button>ImportCompanyApplications</Button>;
};

export default ImportCompanyApplications;
