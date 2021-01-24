import React, { useState } from "react";
import FormPage from "./FormPage";
import InputTextArea from "./Fields/InputTextArea";
import InputNumber from "./Fields/InputNumber";

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
    <FormPage>
      <InputNumber
        label={"Compounds"}
        name="compounds"
        onChange={inputHandler}
        errorMsg={errorState.compounds ? errorMsg.compounds : null}
        value={null}
        onBlur={null}
      />

      <InputTextArea
        label={"Compound names"}
        placeholder=""
        name="compound_names"
        onChange={inputHandler}
        disable={errorState.compounds ? true : false}
        errorMsg={errorState.compound_names ? errorMsg.compound_names : null}
      />

      <InputNumber
        label={"Compound concentrations"}
        name="compound_concentrations"
        onChange={handleInputChange}
        errorMsg={null}
        value={null}
        onBlur={null}
      />

      <InputTextArea
        label={"Compound concentration names"}
        placeholder=""
        name="compound_concentration_names"
        onChange={handleArrayChange}
        disable={false}
        errorMsg={null}
      />

      <InputTextArea
        label={"Compound concentration indicators"}
        placeholder=""
        name="compound_concentrations_indicators"
        onChange={handleArrayChange}
        disable={false}
        errorMsg={null}
      />

      <InputNumber
        label={"Replicates"}
        name="replicates"
        onChange={handleInputChange}
        errorMsg={null}
        value={null}
        onBlur={null}
      />
    </FormPage>
  );
};

export default CompoundForm;
