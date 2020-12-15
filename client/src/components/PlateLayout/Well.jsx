import React from "react";
import styled from "styled-components";

const StyledWell = styled.div.attrs((props) =>
  props.empty
    ? {
        style: {
          gridRow: props.row,
          gridColumn: props.col,
          backgroundColor: props.color,
        },
      }
    : {
        style: {
          gridRow: props.row,
          gridColumn: props.col,
          backgroundColor: props.color,
          opacity: props.lighten ? 0.2 : 1,
        },
      }
)`
  border-radius: 50%;
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

  return props.empty ? (
    <StyledWell
      empty={props.empty}
      row={props.row}
      col={props.col}
      color={color}
      lighten={lighten}
    />
  ) : (
    <StyledWell
      empty={props.empty}
      row={props.row}
      col={props.col}
      color={color}
      lighten={lighten}
    >
      {props.display !== "none" ? <StyledLabel wellRad={props.wellRad}>{props.display === "compound" ? props.data.cmpdname : props.data.CONCuM}</StyledLabel>: ""}
    </StyledWell>
  );
};

export default Well;
