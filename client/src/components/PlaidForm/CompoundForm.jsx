import React, { useState } from "react";
import FormPage from "./FormPage";
import InputTextArea from "./Fields/InputTextArea";
import InputNumber from "./Fields/InputNumber";
import InputDelimiter from "./Fields/InputDelimiter";

const DEFAULT_DELIMITER = ",";


const addToObject = (event) => {


}

const parse = (delimiter, str) => {
  const re = new RegExp(`/(^${delimiter})|(,$)/g`, "")
  const trim = str.replace(re, "");
  const delim = trim.split(delimiter);
  return delim;
};

const CompoundForm = ({
  errors,
  handleInputChange,
  handleArrayChange,
  state,
  handleCompoundNamesChange,
}) => {
  const [compoundNames, setCompoundNames] = useState("");
  const [concentrationNames, setConcentrationNames] = useState("");
  const [delimiter, setDelimiter] = React.useState(DEFAULT_DELIMITER);

  /* 
    function inputHandler(event) {
      console.log(state.compound_names.toString());
      let name = event.target.name;
      if (name === "compound_names") {
        // handle change in field belonging to compound_names
        console.log(event.target.value);
        setCompoundNames(event.target.value);
        const parsedCompoundNames = parse(delimiter, event.target.value);
        console.log(parsedCompoundNames);
        handleCompoundNamesChange(parsedCompoundNames);
      } else if (name === "compound_concentrations") {
        setConcentrationNames(event.target.value);
        handleArrayChange(event);
      } else {
        handleInputChange(event);
      }
    } */

    // Starting off: add a button that assembles the 2d array and sends the array + the rest of the data to the main json object.
    // Once this is done the forms are cleared and you can input some more data.
    // When is validation done?? 
    // Problems: How do you go back if you input wrong? Validate before adding each? Problem: Can't validate everyhing. e.g if we're missing a concentration until next is clicked.

    const [compoundState, setCompoundState] = useState({
      compound_names: 0,
      num_compound_concentration: [],
      compound_concentrations: [],
      replicates: 0,
    })
  const inputHandler = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setCompoundState({ ...compoundState, [name]: value });
  }
  const handleDelimiterChange = (new_delimiter) => {
    // When the delimiter has changed => we need to re-parse the compound names that has been written to the field (if not empty)
    if (new_delimiter === "") {
      // We want to use the default delimiter if the user leaves the input field empty
      setDelimiter(DEFAULT_DELIMITER);
    } else {
      setDelimiter(delimiter);
    }

    if (compoundNames !== "") {
      new_delimiter = new_delimiter !== "" ? new_delimiter : DEFAULT_DELIMITER;
      const parsedCompoundNames = parse(new_delimiter, compoundNames);
      console.log(parsedCompoundNames);
      handleCompoundNamesChange(parsedCompoundNames);
    }
  };
  console.log(compoundState)
  return (
    <FormPage>
      <InputNumber
        label={"Compounds"}
        name="compounds"
        onChange={inputHandler}
        onBlur={null}
        value={state.compounds ? state.compounds : ""}
        errorMsg={errors.compounds ? errors.compounds : null}
      />

      <InputDelimiter
        label={"Delimitor selection (Optional)"}
        placeholder=""
        name="delimiter_selection"
        disable={false}
        onChange={handleDelimiterChange}
        errorMsg={null}
      />

      <InputTextArea
        label={"Compound names"}
        placeholder=""
        name="compound_names"
        onChange={inputHandler}
        value={compoundState.compoundNames}
        disable={false}
        errorMsg={errors.compound_names ? errors.compound_names : null}
      />
      <InputNumber
        label={"Number of concentrations"}
        name="num_compound_concentration"
        onChange={inputHandler}
        onBlur={null}
        value={compoundState.num_compound_concentration ? compoundState.num_compound_concentration : null}
        errorMsg={errors.compounds ? errors.compounds : null}
      />
      <InputTextArea
        label={"Compound concentrations"}
        placeholder=""
        name="compound_concentrations"
        onChange={inputHandler}
        value={compoundState.compound_concentrations}
        disable={false}
        errorMsg={errors.compound_concentrations ? errors.compound_concentrations : null}
      />
      <InputNumber
        label={"Replicates"}
        name="replicates"
        onChange={inputHandler}
        value={state.replicates ? state.replicates : ""}
        errorMsg={errors.replicates ? errors.replicates : null}
      />

      <InputTextArea
        label={"Compound concentration indicators (Optional)"}
        placeholder=""
        name="compound_concentrations_indicators"
        onChange={inputHandler}
        value={state.compound_concentrations ? state.compound_concentration_indicators : ""}
        disable={false}
        errorMsg={errors.compound_concentration_indicators ? errors.compound_concentration_indicators : null}
      />

    </FormPage>
  );
};

export default CompoundForm;
