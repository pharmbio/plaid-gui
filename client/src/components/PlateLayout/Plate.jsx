import React from "react";
import styled from "styled-components";
import Well from "./Well.jsx";

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

/* 
    CONCuM
    cmpdname
    cmpdnum
    plateID
    well
*/

const Plate = (props) => {
  let emptyWells = positionsOfEmptyWells(
    props.emptyEdges,
    props.rows,
    props.cols
  );
  return (
    <StyledPlate rows={props.rows} cols={props.cols} wellRad={45} gap={2.5}>
      {emptyWells.map((pos) => {
        return (
          <Well
            empty={true}
            row={pos[0]}
            col={pos[1]}
            key={props.alphabet[pos[0] - 1] + pos[1]}
            color={props.emptyWellColor} //grey
          />
        );
      })}
      {props.data.map((o) => {
        let row = props.alphabet.indexOf(o.well[0]) + 1;
        let col = parseInt(o.well.slice(1, o.well.length));

        return (
          <Well
            empty={false}
            row={row}
            col={col}
            key={o.plateID + o.well}
            data={o}
            color={props.compoundToColorMap.get(o.cmpdname)}
          />
        );
      })}
    </StyledPlate>
  );
};

export default Plate;
