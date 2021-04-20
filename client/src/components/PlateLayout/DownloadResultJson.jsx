import React from "react";
import styled from "styled-components";
import { BiDownload } from "react-icons/bi";

const StyledDownloadButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
`;

const handleDownload = async (data) => {
  const json = JSON.stringify(data);
  const blob = new Blob([json], { type: "application/json" });
  const href = await URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = "results.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const DownloadResultJson = (props) => {
  let data = {
    rows: props.rows,
    cols: props.cols,
    sizeEmptyEdge: props.sizeEmptyEdge,
    controls: props.controls,
    result: props.data,
  };
  return (
    <StyledDownloadButton onClick={() => handleDownload(data)} title={"Download JSON file"}>
     <BiDownload size={36} />
     <p>JSON</p>
    </StyledDownloadButton>
  );
};

export default DownloadResultJson;
