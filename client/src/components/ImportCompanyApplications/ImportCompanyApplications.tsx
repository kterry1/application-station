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
import { useContext, useEffect, useState } from "react";
import { Context } from "../../main";

interface ImportCompanyApplicationsProps {
  importProgress: number;
  isUserLoggedIn: boolean;
  isImportLoading: boolean;
  loggedInUserRefetch: () => void;
  handleDemoAccountBtnClick: () => void;
  setRun: (value: boolean) => void;
}

const ImportCompanyApplications = ({
  importProgress,
  isUserLoggedIn,
  isImportLoading,
  loggedInUserRefetch,
  setRun,
}: ImportCompanyApplicationsProps) => {
  const toast = useToast();
  const [importCompanyApplications, { loading, error: importError }] =
    useMutation(IMPORT_COMPANY_APPLICATIONS);
  const [unableToClassifyCount, setUnableToClassifyCount] = useState(0);
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });
  const { setToggleForImport } = useContext(Context);
  const handleImport = async () => {
    if (isUserLoggedIn) {
      try {
        const result = await importCompanyApplications();

        const statusCode = result.data.importCompanyApplications.status;
        const message = result.data.importCompanyApplications.message;
        const unableToClassifyCount =
          result.data.importCompanyApplications.unableToClassifyCount;
        if (statusCode === 200) {
          setToggleForImport((prev: boolean) => !prev);
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
    localStorage.setItem("show-tour", "false");
    setRun(false);
  };
  useEffect(() => {
    if (importProgress === 0 || importProgress === 100) {
      loggedInUserRefetch();
    }
  }, [loading, importCompanyApplications, importProgress]);

  const importProgressDisplay = () => {
    if (
      isImportLoading &&
      (importProgress < 1 || importProgress === undefined)
    ) {
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
        isLoading={
          (isImportLoading &&
            (importProgress < 1 || importProgress === undefined)) ||
          (isImportLoading && importProgress < 100)
        }
        loadingText={importProgressDisplay()}
        size="sm"
        rightIcon={<FaFileImport />}
        color="#2c2c2c"
        variant="ghost"
        onClick={handleImport}
        isDisabled={!isUserLoggedIn}
        className="fourth-step-tour"
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
