import React, { useState } from "react";
import styled from "styled-components";

const StyledExperimentFormContainer = styled.div`
  
  display: flex;
  flex-direction: column;
`;

const StyledFormContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledGroupRow = styled.div`
  margin-right: 10px;
  display: flex;
  flex-direction: row;
`;
const StyledGroupCol = styled.div`
  margin-right: 10px;
  display: flex;
  flex-direction: column;
`;

const StyledRowLabelContainer = styled.div`
  margin-top: 5px;
`;
const StyledColLabelContainer = styled.div`
  margin-top: 5px;
`;
const StyledLabel = styled.label`
  margin-top: 5px;

`;
const StyledInput = styled.input`
  margin-top: 5px;
`;

const StyledCheckboxLabel = styled.label`
  margin-top: 5px;
  font-weight: bold;
`;
const StyledVertical = styled.input``;
const StyledHorizontal = styled.input``;

const StyledHorizontalLabel = styled.label`
  margin-top: 5px;
  width: 100px;
`;
const StyledVerticalLabel = styled.label`
  margin-top: 5px;
  width: 100px;
`;

const StyledSelect = styled.select`
  align-self: flex-start;
`;
const StyledSizeLabel = styled.label`
  align-self: flex-start;
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: red;
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

  /* Form is valid by default (True). Form is invalid if there exists a state making it false. 
     TODO: Probably add a better way to check for validation, e.g functions
  */
  function handleValidation(event) {
    const value = event.target.value;
    const names = event.target.name;
    const formFields = { [names]: value };
    const errors = errorMsg;
    /* This stops the onChange from updating the object */
    let formIsValid = true;
    console.log(formFields);
    /* Reset error state to run validation again */
    setErrorState({ ...errorState, [names]: false });

    if (formFields["num_rows"] <= 0) {
      setErrorState({ ...errorState, [names]: true });
      formIsValid = false;
      errors["num_rows"] = "Rows must a number and not zero";
    }
    if (formFields["num_cols"] <= 0) {
      setErrorState({ ...errorState, [names]: true });
      formIsValid = false;

      errors["num_cols"] = "Columns must be a number and not zero";
    }
    if (formFields["vertical_cell_lines"] <= 0) {
      setErrorState({ ...errorState, [names]: true });
      formIsValid = false;

      errors["vertical_cell_lines"] =
        "Cell line must be a number and not empty";
    }
    if (formFields["horizontal_cell_lines"] <= 0) {
      setErrorState({ ...errorState, [names]: true });
      formIsValid = false;

      errors["horizontal_cell_lines"] =
        "Cell line must be a number and not empty";
    }
    /* Used to check if all inputs are valid - currently not in use as it has to be placed elsewhere.
         It will be used to disabled next buttons in the future*/

    /*   console.log(errorState)
    for (var key in errorState){
      if(errorState[key] == true){
        formIsValid = false;
        break;
      }
      else{
        formIsValid = true;
      }
    } */

    setValidFormState(formIsValid);
    setErrorMsg({ ...errorMsg, errors: errors });

    return formIsValid;
  }
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
    console.log(event.target.name);

    if (!handleValidation(event)) {
      console.log(!handleValidation);
    } else {
      handleInputChange(event);
    }
  }

  console.log(validFormState);
  return (
    <StyledExperimentFormContainer>
      <StyledFormContainer>
        <StyledGroupCol>
          <StyledSizeLabel> Select Plate Size</StyledSizeLabel>
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
        </StyledGroupCol>

        {customState === true ? (
          <>
            <StyledGroupCol>
              <StyledRowLabelContainer>
                <StyledLabel> Plate rows </StyledLabel>
              </StyledRowLabelContainer>
              <>
                <StyledInput
                  type="number"
                  id="num_rows"
                  name="num_rows"
                  value={num_rows}
                  onChange={inputHandler}
                  onBlur={handleValidation}
                />
                <StyledErrorMessage>
                  {errorState.num_rows ? errorMsg.num_rows : null}
                </StyledErrorMessage>
              </>
            </StyledGroupCol>
            <StyledGroupCol>
              <StyledColLabelContainer>
                <StyledLabel>Plate columns </StyledLabel>
              </StyledColLabelContainer>
              <StyledInput
                type="number"
                name="num_cols"
                onChange={inputHandler}
              />
              <StyledErrorMessage>
                {errorState.num_cols ? errorMsg.num_cols : null}
              </StyledErrorMessage>
            </StyledGroupCol>
          </>
        ) : null}
      </StyledFormContainer>
      {/* TODO: Create grid container around vertical and horizontal cell linse  */}
      <StyledFormContainer>
        <StyledGroupCol>
          <StyledCheckboxLabel>Cell line direction </StyledCheckboxLabel>
          <StyledGroupRow>
            <StyledGroupCol>
              <StyledVerticalLabel>Vertical </StyledVerticalLabel>
              <StyledVertical
                name="vertical_cell_lines"
                type="number"
                onChange={inputHandler}
              />
              <StyledErrorMessage>
                {errorState.vertical_cell_lines
                  ? errorMsg.vertical_cell_lines
                  : null}
              </StyledErrorMessage>
            </StyledGroupCol>
            <StyledGroupCol>
              <StyledHorizontalLabel>Horizontal </StyledHorizontalLabel>
              <StyledHorizontal
                name="horizontal_cell_lines"
                type="number"
                onChange={inputHandler}
              />
              <StyledErrorMessage>
                {errorState.horizontal_cell_lines
                  ? errorMsg.horizontal_cell_lines
                  : null}
              </StyledErrorMessage>
            </StyledGroupCol>
          </StyledGroupRow>
        </StyledGroupCol>
      </StyledFormContainer>
    </StyledExperimentFormContainer>
  );
};

export default ExperimentForm;
