import React, { useState } from "react";
import FormPage from "./FormPage";
import InputTextArea from "./Fields/InputTextArea";
import InputNumber from "./Fields/InputNumber";
import InputDelimiter from "./Fields/InputDelimiter";

const DEFAULT_DELIMITER = ",";

const compound_state = {
  compounds: 0,
  compound_concentration_names: [],
  compound_concentration_indicators: [],
  compound_names: [],
  compound_concentrations: [],
  replicates: 0,
}

const addToObject = () => {

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
        value={compoundNames}
        disable={false}
        errorMsg={errors.compound_names ? errors.compound_names : null}
      />

      <InputTextArea
        label={"Compound concentrations"}
        placeholder=""
        name="compound_concentrations"
        onChange={inputHandler}
        value={concentrationNames}
        disable={false}
        errorMsg={errors.compound_concentrations ? errors.compound_concentrations : null}
      />

      <InputTextArea
        label={"Compound concentration names"}
        placeholder=""
        name="compound_concentration_names"
        onChange={inputHandler}
        value={""}
        disable={false}
        errorMsg={errors.compound_concentration_names ? errors.compound_concentration_names : null}
      />

      <InputTextArea
        label={"Compound concentration indicators (Optional)"}
        placeholder=""
        name="compound_concentrations_indicators"
        onChange={inputHandler}
        value={state.compound_concentration_indicators ? state.compound_concentration_indicators : ""}
        disable={false}
        errorMsg={errors.compound_concentration_indicators ? errors.compound_concentration_indicators : null}
      />
      <InputTextArea
        label={"Replicates"}
        placeholder=""
        name="compound_replicates"
        onChange={inputHandler}
        value={state.compound_replicates ? state.compound_replicates : ""}
        errorMsg={errors.compound_replicates ? errors.compound_replicates : null}
      />

    </FormPage>
  );
};

export default CompoundForm;
