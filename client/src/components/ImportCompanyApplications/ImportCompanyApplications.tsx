import { useMutation } from "@apollo/client";
import { IMPORT_COMPANY_APPLICATIONS } from "../../apollo/queries-and-mutations";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  CloseButton,
  Flex,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaFileImport } from "react-icons/fa";
import { toastNotification } from "../../utils/toastNotication/toastNotification";
import { useState } from "react";

type Props = {};

const ImportCompanyApplications = ({
  refetch,
  importProgress,
}: {
  refetch: () => void;
  importProgress: number;
}) => {
  const toast = useToast();
  const [importCompanyApplications, { loading, error }] = useMutation(
    IMPORT_COMPANY_APPLICATIONS
  );
  console.log("import loading", loading);
  const [unableToClassifyCount, setUnableToClassifyCount] = useState(0);
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });
  const handleImport = async () => {
    try {
      const result = await importCompanyApplications();

      const statusCode = await result.data.importCompanyApplications.status;
      const message = await result.data.importCompanyApplications.message;
      const unableToClassifyCount = await result.data.importCompanyApplications
        .unableToClassifyCount;
      if (statusCode === 200) {
        refetch();
        toastNotification({ toast, message, status: "success" });
        if (unableToClassifyCount > 0) {
          setUnableToClassifyCount(unableToClassifyCount);
          onOpen();
        }
      }
    } catch (error) {
      // Handle any errors that occurred during the mutation
    }
  };

  const importProgressDisplay = () => {
    if (loading && !importProgress) {
      return `Gathering Emails`;
    } else if (loading && importProgress) {
      return `${importProgress}%`;
    } else {
      return;
    }
  };

  return (
    <>
      <Button
        px="20px"
        isLoading={loading}
        loadingText={importProgressDisplay()}
        size="sm"
        rightIcon={<FaFileImport />}
        colorScheme="green"
        variant="ghost"
        onClick={() => handleImport()}
      >
        Import Emails
      </Button>
      {isVisible && (
        <Alert
          px="10px"
          h="165px"
          w="210px"
          pos="absolute"
          right="0"
          top="0"
          borderRadius="5px"
          status="error"
        >
          <Flex alignItems="flex-start" justifyContent="flex-start">
            <Flex flexDir="column" justifyContent="space-between">
              <AlertIcon />
              <AlertTitle>
                Unable to classify {unableToClassifyCount} imported
                application(s).
              </AlertTitle>
              <AlertDescription>
                Click on a row to view edit or upgrade.
              </AlertDescription>
            </Flex>
            <CloseButton onClick={onClose} />
          </Flex>
        </Alert>
      )}
    </>
  );
};

export default ImportCompanyApplications;
