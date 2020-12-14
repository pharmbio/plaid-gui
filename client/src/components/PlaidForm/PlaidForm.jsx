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
import styled from "styled-components";

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
margin-top: 10px;
margin-left: 850px;
`;


const axios = require("axios");
async function postForm(formData, setLoading, setData, event) {
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
        setData({
          rows: formData.num_rows,
          cols: formData.num_cols,
          sizeEmptyEdge: formData.size_empty_edge,
          result: response.data,
        });
      });
    setLoading(false); //setLoading(true); //data received, remove loader
  } catch (e) {
    console.log(e);
  }
}

const PlaidForm = (props) => {


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
      "comp1",
      "comp2",
      "comp3",
      "comp4",
      "comp5",
      "comp6",
      "comp7",
      "comp8",
      "comp9",
      "comp10",
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
  const handleArrayChange = (event) => {
    const deviations = { control_replicates: "integer" };
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let delim = value.split(",");
    console.log(delim);
    if (name in deviations) {
      switch (deviations[name]) {
        case "integer":
          delim.forEach((x, index) => {
            delim[index] = parseInt(x);
          });
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
    console.log(JSON.parse(event.target.value))
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
    console.log('hi');
    const name = target.name;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
          <Stepper
            initialValues={formState}
          >
              <Step label='Experiment Setup'>
                <ExperimentForm handleInputChange={handleInputChange} />
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
              <button
                type="button"
                onClick={() => {
                  postForm(formState, setLoading);
                }}
              ></button>
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

  function isLast() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik {...props} onSubmit={async (values, helpers, event) => {
      //on the last step
      if (isLast()) {
        await props.onSubmit(values, helpers)
      }
      else {
        setStep(step + 1);
      }
    }}>

      <StyledForm>
        <HorizontalStepper currentStep={step} steps={childrenArray}></HorizontalStepper>
        <StyledInputContainer>
          {currentChild}
          {step > 0 ? <button type='button' onClick={() => setStep(step - 1)}>Previous</button> : null}
          <StyledNextButton type='submit'>{isLast() ? 'Submit' : 'Next'}</StyledNextButton>
        </StyledInputContainer>
      </StyledForm>
    </Formik>)
}



export default PlaidForm;
