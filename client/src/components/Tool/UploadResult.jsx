import React from "react";
import styled from "styled-components";

const StyledUploadResultButton = styled.input`
  position: absolute;
  font-family: ${(props) => props.theme.fonts.primary};
  font-size: 14px;
  bottom: 15px;
  padding-left: 10px;
`;

const StyledErrorMessage = styled.p`
  font-size: 12px;
  color: red;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const checkValidUpload = (jsonObj) => {
  return (
    jsonObj.hasOwnProperty("cols") &&
    jsonObj.hasOwnProperty("rows") &&
    jsonObj.hasOwnProperty("result") &&
    jsonObj.hasOwnProperty("sizeEmptyEdge")
  );
};

const UploadResult = (props) => {
  const [showError, setShowError] = React.useState(false);
  const handleChange = (event) => {
    setShowError(false);
    const fr = new FileReader();
    fr.readAsText(event.target.files[0], "UTF-8");
    fr.onload = (event) => {
      let parsedResult = JSON.parse(event.target.result);
      if (checkValidUpload(parsedResult)) {
        props.handleUploadedResults(parsedResult);
      } else {
        setShowError(true);
      }
    };
  };

  return (
    <StyledContainer>
      <StyledUploadResultButton
        type="file"
        name="upload-results"
        id="upload-results"
        accept=".json"
        onChange={handleChange}
      />
      {showError ? (
        <StyledErrorMessage>
          Please upload the correct downloaded json file!
        </StyledErrorMessage>
      ) : undefined}
    </StyledContainer>
  );
};

export default UploadResult;
