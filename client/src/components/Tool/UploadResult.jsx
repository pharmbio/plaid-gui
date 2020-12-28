import React from "react";
import styled from "styled-components";

const StyledUploadResultButton = styled.input`
  font-family: "Roboto", sans-serif;
  font-size: 14px;
`;

const UploadResult = (props) => {
  const handleChange = (event) => {
    const fr = new FileReader();
    fr.readAsText(event.target.files[0], "UTF-8");
    fr.onload = (event) => {
      console.log(event.target);
      props.handleUploadedResults(event.target.result);
    };
  };

  return (
    <>
      <StyledUploadResultButton
        type="file"
        name="upload-results"
        id="upload-results"
        accept=".json"
        onChange={handleChange}
      />
    </>
  );
};

export default UploadResult;
