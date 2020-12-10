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
  margin: 2.5px;
`;

const ColorLegend = (props) => {
  let alreadyAdded = new Set();
  return (
    <StyledLegendWrapper>
      {props.data.map((o) => {
        if (alreadyAdded.has(o.cmpdname)) {
          return undefined;
        } else {
          alreadyAdded.add(o.cmpdname);
          return (
            <StyledLegendItem key={o.cmpdname + o.plateID}>
              <StyledColorBox
                color={props.compoundToColorMap.get(o.cmpdname)}
              />
              <StyledLabel>{o.cmpdname}</StyledLabel>
            </StyledLegendItem>
          );
        }
      })}
      {props.emptyEdges > 0 ? (
        <StyledLegendItem key={"empty-legend"}>
          {/* fix unique key .. */}
          <StyledColorBox color={props.emptyWellColor} />
          <StyledLabel>{"empty"}</StyledLabel>
        </StyledLegendItem>
      ) : undefined}
    </StyledLegendWrapper>
  );
};

export default ColorLegend;
