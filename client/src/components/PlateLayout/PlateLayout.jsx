import React from "react";
import styled from "styled-components";
import output_data from "./output_from_ex1.json";

// should come together with output from API..
const ROWS = 8;
const COLS = 12;
const SIZE_EMPTY_EDGES = 1;
const DATA = output_data.slice(0, 60); // plate 1

const ALPHABET = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
].map((l) => l.toUpperCase());

const StyledPlateWrapper = styled.div`
  margin: auto;
`;

const StyledPlate = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.cols},
    ${(props) => props.wellRad}px
  );
  grid-template-rows: repeat(
    ${(props) => props.rows},
    ${(props) => props.wellRad}px
  );
  width: ${(props) => props.cols * props.wellRad + props.cols * props.gap}px;
  column-gap: ${(props) => props.gap}px;
  row-gap: ${(props) => props.gap}px;
  border: solid 1px;
`;

const StyledWell = styled.div`
  border-radius: 50%;
  background-color: lightcoral;
  grid-row: ${(props) => props.row};
  grid-column: ${(props) => props.col};
`;
const StyledEmptyWell = styled.div`
  border-radius: 50%;
  background-color: lightgray;
  grid-row: ${(props) => props.row};
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

/* Feels really hacky... TODO: find a better way */
const positionsOfEmptyWells = (empty, rows, cols) => {
  let emptyWells = [];
  // rows from top
  for (let i = 0; i < empty; i++) {
    for (let j = 0; j < cols; j++) {
      let row = i + 1;
      let col = j + 1;
      //console.log(row, col);
      emptyWells.push([row, col]);
    }
  }
  // rows between from left
  for (let i = empty; i < rows - empty; i++) {
    for (let j = 0; j < empty; j++) {
      let row = i + 1;
      let col = j + 1;
      //console.log(row, col);
      emptyWells.push([row, col]);
    }
  }

  // rows between from right
  for (let i = empty; i < rows - empty; i++) {
    for (let j = cols; j > cols - empty; j--) {
      let row = i + 1;
      let col = j;
      //console.log(row, col);
      emptyWells.push([row, col]);
    }
  }

  // rows from bottom
  for (let i = rows; i > rows - empty; i--) {
    for (let j = 0; j < cols; j++) {
      let row = i;
      let col = j + 1;
      //console.log(row, col);
      emptyWells.push([row, col]);
    }
  }
  return emptyWells;
};

/* Props should hold all values as data, rows, cols etc..*/
const PlateLayout = () => {
  /*   let amountOfEmptyWells =
    COLS * SIZE_EMPTY_EDGES * 2 +
    ROWS * SIZE_EMPTY_EDGES * 2 -
    4 * SIZE_EMPTY_EDGES; */

  let emptyWells = positionsOfEmptyWells(SIZE_EMPTY_EDGES, ROWS, COLS);

  return (
    <StyledPlateWrapper>
      <StyledPlate rows={ROWS} cols={COLS} wellRad={40} gap={2.5}>
        {/* precompute the matrix with empty  */}
        {emptyWells.map((pos, i) => {
          return React.createElement(StyledEmptyWell, {
            key: i,
            row: pos[0],
            col: pos[1],
          });
        })}
        {DATA.map((o) => {
          let row = ALPHABET.indexOf(o.well[0]) + 1;
          let col = parseInt(o.well.slice(1, o.well.length));
          console.log(row, col);
          return React.createElement(StyledWell, {
            key: o.well,
            row: row,
            col: col,
          });
        })}
      </StyledPlate>
    </StyledPlateWrapper>
  );
};

export default PlateLayout;
