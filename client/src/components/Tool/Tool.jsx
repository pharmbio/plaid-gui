import React, { useState } from "react";
import styled from "styled-components";
import PlaidForm from "./../PlaidForm";
import PlateLayout from "./../PlateLayout";
import UploadResult from "./UploadResult.jsx";

const StyledToolWrapper = styled.div`
  height: 100vh;
`;

/**
 * Renders the container that switches between the form, loader and eventually
 * the visualization of the resulting output from the minizinc model
 */
const Tool = () => {
  const [data, setData] = useState(undefined);
  const [results, setUploadedResults] = useState(null);

  const handleUploadedResults = (res) => {
    let parsedResult = JSON.parse(res);
    console.log(parsedResult);
    setData(parsedResult);
  };

  console.log(results);
  return (
    <StyledToolWrapper>
      <UploadResult handleUploadedResults={handleUploadedResults} />
      {data !== undefined ? (
        <PlateLayout
          data={data.result}
          rows={data.rows}
          cols={data.cols}
          sizeEmptyEdge={data.sizeEmptyEdge}
        />
      ) : (
        <PlaidForm setData={setData} />
      )}
    </StyledToolWrapper>
  );
};

export default Tool;
