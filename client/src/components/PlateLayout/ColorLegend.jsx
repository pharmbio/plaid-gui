import React from "react";
import styled from "styled-components";

const StyledLegendWrapper = styled.div`
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3, auto);
  border: solid 1px;
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
  background-color: #${(props) => props.color};
`;

const StyledLabel = styled.div`
  margin: 2.5px;
`;

const ColorLegend = (Props) => {
  let compoundColorPairs = Array.from(Props.compoundToColorMap);
  if (Props.emptyEdges > 0) {
    compoundColorPairs.push(["empty", Props.emptyWellColor]);
  }
  return (
    <StyledLegendWrapper>
      {compoundColorPairs.map((pair) => {
        return (
          <StyledLegendItem>
            <StyledColorBox color={pair[1]} />
            <StyledLabel>{pair[0]}</StyledLabel>
          </StyledLegendItem>
        );
      })}
    </StyledLegendWrapper>
  );
};

export default ColorLegend;
