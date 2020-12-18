import React, { useState } from "react";
import ExperimentForm from "./ExperimentForm";
import CombinationForm from "./CombinationForm";
import CompoundForm from "./CompoundForm";
import ControlForm from "./ControlForm";
import ConstraintForm from "./ConstraintForm";
import HorizontalStepper from "./HorizontalStepper";
import Step from "./Step"
import Loader from "./../Loader";
import { Formik, Form } from 'formik'
import { Persist } from 'formik-persist'
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

const StyledForm = styled(Form)`
  display: flex ;
  justify-content: center;  
  width: 90%;
  height: 90%;
  margin: auto;
  border: solid;
  border-width: 1px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const StyledInputContainer = styled.div`
  position: absolute;
  display: grid;
  justify-content: flex-start;
  flex-direction: column;
  align-items: start;
  width: 90%;
`;
const StyledNextButton = styled.button`
  background: #0069eb;
  color: #fff;
  border: none;
  border-radius: 0px;
  font-size: 16px;
  padding: 15px 30px;
  text-decoration: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin-left: 10px;
`;
const StyledPrevButton = styled.button`
  background: #a6a6a6;
  color: #fff;
  border: none;
  border-radius: 0px;
  font-size: 16px;
  padding: 15px 30px;
  text-decoration: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin-top: 10px;
`;
const StyledButtonContainer = styled.span`
  display: inline;
  margin-top:20px;
  margin-left: 500px;
`;

const axios = require("axios");
async function postForm(formData, setLoading, setData) {
  console.log("Data sent");
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    setLoading(true);
    await axios
      .post("http://localhost:5000/", formData, axiosConfig)
      .then((response) => {
        console.log(response.data);
        setLoading(false); //data received, remove loader
        setData({
          rows: formData.num_rows,
          cols: formData.num_cols,
          sizeEmptyEdge: formData.size_empty_edge,
          result: response.data,
        });
      });
  } catch (e) {
    console.log(e);
  }
}


const PlaidForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [validFormState, setValidFormState] = useState(true);
  const [errorState, setErrorState] = useState({})
  const [formState, setFormState] = useState({
    num_rows: 0,
    num_cols: 0,
    vertical_cell_lines: 0,
    horizontal_cell_lines: 0,
    allow_empty_wells: false,
    size_empty_edge: 0,
    compounds: 0,
    compound_concentration_names: [], // List
    compound_concentration_indicators: [],
    compound_names: [], // List
    compound_concentrations: 0,
    replicates: 0,
    combinations: 0,
    combination_concentrations: 0,
    combination_names: [], // List
    combination_concentration_names: [], // List
    num_controls: 0,
    control_concentrations: 0,
    control_replicates: [], // List
    control_names: [], // List
    control_concentration_names: [], // List
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
      case 'checkbox': {
        if (target.name === 'vertical_cell_lines') {
          setFormState({ ...formState, ['horizontal_cell_lines']: false })
        }
        value = target.checked;
        break;
      }
      case 'number': {
        value = parseInt(target.value);
        break;
      }
      case 'select-one': {
        value = JSON.parse(target.value)
        setFormState({
          ...formState, ['num_rows']: value.num_rows, ['num_cols']: value.num_cols
        })
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
  console.log(formState)
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
          <Stepper
            initialValues={formState}
            setLoading={setLoading}
            postForm={postForm}
          >
            <Step label='Experiment Setup'>
              <ExperimentForm num_rows={formState.num_rows} handleInputChange={handleInputChange} errorState={errorState} state={formState} />
              <ConstraintForm handleInputChange={handleInputChange} />
            </Step>
            <Step label='Compound Setup'>
              <CompoundForm
                handleInputChange={handleInputChange}
                handleArrayChange={handleArrayChange}
              />
            </Step>
            <Step label='Combinations'>
              <CombinationForm
                handleInputChange={handleInputChange}
                handleArrayChange={handleArrayChange}
              />
            </Step>
            <Step label='Experiment Validation'>
              <ControlForm
                handleInputChange={handleInputChange}
                handleArrayChange={handleArrayChange}
              />
            </Step>
          </Stepper>

        )}
    </>
  );
};


/* Passing children prop AND then an object with the remaining props
   Anything inside <Stepper> gets passed into Stepped component as a children prop.
 */

export const Stepper = ({ children, ...props }) => {
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  //Child to display on current step. 0 would be immediate child.
  const currentChild = childrenArray[step]
  console.log(props.initialValues.num_cols)
  function isLast() {
    return step === childrenArray.length - 1;
  }
  const validationSchema = [
    Yup.object({ num_cols: Yup.number().positive().required().min(6, 'no') }),
    Yup.object({ num_rows: Yup.number().positive().integer() })]

  const currentValidation = validationSchema[step]

  return (
    <Formik {...props} initialValues={props.initialValues}
      validationSchema={currentValidation}
    >
      <StyledForm>
        <HorizontalStepper currentStep={step} steps={childrenArray}></HorizontalStepper>
        <StyledInputContainer>
          {currentChild}
          <StyledButtonContainer>
            {step > 0 ? <StyledPrevButton type='button' onClick={() => setStep(step - 1)}>Previous</StyledPrevButton> : null}
            <StyledNextButton type='button' onClick={isLast() ? () => props.postForm(props.initialValues, props.setLoading) : () => setStep(step + 1)}>{isLast() ? 'Submit' : 'Next'}</StyledNextButton>
          </StyledButtonContainer>
        </StyledInputContainer>
      </StyledForm>
    </Formik >)
}

export default PlaidForm;
