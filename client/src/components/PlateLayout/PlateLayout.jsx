import React from "react";
import styled from "styled-components";
import Plate from "./Plate.jsx";
import randomColor from "./../../functions/randomColor.js";
import adjustColor from "./../../functions/adjustColor.js";

const concentrations = ["L", "M", "H"];
const L = 0;
const M = 1;
const H = 2;

const compare = (a, b) => {
  if (concentrations.includes(a.CONCuM) && concentrations.includes(b.CONCuM)) {
    a = concentrations.findIndex(a.CONCuM);
    b = concentrations.findIndex(b.CONCuM);
    if (a < b) {
      return 1;
    }
    if (a > b) {
      return -1;
    }
    return 0;
  } else {
    if (isNaN(a) && !isNaN(b)) {
      return 1;
    }
    if (!isNaN(a) && isNaN(b)) {
      return -1;
    }
    if (!isNaN(a) && !isNaN(b)) {
      if (parseFloat(a.CONCuM) < parseFloat(b.CONCuM)) {
        return 1;
      }
      if (parseFloat(a.CONCuM) < parseFloat(b.CONCuM)) {
        return -1;
      }
      return 0;
    }
    /*     a = isNaN(a.CONCuM) ? a.CONCuM : parseFloat(a.CONCuM);
    b = isNaN(b.CONCuM) ? b.CONCuM : parseFloat(b.CONCuM); */
    if (a.CONCuM < b.CONCuM) {
      return 1;
    }
    if (a.CONCuM > b.CONCuM) {
      return -1;
    }
    return 0;
  }
};

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
const DARKEN_LVL = 220;
const EMPTY_WELL_COLOR = "e9e9e9";

const assignColorToCompound = (
  o,
  compoundToColorMap,
  alreadyChosen,
  compoundCount
) => {
  if (compoundToColorMap.has(o.cmpdnum)) {
    /* We have already assigned color to that particular compound and its concentration */
    return;
  } else {
    let color;
    let val = compoundCount.get(o.cmpdname);
    console.log(val)
    if (val !== undefined) {
      compoundCount.set(o.cmpdname, [val[0], val[1] + 1]);
      color = adjustColor(val[0], 10 * (val[1] + 1));
      console.log(color)
      alreadyChosen.push(color);
      compoundToColorMap.set(o.cmpdnum, color);
    } else {
      color = randomColor(DARKEN_LVL);
      /* if color is already picked.. */
      while (alreadyChosen.includes(color)) {
        color = randomColor(DARKEN_LVL);
      }
      compoundCount.set(o.cmpdname, [color, 1]);
      alreadyChosen.push(color);
      compoundToColorMap.set(o.cmpdnum, color);
    }
  }
};

const StyledPlateContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: scroll;
`;
/* 
    CONCuM
    cmpdname
    cmpdnum
    plateID
    well
*/
const PlateLayout = (props) => {
  /* rowList, colList used to map over in the return as to render each component */
  /* SHOULD BE ABLE TO loop in REACT COMP WITHOUT HAVING TO DO THIS TRICK.... */
  let rowList = [];
  let colList = [];
  for (let i = 0; i < props.rows; i++) {
    rowList.push(i);
  }
  for (let i = 0; i < props.cols; i++) {
    colList.push(i);
  }
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
    plate.sort(compare);
    let compoundCount = new Map();
    plate.map((o) => {
      
      return assignColorToCompound(
        o,
        compoundToColorMap,
        chosenColors,
        compoundCount
      );
    });
  }

  return (
    <StyledPlateContainer>
      {plates.map((data, index) => {
        return (
          <Plate
            key={data[0].plateID}
            rowList={rowList}
            colList={colList}
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
