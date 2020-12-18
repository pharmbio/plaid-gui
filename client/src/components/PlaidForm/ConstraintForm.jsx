import React, { useState } from "react";
import styled from "styled-components";


const StyledConstraintFormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledCheckboxContainer = styled.div`
margin-top:10px;
`;
const StyledCheckboxLabel = styled.label`
margin-top:10px;
  font-weight: bold;  
`;

const StyledColLabelContainer = styled.div`
margin-top:10px;

`;
const StyledInput = styled.input`
margin-top:10px;
`;
const StyledErrorMessage = styled.div`
  font-size:12px;
  color: red;
`;

const ConstraintForm = ({ handleInputChange }) => {
  const [emptyState, setEmptyState] = useState(false);
  const [validFormState, setValidFormState] = useState(false);

  const [errorMsg, setErrorMsg] = useState({})
  /* This state imanages if a specific state is invalid or not */
  const [errorState, setErrorState] = useState({

    size_empty_edge: true,
  })


  function handleValidation(event) {
    const value = event.target.value;
    const names = event.target.name;
    const formFields = { [names]: value }
    const errors = errorMsg;
    let formIsValid = true;
    /* Reset error state to run validation again */
    setErrorState({ ...errorState, [names]: false });
    if (formFields['size_empty_edge'] <= 0) {
      formIsValid = false;
      setErrorState({ ...errorState, [names]: true });
      errors['size_empty_edge'] = 'Invalid size of empty edges';
    }
    setValidFormState(formIsValid);
    setErrorMsg({ ...errorMsg, errors: errors })

    return formIsValid;
  }

  function inputHandler(event) {
    if (event.target.type === 'checkbox') {
      setEmptyState(!emptyState);
      handleInputChange(event);
    }
    else {
      if (!handleValidation(event)) {
      }
      else {
        handleInputChange(event)
      }
    }
  }

  return (<StyledConstraintFormContainer>
    <StyledCheckboxLabel>
      Constraints
        </StyledCheckboxLabel>
    <StyledCheckboxContainer>
      <label> Allow empty wells
            <input
          name='allow_empty_wells' type="checkbox" onChange={inputHandler}
        />
      </label>
    </StyledCheckboxContainer>
    <StyledColLabelContainer>
      Size of empty edges:
        </StyledColLabelContainer>
    <StyledInput type="number" name='size_empty_edge' onChange={inputHandler} />
    <StyledErrorMessage>{errorState.size_empty_edge ? errorMsg.size_empty_edge : null}</StyledErrorMessage>
  </StyledConstraintFormContainer>
  )

}

export default ConstraintForm