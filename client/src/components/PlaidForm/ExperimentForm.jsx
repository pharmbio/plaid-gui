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
                  value={state.num_rows ? state.num_rows : null}
                  onChange={inputHandler}
                />
                <StyledErrorMessage>
                  {errors.num_rows ? errors.num_rows : null}
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
                value={state.num_cols ? state.num_cols : null}
                onChange={inputHandler}
              />
              <StyledErrorMessage>
                {errors.num_cols ? errors.num_cols : null}
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
              </StyledErrorMessage>
            </StyledGroupCol>
          </StyledGroupRow>
        </StyledGroupCol>
      </StyledFormContainer>
    </StyledExperimentFormContainer>
  );
};

export default ExperimentForm;
