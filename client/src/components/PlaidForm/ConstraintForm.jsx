import React, { useState } from "react";
import styled from "styled-components";
import FormPage from "./FormPage";
import InputNumber from "./Fields/InputNumber";
import InputCheck from "./Fields/InputCheck";

const StyledSectionLabel = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;


const ConstraintForm = ({handleInputChange, errors,state}) => {
  const [emptyState, setEmptyState] = useState(false);
  const [validFormState, setValidFormState] = useState(false);

  const [errorMsg, setErrorMsg] = useState({});
  /* This state imanages if a specific state is invalid or not */
  const [errorState, setErrorState] = useState({
    size_empty_edge: true,
  });

  function handleValidation(event) {
    const value = event.target.value;
    const names = event.target.name;
    const formFields = { [names]: value };
    const errors = errorMsg;
    let formIsValid = true;
    /* Reset error state to run validation again */
    setErrorState({ ...errorState, [names]: false });
    if (formFields["size_empty_edge"] <= 0) {
      formIsValid = false;
      setErrorState({ ...errorState, [names]: true });
      errors["size_empty_edge"] = "Invalid size of empty edges";
    }
    setValidFormState(formIsValid);
    setErrorMsg({ ...errorMsg, errors: errors });

    return formIsValid;
  }

  function inputHandler(event) {
    if (event.target.type === "checkbox") {
      setEmptyState(!emptyState);
      handleInputChange(event);
    } else {
      if (!handleValidation(event)) {
      } else {
        handleInputChange(event);
      }
    }
  }

  return (
    <FormPage>
      <StyledSectionLabel>Constraints</StyledSectionLabel>
      <InputCheck
        label="Allow empty wells"
        onChange={inputHandler}
        name={"allow_empty_wells"}
        value={null}
        errorMsg={null}
      />
      <InputNumber
        name="size_empty_edge"
        label="Amount of empty edges"
        value={null}
        onChange={inputHandler}
        onBlur={null}
        errorMsg={null}
      />
    </FormPage>
  );
};

export default ConstraintForm;
