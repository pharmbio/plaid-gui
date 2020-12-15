import React, { useState } from "react";
import styled from "styled-components";


const StyledRowLabelContainer = styled.div`
  margin-top: 60px;
  margin-right: 24%;

`;
const StyledColLabelContainer = styled.div`
  margin-top: 50px;
  margin-right: 22%;

`;
const StyledLabel = styled.label`
  font-weight: bold;
  margin-left: 500px;

`;
const StyledInput = styled.input`
  width: 30%;
  height: 5%;
  margin-left: 500px;
`;

const StyledCheckboxLabel = styled.label`
  margin-top:30px;  
  margin-left: 500px;
  margin-right: 20.5%;
  font-weight: bold;  
`;
const StyledCheckbox = styled.input`
  margin-left: 500px;
  width: 20%;
`;
const StyledHorizontal = styled.input`
margin-left: 500px;
  width: 20%;
`;

const StyledHorizontalLabel = styled.label`
  margin-left: 500px;
`;
const StyledVerticalLabel = styled.label`
  margin-left: 500px;
`;

const StyledSelectContainer = styled.div`
  margin-top:100px;
  display: block;
`;
const StyledSelect = styled.select`
  display: block;
  margin-left: 700px;

`;
const StyledSizeLabel = styled.label`
  display: block;
  margin-left: 700px;

`;


const ExperimentForm = ({ handleInputChange }) => {

  const [customState, setCustomState] = useState(false)
  const [selectState, setSelectState] = useState({ value: '{num_row: 6, num_col: 8} ' })

  const displaySize = (event) => {
    setSelectState({ value: event.target.value })
    if (event.target.value === 'custom') {
      setCustomState(!customState)
    } else {
      handleInputChange(event);
      setCustomState(false)
    }
  }
  return (<>
    <StyledSelectContainer>
      <StyledSizeLabel> Select Plate Size</StyledSizeLabel>
      <StyledSelect name='select_plate_size' id='size_options' value={selectState.value} onChange={displaySize} onfocus='this.selectedIndex = 1;'>
        <option value='{"num_rows": 6, "num_cols": 8}'>48</option>
        <option value='{"num_rows": 8, "num_cols": 12}'>96</option>
        <option value='{"num_rows": 16, "num_cols": 24}'>384</option>
        <option value='{"num_rows": 32, "num_cols": 48}'>1536</option>
        <option value='{"num_rows": 48, "num_cols": 72}'>3456</option>
        <option value='custom'>Custom size</option>
      </StyledSelect>
    </StyledSelectContainer>

    {customState === true ? <><StyledRowLabelContainer>
      <StyledLabel> Plate rows  </StyledLabel>
    </StyledRowLabelContainer>
      <StyledInput type='number' id='num_rows' name='num_rows' onChange={handleInputChange} />
      <StyledColLabelContainer>
        <StyledLabel>Plate columns </StyledLabel>
      </StyledColLabelContainer>
      <StyledInput type="number" name='num_cols' onChange={handleInputChange} /> </> : null}
    {/* TODO: Create grid container around vertical and horizontal cell linse  */}
    <StyledCheckboxLabel>Cell line direction </StyledCheckboxLabel>
    <StyledVerticalLabel>Vertical    </StyledVerticalLabel>
    <StyledCheckbox
        name='vertical_cell_lines' type="number" onChange={handleInputChange}
      />
    <StyledHorizontalLabel>Horizontal    </StyledHorizontalLabel>
    <StyledHorizontal
      name='horizontal_cell_lines' type="number" onChange={handleInputChange}
    />
  </>
  )
}

export default ExperimentForm