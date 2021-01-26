import React, { useState } from "react";
import FormPage from "./FormPage";
import InputTextArea from "./Fields/InputTextArea";
import InputNumber from "./Fields/InputNumber";
import InputDelimiter from "./Fields/InputDelimiter";

const DEFAULT_DELIMITER = ",";

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
    } else if (name === "delimiter_selection") {
      //handleDelimiterChange(event, delimiter);
    } else {
      handleInputChange(event);
    }
  }

  const handleDelimiterChange = (new_delimiter) => {
    // When the delimiter has changed => we need to re-parse the compound names that has been written to the field (if not empty)
    if(new_delimiter === ""){
      // We want to use the default delimiter if the user leaves the input field empty
      setDelimiter(DEFAULT_DELIMITER);
    }else {
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
        label={"Delimitor Selection (Optional)"}
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
        errorMsg={null}
      />

      <InputNumber
        label={"Compound concentrations"}
        name="compound_concentrations"
        onChange={handleInputChange}
        errorMsg={null}
        value={""}
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
        value={""}
        onBlur={null}
      />
    </FormPage>
  );
};

export default CompoundForm;
