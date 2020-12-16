import React, { useState } from "react";
import styled from "styled-components";


const StyledRowLabelContainer = styled.div`
  margin-top: 40px;
  margin-right: 24%;

`;
const StyledColLabelContainer = styled.div`
  margin-top: 20px;
  margin-right: 22%;

`;
const StyledLabel = styled.label`
  font-weight: bold;
  margin-left: 500px;

`;
const StyledInput = styled.input`
  width: 30%;
  height: 5%;
  margin-left: 500px;
`;

const StyledCheckboxLabel = styled.label`
  margin-top:30px;  
  margin-left: 500px;
  margin-right: 20.5%;
  font-weight: bold;  
`;
const StyledVertical = styled.input`
  margin-left: 500px;
  width: 20%;
`;
const StyledHorizontal = styled.input`
margin-left: 500px;
  width: 20%;
`;

const StyledHorizontalLabel = styled.label`
  margin-left: 500px;
`;
const StyledVerticalLabel = styled.label`
  margin-left: 500px;
`;

const StyledSelectContainer = styled.div`
  margin-top:100px;
  display: block;
`;
const StyledSelect = styled.select`
  display: block;
  margin-left: 700px;

`;
const StyledSizeLabel = styled.label`
  display: block;
  margin-left: 700px;

`;

const StyledErrorMessage = styled.div`
  margin-left:500px;
  color: red;
`;

const ExperimentForm = ({ handleInputChange}) => {

  const [customState, setCustomState] = useState(false)
  const [selectState, setSelectState] = useState({ value: '{num_row: 6, num_col: 8} ' })
  const [validFormState, setValidFormState] = useState(false);

  const [errorMsg, setErrorMsg] = useState({})
  /* This state imanages if a specific state is invalid or not */
  const [errorState, setErrorState] = useState({
    num_rows: false,
    num_cols: false,
    vertical_cell_lines: true,
    horizontal_cell_lines: true,
  })

  /* Form is valid by default (True). Form is invalid if there exists a state making it false. 
     TODO: Probably add a better way to check for validation, e.g functions
  */
  function handleValidation(event) {
    const value = event.target.value;
    const names = event.target.name;
    const formFields = { [names]: value };
    const errors = errorMsg;
    let formIsValid = false;
    
    /* Reset error state to run validation again */
    setErrorState({ ...errorState, [names]: false });
    
    if (formFields['num_rows'] <= 0) {
      setErrorState({ ...errorState, [names]: true });
      errors['num_rows'] = 'Rows must a number and not zero';
    }
    if (formFields['num_cols'] <= 0) {
      setErrorState({ ...errorState, [names]: true });
      errors['num_cols'] = 'Columns must be a number and not zero';
    }
    if (formFields['vertical_cell_lines'] <= 0) {
      setErrorState({ ...errorState, [names]: true });
      errors['vertical_cell_lines'] = 'Cell line must be a number and not empty';
    }
    if (formFields['horizontal_cell_lines'] <= 0) {
      setErrorState({ ...errorState, [names]: true });
      errors['horizontal_cell_lines'] = 'Cell line must be a number and not empty';
    }
      /* Used to check if all inputs are valid - currently not in use */

    console.log(errorState)
    for (var key in errorState){
      if(errorState[key] == true){
        formIsValid = false;
        break;
      }
      else{
        formIsValid = true;
      }
    }

    setValidFormState(formIsValid);
    setErrorMsg({ ...errorMsg, errors: errors })

    return formIsValid;
  }
  /* Input handler for the checkbox */
  const displaySize = (event) => {
    setSelectState({ value: event.target.value })
    if (event.target.value === 'custom') {
      setErrorState({...errorState, num_rows: true, num_cols: true})
      setCustomState(!customState)
    } else {
      handleInputChange(event);
      setCustomState(false)
    }
  }
  function inputHandler(event) {
    console.log(event.target.name)

    if (!handleValidation(event)) {
      console.log(!handleValidation)
    }
    else {
      handleInputChange(event)
    }
  }

  console.log(validFormState);
  return (<>
    <StyledSelectContainer>
      <StyledSizeLabel> Select Plate Size</StyledSizeLabel>
      {/* TODO: Json-data must load with the values of the preselected value */}
      <StyledSelect name='select_plate_size' id='size_options' value={selectState.value} onChange={displaySize} onfocus='this.selectedIndex = 1;'>
        <option value='{"num_rows": 6, "num_cols": 8}'>48</option>
        <option value='{"num_rows": 8, "num_cols": 12}'>96</option>
        <option  value='{"num_rows": 16, "num_cols": 24}'>384</option>
        <option value='{"num_rows": 32, "num_cols": 48}'>1536</option>
        <option value='{"num_rows": 48, "num_cols": 72}'>3456</option>
        <option value='custom'>Custom size</option>
      </StyledSelect>
    </StyledSelectContainer>

    {customState === true ? <><StyledRowLabelContainer>
      <StyledLabel> Plate rows  </StyledLabel>
    </StyledRowLabelContainer>
      <><StyledInput type='number' id='num_rows' name='num_rows' onChange={inputHandler} onBlur={handleValidation} />
        <StyledErrorMessage>{errorState.num_rows ? errorMsg.num_rows : null}</StyledErrorMessage>
      </>
      <StyledColLabelContainer>
        <StyledLabel>Plate columns </StyledLabel>
      </StyledColLabelContainer>
      <StyledInput type="number" name='num_cols' onChange={inputHandler} /> </> : null}
    <StyledErrorMessage>{errorState.num_cols ? errorMsg.num_cols : null}</StyledErrorMessage>
    {/* TODO: Create grid container around vertical and horizontal cell linse  */}
    <StyledCheckboxLabel>Cell line direction </StyledCheckboxLabel>
    <StyledVerticalLabel>Vertical    </StyledVerticalLabel>
    <StyledVertical
      name='vertical_cell_lines' type="number" onChange={inputHandler}
    />
    <StyledErrorMessage>{errorState.vertical_cell_lines ? errorMsg.vertical_cell_lines : null}</StyledErrorMessage>

    <StyledHorizontalLabel>Horizontal    </StyledHorizontalLabel>
    <StyledHorizontal
      name='horizontal_cell_lines' type="number" onChange={inputHandler}
    />
    <StyledErrorMessage>{errorState.horizontal_cell_lines ? errorMsg.horizontal_cell_lines : null}</StyledErrorMessage>

  </>
  )
}

export default ExperimentForm