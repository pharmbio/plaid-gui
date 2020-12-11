import React from "react";
import styled from "styled-components";
import adjustColor from "./../../functions/adjustColor.js";

const StyledWell = styled.div`
  border-radius: 50%;
  grid-row: ${(props) => props.row};
  grid-column: ${(props) => props.col};
  background-color: #${(props) => props.color};
  color: black;
  opacity: ${(props) => (props.lighten ? 0.2 : 1)};
`;
const StyledEmptyWell = styled.div`
  border-radius: 50%;
  background-color: lightgray;
  grid-row: ${(props) => props.row};
  grid-column: ${(props) => props.col};
  background-color: #${(props) => props.color};
`;
const Well = (props) => {
  var color = props.color;
  if (!props.empty) {
    var lighten = false;
    if (props.selected === props.data.plateID + props.data.cmpdname) {
      // make color dark to pop out more from the other lightened nodes
      color = adjustColor(props.color, -60);
    }

    if (
      props.selected !== "" &&
      props.selected !== props.data.plateID + props.data.cmpdname
    ) {
      lighten = true;
    }
  }

  return props.empty ? (
    <StyledEmptyWell row={props.row} col={props.col} color={color} />
  ) : (
    <StyledWell
      row={props.row}
      col={props.col}
      color={color}
      lighten={lighten}
    ></StyledWell>
  );
};

export default Well;
