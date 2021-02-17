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
  margin: 20px;
  width: 600px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const TransitionPage = (props) => {
  const [transition, setTransition] = React.useState("main");
  const [uploadedConfig, setUploadedConfig] = React.useState(null);

  /**
   * @param {object} content an object containing data to prepopulate the form fields with. (each property name in content is valid property name to the formState object)
   */
  const handleUploadedJsonConfig = (content) => {
    console.log(content);
    // TODO send the object as props to PlaidForm and prepopulate the data in formState!
    setUploadedConfig(content);
  };

  const handleClick = (state) => {
    setTransition(state);
  };
  return (
    <>
      {transition === "form" || uploadedConfig !== null ? (
        <PlaidForm
          setData={props.setData}
          uploadedConfig={uploadedConfig}
        />
      ) : (
        <>
          <StyledTransitionPageContainer>
            <StyledFlexItem>
              <StyledParagraph>
                If you want to visualize the plates of an already computed
                experiment please upload the json file.
              </StyledParagraph>
              <UploadResult
                handleUploadedResults={props.handleUploadedResults}
              />
            </StyledFlexItem>
            <StyledFlexItem>
              <StyledParagraph>
                You may upload a dzn file containing a valid experiment to run
                through the model directly. You may also provide a json file to
                prepopulate the forms with data. Otherwise press the arrow
                button to get straight to the forms.
              </StyledParagraph>
              <StyledRowContainer>
                <UploadExperiment
                  handleUploadedDznFile={props.handleUploadedDznFile}
                  handleUploadedJsonConfig={handleUploadedJsonConfig}
                />
                <NextButton
                  isLast={false}
                  onClick={() => handleClick("form")}
                />
              </StyledRowContainer>
            </StyledFlexItem>
          </StyledTransitionPageContainer>
        </>
      )}
    </>
  );
};

export default TransitionPage;
