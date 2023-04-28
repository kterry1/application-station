import { Checkbox } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type SingleCheckboxProps = {
  colorScheme: string;
  allChecked: boolean;
};

const SingleCheckbox = ({ colorScheme, allChecked }: SingleCheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(allChecked);
  }, [allChecked]);

  return (
    <Checkbox
      colorScheme={colorScheme}
      isChecked={isChecked}
      onChange={() => setIsChecked(!isChecked)}
    />
  );
};

export default SingleCheckbox;
