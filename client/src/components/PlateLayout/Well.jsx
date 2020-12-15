import React from "react";
import styled from "styled-components";

const StyledWell = styled.div`
  border-radius: 50%;
  grid-row: ${(props) => props.row};
  grid-column: ${(props) => props.col};
  background-color: ${(props) => props.color};
  opacity: ${(props) => (props.lighten ? 0.2 : 1)};
`;
const StyledEmptyWell = styled.div`
  border-radius: 50%;
  background-color: lightgray;
  grid-row: ${(props) => props.row};
  grid-column: ${(props) => props.col};
  background-color: ${(props) => props.color};
`;

const StyledLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  color: #000;
  margin: auto;
  text-align: center;
  width: ${(props) => props.wellRad}px;
  height: ${(props) => props.wellRad}px;
`;
const Well = (props) => {
  var color = props.color;
  if (!props.empty) {
    var lighten = false;
    if (
      props.selected !== "" &&
      props.selected !== props.data.plateID + props.data.cmpdname
    ) {
      lighten = true;
    }
  }

  if (props.empty) {
    return <StyledEmptyWell row={props.row} col={props.col} color={color} />;
  }

  if (props.display === "none") {
    return (
      <StyledWell
        row={props.row}
        col={props.col}
        color={color}
        lighten={lighten}
      >
        <StyledLabel wellRad={props.wellRad}></StyledLabel>
      </StyledWell>
    );
  }
  if (props.display === "compound") {
    return (
      <StyledWell
        row={props.row}
        col={props.col}
        color={color}
        lighten={lighten}
      >
        <StyledLabel wellRad={props.wellRad}>{props.data.cmpdname}</StyledLabel>
      </StyledWell>
    );
  }
  if (props.display === "concentration") {
    return (
      <StyledWell
        row={props.row}
        col={props.col}
        color={color}
        lighten={lighten}
      >
        <StyledLabel wellRad={props.wellRad}>{props.data.CONCuM}</StyledLabel>
      </StyledWell>
    );
  }
};

export default Well;
