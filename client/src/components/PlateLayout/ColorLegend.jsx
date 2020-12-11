import React from "react";
import styled from "styled-components";

const StyledLegendWrapper = styled.div`
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3, auto);
  padding: 5px;
  margin-right: 45px; /* same as wellRad */
`;

const StyledLegendItem = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 2.5px;
  cursor: pointer;
`;

const StyledColorBox = styled.div`
  align-self: center;
  justify-self: center;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #${(props) => props.color};
`;

const StyledLabel = styled.div`
  font-family: "Lato", sans-serif;
  font-size: 0.9em;
  margin: 2.5px;
`;

const ColorLegend = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    props.handleSelectedCompound(e.currentTarget.id);
  };
  let alreadyAdded = new Set();
  console.log(props.emptyEdges);
  return (
    <StyledLegendWrapper>
      {props.data.map((o) => {
        if (alreadyAdded.has(o.cmpdname)) {
          return undefined;
        } else {
          alreadyAdded.add(o.cmpdname);
          return (
            <StyledLegendItem
              key={o.plateID + o.cmpdname}
              id={o.plateID + o.cmpdname}
              onClick={handleClick}
            >
              <StyledColorBox
                color={props.compoundToColorMap.get(o.cmpdnum)}
              />
              <StyledLabel>{o.cmpdname}</StyledLabel>
            </StyledLegendItem>
          );
        }
      })}
      {props.emptyEdges > 0 ? (
        <StyledLegendItem key={"empty-legend"}>
          <StyledColorBox color={props.emptyWellColor} />
          <StyledLabel>{"empty"}</StyledLabel>
        </StyledLegendItem>
      ) : undefined}
    </StyledLegendWrapper>
  );
};

export default ColorLegend;
