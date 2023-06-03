import { Button } from "@chakra-ui/react";

interface DemoAccountProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  navSize: string;
}

const DemoAccount = ({ onClick, navSize }: DemoAccountProps) => {
  return (
    <Button
      size={navSize === "small" ? "xs" : "sm"}
      mt={1}
      onClick={onClick}
      color="logoLightBlue.500"
      bg="#2c2c2c"
      className="second-step-tour"
    >
      {navSize === "small" ? "Demo" : "Demo Account"}
    </Button>
  );
};

export default DemoAccount;
