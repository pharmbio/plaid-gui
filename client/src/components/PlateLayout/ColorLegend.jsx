import React from "react";
import styled from "styled-components";

const StyledLegendWrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin-right: 40px;
`;

const StyledConcAndColorBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledConc = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: "Lato", sans-serif;
  font-size: 12px;
  margin-top: 2.5px;
  margin-bottom: 2.5px;
  width: 140px;
`;

const StyledLegendItem = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  cursor: pointer;
`;

const StyledColorBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border: solid 1px;
  border-left: none;
  width: 140px;
  height: 30px;
  margin: 2.5px;
`;
const StyledColorBox = styled.div`
  flex-grow: 2;
  border-left: solid 1px;
  background-color: ${(props) => props.color};
`;

const StyledLabel = styled.div`
  align-self: center;
  justify-self: center;
  font-family: "Lato", sans-serif;
  font-size: 12px;
  margin-left: 2.5px;
`;

const ColorLegend = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    props.handleSelectedCompound(e.currentTarget.id);
  };
  let compoundMapEntries = Array.from(props.compoundMap.entries());

  return (
    <StyledLegendWrapper>
      {compoundMapEntries.map(([key, val], index) => {
        return (
          <StyledConcAndColorBox key={index + key + val[0].plateID}>
            <StyledLegendItem id={val[0].plateID + key} onClick={handleClick}>
              <StyledColorBoxWrapper>
                {val.map((o, i) => {
                  return (
                    <StyledColorBox key={i + o.cmpdnum}
                      color={props.compoundToColorMap.get(o.cmpdnum)}
                    ></StyledColorBox>
                  );
                })}
              </StyledColorBoxWrapper>
              <StyledLabel>{key}</StyledLabel>
            </StyledLegendItem>
            <StyledConc>
              <p>{val[0].CONCuM}</p>
              <p>
                {val[val.length - 1].CONCuM === val[0].CONCuM
                  ? undefined
                  : val[val.length - 1].CONCuM}
              </p>
            </StyledConc>
          </StyledConcAndColorBox>
        );
      })}
      {props.children} 
    </StyledLegendWrapper>
  );
};

export default ColorLegend;
