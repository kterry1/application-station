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
  isUserLoggedIn,
}: {
  refetch: () => void;
  importProgress: number;
  isUserLoggedIn: boolean;
}) => {
  const toast = useToast();
  const [importCompanyApplications, { loading, error: importError, data }] =
    useMutation(IMPORT_COMPANY_APPLICATIONS);
  const [unableToClassifyCount, setUnableToClassifyCount] = useState(0);
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });
  const handleImport = async () => {
    if (isUserLoggedIn) {
      try {
        const start = new Date();
        const result = await importCompanyApplications();
        const end = new Date();
        const totalTimeInSeconds = (end - start) / 1000;
        console.log("Import Time In Seconds", totalTimeInSeconds);
        const statusCode = result.data.importCompanyApplications.status;
        const message = result.data.importCompanyApplications.message;
        const unableToClassifyCount =
          result.data.importCompanyApplications.unableToClassifyCount;
        if (statusCode === 200) {
          refetch(); // @TODO: improve naming convention
          toastNotification({ toast, message, status: "success" });
          if (unableToClassifyCount > 0) {
            setUnableToClassifyCount(unableToClassifyCount);
            onOpen();
          }
        }
      } catch (error) {
        console.error("Error during import mutation", importError);
        console.error("Error importing", error);
      }
    } else {
      toastNotification({
        toast,
        message: "Please log in to import.",
        status: "info",
      });
    }
  };

  const importProgressDisplay = () => {
    if (importProgress === 0) {
      return "Gathering Emails";
    } else if (importProgress > 0 && importProgress < 100) {
      return `${importProgress}%`;
    } else {
      return;
    }
  };

  return (
    <>
      <Button
        px="20px"
        isLoading={typeof importProgress === "number" && importProgress < 100}
        loadingText={importProgressDisplay()}
        size="sm"
        rightIcon={<FaFileImport />}
        colorScheme="green"
        variant="ghost"
        onClick={() => handleImport()}
        isDisabled={!isUserLoggedIn}
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
                Click on a row to view or edit.
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
