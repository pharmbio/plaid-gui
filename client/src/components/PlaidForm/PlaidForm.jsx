import React, { useState, useEffect, useReducer } from "react";
import ExperimentForm from "./ExperimentForm";
import CombinationForm from "./CombinationForm";
import CompoundForm from "./CompoundForm";
import ControlForm from "./ControlForm";
import ConstraintForm from "./ConstraintForm";
import Stepper from "./Stepper";
import Step from "./Step";
import Loader from "./../Loader";
import styled from "styled-components";
import useValidation from "./useValidation";

const axios = require("axios");

const StyledContainer = styled.div`
  overflow-y: scroll;
  height: 100vh;
`;
async function postForm(
  formData,
  setResponseError,
  setFlightState,
  flightState,
  setData
) {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  setFlightState({ ...flightState, loading: true, responseError: false });
  await axios
    .post("http://localhost:5000/", formData, axiosConfig)
    .then((response) => {
      setFlightState({ ...flightState, loading: false, responseError: false });

      setData({
        rows: formData.num_rows,
        cols: formData.num_cols,
        sizeEmptyEdge: formData.size_empty_edge,
        result: response.data,
      });
    })
    .catch((error) => {
      setFlightState({ ...flightState, loading: false, responseError: true });
      setResponseError(error.response.data.message);
    });
}
const PlaidForm = (props) => {
  const [flightState, setFlightState] = useState({
    loading: false,
    responseError: false,
  });
  const [responseError, setResponseError] = useState("");
  const [formState, setFormState] = useState({
    num_rows: 8,
    num_cols: 12,
    vertical_cell_lines: 1,
    horizontal_cell_lines: 1,
    allow_empty_wells: false,
    size_empty_edge: 1,
    compounds: 10,
    compound_concentration_names: [
      "0.3",
      "1",
      "3",
      "5",
      "10",
      "15",
      "30",
      "100",
    ], // List
    compound_concentration_indicators: ["", "", "", "", "", "", "", ""],
    compound_names: [
      "c1",
      "c2",
      "c3",
      "c4",
      "c5",
      "c6",
      "c7",
      "c8",
      "coococococococooco9",
      "aaaaabbbbcccddddd10",
    ], // List
    compound_concentrations: 8,
    replicates: 2,
    combinations: 0,
    combination_concentrations: 0,
    combination_names: [], // List
    combination_concentration_names: [], // List
    num_controls: 4,
    control_concentrations: 1,
    control_replicates: [32, 16, 16, 16], // List
    control_names: ["pos", "neg", "blank", "dmso"], // List
    control_concentration_names: ["cont-conc1"], // List
    blanks: 0,
    blanks_name: "",
  });
  /* custom validation hook. TODO: Pass this validation into each component. Assiciate each name with the correct validation field 
     and simply check if the error is null or not. If it's not, display that error. TOFIX, only one error at a time?
  */
  const { errors, formUtils } = useValidation(formState);

  const handleCompoundNamesChange = (compounds) => {
    setFormState({ ...formState, ["compound_names"]: compounds });
  };

  const handleArrayChange = (event) => {
    console.log(event.target.value);
    const deviations = { control_replicates: "integer" };
    console.log(event.target.name);
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const trim = value.replace(/(^,)|(,$)/g, "");
    const delim = trim.split(",");
    if (name in deviations) {
      switch (deviations[name]) {
        case "integer":
          delim.forEach((x, index) => {
            delim[index] = parseInt(x);
          });
          break;
        default:
          break;
      }
    }
    setFormState({ ...formState, [name]: delim });
  };
  const handleInputChange = (event) => {
    const target = event.target;
    const type = target.type;
    let value;
    switch (type) {
      case "checkbox": {
        if (target.name === "vertical_cell_lines") {
          setFormState({ ...formState, ["horizontal_cell_lines"]: false });
        }
        value = target.checked;
        break;
      }
      case "number": {
        value = parseInt(target.value);
        break;
      }
      case "select-one": {
        value = JSON.parse(target.value);
        setFormState({
          ...formState,
          ["num_rows"]: value.num_rows,
          ["num_cols"]: value.num_cols,
        });
        return;
      }
      default:
        value = target.value;
    }
    const name = target.name;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  console.log(formState);

  return (
    <StyledContainer>
      {flightState["loading"] ? (
        <Loader />
      ) : (
        <Stepper
          initialValues={formState}
          postForm={postForm}
          setResponseError={setResponseError}
          responseError={responseError}
          setFlightState={setFlightState}
          flightState={flightState}
          setData={props.setData}
          errors={errors}
          formUtils={formUtils}
        >
          <Step label="Experiment Setup">
            <ExperimentForm
              handleInputChange={handleInputChange}
              errors={errors}
              state={formState}
            />
            <ConstraintForm
              handleInputChange={handleInputChange}
              errors={errors}
              state={formState}
            />
          </Step>
          <Step label="Compound Setup">
            <CompoundForm
              handleInputChange={handleInputChange}
              handleArrayChange={handleArrayChange}
              errors={errors}
              state={formState}
              handleCompoundNamesChange={handleCompoundNamesChange}
            />
          </Step>
          <Step label="Combinations">
            <CombinationForm
              handleInputChange={handleInputChange}
              handleArrayChange={handleArrayChange}
              errors={errors}
              state={formState}
            />
          </Step>
          <Step label="Experiment Validation">
            <ControlForm
              handleInputChange={handleInputChange}
              handleArrayChange={handleArrayChange}
              errors={errors}
              state={formState}
            />
          </Step>
        </Stepper>
      )}
    </StyledContainer>
  );
};

export default PlaidForm;
