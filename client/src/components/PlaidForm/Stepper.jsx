import React, { useState } from "react";
import HorizontalStepper from "./HorizontalStepper";
import { Formik, Form } from "formik";
import styled from "styled-components";
import NextButton from "./Buttons/NextButton";
import PrevButton from "./Buttons/PrevButton";

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
  const [errorState, setErrorState] = useState(true);
  //Child to display on current step. 0 would be immediate child.
  const currentChild = childrenArray[step];
  function isLast() {
    return step === childrenArray.length - 1;
  }
  /* TODO: onChange eller onClick? Hur hanterar jag då onClick validering, väntar på svar och avgör sedan om vi går next eller ej?
          om jag väljer onChange, hur kan vi stoppa valideringen från att köra på de tomma fälten innan man använt toolen? */
  function handleNext() {
    //let errors = props.formUtils.onClick();
    //console.log(errors);
    //if (noErrors(errors)) {
    setStep(step + 1);
    //}
  }

  function noErrors(errorObj) {
    for (var key in errorObj) {
      if (errorObj[key] != null) {
        return false;
      }
    }
    return true;
  }

  return (
    <Formik {...props} initialValues={props.initialValues}>
      <>
        <ErrorNotice error={props.flightState["responseError"]}>
          {" "}
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
                  : () => handleNext()
              }
            />
          </StyledButtonContainer>
        </StyledForm>
      </>
    </Formik>
  );
};
export default Stepper;
