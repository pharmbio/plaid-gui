import React from "react";
import styled from "styled-components";
import parse from "../../functions/parse.js";
import ExampleExperiment from "./Example.jsx";

const StyledUploadResultButton = styled.input`
  font-family: ${(props) => props.theme.fonts.primary};
  font-size: 14px;
  padding-left: 10px;
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

const StyledExampleButton = styled.button`

  font-family: Whitney, "Open Sans", Helvetica, sans-serif;
  position: relative;
  background-color: #5096FF;
  border: 2px solid #5096FF;
  color: #fff;
  font-weight: 400;
  font-size: 16pt;
  border-radius: 25px;
  cursor: pointer;
  height: 45px;
  width: 250px;
  bottom: 15px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  &:hover {
    outline: none;
    border: 1px solid #5096ff;
  }
`;

/* return an object containing the properties num_rows , num_cols and size_empty_edge from the dzn file which are needed for the visualization */
const parseDznInput = (data) => {
  let stored = { rows: null, cols: null, sizeEmptyEdge: null, controls:null };
  for (const line of data.split(/[\r\n]+/)) {
    if (stored.rows && stored.cols && stored.sizeEmptyEdge && stored.controls) {
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
    if(line.trim().includes("control_names")){

      if(line[0] !== "%"){
        //its not a minizinc comment
        let controlNames = line.split("=")[1];
        controlNames = JSON.parse(controlNames.split(";",1)[0].trim());
        stored.controls = controlNames;
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
  "delimiterCompounds",
  "delimiterControls",
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


// Handles the parameters contained in a json config file
const prepareConfigFile = (obj) => {
  let compoundGroups = obj.compoundForm.groups;
  let controlGroups = obj.controlForm.groups;

  /* add appropriate IDs and other properties needed for the forms */
  for (let i = 0; i < compoundGroups.length; i++) {
    let group = compoundGroups[i];
    group["id"] = "gr-" + i;

    group["compound_names_parsed"] = parse(
      obj.delimiterCompounds ? obj.delimiterCompounds : ",",
      group.compound_names
    );

    group["concentration_names_parsed"] = parse(
      obj.delimiterCompounds ? obj.delimiterCompounds : ",",
      group.concentration_names
    );
    compoundGroups[i] = group;
  }

  /* add appropriate IDs and other properties needed for the forms */
  for (let i = 0; i < controlGroups.length; i++) {
    let group = controlGroups[i];
    group["id"] = "gr-" + i;

    group["control_names_parsed"] = parse(
      obj.delimiterControls ? obj.delimiterControls : ",",
      group.control_names
    );
    group["concentration_names_parsed"] = parse(      obj.delimiterControls ? obj.delimiterControls : ",",
    group.concentration_names);
    controlGroups[i] = group;
  }

  let result = {
    experimentForm: obj.experimentForm,
    controlForm: {
      groups: [...controlGroups],
      selectedGroup: 0,
      delimiter: obj.delimiterControls ? obj.delimiterControls : ",",
    },
    compoundForm: {
      groups: [...compoundGroups],
      selectedGroup: 0,
      delimiter: obj.delimiterCompounds ? obj.delimiterCompounds : ",",
    },
  };
  return result;
};
/**
 * Handles the upload of a config json file and makes sure to construct an object that is used by the forms to fill them in.
 * Also handles the upload of a dzn file to bypass the form and send its content to the API
 * @param props.handleUploadedJsonConfig callback-func that makes sure that the parameters uploaded by the config file is sent to the right component to fill in the forms
 * @param props.setForm 
 * 
 */
 const UploadExample = (props) => {

  const [error, setShowError] = React.useState({ show: false, message: "" });


  // Handles the upload of a json/dzn file
  const handleExampleChange = (event) => {
    let extension = "json";
    {
      if (extension === "json") {
        let content = ({"experimentForm":{"num_rows":8,"num_cols":12,"vertical_cell_lines":1,"horizontal_cell_lines":1,"allow_empty_wells":false,"size_empty_edge":1,"concentrations_on_different_rows":true,"concentrations_on_different_columns":true,"replicates_on_different_plates":true,"replicates_on_same_plate":false,"selected":"{\"num_rows\": 8, \"num_cols\": 12}"},"delimiterCompounds":",","compoundForm":{"groups":[{"id":"gr-0","compound_names":"comp1, comp2, comp3, comp4, comp5, comp6, comp7, comp8, comp9, comp10","compound_names_parsed":["comp1"," comp2"," comp3"," comp4"," comp5"," comp6"," comp7"," comp8"," comp9"," comp10"],"concentration_names":"\"0.3\", \"1\", \"3\", \"5\", \"10\", \"15\", \"30\", \"100\"","concentration_names_parsed":["\"0.3\""," \"1\""," \"3\""," \"5\""," \"10\""," \"15\""," \"30\""," \"100\""],"compound_replicates":"2"}]},"delimiterControls":",","controlForm":{"groups":[{"id":"gr-0","concentration_names":"1","concentration_names_parsed":["1"],"control_replicates":"32","control_names":"pos","control_names_parsed":["pos"]},{"id":"gr-1","control_names":"neg, blank, dmso","control_names_parsed":["neg"," blank"," dmso"],"concentration_names":"1","concentration_names_parsed":["1"],"control_replicates":"16"}]}});
        if (validateJsonProperties(content)) {
          content = prepareConfigFile(content);
          props.handleUploadedJsonConfig(content);
        } else {
          setShowError({
            ...error,
            show: true,
            message: "ANDREINA The uploaded json file contains properties not allowed.",
          });
        }
      }
    };
  };

  return (
    <StyledContainer>
      <StyledExampleButton title={"Prefill with an example experiment 1"}
                  isLast={false}
                  onClick={() => {handleExampleChange("form")}}
                >Try a quick example!</StyledExampleButton>
      {error.show ? (
        <StyledErrorMessage>{error.message}</StyledErrorMessage>
      ) : undefined}
    </StyledContainer>
  );
};

export default UploadExample;



