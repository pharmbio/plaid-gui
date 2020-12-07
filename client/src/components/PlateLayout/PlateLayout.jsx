import React from "react";
import styled from "styled-components";
import output_data from "./output_from_ex1.json";
import Plate from "./Plate.jsx";

// should come together with output from API into PROPS..
const ROWS = 8;
const COLS = 12;
const SIZE_EMPTY_EDGES = 1;
const DATA = output_data.slice(0, 60); // plate 1

const ALPHABET = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const StyledResultLayoutContainer = styled.div``;

const StyledPlateWrapper = styled.div`
  margin: auto;
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.cols + 2},
    ${(props) => props.wellRad}px
  );
  grid-template-rows: repeat(
    ${(props) => props.rows + 2},
    ${(props) => props.wellRad}px
  );
  column-gap: ${(props) => props.gap}px;
  row-gap: ${(props) => props.gap}px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const StyledColumnIdentifier = styled.div`
  justify-self:center;
  align-self: center;
  grid-row: ${(props) => props.row};
  grid-column: ${(props) => props.col};
`;
const StyledRowIdentifier = styled.div`
  justify-self:center;
  align-self: center;
  grid-row: ${(props) => props.row}; /* row position */
  grid-column: ${(props) => props.col};
`;

/* 
    CONCuM
    cmpdname
    cmpdnum
    plateID
    well
*/

/* DATA.forEach((o) => {
  console.log(o);
}); */

/* Props should hold all values as data, rows, cols etc..*/
const PlateLayout = () => {
  let rowList = [];
  let colList = [];

  for (let i = 0; i < ROWS; i++) {
    rowList.push(i);
  }
  for (let i = 0; i < COLS; i++) {
    colList.push(i);
  }

  return (
    <StyledPlateWrapper rows={ROWS} cols={COLS} wellRad={40} gap={2.5}>
      {rowList.map((i) => {
        return React.createElement(
          StyledRowIdentifier,
          { key: ALPHABET[0], row: i + 2, col: 1 },
          ALPHABET[i]
        );
      })}
      {colList.map((i) => {
        return React.createElement(
          StyledColumnIdentifier,
          { key: i + 1, row: 1, col: i + 2 },
          i + 1
        );
      })}
      <Plate
        rows={ROWS}
        cols={COLS}
        emptyEdges={SIZE_EMPTY_EDGES}
        data={DATA}
        alphabet={ALPHABET}
      />
    </StyledPlateWrapper>
  );
};

export default PlateLayout;
