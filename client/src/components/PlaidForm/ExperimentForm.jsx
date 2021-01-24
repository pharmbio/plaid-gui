import React, { useState } from "react";
import styled from "styled-components";
import FormPage from "./FormPage";
import InputNumber from "./Fields/InputNumber";

const StyledSectionLabel = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const StyledSelect = styled.select`
  align-self: flex-start;
`;
const StyledSizeLabel = styled.label`
  align-self: flex-start;
`;

const ExperimentForm = ({ num_rows, handleInputChange }) => {
  const [customState, setCustomState] = useState(false);
  const [selectState, setSelectState] = useState({
    value: "{num_row: 6, num_col: 8} ",
  });
  const [validFormState, setValidFormState] = useState(false);

  const [errorMsg, setErrorMsg] = useState({});
  /* This state imanages if a specific state is invalid or not */
  const [errorState, setErrorState] = useState({
    num_rows: false,
    num_cols: false,
    vertical_cell_lines: true,
    horizontal_cell_lines: true,
  });

  /* Input handler for the checkbox */
  const displaySize = (event) => {
    setSelectState({ value: event.target.value });
    if (event.target.value === "custom") {
      setErrorState({ ...errorState, num_rows: true, num_cols: true });
      setCustomState(!customState);
    } else {
      handleInputChange(event);
      setCustomState(false);
    }
  };
  function inputHandler(event) {
    handleInputChange(event);
  }

  console.log(validFormState);
  return (
    <FormPage>
      <StyledSectionLabel>Plate dimensions</StyledSectionLabel>
      <StyledSizeLabel> Plate Size</StyledSizeLabel>
      {/* TODO: Json-data must load with the values of the preselected value */}
      <StyledSelect
        name="select_plate_size"
        id="size_options"
        value={selectState.value}
        onChange={displaySize}
        onfocus="this.selectedIndex = 1;"
      >
        <option value='{"num_rows": 6, "num_cols": 8}'>48</option>
        <option value='{"num_rows": 8, "num_cols": 12}'>96</option>
        <option value='{"num_rows": 16, "num_cols": 24}'>384</option>
        <option value='{"num_rows": 32, "num_cols": 48}'>1536</option>
        <option value='{"num_rows": 48, "num_cols": 72}'>3456</option>
        <option value="custom">Custom size</option>
      </StyledSelect>

      {customState === true ? (
        <>
          <InputNumber
            name="num_rows"
            label="Rows"
            value={num_rows}
            onChange={inputHandler}
            onBlur={handleValidation}
            errorMsg={errorState.num_rows ? errorMsg.num_rows : null}
          />
          <InputNumber
            name="num_cols"
            label="Columns"
            value={null}
            onChange={inputHandler}
            onBlur={null}
            errorMsg={errorState.num_cols ? errorMsg.num_cols : null}
          />
        </>
      ) : null}
      <StyledSectionLabel>Cell line direction </StyledSectionLabel>
      <InputNumber
        label={"Vertical"}
        name="vertical_cell_lines"
        onChange={handleInputChange}
        errorMsg={
          errorState.vertical_cell_lines ? errorMsg.vertical_cell_lines : null
        }
      />

      <InputNumber
        label={"Horizontal"}
        name="horizontal_cell_lines"
        onChange={handleInputChange}
        errorMsg={
          errorState.horizontal_cell_lines
            ? errorMsg.horizontal_cell_lines
            : null
        }
      />
    </FormPage>
  );
};

export default ExperimentForm;
