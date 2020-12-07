import React from "react";
import styled from "styled-components";

const StyledPlate = styled.div`
  grid-area: 2/2 / ${(props) => props.rows} / ${(props) => props.cols};
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
  height: ${(props) => props.rows * props.wellRad + props.rows * props.gap}px;
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

/*   let amountOfEmptyWells =
    COLS * SIZE_EMPTY_EDGES * 2 +
    ROWS * SIZE_EMPTY_EDGES * 2 -
    4 * SIZE_EMPTY_EDGES; */

const Plate = (Props) => {

    let emptyWells = positionsOfEmptyWells(Props.emptyEdges, Props.rows, Props.cols);
  return (
    <StyledPlate rows={Props.rows} cols={Props.cols} wellRad={40} gap={2.5}>
      {emptyWells.map((pos) => {
        return React.createElement(StyledEmptyWell, {
          key: Props.alphabet[pos[0] - 1] + pos[1],
          row: pos[0],
          col: pos[1],
        });
      })}
      {Props.data.map((o) => {
        let row = Props.alphabet.indexOf(o.well[0]) + 1;
        let col = parseInt(o.well.slice(1, o.well.length));
        console.log(row, col);
        return React.createElement(StyledWell, {
          key: o.well,
          row: row,
          col: col,
        });
      })}
    </StyledPlate>
  );
};

export default Plate;
