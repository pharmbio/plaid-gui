import React from "react";
import styled from "styled-components";
import Well from "./Well.jsx";
import ColorLegend from "./ColorLegend.jsx";

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

const StyledResultLayoutContainer = styled.div`
  margin: auto;
  margin-top: 5rem;
  display: flex;
  flex-direction: row;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const StyledPlateWrapper = styled.div`
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
`;

const StyledColumnIdentifier = styled.div`
  justify-self: center;
  align-self: center;
  grid-row: ${(props) => props.row};
  grid-column: ${(props) => props.col};
`;
const StyledRowIdentifier = styled.div`
  justify-self: center;
  align-self: center;
  grid-row: ${(props) => props.row}; /* row position */
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

/* 
    CONCuM
    cmpdname
    cmpdnum
    plateID
    well
*/
const reducer = (_, action) => {
  switch (action.type) {
    case "SELECT":
      return action.payload;
    case "DESELECT":
      return "";
    default:
      throw new Error("Unexpected action");
  }
};

const Plate = (props) => {
  /* rowList, colList used to map over in the return as to render each component */
  let rowList = [];
  let colList = [];
  for (let i = 0; i < props.rows; i++) {
    rowList.push(i);
  }
  for (let i = 0; i < props.cols; i++) {
    colList.push(i);
  }

  const [selectedCompound, dispatch] = React.useReducer(reducer, "");
  const handleSelectedCompound = (selected) => {
    if (selected === selectedCompound) {
      dispatch({ type: "DESELECT" });
    } else {
      dispatch({ type: "SELECT", payload: selected });
    }
  };

  let emptyWells = positionsOfEmptyWells(
    props.emptyEdges,
    props.rows,
    props.cols
  );
  return (
    <StyledResultLayoutContainer>
      <StyledPlateWrapper
        rows={props.rows}
        cols={props.cols}
        wellRad={45}
        gap={2.5}
      >
        {rowList.map((i) => {
          return React.createElement(
            StyledRowIdentifier,
            /* will there ever be the case where data[0] is undefined? */
            {
              key: props.alphabet[i] + props.data[0].plateID,
              row: i + 2,
              col: 1,
            },
            props.alphabet[i]
          );
        })}
        {colList.map((i) => {
          return React.createElement(
            StyledColumnIdentifier,
            /* will there ever be the case where data[0] is undefined? */
            { key: i + 1 + props.data[0].plateID, row: 1, col: i + 2 },
            i + 1
          );
        })}
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
                selected={selectedCompound}
                row={row}
                col={col}
                key={o.plateID + o.well}
                data={o}
                color={props.compoundToColorMap.get(o.cmpdname)}
              />
            );
          })}
        </StyledPlate>
      </StyledPlateWrapper>
      <ColorLegend
        wellRad={45}
        gap={2.5}
        rows={props.rows}
        cols={props.cols}
        emptyEdges={props.emptyEdges}
        emptyWellColor={props.emptyWellColor}
        data={props.data}
        compoundToColorMap={props.compoundToColorMap}
        handleSelectedCompound={handleSelectedCompound}
      />
    </StyledResultLayoutContainer>
  );
};

export default Plate;
