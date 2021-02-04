import React from "react";
import FormPage from "./FormPage";
import InputTextArea from "./Fields/InputTextArea";
import InputNumber from "./Fields/InputNumber";

const DEFAULT_DELIMITER = ",";

const parse = (delimiter, str) => {
  const re = new RegExp(`/(^${delimiter})|(,$)/g`, "");
  const trim = str.replace(re, "");
  const delim = trim.split(delimiter);
  return delim;
};

const ControlForm = ({ handleControlFormChange, errors, state }) => {
  console.log(state);
  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    if (name === "num_controls") {
      value = parseInt(value);
    } else if (name === "control_names") {
      value = parse(DEFAULT_DELIMITER, value);
    } else if (name === "control_concentrations") {
      value = parse(DEFAULT_DELIMITER, value);
      for (let i = 0; i < value.length; i++) {
        value[i] = parseInt(value[i]);
      }
    } else if (name === "control_replicates") {
      value = parse(DEFAULT_DELIMITER, value);
      for (let i = 0; i < value.length; i++) {
        value[i] = parseInt(value[i]);
      }
    } else if (name === "control_concentration_names") {
      value = parse(DEFAULT_DELIMITER, value);
      console.log(value)
    }
    handleControlFormChange(name, value);
  };
  return (
    <FormPage>
      <InputNumber
        name="num_controls"
        label="Amount of controls"
        value={state.num_controls}
        onChange={handleChange}
        onBlur={null}
        errorMsg={errors.num_controls ? errors.num_controls : null}
      />

      <InputTextArea
        label={"Control names"}
        placeholder=""
        name="control_names"
        onChange={handleChange}
        value={state.control_names.toString()}
        disable={false}
        errorMsg={errors.control_names ? errors.control_names : null}
      />

      <InputTextArea
        name="control_concentrations"
        label="Control concentrations"
        placeholder={""}
        onChange={handleChange}
        value={state.control_concentrations.toString()}
        errorMsg={
          errors.control_concentrations ? errors.control_concentrations : null
        }
      />

      <InputTextArea
        label={"Control replicates"}
        placeholder=""
        name="control_replicates"
        onChange={handleChange}
        disable={false}
        value={state.control_replicates.toString()}
        errorMsg={errors.control_replicates ? errors.control_replicates : null}
      />

      <InputTextArea
        label={"Control concentration names"}
        placeholder=""
        name="control_concentration_names"
        onChange={handleChange}
        value={
          state.control_concentration_names.toString()
        }
        disable={false}
        errorMsg={null}
      />
    </FormPage>
  );
};

export default ControlForm;
