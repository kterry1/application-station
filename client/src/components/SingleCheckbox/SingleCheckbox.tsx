import { Box, Checkbox } from "@chakra-ui/react";
import { useState } from "react";

type SingleCheckboxProps = {
  id: string;
  colorScheme: string;
  setSelectedRows: React.Dispatch<React.SetStateAction<any[]>>;
};

const filterSelectedRows = (id, setSelectedRows) => {
  setSelectedRows((prevSelectedRows) =>
    prevSelectedRows.filter((rowId) => rowId !== id)
  );
};

const SingleCheckbox = ({
  id,
  colorScheme,
  setSelectedRows,
}: SingleCheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Checkbox
        colorScheme={colorScheme}
        isChecked={isChecked}
        onChange={() => {
          setIsChecked(!isChecked);
          !isChecked
            ? setSelectedRows((previousSelectedRows: any[]) => [
                ...previousSelectedRows,
                id,
              ])
            : filterSelectedRows(id, setSelectedRows);
        }}
      />
    </Box>
  );
};

export default SingleCheckbox;
