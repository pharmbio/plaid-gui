import React from "react";
import styled from "styled-components";

const StyledHighlightedWrapper = styled.section`
  background-color: #bbeffd;
  padding: 10px 16px 10px 16px;
  margin: 20px;
  font-family: "Lato", sans-serif;
  align-self: center;
  justify-self: center;
  width: 850px;
`;

const StyledParagraph = styled.p`
  font-size: 17px;
  line-height: 1.7;
  font-weight: 400;
  font-style: normal;
  font-family: "Lato", sans-serif;
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

const DownloadResultJson = (props) => {
  const data = {
    rows: props.rows,
    cols: props.cols,
    sizeEmptyEdge: props.sizeEmptyEdge,
    result: props.data,
  };

  return (
    <StyledHighlightedWrapper>
      <StyledParagraph>
        You can download a json file to display the plates at a later time,
        without having to go through the model again, by pressing
        <StyledSpan onClick={() => handleDownload(data)}> here</StyledSpan>.
      </StyledParagraph>
    </StyledHighlightedWrapper>
  );
};

export default DownloadResultJson;
