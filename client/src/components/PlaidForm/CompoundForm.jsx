import React, { useState } from "react";
import styled from "styled-components";

const StyledCompoundsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledCompoundsLabel = styled.label`
  margin-top: 5px;
`;
const StyledCompounds = styled.input`
  margin-top: 5px;
`;
const StyledCompoundsNames = styled.input`
  margin-top: 5px;
`;

const StyledCompoundsNamesLabel = styled.label`
  margin-top: 5px;
`;
const StyledCompoundsConc = styled.input`
  margin-top: 5px;
`;
const StyledCompoundsConcLabel = styled.label`
  margin-top: 5px;
`;
const StyledCompoundsConcName = styled.input`
  margin-top: 5px;
`;
const StyledCompoundsConcNameLabel = styled.label`
  margin-top: 5px;
`;
const StyledCompoundsReplLabel = styled.label`
  margin-top: 5px;
`;
const StyledCompoundsRepl = styled.input`
  margin-top: 5px;
`;
const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: red;
`;

const CompoundForm = ({ handleInputChange, handleArrayChange }) => {
  const [validFormState, setValidFormState] = useState(false);
  const [enableCompName, setEnableCompName] = useState(false);
  const [errorMsg, setErrorMsg] = useState({});
  /* This state manages if a specific state is invalid or not */
  const [errorState, setErrorState] = useState({
    compounds: true,
    size_empty_edge: true,
    compound_names: true,
    compound_concentrations: true,
    compound_concentration_names: true,
    replicates: true,
  });
  /* This state manages the current values of each input. Needed to track cross-validation.
     Once validation is moved should be enough to check json obj in plaidform. */
  const [valueState, setValueState] = useState({
    compounds: 0,
    compound_names: [],
    compound_concentrations: [],
    compound_concentration_names: [],
    replicates: [],
  });

  function handleValidation(event) {
    const value = event.target.value;
    const names = event.target.name;
    const formFields = { [names]: value };
    const errors = errorMsg;
    let formIsValid = true;
    /* Reset error state to run validation again */
    setErrorState({ ...errorState, [names]: false });
    if (formFields["compounds"] <= 0) {
      formIsValid = false;
      setErrorState({ ...errorState, [names]: true });
      errors["compounds"] = "Compounds must be atleast 1";
    }
    if ("compound_names" in formFields) {
      console.log(value);
      const trim = value.replace(/(^,)|(,$)/g, "");
      console.log(trim);
      let delim = trim.split(",");
      console.log(delim);
      if (delim.length != valueState["compounds"]) {
        formIsValid = false;
        setErrorState({ ...errorState, [names]: true });
        errors["compound_names"] =
          "Number of names must match number of compounds";
      }
    }
    /* loop through errorStates -> if they're all false all forms are filled! */
    setValidFormState(formIsValid);
    setErrorMsg({ ...errorMsg, errors: errors });

    return formIsValid;
  }

  function inputHandler(event) {
    if (!handleValidation(event)) {
      console.log(!handleValidation);
    } else {
      setValueState({ ...valueState, [event.target.name]: event.target.value });

      if (event.target.name === "compound_names") {
        handleArrayChange(event);
      } else {
        handleInputChange(event);
      }
    }
  }

  return (
    <>
      <StyledCompoundsContainer>
        <StyledCompoundsLabel>Compounds: </StyledCompoundsLabel>
        <StyledCompounds
          type="number"
          name="compounds"
          onChange={inputHandler}
        />
        <StyledErrorMessage>
          {errorState.compounds ? errorMsg.compounds : null}
        </StyledErrorMessage>
        <StyledCompoundsNamesLabel>Compound names: </StyledCompoundsNamesLabel>
        <StyledCompoundsNames
          type="text"
          name="compound_names"
          onChange={inputHandler}
          disabled={errorState.compounds ? true : false}
        />
        <StyledErrorMessage>
          {errorState.compound_names ? errorMsg.compound_names : null}
        </StyledErrorMessage>

        <StyledCompoundsConcLabel>
          Compound concentrations:{" "}
        </StyledCompoundsConcLabel>
        <StyledCompoundsConc
          type="number"
          name="compound_concentrations"
          onChange={handleInputChange}
        />
        <StyledCompoundsConcNameLabel>
          Compound concentration names:
        </StyledCompoundsConcNameLabel>
        <StyledCompoundsConcName
          type="text"
          name="compound_concentration_names"
          onChange={handleArrayChange}
        />
        <StyledCompoundsConcNameLabel>
          Compound concentration indicators:
        </StyledCompoundsConcNameLabel>
        <StyledCompoundsConc
          type="text"
          name="compound_concentrations_indicators"
          onChange={handleArrayChange}
        />
        <StyledCompoundsReplLabel>Replicates </StyledCompoundsReplLabel>
        <StyledCompoundsRepl
          type="number"
          name="replicates"
          onChange={handleInputChange}
        />
      </StyledCompoundsContainer>
    </>
  );
};

export default CompoundForm;
