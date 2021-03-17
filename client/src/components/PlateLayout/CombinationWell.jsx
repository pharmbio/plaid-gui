import React from "react";
import styled from "styled-components";
import truncateString from "./../../functions/truncateString.js";

/* covers the styling and positioning of the well */
const StyledTwoFourCombinationWell = styled.div`
  border-radius: 50%;
  grid-row: ${(props) => props.row};
  grid-column: ${(props) => props.col};
  opacity: ${(props) => (props.lighten ? 0.2 : 1)};
  border-left-color: ${(props) => props.leftColor};
  border-top-color: ${(props) => props.topColor};
  border-right-color: ${(props) => props.rightColor};
  border-bottom-color: ${(props) => props.bottomColor};
  border-width: ${(props) => props.wellRad / 2}px;
  border-style: solid;
  height: 0px;
  width: 0px;
`;

/* covers the styling and positioning of the labels on 2/4 combination wells */
const StyledLabel = styled.div`
  display: flex;
  font-size: 12px;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  color: #000;
  width: ${(props) => props.wellRad}px;
  position: relative;
  margin: auto;
  top: -7px;
  left: -20px;
  align-items: center;
  justify-content: center;
`;

const StyledColLabel = styled.div`
  font-size: 12px;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  color: #000;
`;

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.wellRad}px;
  position: relative;
  margin: auto;
  top: -13px;
  left: -19px;
`;

/* covers the styling and positioning of the labels on 3-compound combinations */

const StyledThreeCombinationWell = styled.div`
  grid-row: ${(props) => props.row};
  grid-column: ${(props) => props.col};
  opacity: ${(props) => (props.lighten ? 0.2 : 1)};
  border-radius: 50%;
  background: conic-gradient(
    ${(props) => props.colorOne} 35%,
    ${(props) => props.colorTwo} 0 65%,
    ${(props) => props.colorThree} 0
  );
`;
const StyledLabel3 = styled.div`
  display: flex;
  font-size: 12px;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  color: #000;
  width: ${(props) => props.wellRad}px;
  height: ${(props) => props.wellRad}px;
  margin: auto;
  align-items: center;
  justify-content: center;
`;
const StyledColumn3 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.wellRad}px;
  height: ${(props) => props.wellRad}px;
`;

const CombinationWell = (props) => {
  let colors = props.colors;
  let sizeColors = colors.length;

  let title = "";
  var lighten = false;
  if (
    props.selected !== "" &&
    props.selected !== props.cmpdObj.plateID + props.cmpdObj.cmpdname
  )
    lighten = true;

  title = props.cmpdObj.cmpdname + "\n" + props.cmpdObj.CONCuM;

  console.log(colors);
  return sizeColors === 3 ? (
    <StyledThreeCombinationWell
      colorOne={colors[0]}
      colorTwo={colors[1]}
      colorThree={colors[2]}
      lighten={lighten}
      row={props.row}
      col={props.col}
      title={title}
      wellRad={props.wellRad}
    >
      {props.display !== "none" ? (
        props.display === "all" ? (
          <StyledColumn3 wellRad={props.wellRad}>
            <StyledColLabel>
              {truncateString(props.cmpdObj.cmpdname, 5)}
            </StyledColLabel>
            <StyledColLabel>
              {truncateString(props.cmpdObj.CONCuM, 5)}
            </StyledColLabel>
          </StyledColumn3>
        ) : (
          <StyledLabel3 wellRad={props.wellRad}>
            {props.display === "compound"
              ? truncateString(props.cmpdObj.cmpdname, 5)
              : truncateString(props.cmpdObj.CONCuM, 5)}
          </StyledLabel3>
        )
      ) : (
        ""
      )}
    </StyledThreeCombinationWell>
  ) : (
    <StyledTwoFourCombinationWell
      leftColor={colors[0]}
      topColor={sizeColors === 2 ? colors[0] : colors[1]}
      rightColor={sizeColors === 2 ? colors[1] : colors[2]}
      bottomColor={sizeColors === 2 ? colors[1] : colors[3]}
      lighten={lighten}
      row={props.row}
      col={props.col}
      title={title}
      wellRad={props.wellRad}
    >
      {props.display !== "none" ? (
        props.display === "all" ? (
          <StyledColumn wellRad={props.wellRad}>
            <StyledColLabel>
              {truncateString(props.cmpdObj.cmpdname, 5)}
            </StyledColLabel>
            <StyledColLabel>
              {truncateString(props.cmpdObj.CONCuM, 5)}
            </StyledColLabel>
          </StyledColumn>
        ) : (
          <StyledLabel wellRad={props.wellRad}>
            {props.display === "compound"
              ? truncateString(props.cmpdObj.cmpdname, 5)
              : truncateString(props.cmpdObj.CONCuM, 5)}
          </StyledLabel>
        )
      ) : (
        ""
      )}
    </StyledTwoFourCombinationWell>
  );
};

export default CombinationWell;
