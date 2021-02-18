import React from "react";
import styled from "styled-components";

const StyledHighlightedWrapper = styled.section`
  background-color: ${(props) => props.theme.backgroundColors.highlightBlue};
  padding: 10px 16px 10px 16px;
  margin: 20px;
  font-family: ${(props) => props.theme.fonts.secondary};
  align-self: center;
  justify-self: center;
  width: 850px;
`;

const StyledParagraph = styled.p`
  font-size: 17px;
  line-height: 1.7;
  font-weight: 400;
  font-style: normal;
  font-family: ${(props) => props.theme.fonts.secondary};
  margin: 10px;
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
  link.download = "results.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const DownloadConfigJson = (props) => {
  let data = {
    experimentForm: props.experimentForm,
    compoundForm: {
      delimiter: props.compoundForm.delimiter,
      groups: props.compoundForm.groups,
    },
    controlForm: {
      groups: props.controlForm.groups,
    },
  };

  return (
    <StyledHighlightedWrapper>
      <StyledParagraph>
        Download your input config to reuse the tool at any time
        <StyledSpan onClick={() => handleDownload(data)}> here</StyledSpan>.
      </StyledParagraph>
    </StyledHighlightedWrapper>
  );
};

export default DownloadConfigJson;
