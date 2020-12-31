import React, { useState } from "react";
import ExperimentForm from "./ExperimentForm";
import CombinationForm from "./CombinationForm";
import CompoundForm from "./CompoundForm";
import ControlForm from "./ControlForm";
import ConstraintForm from "./ConstraintForm";
import HorizontalStepper from "./HorizontalStepper";
import Step from "./Step";
import Loader from "./../Loader";
import { Formik, Form } from "formik";
import { Persist } from "formik-persist";
import styled from "styled-components";
import * as Yup from "yup";
/* TODO: Refactor to handle onChange with Formik!!
        the object storing the entered data should not be processed instantly, just validated so that the input is correct. This is needed 
        to persist the entered data.
        Change input fields requiring large input into textields.
        Find a way to store the inital dropdown value in the json object. Must it be hardcoded??
        Find a way to reset onChange value to default when resetting (e.g erasing all input)!
        Find a way to reset stored value to default when an error is triggered for that specific field
        Find a way to disable next button if there is an error. (Must lift out validation from children to top level component)
        Dependencies are now stored using an errorState array where each obj key is either true or false if it is in error state or not. Better way?


        TODO FREDAG:
        CSS - Minimize the size of the form container.
        Fix buttons left corner and then right corner.

*/

const StyledContainer = styled.div`
  `;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  margin: auto;
  height: 60vh;
  width: 40vw;
`;


const ErrorNotice = styled.div`
  align-self: center;
  display: ${(props) => props.error ? 'flex' : 'none'};
  flex-direction: row;
  color: black;
  justify-content: center;
  align-items: center;
  height: 8vh;
  width: 35vw;
  margin: auto;
  
`;

const StyledInputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: start;
`;
const StyledNextButton = styled.button`
  margin-left:auto;
  background: #0069eb;
  color: #fff;
  border: none;
  border-radius: 0px;
  font-size: 16px;
  padding: 12px 26px;
  text-decoration: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;
const StyledPrevButton = styled.button`
  background: #a6a6a6;
  color: #fff;
  border: none;
  border-radius: 0px;
  font-size: 16px;
  padding: 12px 26px;
  text-decoration: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;
const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 15px;
`;

const axios = require("axios");
async function postForm(formData,
  setResponseError,
  setFlightState,
  flightState,
  setData) {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  setFlightState({ ...flightState, loading: true, responseError: false })
  await axios
    .post("http://localhost:5000/", formData, axiosConfig)
    .then((response) => {
      setFlightState({ ...flightState, loading: false, responseError: false })

      setData({
        rows: formData.num_rows,
        cols: formData.num_cols,
        sizeEmptyEdge: formData.size_empty_edge,
        result: response.data,
      });
    })
    .catch((error) => {
      setFlightState({ ...flightState, loading: false, responseError: true })
      console.log(error.response.data.message);
      setResponseError(error.response.data.message);
    });
}

const PlaidForm = (props) => {
  const [flightState, setFlightState] = useState({
    loading: false,
    responseError: false,
  });
  const [validFormState, setValidFormState] = useState(true);
  const [errorState, setErrorState] = useState({});
  const [responseError, setResponseError] = useState('');
  const [formState, setFormState] = useState({
    num_rows: 8,
    num_cols: 12,
    vertical_cell_lines: 1,
    horizontal_cell_lines: 1,
    allow_empty_wells: false,
    size_empty_edge: 1,
    compounds: 10,
    compound_concentration_names: ["0.3", "1", "3", "5", "10", "15", "30", "100"], // List
    compound_concentration_indicators: ["", "", "", "", "", "", "", ""],
    compound_names: ["c1","c2","c3","c4","c5","c6","c7","c8","coococococococooco9","aaaaabbbbcccddddd10"], // List
    compound_concentrations: 8,
    replicates: 2,
    combinations: 0,
    combination_concentrations: 0,
    combination_names: [], // List
    combination_concentration_names: [], // List
    num_controls: 4,
    control_concentrations: 1,
    control_replicates: [32,16,16,16], // List
    control_names: ["pos","neg","blank","dmso"], // List
    control_concentration_names: ["cont-conc1"], // List
    blanks: 0,
    blanks_name: "",
  });

  const handleArrayChange = (event) => {
    const deviations = { control_replicates: "integer" };
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
    console.log(formState);
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
      {flightState['loading'] ? (
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
          >
            <Step label="Experiment Setup">
              <ExperimentForm
                num_rows={formState.num_rows}
                handleInputChange={handleInputChange}
                errorState={errorState}
                state={formState}
              />
              <ConstraintForm handleInputChange={handleInputChange} />
            </Step>
            <Step label="Compound Setup">
              <CompoundForm
                handleInputChange={handleInputChange}
                handleArrayChange={handleArrayChange}
              />
            </Step>
            <Step label="Combinations">
              <CombinationForm
                handleInputChange={handleInputChange}
                handleArrayChange={handleArrayChange}
              />
            </Step>
            <Step label="Experiment Validation">
              <ControlForm
                handleInputChange={handleInputChange}
                handleArrayChange={handleArrayChange}
              />
            </Step>
          </Stepper>
        )}
    </StyledContainer>
  );
};

/* Passing children prop AND then an object with the remaining props
   Anything inside <Stepper> gets passed into Stepped component as a children prop.
 */

export const Stepper = ({ children, ...props }) => {
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  //Child to display on current step. 0 would be immediate child.
  const currentChild = childrenArray[step];
  console.log(props.initialValues.num_cols);
  function isLast() {
    return step === childrenArray.length - 1;
  }
  const validationSchema = [
    Yup.object({ num_cols: Yup.number().positive().required().min(6, "no") }),
    Yup.object({ num_rows: Yup.number().positive().integer() }),
  ];

  const currentValidation = validationSchema[step]
  return (
    <Formik
      {...props}
      initialValues={props.initialValues}
      validationSchema={currentValidation}
    ><>
        
        <ErrorNotice error={props.flightState['responseError']}> {props.flightState['responseError'] ? props.responseError : null}</ErrorNotice>
        <StyledForm>
          <HorizontalStepper currentStep={step} steps={childrenArray} />
          <StyledInputContainer>{currentChild}</StyledInputContainer>
          <StyledButtonContainer>
            {step > 0 ? (
              <StyledPrevButton type="button" onClick={() => setStep(step - 1)}>
                Previous
              </StyledPrevButton>
            ) : null}
            <StyledNextButton
              type="button"
              onClick={
                isLast()
                  ? () =>
                    props.postForm(
                      props.initialValues,
                      props.setResponseError,
                      props.setFlightState,
                      props.flightState,
                      props.setData
                    )
                  : () => setStep(step + 1)
              }
            >
              {isLast() ? "Submit" : "Next"}
            </StyledNextButton>
          </StyledButtonContainer>
        </StyledForm>
      </>
    </Formik>
  );
};

export default PlaidForm;
