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

/* return an object containing the properties num_rows , num_cols and size_empty_edge from the dzn file which are needed for the visualization */
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
        stored.rows = parseInt(rows[1].split(";", 1)[0].trim());
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
        stored.sizeEmptyEdge = parseInt(
          sizeEmptyEdge[1].split(";", 1)[0].trim()
        );
      }
      continue;
    }
  }
  return stored;
};

/* these are from the formState object and represents each input field available in the forms */
const validProperties = [
  "num_rows",
  "num_cols",
  "vertical_cell_lines",
  "horizontal_cell_lines",
  "allow_empty_wells",
  "size_empty_edge",
  "concentrations_on_different_rows",
  "concentrations_on_different_columns",
  "replicates_on_different_plates",
  "replicates_on_same_plate",
  "compounds",
  "compound_concentration_indicators",
  "compound_names",
  "compound_concentrations",
  "compound_replicates",
  "combinations",
  "combination_concentrations",
  "combination_names",
  " combination_concentration_names", 
  "num_controls",
  "control_concentrations",
  "control_replicates",
  "control_names",
  "control_concentration_names",
];

/* makes sure that the uploaded json content only has allowed property names */
const validateJsonProperties = (jsonObj) => {
  for (let key in jsonObj) {
    if (!validProperties.includes(key)) {
      return false;
    }
  }
  return true;
};

const UploadExperiment = (props) => {
  /* needed error messages?? */
  const [error, setShowError] = React.useState({ show: false, message: "" });

  const handleChange = (event) => {
    let extension = event.target.files[0].name.split(".").pop().toLowerCase();

    const fr = new FileReader();
    fr.readAsText(event.target.files[0], "UTF-8");
    fr.onload = (event) => {
      if (extension === "dzn") {
        let content = event.target.result;
        let parsedDataNeededForVisualization = parseDznInput(content);
        props.handleUploadedDznFile(parsedDataNeededForVisualization, content);
        return;
      }
      if (extension === "json") {
        let content = JSON.parse(event.target.result);
        if (validateJsonProperties(content)) {
          props.handleUploadedJsonConfig(content);
        } else {
          setShowError({
            ...error,
            show: true,
            message: "The uploaded json file contains properties not allowed.",
          });
        }
      }
    };
  };

  return (
    <StyledContainer>
      <StyledUploadResultButton
        type="file"
        name="upload-exp"
        id="upload-exp"
        accept=".dzn,.json"
        onChange={handleChange}
      />
      {error.show ? (
        <StyledErrorMessage>{error.message}</StyledErrorMessage>
      ) : undefined}
    </StyledContainer>
  );
};

export default UploadExperiment;
