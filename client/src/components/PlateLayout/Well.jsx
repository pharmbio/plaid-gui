import React from "react";
import styled from "styled-components";

const StyledWell = styled.div`
  border-radius: 50%;
  background-color: lightcoral;
  grid-row: ${(props) => props.row};
  grid-column: ${(props) => props.col};
  background-color: #${(props) => props.color};
`;
const StyledEmptyWell = styled.div`
  border-radius: 50%;
  background-color: lightgray;
  grid-row: ${(props) => props.row};
  grid-column: ${(props) => props.col};
  background-color: #${(props) => props.color};
`;

const Well = (Props) => {
  console.log(Props.color);
  return Props.empty ? (
    <StyledEmptyWell row={Props.row} col={Props.col} color={Props.color} />
  ) : (
    <StyledWell row={Props.row} col={Props.col} color={Props.color} />
  );
};

export default Well;
