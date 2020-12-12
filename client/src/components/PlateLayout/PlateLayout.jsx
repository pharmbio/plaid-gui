import React from "react";
import styled from "styled-components";
import Plate from "./Plate.jsx";
import generateHslHues from "./../../functions/generateHslHues.js";

const concentrationsLabels = ["L", "M", "H"];

const compare = (a, b) => {
  //console.log(a, b);
  if (
    concentrationsLabels.includes(a.CONCuM) &&
    concentrationsLabels.includes(b.CONCuM)
  ) {
    a = concentrationsLabels.findIndex(a.CONCuM);
    b = concentrationsLabels.findIndex(b.CONCuM);
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

const EMPTY_WELL_COLOR = "#e9e9e9";

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
          ? /*  */
            `hsla(${hue},${95}%,${41}%,0.74)`
          : `hsla(${hue},${100}%,${57 + i * 4}%,0.90)`
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

const PlateLayout = (props) => {
  /* rowList, colList used to map over in the return as to render each component */
  /* There is no way to use a loop in JSX hence this "hack"*/
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

  let listOfCompoundMaps = [];
  for (let plate of plates) {
    let compoundMap = new Map();
    for (let o of plate) {
      let val = compoundMap.get(o.cmpdname);
      if (val !== undefined) {
        compoundMap.set(o.cmpdname, [...val, o]);
      } else {
        compoundMap.set(o.cmpdname, [o]);
      }
    }

    for (let [cmp, vals] of compoundMap) {
      /* sort descending order */
      vals.sort(compare);
      compoundMap.set(cmp, vals);
    }
    listOfCompoundMaps.push(compoundMap);
  }

  let listOfCompoundToColorMaps = [];
  for (let compoundMap of listOfCompoundMaps) {
    let compoundToColorMap = new Map();
    let colors = generateHslHues(compoundMap.size);
    let i = 0;
    for (let entry of compoundMap) {
      assignColorToCompound(entry[1], colors[i], compoundToColorMap);
      i++;
    }
    listOfCompoundToColorMaps.push(compoundToColorMap);
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
            compoundMap={listOfCompoundMaps[index]}
            compoundToColorMap={listOfCompoundToColorMaps[index]}
          />
        );
      })}
    </StyledPlateContainer>
  );
};

export default PlateLayout;
