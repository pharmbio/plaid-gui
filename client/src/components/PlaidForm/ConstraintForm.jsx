import React, { useState } from "react";
import styled from "styled-components";
import FormPage from "./FormPage";
import InputNumber from "./Fields/InputNumber";
import InputCheck from "./Fields/InputCheck";

const StyledSectionLabel = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;


const ConstraintForm = ({ handleInputChange, errors, state }) => {
  const [emptyState, setEmptyState] = useState(false);
  const [validFormState, setValidFormState] = useState(false);

  const [errorMsg, setErrorMsg] = useState({});
  /* This state imanages if a specific state is invalid or not */
  const [errorState, setErrorState] = useState({
    size_empty_edge: true,
  });

  function inputHandler(event) {
    if (event.target.type === "checkbox") {
      setEmptyState(!emptyState);
      handleInputChange(event);
    } else {

      handleInputChange(event);
    }
  }


  return (
    <FormPage>
      <StyledSectionLabel>Constraints</StyledSectionLabel>
      <InputCheck
        label="Allow empty wells"
        onChange={inputHandler}
        name={"allow_empty_wells"}
        value={state.allow_empty_wells ? state.allow_empty_wells : false}
        errorMsg={null}
      />
      <InputNumber
        name="size_empty_edge"
        label="Size of empty edges"
        value={state.size_empty_edge ? state.size_empty_edge : ""}
        onChange={inputHandler}
        errorMsg={errors.size_empty_edge ? errors.size_empty_edge : null}
      />
    </FormPage>
  );
};

export default ConstraintForm;
