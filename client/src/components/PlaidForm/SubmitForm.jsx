import FormButtons from "./FormButtons/FormButtons";
import styled from "styled-components";

const StyledContainer = styled.div`
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
  width: 100%;
  justify-content: space-between;
`;

const StyledFlexItem = styled.div`
  padding: 10px;
  margin: 20px;
  width: 600px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const StyledSubmitButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  margin: 15px;
`;
const StyledSpan = styled.span`
  cursor: pointer;
  color: black;
  font-weight: bold;
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
  let data = {
    experimentForm: experimentForm,
    compoundForm: {
      delimiter: compoundForm.delimiter,
      groups: compoundForm.groups,
    },
    controlForm: {
      groups: controlForm.groups,
    },
  };
  const onClick = (action) => {
    if (action === "submit") {
      handleNext();
    } else if (action === "prev") {
      handlePrev();
    } else {
    }
  };

  return (
    <StyledContainer>
      <StyledFlexItem>
        <StyledParagraph>
          Download your input config to reuse the tool at any time by pressing
          <StyledSpan onClick={() => handleDownload(data)}> here</StyledSpan>.
        </StyledParagraph>
      </StyledFlexItem>
      <StyledRowContainer>
        <FormButtons
          title={"Go back to the forms."}
          step={3}
          onClickPrev={() => onClick("prev")}
        />
        <StyledSubmitButton title="Submit" onClick={() => onClick("submit")}>
          SUBMIT
        </StyledSubmitButton>
      </StyledRowContainer>
    </StyledContainer>
  );
};

export default SubmitForm;
