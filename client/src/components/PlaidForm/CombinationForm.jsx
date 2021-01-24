import React from "react";
import styled from "styled-components";
import FormPage from "./FormPage";
import InputTextArea from "./Fields/InputTextArea";
import InputNumber from "./Fields/InputNumber";

const StyledCombinationsLabel = styled.label`
  margin-top: 5px;
`;
const StyledCombinations = styled.input`
  margin-top: 5px;
`;
const StyledCombinationsConc = styled.input`
  margin-top: 5px;
`;
const StyledCombinationsConcLabel = styled.label`
  margin-top: 5px;
`;

const CombinationForm = ({ handleInputChange, handleArrayChange }) => {
  return (
    <FormPage>
      <InputNumber
        name="combinations"
        label="Combinations"
        value={null}
        onChange={handleInputChange}
        onBlur={null}
        errorMsg={null}
      />

      <InputTextArea
        label={"Combination names"}
        placeholder=""
        name="combination_names"
        onChange={handleArrayChange}
        disable={false}
        errorMsg={null}
      />

      <InputNumber
        name="combination_concentrations"
        label="Combination concentrations"
        value={null}
        onChange={handleInputChange}
        onBlur={null}
        errorMsg={null}
      />

      <InputTextArea
        label={"Combination concentration names"}
        placeholder=""
        name="combination_concentration_names"
        onChange={handleArrayChange}
        disable={false}
        errorMsg={null}
      />
    </FormPage>
  );
};

export default CombinationForm;
