import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PlateLayout from "./../PlateLayout";
import TransitionPage from "./TransitionPage.jsx";
import Loader from "./../Loader";

const StyledToolWrapper = styled.div`
  height: 100vh;
`;
const StyledWarningContainer = styled.div`
  width: 50%;
`

const axios = require("axios");

/**
 * Renders the container that switches between the form, loader and eventually
 * the visualization of the resulting output from the minizinc model
 */
const Tool = () => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const handleUploadedResults = (res) => {
    setData(res);
  };

  /**
   * Send the uploaded dzn file contents to the API and wait for the result
   * @param {*} parsedData contains the attributes rows, cols, sizeEmptyEdge from the contents of the dzn file needed to visualize the results
   * @param {*} content the dzn file contents that the API mzn model needs to go through
   */
  const handleUploadedDznFile = async (parsedData, content) => {
    console.log(content);
    setError(false);
    setLoading(true);
    axios
      .post(
        "http://localhost:5000/dzn_file",
        { data: content },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(
        (res) => {
          console.log(res.data);
          setData({
            rows: parsedData.rows,
            cols: parsedData.cols,
            sizeEmptyEdge: parsedData.sizeEmptyEdge,
            result: res.data,
          });
        }).catch((error) => {
          /* handle error TODO! */

          setLoading(false);
          setError(true);
        }
        );
  };

  React.useEffect(() => {
    if (data !== undefined) {
      setLoading(false);
    }
  }, [loading, data]);
  console.log(data);
  return (
    <StyledToolWrapper>
      {data !== undefined ? (
        <PlateLayout
          data={data.result}
          rows={data.rows}
          cols={data.cols}
          sizeEmptyEdge={data.sizeEmptyEdge}
        />
      ) : loading ? (
        <Loader />
      ) : (
            <TransitionPage
              handleUploadedResults={handleUploadedResults}
              handleUploadedDznFile={handleUploadedDznFile}
              setData={setData}
              error={error}
            />
          )}
    </StyledToolWrapper>
  );
};

export default Tool;
