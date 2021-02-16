import React from "react";
import styled from "styled-components";
import parse from "../../functions/parse.js";

const StyledUploadResultButton = styled.input`
  font-family: ${(props) => props.theme.fonts.primary};
  font-size: 14px;
`;

const StyledErrorMessage = styled.p`
  font-size: 12px;
  color: red;
`;

const StyledContainer = styled.div`
  align-self: center;
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
  "experimentForm",
  "compoundForm",
  "controlForm",
  "delimiter",
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

const prepareConfigFile = (obj) => {
  let compoundGroups = obj.compoundForm.groups;
  let controlGroups = obj.controlForm.groups;

  /* add appropriate IDs and other properties needed for the forms */
  for (let i = 0; i < compoundGroups.length; i++) {
    let group = compoundGroups[i];
    group["id"] = "gr-" + i;

    group["compound_names_parsed"] = parse(
      obj.delimiter ? obj.delimiter : ",",
      group.compound_names
    );
    compoundGroups[i] = group;
  }

  /* add appropriate IDs and other properties needed for the forms */
  for (let i = 0; i < controlGroups.length; i++) {
    let group = controlGroups[i];
    group["id"] = "gr-" + i;
    controlGroups[i] = group;
  }

  let result = {
    experimentForm: obj.experimentForm,
    controlForm: { groups: [...controlGroups], selectedGroup: 0 },
    compoundForm: {
      groups: [...compoundGroups],
      selectedGroup: 0,
      delimiter: obj.delimiter ? obj.delimiter : ",",
    },
  };
  return result;
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
          content = prepareConfigFile(content);
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
