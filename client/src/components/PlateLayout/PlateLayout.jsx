import React from "react";
import styled from "styled-components";
import Plate from "./Plate.jsx";
import randomColor from "./../../functions/randomColor.js";
import adjustColor from "./../../functions/adjustColor.js";

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
const EMPTY_WELL_COLOR = "e9e9e9";

const assignColorToCompound = (o, pairs, alreadyChosen) => {
  if (pairs.has(o.cmpdname)) {
    return;
  } else {
    let color = randomColor(DARKEN_LVL);
    /* if color is already picked.. */
    while (alreadyChosen.includes(color)) {
      color = randomColor();
    }
    color = adjustColor(color, 60); // make color lighter
    alreadyChosen.push();
    pairs.set(o.cmpdname, color);
  }
};

const StyledPlateContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: scroll;
`;

/*   */
/* Props should hold all values as data, rows, cols etc..*/
const PlateLayout = (props) => {
  const emptyWells =
    props.cols * props.sizeEmptyEdge * 2 +
    props.rows * props.sizeEmptyEdge * 2 -
    4 * props.sizeEmptyEdge;

  let plates = [];

  for (
    let i = 0;
    i < props.data.length;
    i += props.rows * props.cols - emptyWells
  ) {
    plates.push(props.data.slice(i, i + props.rows * props.cols - emptyWells));
  }

  let compoundToColorMap = new Map();
  let chosenColors = [EMPTY_WELL_COLOR];
  for (let plate of plates) {
    plate.map((o) => {
      return assignColorToCompound(o, compoundToColorMap, chosenColors);
    });
  }

  return (
    <StyledPlateContainer>
      {plates.map((data, index) => {
        return (
          <Plate
            rows={props.rows}
            cols={props.cols}
            emptyEdges={props.sizeEmptyEdge}
            data={data}
            alphabet={ALPHABET}
            emptyWellColor={EMPTY_WELL_COLOR}
            compoundToColorMap={compoundToColorMap}
          />
        );
      })}
    </StyledPlateContainer>
  );
};

export default PlateLayout;
