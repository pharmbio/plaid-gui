import React from "react";
import FormButtons from "./FormButtons/FormButtons";
import SubmitButton from "../Buttons/SubmitButton";
import PrevButton from "../Buttons/PrevButton";
import styled from "styled-components";
import useValidation from "./Validation/useValidation";
import utils, { hasErrors } from "./utils";

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  justify-content: flex-end;
`;

const StyledFlexItem = styled.div`
  padding: 10px;
  margin: 20px;
  width: 600px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const StyledSpan = styled.span`
  cursor: pointer;
  color: black;
  font-weight: bold;
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
  margin-left: 20px;
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
const StyledErrorMessage = styled.div`
  font-size: 18px;
  color: red;
  font-family: ${(props) => props.theme.fonts.secondary};
  visibility: ${(props) => props.visibility};
  height: 100px;
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
          "*You have empty wells! Add more compounds, replicates or controls or make sure to tick allow the empty wells box to support empty wells.",
      },
    },
  };

  let [errors, utils] = useValidation({}, config);

  const [validating, setValidating] = React.useState(false);
  React.useEffect(() => {
    if (validating) {
      const submitErrors = utils.onClick();
      console.log(submitErrors);
      if (!hasErrors(submitErrors)) {
        handleNext();
      }
      setValidating(false);
    }
  }, [validating]);

  let data = {
    experimentForm: experimentForm,
    compoundForm: {
      delimiter: compoundForm.groups.delimiter,
      groups: compoundForm.groups.groups,
    },
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
  <StyledErrorMessage visibility={errors.hasEmptyWells ? "visible" : "hiddn"}> {errors.hasEmptyWells}</StyledErrorMessage>
    <StyledContainer>
       <StyledHeader> You're almost done.</StyledHeader>
      <StyledParagraph>You can save your form input by clicking
      <StyledSpan onClick={() => handleDownload(data)}> here</StyledSpan>, allowing you to easily prepopulate the form in future runs. Otherwise you can submit the form to genenrate your plate layout!
      </StyledParagraph>
      <StyledRowContainer>
        <StyledButtonWrapper>
          <StyledPrevButton type='button' onClick={() => onClick("prev")}> Previous</StyledPrevButton>
          <StyledSubmitButton type='button' onClick={() => onClick("submit")}> Submit Form</StyledSubmitButton>
        </StyledButtonWrapper>
      </StyledRowContainer>
    </StyledContainer>
    </>
  );
};

export default SubmitForm;
