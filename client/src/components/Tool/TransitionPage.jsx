import React from "react";
import styled from "styled-components";
import UploadResult from "./UploadResult.jsx";
import UploadExperiment from "./UploadExperiment.jsx";
import PlaidForm from "./../PlaidForm";
import NextButton from "../Buttons/NextButton";

const StyledTransitionPageContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const StyledParagraph = styled.p`
  font-size: 17px;
  line-height: 1.7;
  font-weight: 400;
  font-style: normal;
  font-family: ${(props) => props.theme.fonts.secondary};
`;

const StyledRowContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
`;

const StyledFlexItem = styled.div`
  padding: 10px;
`;


const TransitionPage = (props) => {
  const [transition, setTransition] = React.useState("main");

  /**
   * @param {*} content an object containing data to prepopulate the form fields with. (each property name in content is valid property name to the formState object)
   */
  const handleUploadedJsonConfig = (content) => {
    // TODO send the object as props to PlaidForm and prepopulate the data in formState!
    console.log(content);
    setTransition("form");
  };

  const handleClick = (state) => {
    setTransition(state);
  };
  return (
    <>
      {transition === "form" ? (
        <PlaidForm setData={props.setData} />
      ) : transition === "main" ? (
        <StyledTransitionPageContainer>
          <StyledFlexItem>
            <StyledParagraph>
              Press the button below to upload a json file of an already
              computed experiment. Otherwise continue to create a new
              experiment.
            </StyledParagraph>
            <StyledRowContainer>
              <UploadResult
                handleUploadedResults={props.handleUploadedResults}
              />
              <NextButton isLast = {false} onClick={() => handleClick("experiment")}/>
            </StyledRowContainer>
          </StyledFlexItem>
        </StyledTransitionPageContainer>
      ) : (
        <StyledTransitionPageContainer>
          <StyledFlexItem>
            <StyledParagraph>
              Upload a yaml | dzn | json file that contains a prepopulated(?)
              experiment or continue to get to the forms.
            </StyledParagraph>
            <StyledRowContainer>
              <UploadExperiment
                handleUploadedDznFile={props.handleUploadedDznFile}
                handleUploadedJsonConfig={handleUploadedJsonConfig}
              />
              <NextButton isLast={false} onClick={() => handleClick("form")}/>
            </StyledRowContainer>
          </StyledFlexItem>
        </StyledTransitionPageContainer>
      )}
    </>
  );
};

export default TransitionPage;
