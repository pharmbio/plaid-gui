import React from "react";
import FormPage from "./FormPage";
import InputTextArea from "./Fields/InputTextArea";
import InputNumber from "./Fields/InputNumber";

const ControlForm = ({ handleInputChange, handleArrayChange }) => {
  return (
    <FormPage>
      <InputNumber
        name="num_controls"
        label="Amount of controls"
        value={""}
        onChange={handleInputChange}
        onBlur={null}
        errorMsg={null}
      />

      <InputTextArea
        label={"Control names"}
        placeholder=""
        name="control_names"
        onChange={handleArrayChange}
        disable={false}
        value={""}
        errorMsg={null}
      />

      <InputNumber
        name="control_concentrations"
        label="Control concentrations"
        value={""}
        onChange={handleInputChange}
        onBlur={null}
        errorMsg={null}
      />

      <InputTextArea
        label={"Control concentration names"}
        placeholder=""
        name="control_concentration_names"
        onChange={handleArrayChange}
        disable={false}
        value={""}
        errorMsg={null}
      />

      <InputTextArea
        label={"Control replicates"}
        placeholder=""
        name="control_replicates"
        onChange={handleArrayChange}
        disable={false}
        errorMsg={null}
      />

      <InputNumber
        name="blanks"
        label="Blanks"
        value={""}
        onChange={handleInputChange}
        onBlur={null}
        errorMsg={null}
      />

      <InputTextArea
        label={"Blanks names"}
        placeholder=""
        name="blanks_names"
        onChange={handleInputChange}
        value={""}
        disable={false}
        errorMsg={null}
      />
    </FormPage>
  );
};

export default ControlForm;
