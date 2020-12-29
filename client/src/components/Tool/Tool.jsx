import React, { useState } from "react";
import styled from "styled-components";

import PlateLayout from "./../PlateLayout";
import TransitionPage from "./TransitionPage.jsx";
const StyledToolWrapper = styled.div`
  height: 100vh;
`;

/**
 * Renders the container that switches between the form, loader and eventually
 * the visualization of the resulting output from the minizinc model
 */
const Tool = () => {
  const [data, setData] = useState(undefined);



  const handleUploadedResults = (res) => {
    setData(res);
  };

  return (
    <StyledToolWrapper>
      {data !== undefined ? (
        <PlateLayout
          data={data.result}
          rows={data.rows}
          cols={data.cols}
          sizeEmptyEdge={data.sizeEmptyEdge}
        />
      ) : (
        <TransitionPage
        handleUploadedResults={handleUploadedResults}
        setData={setData}
      />
      )}
    </StyledToolWrapper>
  );
};

export default Tool;
