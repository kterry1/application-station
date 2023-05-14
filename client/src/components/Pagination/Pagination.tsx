import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { HStack, Button, Box } from "@chakra-ui/react";
import { useEffect } from "react";

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  currentPageApplications,
  setCurrentPage,
}: any) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  useEffect(() => {
    if (currentPageApplications?.length === 0) {
      setCurrentPage((currPage) => currPage - 1);
    }
  }, [currentPageApplications]);

  return (
    <HStack spacing={4} justifyContent="center" alignItems="center">
      <Button
        width="120px"
        colorScheme="gray"
        size="md"
        variant="ghost"
        onClick={handlePrevious}
        isDisabled={currentPage === 1}
        leftIcon={<ChevronLeftIcon />}
      >
        Previous
      </Button>
      <Box>
        Page {currentPage} of {totalPages}
      </Box>
      <Button
        width="120px"
        colorScheme="gray"
        size="md"
        variant="ghost"
        onClick={handleNext}
        isDisabled={currentPage === totalPages}
        rightIcon={<ChevronRightIcon />}
      >
        Next
      </Button>
    </HStack>
  );
};

export default Pagination;
