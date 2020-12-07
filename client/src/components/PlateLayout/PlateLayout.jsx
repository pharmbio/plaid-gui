import React from "react";
import styled from "styled-components";
import output_data from "./output_from_ex1.json";
import Plate from "./Plate.jsx";
import randomColor from "./../../functions/randomColor.js";
import adjustColor from "./../../functions/adjustColor.js";
import ColorLegend from "./ColorLegend.jsx";

// should come together with output from API into PROPS..
const ROWS = 8;
const COLS = 12;
const SIZE_EMPTY_EDGES = 1;

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

// lower level is darker.
const DARKEN_LVL = 150;
const EMPTY_WELL_COLOR = "d3d3d3";

const assignColorToCompound = (o, pairs, alreadyChosen) => {
  if (pairs.has(o.cmpdname)) {
    return [pairs, alreadyChosen];
  } else {
    let color = randomColor(DARKEN_LVL);
    /* if color is already picked.. */
    while (alreadyChosen.includes(color)) {
      color = randomColor();
    }
    color = adjustColor(color, 80); // make color lighter
    alreadyChosen.push();
    pairs.set(o.cmpdname, color);
    return [pairs, alreadyChosen];
  }
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: scroll;
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

/* Props should hold all values as data, rows, cols etc..*/
const PlateLayout = () => {
  /* rowList, colList used to map over in the return as to render each component */
  let rowList = [];
  let colList = [];

  for (let i = 0; i < ROWS; i++) {
    rowList.push(i);
  }
  for (let i = 0; i < COLS; i++) {
    colList.push(i);
  }

  const EMPTY_WELLS =
    COLS * SIZE_EMPTY_EDGES * 2 +
    ROWS * SIZE_EMPTY_EDGES * 2 -
    4 * SIZE_EMPTY_EDGES;

  let platesCorrespondingData = [];

  for (let i = 0; i < output_data.length; i += ROWS * COLS - EMPTY_WELLS) {
    platesCorrespondingData.push(
      output_data.slice(i, i + ROWS * COLS - EMPTY_WELLS)
    );
  }

  return (
    <StyledContainer>
      {platesCorrespondingData.map((data) => {
        let compoundToColorMap = new Map();
        let chosenColors = [EMPTY_WELL_COLOR];
        data.forEach((o) => {
          [compoundToColorMap, chosenColors] = assignColorToCompound(
            o,
            compoundToColorMap,
            chosenColors
          );
        });
        return (
          <StyledResultLayoutContainer>
            <StyledPlateWrapper rows={ROWS} cols={COLS} wellRad={45} gap={2.5}>
              {rowList.map((i) => {
                return React.createElement(
                  StyledRowIdentifier,
                  { key: ALPHABET[i], row: i + 2, col: 1 },
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
                data={data}
                alphabet={ALPHABET}
                emptyWellColor={EMPTY_WELL_COLOR}
                compoundToColorMap={compoundToColorMap}
              />
            </StyledPlateWrapper>
            <ColorLegend
              wellRad={45}
              gap={2.5}
              rows={ROWS}
              cols={COLS}
              emptyEdges={SIZE_EMPTY_EDGES}
              emptyWellColor={EMPTY_WELL_COLOR}
              compoundToColorMap={compoundToColorMap}
            />
          </StyledResultLayoutContainer>
        );
      })}
    </StyledContainer>
  );
};

export default PlateLayout;
