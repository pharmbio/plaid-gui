import React from "react";
import styled from "styled-components";
import Plate from "./Plate.jsx";
import generateHslHues from "./../../functions/generateHslHues.js";
import { compareConcum } from "./../../functions/compareConcum.js";
import DownloadButton from "./DownloadButton";
import findCombinations from "./../../functions/findCombinations.js";

/* Styling of the main container of this component */
const StyledPlateContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: scroll;
`;

const StyledDownloadButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:center;
`;

/* 
  Assign hsla colors to compound depending on concentration (conc)
  Each compound has the same base color -> different conc level means different shade
*/
const assignColorToCompound = (concs, hue, compoundToColorMap, cmpname) => {
  let i = 0;
  for (let o of concs) {
    const combinations = findCombinations(o.cmpdname);
    let compdnum = o.cmpdnum;
    if(combinations){
      // assuming that cmpdname and concum is always separated with a '_'
      compdnum = cmpname+"_"+o.CONCuM;

    }
    /* concs are sorted high to low */
    if (compoundToColorMap.has(compdnum)) {
      /* We have already assigned color to that particular compound and its concentration */
      continue;
    } else {
      compoundToColorMap.set(
        compdnum,
        i === 0
          ? /*  tweak colors here if needed */
          `hsla(${hue},${70}%,${40}%,0.84)`
          : `hsla(${hue},${100}%,${40 + (i / 2) * 5}%,0.90)`
      );
      i++;
    }
  }
};


/**
 * Renders the container that holds the (or all) resulting plates.
 *
 * @param props.data contains the output from the minizinc model
 * @param props.rows the amount of rows specified in the form
 * @param props.cols the amount of cols specified in the form
 * @param props.sizeEmptyEdge the amount of empty edges in the plate specified in the form
 */
const PlateLayout = (props) => {

  /* rowList, colList used to map over in the return as to render each component */
  /* There is no way to use a loop in JSX hence this "hack" */
  let rowList = [];
  let colList = [];
  for (let i = 0; i < props.rows; i++) {
    rowList.push(i);
  }
  for (let i = 0; i < props.cols; i++) {
    colList.push(i);
  }
  // separate compounds into corresponding plate
  let plates = {};
  for (let i = 0; i < props.data.length; i++) {
    if (plates[props.data[i].plateID]) {
      plates[props.data[i].plateID] = [
        ...plates[props.data[i].plateID],
        props.data[i],
      ];
    } else {
      plates[props.data[i].plateID] = [props.data[i]];
    }
  }
  plates = Object.values(plates);


  let listOfCompoundMaps = [];
  for (let plate of plates) {
    let compoundMap = new Map();
    /* map each compound name to all its corresponding concentrations */
    for (let o of plate) {
      let combinations = findCombinations(o.cmpdname);
      if(combinations){
        for(let comp of combinations){
          let val = compoundMap.get(comp);
          if (val !== undefined) {
            compoundMap.set(comp, [...val, o]);
          } else {
            compoundMap.set(comp, [o]);
          }
        }
      }
      let val = compoundMap.get(o.cmpdname);
      if (val !== undefined) {
        compoundMap.set(o.cmpdname, [...val, o]);
      } else {
        compoundMap.set(o.cmpdname, [o]);
      }
    }

    /* sort each compound from high to low concentration */
    for (let [cmp, vals] of compoundMap) {
      vals.sort(compareConcum);
      compoundMap.set(cmp, vals);
    }
    listOfCompoundMaps.push(compoundMap);
  }

  let listOfCompoundToColorMaps = [];
  /* Assign color for each compound */
  for (let compoundMap of listOfCompoundMaps) {
    let compoundToColorMap = new Map();

    let colors = generateHslHues(compoundMap.size-1);
    let i = 0;
    for (let entry of compoundMap) {
      if(findCombinations(entry[0]) === null){
        assignColorToCompound(entry[1], colors[i], compoundToColorMap, entry[0]);
        i++;
      }
    }
    listOfCompoundToColorMaps.push(compoundToColorMap);
  }
  return (
    <StyledPlateContainer>
      <StyledDownloadButtonContainer>
        <DownloadButton plates={plates} type={"csv"} />
        <DownloadButton
          plates={plates}
          data={props.data}
          rows={props.rows}
          cols={props.cols}
          sizeEmptyEdge={props.sizeEmptyEdge}
          type={"json"}
        />
      </StyledDownloadButtonContainer>
      {plates.map((data, index) => {
        return (
          <Plate
            key={data[0].plateID}
            rowList={rowList}
            colList={colList}
            rows={props.rows}
            cols={props.cols}
            data={data}
            plates={plates}
            compoundMap={listOfCompoundMaps[index]}
            compoundToColorMap={listOfCompoundToColorMaps[index]}
          />
        );
      })}
    </StyledPlateContainer>
  );
};

export default PlateLayout;
