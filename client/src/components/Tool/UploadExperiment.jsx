import React from "react";
import styled from "styled-components";

const StyledUploadResultButton = styled.input`
  font-family: ${(props) => props.theme.fonts.primary};
  font-size: 14px;
`;

const StyledErrorMessage = styled.p`
  font-size: 12px;
  color: red;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const parseDznInput = (data) => {
  let stored = { rows: null, cols: null, sizeEmptyEdge: null };
  for (const line of data.split(/[\r\n]+/)) {
    if (stored.rows && stored.cols && stored.sizeEmptyEdge) {
      break;
    }

    if (line.trim().includes("num_rows =")) {
      if (line[0] !== "%") {
        //its not a minizinc comment
        let rows = line.split("=");
        stored.rows = parseInt( rows[1].split(";", 1)[0].trim());
      }
      continue;
    }
    if (line.trim().includes("num_cols =")) {
      if (line[0] !== "%") {
        //its not a minizinc comment
        let cols = line.split("=");
        stored.cols = parseInt(cols[1].split(";", 1)[0].trim());
      }
      continue;
    }
    if (line.trim().includes("size_empty_edge =")) {
      if (line[0] !== "%") {
        //its not a minizinc comment
        let sizeEmptyEdge = line.split("=");
        stored.sizeEmptyEdge = parseInt(sizeEmptyEdge[1].split(";", 1)[0].trim());
      }
      continue;
    }
  }
  return stored;
};

const UploadExperiment = (props) => {
  /* needed error messages?? */
  const [showError, setShowError] = React.useState(false);


  const handleChange = (event) => {
    const fr = new FileReader();
    fr.readAsText(event.target.files[0], "UTF-8");
    fr.onload = (event) => {
      let content = event.target.result;
      let parsedDataNeededForVisualization = parseDznInput(content);
      props.handleUploadedDznFile(parsedDataNeededForVisualization, content)
    };
  };

  return (
    <StyledContainer>
      <StyledUploadResultButton
        type="file"
        name="upload-results"
        id="upload-results"
        accept=".dzn"
        onChange={handleChange}
      />
      {showError ? (
        <StyledErrorMessage>The dzn file is incorrect!</StyledErrorMessage>
      ) : undefined}
    </StyledContainer>
  );
};

export default UploadExperiment;
