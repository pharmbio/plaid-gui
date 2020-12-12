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
  //console.log(a, b);
  if (concentrations.includes(a.CONCuM) && concentrations.includes(b.CONCuM)) {
    a = concentrations.findIndex(a.CONCuM);
    b = concentrations.findIndex(b.CONCuM);
    if (a < b) {
      //console.log("a < b 1");
      return 1;
    }
    if (a > b) {
      //console.log("a > b 1");
      return -1;
    }
    return 0;
  } else {
    if (isNaN(a.CONCuM) && !isNaN(b.CONCuM)) {
      return 1;
    }
    if (!isNaN(a.CONCuM) && isNaN(b.CONCuM)) {
      return -1;
    }
    if (!isNaN(a.CONCuM) && !isNaN(b.CONCuM)) {
      if (parseFloat(a.CONCuM) < parseFloat(b.CONCuM)) {
        //console.log("a < b 2");
        return 1;
      }
      if (parseFloat(a.CONCuM) < parseFloat(b.CONCuM)) {
        //console.log("a > b 2");
        return -1;
      }
      return 0;
    }
    /*     a = isNaN(a.CONCuM) ? a.CONCuM : parseFloat(a.CONCuM);
    b = isNaN(b.CONCuM) ? b.CONCuM : parseFloat(b.CONCuM); */
    if (a.CONCuM < b.CONCuM) {
      //console.log("a < b 3");
      return 1;
    }
    if (a.CONCuM > b.CONCuM) {
      //console.log("a > b 3");
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

function generateHslHues(amount) {
  let colors = [];
  let huedelta = Math.trunc(360 / amount);

  for (let i = 0; i < amount; i++) {
    let hue = i * huedelta;
    colors.push(hue);
    /* colors.push(`hsl(${hue},${saturation}%,${lightness}%,)`); */
  }
  return colors;
}

// lower level is darker.
const DARKEN_LVL = 140;
const EMPTY_WELL_COLOR = "e9e9e9";

const assignColorToCompound = (concs, hue, compoundToColorMap) => {
  let i = 0;
  for (let o of concs) {
    /* concs are sorted */
    if (compoundToColorMap.has(o.cmpdnum)) {
      /* We have already assigned color to that particular compound and its concentration */
      continue;
    } else {
      compoundToColorMap.set(
        o.cmpdnum,
        i === 0
          ? `hsla(${hue},${100}%,${48}%,0.9)`
          : `hsla(${hue},${70 - i * 3}%,${50 + i * 4}%,1)`
      );
      i++;
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

  let l = [];
  for (let plate of plates) {
    let plateMap = new Map();
    for (let o of plate) {
      let val = plateMap.get(o.cmpdname);
      if (val !== undefined) {
        plateMap.set(o.cmpdname, [...val, o]);
      } else {
        plateMap.set(o.cmpdname, [o]);
      }
    }

    for (let [cmp, vals] of plateMap) {
      /* sort descending order */
      vals.sort(compare);
      plateMap.set(cmp, vals);
    }
    l.push(plateMap);
  }

  let compoundToColorMap = new Map();
  for (let pm of l) {
    let colors = generateHslHues(pm.size);
    let i = 0;
    for (let [name, concs] of pm) {
      assignColorToCompound(concs, colors[i], compoundToColorMap);
      i++;
    }
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
