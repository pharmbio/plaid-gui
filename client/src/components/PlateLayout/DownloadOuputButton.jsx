import React, { useState } from "react";
import styled from "styled-components";
import { BiDownload } from "react-icons/bi";
import { CSVLink } from "react-csv";

const StyledDownloadButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
  align-self: end;
`;

/*  transform plate output from jso to CSV Converter in the order
    plateID - well - cmpdname - CONCuM - cmpdnum
  */
function fromJsonToCsv(objArray) {
  var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  var str = "";

  for (var i = 0; i < array.length; i++) {
    var line = "";
    line += array[i].plateID;
    line += ",";
    line += array[i].well;
    line += ",";
    line += array[i].cmpdname;
    line += ",";
    line += array[i].CONCuM;
    line += ",";
    line += array[i].cmpdnum;
    line += ",";

    str += line + "\r\n";
  }
  return str;
}

/**
 * Render a button that downloads the output result shown on the plate as a csv file.
 *
 * @param props.plate all cmpdObjs of the corresponding plate
 */
const DownloadOutputButton = (props) => {
  const csvRef = React.useRef();
  const headers = [
    "plateID,well,cmpdname,CONCuM,cmpdnum" /* 
    { label: "plateID", key: "plateID" },
    { label: "well", key: "well" },
    { label: "cmpdname", key: "cmpdname" },
    { label: "CONCuM", key: "CONCuM" },
    { label: "cmpdnum", key: "cmpdnum" }, */,
  ];

  const handleClick = (e) => {
    csvRef.current.link.click();
  };
  return (
    <StyledDownloadButton onClick={handleClick} title={"Download CSV file"}>
      <CSVLink
        filename={props.plate[0].plateID + ".csv"}
        headers={headers}
        data={fromJsonToCsv(props.plate)}
        ref={csvRef}
      />
      <BiDownload size={24} />
    </StyledDownloadButton>
  );
};

export default DownloadOutputButton;
