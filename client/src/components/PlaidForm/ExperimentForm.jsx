import React, { useState } from "react";
import styled from "styled-components";
import FormPage from "./FormPage";
import InputNumber from "./Fields/InputNumber";
import InputSelect from "./Fields/InputSelect";

const StyledSectionLabel = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const ExperimentForm = ({ handleInputChange, errors, state }) => {
  const [customState, setCustomState] = useState(false);
  const [selectState, setSelectState] = useState({
    value: "{num_row: 6, num_col: 8} ",
  });
  const [validFormState, setValidFormState] = useState(false);

  /* Input handler for the checkbox */
  const displaySize = (event) => {
    setSelectState({ value: event.target.value });
    if (event.target.value === "custom") {
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
      {/* TODO: Json-data must load with the values of the preselected value */}

      <InputSelect
        name="select_plate_size"
        id="size_options"
        value={selectState.value}
        onChange={displaySize}
        onfocus="this.selectedIndex = 1;"
        label={"Plate size"}
        errorMsg={null}
      >
        <option value='{"num_rows": 6, "num_cols": 8}'>48</option>
        <option value='{"num_rows": 8, "num_cols": 12}'>96</option>
        <option value='{"num_rows": 16, "num_cols": 24}'>384</option>
        <option value='{"num_rows": 32, "num_cols": 48}'>1536</option>
        <option value='{"num_rows": 48, "num_cols": 72}'>3456</option>
        <option value="custom">Custom size</option>
      </InputSelect>

      {customState === true ? (
        <>
          <InputNumber
            name="num_rows"
            label="Rows"
            value={state.num_rows ? state.num_rows : ""}
            onChange={inputHandler}
            onBlur={null}
            errorMsg={errors.num_rows ? errors.num_rows : null}
          />
          <InputNumber
            name="num_cols"
            label="Columns"
            value={state.num_cols ? state.num_cols : ""}
            onChange={inputHandler}
            onBlur={null}
            errorMsg={errors.num_cols ? errors.num_cols : null}

          />
        </>
      ) : null}
      <StyledSectionLabel>Cell line direction </StyledSectionLabel>
      <InputNumber
        label={"Vertical"}
        name="vertical_cell_lines"
        value={state.vertical_cell_lines ? state.vertical_cell_lines : ""}
        onChange={handleInputChange}
        errorMsg={errors.vertical_cell_lines ? errors.vertical_cell_lines : null}

      />

      <InputNumber
        label={"Horizontal"}
        name="horizontal_cell_lines"
        value={state.horizontal_cell_lines ? state.horizontal_cell_lines : ""}
        onChange={handleInputChange}
        errorMsg={errors.horizontal_cell_lines ? errors.horizontal_cell_lines : null}

      />
    </FormPage>
  );
};

export default ExperimentForm;
