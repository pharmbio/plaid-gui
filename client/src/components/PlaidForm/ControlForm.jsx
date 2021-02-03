import React from "react";
import FormPage from "./FormPage";
import InputTextArea from "./Fields/InputTextArea";
import InputNumber from "./Fields/InputNumber";

const ControlForm = ({ handleInputChange, handleArrayChange, errors, state }) => {
  return (
    <FormPage>
      <InputNumber
        name="num_controls"
        label="Amount of controls"
        value={state.num_controls ? state.num_controls : ''}
        onChange={handleInputChange}
        onBlur={null}
        errorMsg={errors.num_controls ? errors.num_controls : null}
      />

      <InputTextArea
        label={"Control replicates"}
        placeholder=""
        name="control_replicates"
        onChange={handleArrayChange}
        disable={false}
        errorMsg={errors.control_replicates ? errors.control_replicates : null}
      />

      <InputTextArea
        label={"Control names"}
        placeholder=""
        name="control_names"
        onChange={handleArrayChange}
        disable={false}
        value={""}
        errorMsg={errors.control_names ? errors.control_names : null}
      />

      <InputTextArea
        name="control_concentrations"
        label="Control concentrations"
        placeholder={""}
        onChange={handleArrayChange}
        value={""}
        errorMsg={errors.control_concentrations ? errors.control_concentrations : null}
      />

      <InputTextArea
        label={"Control concentration names"}
        placeholder=""
        name="control_concentration_names"
        onChange={handleArrayChange}
        disable={false}
        value={""}
        errorMsg={errors.control_concentration_names ? errors.control_concentration_names : null}
      />


    </FormPage>
  );
};

export default ControlForm;
