import { useMutation } from "@apollo/client";
import { IMPORT_COMPANY_APPLICATIONS } from "../../apollo/queries-and-mutations";
import { Button, useToast } from "@chakra-ui/react";
import { FaFileImport } from "react-icons/fa";
import { toastNotification } from "../../utils/toastNotication/toastNotification";

type Props = {};

const ImportCompanyApplications = ({ refetch }: { refetch: () => void }) => {
  const toast = useToast();
  const [importCompanyApplications, { loading, error }] = useMutation(
    IMPORT_COMPANY_APPLICATIONS
  );
  const handleImport = async () => {
    try {
      const result = await importCompanyApplications();

      const statusCode = await result.data.importCompanyApplications.status;
      const message = await result.data.importCompanyApplications.message;
      if (statusCode === 200) {
        refetch();
        return toastNotification({ toast, message, status: "success" });
      }
    } catch (error) {
      // Handle any errors that occurred during the mutation
    }
  };

  return (
    <Button
      px="20px"
      isLoading={loading}
      size="sm"
      rightIcon={<FaFileImport />}
      colorScheme="green"
      variant="ghost"
      onClick={() => handleImport()}
    >
      Import Emails
    </Button>
  );
};

export default ImportCompanyApplications;
