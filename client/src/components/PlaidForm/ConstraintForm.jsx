import React from "react";
import styled from "styled-components";

const StyledCheckboxContainer = styled.div`

  margin-right: 19.5%;
  margin-top:10px;
  
`;
const StyledCheckboxLabel = styled.label`
  margin-top:30px;  
  margin-right: 23%;
  font-weight: bold;  
`;
const StyledInnerLabel = styled.label`
  margin-right: 21%;
`;
const StyledColLabelContainer = styled.div`
  margin-top: 20px;
  margin-right: 19%;
`;
const StyledInput = styled.input`
  width: 30%;
  height: 5%;
  -moz-appearance: textfield;
`;
const ConstraintForm = ({ handleInputChange }) => {
    return (<>
        <StyledCheckboxLabel>
            Constraints
        </StyledCheckboxLabel>
        <StyledCheckboxContainer>
            <label> Allow empty wells
            <input
                    name='allow_empty_wells' type="checkbox" onChange={handleInputChange}
                />
            </label>
        </StyledCheckboxContainer>
        <StyledColLabelContainer>
            Size of empty edges:
        </StyledColLabelContainer>
        <StyledInput type="number" name='size_empty_edge' onChange={handleInputChange} />
    </>
    )

}

export default ConstraintForm