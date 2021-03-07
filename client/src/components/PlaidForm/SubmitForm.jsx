import React from "react";
import FormButtons from "./FormButtons/FormButtons";
import SubmitButton from "../Buttons/SubmitButton";
import PrevButton from "../Buttons/PrevButton";
import HighlightedParahraph from "../Instructions/HighlightedParagraph";
import styled from "styled-components";
import useValidation from "./Validation/useValidation";
import utils, { hasErrors } from "./utils";

const StyledContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: auto;
`;

const StyledParagraph = styled.p`
  font-size: 18px;
  line-height: 1.7;
  font-weight: 400;
  font-style: normal;
  font-family: ${(props) => props.theme.fonts.secondary};
  margin: 25px 0px 25px 0px
`;

const StyledRowContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  justify-content: center;
`;


const StyledSubmitButton = styled.button`
  font-family: Whitney, "Open Sans", Helvetica, sans-serif;
  background-color: #5096FF;
  border: 2px solid #5096FF;
  color: #fff;
  font-weight: 400;
  font-size: 16pt;
  border-radius: 25px;
  cursor: pointer;
  height: 45px;
  width: 200px;
  margin-left: 10px;
  margin-right: 10px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  &:hover {
    outline: none;
    border: 1px solid #5096ff;
  }
`
const StyledPrevButton = styled.button`

  font-family: Whitney, "Open Sans", Helvetica, sans-serif;
  background-color: #323439;
  border: 2px solid #323439;
  color: #fff;
  font-weight: 400;
  font-size: 16pt;
  border-radius: 25px;
  cursor: pointer;
  height: 45px;
  width: 200px;
  margin-left: 10px;
  margin-right: 10px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  &:hover {
    outline: none;
    border: 1px solid #5096ff;
  }
`
const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-left: 40px;
  margin-right: 40px;
`
const StyledHeader = styled.h1`
  font-size: 36pt;
  font-weight: bold;
`
const StyledErrorContainer = styled.div`
  height: 450px;
`;

const handleDownload = async (data) => {
  const json = JSON.stringify(data);
  const blob = new Blob([json], { type: "application/json" });
  const href = await URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = "config.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const SubmitForm = ({
  handleNext,
  handlePrev,
  experimentForm,
  compoundForm,
  controlForm,
}) => {

  let config = {
    submit: {
      hasEmptyWells: {
        value: {
          experimentForm: experimentForm,
          compoundForm: compoundForm,
          controlForm: controlForm,
        },
        message:
          "You have empty wells! Add more compounds, replicates, controls or make sure to tick allow the empty wells box to support empty wells.",
      },
    },
  };

  let [errors, utils] = useValidation({}, config);

  const [validating, setValidating] = React.useState(false);
  React.useEffect(() => {
    if (validating) {
      const submitErrors = utils.onClick();
      if (!hasErrors(submitErrors)) {
        handleNext();
      }
      setValidating(false);
    }
  }, [validating]);

  let data = {
    experimentForm: experimentForm,
    delimiterCompounds:compoundForm.groups.delimiter,
    compoundForm: {
      groups: compoundForm.groups.groups,
    },
    delimiterControls:controlForm.groups.delimiter,
      controlForm: {
      groups: controlForm.groups.groups,
    },
  };
  const onClick = (action) => {
    if (action === "submit") {
      setValidating(true);
    } else if (action === "prev") {
      handlePrev();
    } else {
    }
  };

  return (<>
    <StyledErrorContainer>{errors.hasEmptyWells ? <HighlightedParahraph title={"Error: Empty Wells"} type={"Warning"}> {errors.hasEmptyWells}</HighlightedParahraph> : null}</StyledErrorContainer>
    <StyledContainer>
      <StyledHeader> You're almost done.</StyledHeader>
      <StyledParagraph> You can go back and review your input, 
        save your form input allowing you to easily prepopulate the form in future runs or submit the form to generate your plate layout!
      </StyledParagraph>
      <StyledRowContainer>
        <StyledButtonWrapper>
          <StyledPrevButton type='button' onClick={() => onClick("prev")}> Previous</StyledPrevButton>
          <StyledPrevButton type='button' onClick={() => handleDownload(data)}> Download Input</StyledPrevButton>
          <StyledSubmitButton type='button' onClick={() => onClick("submit")}> Submit Form</StyledSubmitButton>
        </StyledButtonWrapper>
      </StyledRowContainer>
    </StyledContainer>
  </>
  );
};

export default SubmitForm;
