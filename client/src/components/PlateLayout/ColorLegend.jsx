import React from "react";
import styled from "styled-components";

/* makes sure that each color legend item is positioned in a column fashion */
const StyledLegendContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin-right: 40px;
`;

/* covers the positioning of The concentration labels and the colorbox in a column order */
const StyledConcAndColorBox = styled.div`
  display: flex;
  flex-direction: column;
`;

/* covers the concentration labels positioning so that they are at the opposite ends of the colorbox */
const StyledConcWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: "Lato", sans-serif;
  font-size: 12px;
  margin-top: 2.5px;
  margin-bottom: 2.5px;
  width: 140px;
`;

/* covers the positioning of colorbox and concentration labels and the compound name label in row order*/
const StyledLegendItem = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  cursor: pointer;
`;

/* covers the styling and the positioning of the colorbox */
const StyledColorBox = styled.div`
  display: flex;
  flex-direction: row;
  border: solid 1px;
  border-left: none;
  width: 140px;
  height: 30px;
  margin: 2.5px;
`;

/* covers the style of each color item inside the colorbox */
const StyledColorItem = styled.div`
  flex-grow: 2;
  /*   border-left: solid 1px; */
  background-color: ${(props) => props.color};
`;

/* covers the styling and positioning of each compound name label */
const StyledLabel = styled.div`
  align-self: center;
  justify-self: center;
  font-family: "Lato", sans-serif;
  font-size: 12px;
  margin-left: 2.5px;
`;
/**
 * Renders the color legend (displaying the different color intensities of a compound), the concentration labels (highest and min)
   and the switch from switching between what information should be displayed in each well
 *
 * @param props.compoundMap the map maping a compound name to all cmpdObjects with the same name (sorted high to low conc)
 * @param props.compoundToColorMap maping cmpdObject.cmpdnum to the corresponding hsla color
 * @param props.handleSelectedCompound callback function for handling the clicking of an item in the legend
 * @param props.children ... includes the Switch component
 */
const ColorLegend = (props) => {
  /**
   * will propagate the targeted id of the element clicked to parent component
   */
  const handleClick = (e) => {
    e.preventDefault();
    props.handleSelectedCompound(e.currentTarget.id);
  };

  /* key, value pairs of the compoundMap [K: cmpdname, V: [cmpdObjs..]] */
  let compoundMapEntries = Array.from(props.compoundMap.entries());

  return (
    <StyledLegendContainer>
      {compoundMapEntries.map(([key, val], index) => {
        return (
          <StyledConcAndColorBox key={index + key + val[0].plateID}>
            <StyledLegendItem id={val[0].plateID + key} onClick={handleClick}>
              <StyledColorBox>
                {val.map((o, i) => {
                  return (
                    <StyledColorItem
                      key={i + o.cmpdnum}
                      color={props.compoundToColorMap.get(o.cmpdnum)}
                    ></StyledColorItem>
                  );
                })}
              </StyledColorBox>
              <StyledLabel>{key}</StyledLabel>
            </StyledLegendItem>
            <StyledConcWrapper>
              <p>{val[0].CONCuM}</p>
              <p>
                {val[val.length - 1].CONCuM === val[0].CONCuM
                  ? undefined
                  : val[val.length - 1].CONCuM}
              </p>
            </StyledConcWrapper>
          </StyledConcAndColorBox>
        );
      })}
      {props.children}
    </StyledLegendContainer>
  );
};

export default ColorLegend;