import { Button } from "@chakra-ui/react";

interface DemoAccountProps {
  onClick: () => void;
}

const DemoAccount = ({ onClick }: DemoAccountProps) => {
  return (
    <Button onClick={onClick} colorScheme="logoDarkBlue" mb="4">
      Demo Account
    </Button>
  );
};

export default DemoAccount;
