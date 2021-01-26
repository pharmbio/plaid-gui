import React, { useState } from "react";
import FormPage from "./FormPage";
import InputTextArea from "./Fields/InputTextArea";
import InputNumber from "./Fields/InputNumber";

const CompoundForm = ({ errors, handleInputChange, handleArrayChange, state, delimiter, handleDelimiterChange }) => {

  function reconstructTextAreaInput(fieldName){
    const str = fieldName.toString();
    str.replace(',', delimiter);
    
  }

  function inputHandler(event) {
    console.log(state.compound_names.toString())
    let name = event.target.name;
    if (name === "compound_names") {
      handleArrayChange(event);
    }
    else if (name === "delimiter_selection") {
      handleDelimiterChange(event);
    }
    else {
      handleInputChange(event);
    }
  }

  return (
    <FormPage>
      <InputNumber
        label={"Compounds"}
        name="compounds"
        onChange={inputHandler}
        onBlur={null}
        value={state.compounds ? state.compounds : null}
        errorMsg={errors.compounds ? errors.compounds : null}
      />

      <InputTextArea
        label={"Delimitor Selection (Optional)"}
        placeholder=""
        name="delimiter_selection"
        disable={false}
        value={delimiter}
        onChange={inputHandler}
        errorMsg={null}
      />


      <InputTextArea
        label={"Compound names"}
        placeholder=""
        name="compound_names"
        onChange={inputHandler}
        value={state.compound_names.toString}
        disable={false}
        errorMsg={null}
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
