import React from "react";
import styled from "styled-components";
import UploadResult from "./UploadResult.jsx";
import { BiRightArrowAlt } from "react-icons/bi";
import PlaidForm from "./../PlaidForm";

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
  font-family: ${props => props.theme.fonts.secondary};
`;

const StyledRowContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
`;

const StyledFlexItem = styled.div`
  padding: 10px;
`;

const StyledButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const TransitionPage = (props) => {
  const [transition, setTransition] = React.useState("main");
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
              <StyledButton onClick={() => handleClick("experiment")}>
                <BiRightArrowAlt size={28} />
              </StyledButton>
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
              <button>TODO upload</button>
              <StyledButton onClick={() => handleClick("form")}>
                <BiRightArrowAlt size={28} />
              </StyledButton>
            </StyledRowContainer>
          </StyledFlexItem>
        </StyledTransitionPageContainer>
      )}
    </>
  );
};

export default TransitionPage;
