import React from "react";
import styled from "styled-components";


const StyledRowLabelContainer = styled.div`
  margin-top: 150px;
  margin-right: 24%;
`;
const StyledColLabelContainer = styled.div`
  margin-top: 50px;
  margin-right: 22%;
`;
const StyledLabel = styled.label`
  font-weight: bold;
`;
const StyledInput = styled.input`
  width: 30%;
  height: 5%;
  -moz-appearance: textfield;
`;

const StyledCheckboxContainer = styled.div`
  display: flex;
  justify-content: space-between; 
  flex-direction: row;
  margin-right: 18%;
  margin-top:10px;
`;
const StyledCheckboxLabel = styled.label`
  margin-top:30px;  
  margin-right: 20.5%;
  font-weight: bold;  
`;
const StyledCheckbox = styled.input`
  margin-right: 10px;
`;



const ExperimentForm = ({ handleInputChange }) => {
  return (<>
    <StyledRowLabelContainer>
      <StyledLabel for='num_rows'> Plate rows  </StyledLabel>
    </StyledRowLabelContainer>
    <StyledInput type='number' id='num_rows' name='num_rows' onChange={handleInputChange} />

    <StyledColLabelContainer>
      <StyledLabel>Plate columns </StyledLabel>
    </StyledColLabelContainer>
    <StyledInput type="number" name='num_cols' onChange={handleInputChange} />

    <StyledCheckboxLabel>Cell line direction </StyledCheckboxLabel>
    <StyledCheckboxContainer>
      <label>Vertical
    <StyledCheckbox
          name='vertical_cell_lines' type="checkbox" onChange={handleInputChange}
        />
      </label>
      <label>Horizontal
    <input
          name='horizontal_cell_lines' type="checkbox" onChange={handleInputChange}
        />
      </label>
    </StyledCheckboxContainer>
  </>
  )

}

export default ExperimentForm