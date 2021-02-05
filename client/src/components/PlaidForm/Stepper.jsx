import React, { useState } from "react";
import HorizontalStepper from "./HorizontalStepper";
import { Formik, Form } from "formik";
import styled from "styled-components";
import NextButton from "../Buttons/NextButton";
import PrevButton from "../Buttons/PrevButton";

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  height: 60vh;
  width: 40vw;
`;
const ErrorNotice = styled.div`
  align-self: center;
  display: ${(props) => (props.error ? "flex" : "none")};
  flex-direction: row;
  color: black;
  justify-content: center;
  align-items: center;
  height: 8vh;
  width: 35vw;
  margin: auto;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 10px;
`;

const Stepper = ({ children, ...props }) => {
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);

  //Child to display on current step. 0 would be immediate child.
  const currentChild = childrenArray[step];
  function isLast() {
    return step === childrenArray.length - 1;
  }
  /* complete waste having objects here. Refactor so the main object uses categories. Move the stepper button to each child and let them handle its own validation for best results!! */


  const [loading, setLoading] = useState(false);

  /* TODO: onChange eller onClick? Hur hanterar jag då onClick validering, väntar på svar och avgör sedan om vi går next eller ej?
             om jag väljer onChange, hur kan vi stoppa valideringen från att köra på de tomma fälten innan man använt toolen? */
  function handleNext() {
    // if(noErrors(errors)){
    if (step === 1) {
      props.addCompoundsToState();
    } else if (step === 2) {
      props.addControlConcentrationNames();
    }
    setLoading(true);
  }

  React.useEffect(() => {
    if (loading) {
      //let errors = props.formUtils.onClick();
      //let groupErrors = props.groupUtils.onClick();
      //if (!hasErrors(errors, step) && !hasErrors(groupErrors, step)) {
        if (step !== 2) {
          setStep(step + 1);
        } else {
          console.log(props.initialValues)
          props.postForm(
            props.initialValues,
            props.setResponseError,
            props.setFlightState,
            props.flightState,
            props.setData
          );
        }
      }
      setLoading(false);
    
  }, [loading, step,]);

  return (
    <Formik {...props} initialValues={props.initialValues}>
      <>
        <ErrorNotice error={props.flightState["responseError"]}>
          {props.flightState["responseError"] ? props.responseError : null}
        </ErrorNotice>
        <StyledForm>
          <HorizontalStepper currentStep={step} steps={childrenArray} />
          {currentChild}
          <StyledButtonContainer>
            {step > 0 ? (
              <PrevButton type="button" onClick={() => setStep(step - 1)} />
            ) : null}
            <NextButton
              type="button"
              isLast={isLast()}
              onClick={() => handleNext()
              }
            />
          </StyledButtonContainer>
        </StyledForm>
      </>
    </Formik>
  );
};
export default Stepper;
