import React from "react";
import styled from "styled-components";
import UploadResult from "./UploadResult.jsx";
import UploadExperiment from "./UploadExperiment.jsx";
import UploadExample from "./UploadExample.jsx";
import PlaidForm from "./../PlaidForm";
import HighlightedParahraph from "../Instructions/HighlightedParagraph";
import { ReactComponent as ToolIcon } from "../../assets/icons/wrench.svg";
import { ReactComponent as FormIcon } from "../../assets/icons/card-checklist.svg";
import { ReactComponent as UploadIcon } from "../../assets/icons/box-arrow-up.svg";


const StyledTransitionPageContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const StyledTransitionPageInnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const StyledParagraph = styled.p`
  position: absolute;
  font-size: 17px;
  line-height: 1.7;
  font-weight: 400;
  bottom: 8em;
  margin: 4px;   
  font-style: normal;
  font-family: ${(props) => props.theme.fonts.secondary};
`;

const StyledRowContainer = styled.div`
  display: flex;
  position: absolute;
  flex-wrap: nowrap;
  justify-content: space-between;
  bottom: 15px;
`;

const StyledFlexItem = styled.div`  
  position: relative; 
  text-align: center;
  margin: 20px;
  height: 400px;
  width: 300px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;


const StyledToolButton = styled.button`

  font-family: Whitney, "Open Sans", Helvetica, sans-serif;
  position: absolute;
  background-color: #5096FF;
  border: 2px solid #5096FF;
  color: #fff;
  font-weight: 400;
  font-size: 16pt;
  border-radius: 25px;
  cursor: pointer;
  height: 45px;
  width: 200px;
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
`
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
`
const StyledToolIcon = styled(ToolIcon)`
  display: block;
  margin-top:50px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
`
const StyledFormIcon = styled(FormIcon)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
`
const StyledUploadIcon = styled(UploadIcon)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
`
const StyledHeader = styled.h1`
 font-size: 20pt;
 postion: absolute;
 font-weight: bold;
 margin: 15px;
 text-align: center;  
 
`
const StyledTest = styled.div`
  position: absolute;
  top: 20px;
`
/**
 * Renders the transition boxes that allows the user to select to either upload old results, 
 * upload a config file and go to the tool
 * @param props.handleUploadedDznFile callback-func that sends the uploaded dzn file contents to the API and wait for the result
 * @param props.handleUploadedResults callback-func that updates data state by adding the info gotten from the results-json file
 * @param props.error 
 * @param props.setData callback-func that updates data state held by parent Tool component
 * 
 * 
 */
const TransitionPage = (props) => {
  const [transition, setTransition] = React.useState("main");
  const [uploadedConfig, setUploadedConfig] = React.useState(null);

  /**
   * @param {object} content an object containing data to prepopulate the form fields with. (each property name in content is valid property name to the formState object)
   */
  const handleUploadedJsonConfig = (content) => {
    setUploadedConfig(content);
  };

  const handleUploadedJsonExample = (content1) => {
    let content = {"experimentForm":{"num_rows":8,"num_cols":12,"vertical_cell_lines":1,"horizontal_cell_lines":1,"allow_empty_wells":false,"size_empty_edge":1,"concentrations_on_different_rows":true,"concentrations_on_different_columns":true,"replicates_on_different_plates":true,"replicates_on_same_plate":false,"selected":"{\"num_rows\": 8, \"num_cols\": 12}"},"delimiterCompounds":",","compoundForm":{"groups":[{"id":"gr-0","compound_names":"comp1, comp2, comp3, comp4, comp5, comp6, comp7, comp8, comp9, comp10","compound_names_parsed":["comp1"," comp2"," comp3"," comp4"," comp5"," comp6"," comp7"," comp8"," comp9"," comp10"],"concentration_names":"\"0.3\", \"1\", \"3\", \"5\", \"10\", \"15\", \"30\", \"100\"","concentration_names_parsed":["\"0.3\""," \"1\""," \"3\""," \"5\""," \"10\""," \"15\""," \"30\""," \"100\""],"compound_replicates":"2"}]},"delimiterControls":",","controlForm":{"groups":[{"id":"gr-0","concentration_names":"1","concentration_names_parsed":["1"],"control_replicates":"32","control_names":"pos","control_names_parsed":["pos"]},{"id":"gr-1","control_names":"neg, blank, dmso","control_names_parsed":["neg"," blank"," dmso"],"concentration_names":"1","concentration_names_parsed":["1"],"control_replicates":"16"}]}};
    setUploadedConfig(content);
  };

  const handleClick = (state) => {
    setTransition(state);
  };
  return (
    <>
      {transition === "form" || uploadedConfig !== null ? (
        <PlaidForm
          setData={props.setData}
          uploadedConfig={uploadedConfig}
        />
      ) : 
      (
            <StyledTransitionPageContainer>
              {props.error ? <StyledTest> <HighlightedParahraph title={"Error: File data is incorrect"} type={"Warning"}>
                {props.error}
              </HighlightedParahraph></StyledTest> : null}
              <StyledTransitionPageInnerContainer>
                  <UploadExample
                    handleUploadedJsonConfig={handleUploadedJsonConfig}
                    setForm = {handleClick}
                  />
              </StyledTransitionPageInnerContainer>
              <StyledTransitionPageInnerContainer>
              <StyledFlexItem>
                <StyledHeader> PLAN </StyledHeader>
                <StyledToolIcon />
                <StyledParagraph>
                  Use the PLAID tool to generate an AI based multiplate layout for your experiments.
              </StyledParagraph>
                <StyledToolButton title={"Take me to the forms"}
                  isLast={false}
                  onClick={() => handleClick("form")}
                >Let's get started!</StyledToolButton>
              </StyledFlexItem>
              <StyledFlexItem>
                <StyledHeader> POPULATE </StyledHeader>
                <StyledFormIcon />
                <StyledParagraph>
                  Upload an existing form config file to prepopulate the form or an dzn file to compute a layout directly.
              </StyledParagraph>
                <StyledRowContainer>
                  <UploadExperiment
                    handleUploadedDznFile={props.handleUploadedDznFile}
                    handleUploadedJsonConfig={handleUploadedJsonConfig}
                  />
                </StyledRowContainer>
              </StyledFlexItem>
              <StyledFlexItem>
                <StyledHeader> UPLOAD </StyledHeader>
                <StyledUploadIcon />
                <StyledParagraph>
                  Already computed an experiment layout? You can upload it here to visualize it again, bypassing the form!
              </StyledParagraph>
                <UploadResult
                  handleUploadedResults={props.handleUploadedResults}
                />
              </StyledFlexItem>
              </StyledTransitionPageInnerContainer>
            </StyledTransitionPageContainer>
        )}
    </>
  );
};

export default TransitionPage;
