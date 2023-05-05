import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { HStack, Button, Box } from "@chakra-ui/react";

const Pagination = ({ totalPages, currentPage, onPageChange }: any) => {
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

  return (
    <HStack spacing={4} justifyContent="center" alignItems="center">
      <Button
        width="120px"
        colorScheme="gray"
        border="5px"
        size="md"
        border="1px"
        borderColor="green.600"
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
        border="5px"
        size="md"
        border="1px"
        borderColor="green.600"
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
