import React from "react";
import styled from "styled-components";

const StyledWell = styled.div`
  border-radius: 50%;
  background-color: lightcoral;
  grid-row: ${(props) => props.row};
  grid-column: ${(props) => props.col};
  background-color: #${(props) => props.color};
  color:black;

`;
const StyledEmptyWell = styled.div`
  border-radius: 50%;
  background-color: lightgray;
  grid-row: ${(props) => props.row};
  grid-column: ${(props) => props.col};
  background-color: #${(props) => props.color};
`;

const Well = (props) => {
  return props.empty ? (
    <StyledEmptyWell row={props.row} col={props.col} color={props.color} />
  ) : (
    <StyledWell row={props.row} col={props.col} color={props.color}>
{/*       {Props.data.CONCuM} */}
    </StyledWell>
  );
};

export default Well;
