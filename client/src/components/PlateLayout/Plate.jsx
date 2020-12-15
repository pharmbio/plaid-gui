import React from "react";
import styled from "styled-components";
import Well from "./Well.jsx";
import ColorLegend from "./ColorLegend.jsx";
import Switch from "./Switch.jsx";

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
const Plate = (props) => {
  const WELL_RAD = 40;

  const [selectedCompound, setSelectedCompound] = React.useState("");
  const handleSelectedCompound = (selected) => {
    if (selected === selectedCompound) {
      setSelectedCompound("");
    } else {
      setSelectedCompound(selected);
    }
  };

  const [display, setDisplay] = React.useState("none");
  const handleDisplay = (selected) => {
    if (selected === display) {
      setDisplay("none");
    } else {
      setDisplay(selected);
    }
  };

  let emptyWells = [];

  for (let i = 1; i <= props.rows; i++) {
    for (let j = 1; j <= props.cols; j++) {
      emptyWells.push([i,j]);
      
    }
  }


  return (
    <StyledResultLayoutContainer>
      <StyledPlateWrapper
        rows={props.rows}
        cols={props.cols}
        wellRad={WELL_RAD}
        gap={2.5}
      >
        {props.rowList.map((i) => {
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
        {props.colList.map((i) => {
          return React.createElement(
            StyledColumnIdentifier,
            /* will there ever be the case where data[0] is undefined? */
            { key: i + 1 + props.data[0].plateID, row: 1, col: i + 2 },
            i + 1
          );
        })}
        <StyledPlate
          rows={props.rows}
          cols={props.cols}
          wellRad={WELL_RAD}
          gap={2.5}
        >
          {emptyWells.map((pos) => {
            // Fill whole plate with empty wells first
            return (
              <Well
                empty={true}
                row={pos[0]}
                col={pos[1]}
                key={props.alphabet[pos[0]-1] + pos[1]}
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
                wellRad={WELL_RAD}
                display={display}
                row={row}
                col={col}
                key={o.plateID + o.well}
                data={o}
                color={props.compoundToColorMap.get(o.cmpdnum)}
              />
            );
          })}
        </StyledPlate>
      </StyledPlateWrapper>
      <ColorLegend
        emptyEdges={props.emptyEdges}
        emptyWellColor={props.emptyWellColor}
        data={props.data}
        compoundMap={props.compoundMap}
        compoundToColorMap={props.compoundToColorMap}
        handleSelectedCompound={handleSelectedCompound}
      >
        <Switch handleDisplay={handleDisplay} />
      </ColorLegend>
    </StyledResultLayoutContainer>
  );
};

export default Plate;
