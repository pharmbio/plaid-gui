import React from "react";
import FormPage from "./FormPage";
import InputTextArea from "./Fields/InputTextArea";
import InputNumber from "./Fields/InputNumber";

const CombinationForm = ({ handleInputChange, handleArrayChange, errors,state }) => {
  return (
    <FormPage>
      <InputNumber
        name="combinations"
        label="Combinations"
        value={state.combinations ? state.combinations : ''}
        onChange={handleInputChange}
        onBlur={null}
        errorMsg={errors.combinations ? errors.combinations : ''}
      />
      <InputTextArea
        label={"Combination names"}
        placeholder=""
        name="combination_names"
        onChange={handleArrayChange}
        disable={false}
        errorMsg={errors.combination_names ? errors.combination_names : ''}
        value={state.combination_names ? state.combination_names : ''}
      />
      <InputNumber
        name="combination_concentrations"
        label="Combination concentrations"
        value={state.combination_concentrations ? state.combination_concentrations : ''}
        onChange={handleInputChange}
        onBlur={null}
        errorMsg={errors.combination_concentrations ? errors.combination_concentrations : ''}
      />

      <InputTextArea
        label={"Combination concentration names"}
        placeholder=""
        name="combination_concentration_names"
        onChange={handleArrayChange}
        disable={false}
        value={state.combination_concentration_names ? state.combination_concentration_names : ''}
        errorMsg={errors.combination_concentration_names ? errors.combination_concentration_names : ''}
      />
    </FormPage>
  );
};

export default CombinationForm;
