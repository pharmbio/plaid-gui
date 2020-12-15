import React, { useState } from "react";
import styled from "styled-components";

const StyledCheckboxContainer = styled.div`

  margin-right: 19.5%;
  margin-top:10px;
  margin-left: 500px;

`;
const StyledCheckboxLabel = styled.label`
  margin-top:30px;  
  margin-right: 23%;
  font-weight: bold;  
  margin-left: 500px;
`;

const StyledColLabelContainer = styled.div`
  margin-top: 20px;
  margin-right: 19%;
  margin-left: 500px;

`;
const StyledInput = styled.input`
  width: 30%;
  height: 5%;
  margin-left: 500px;
  color: ${(props) => props.disabled ? 'blue' : 'red'}
`;
const ConstraintForm = ({ handleInputChange }) => {
  const [emptyState, setEmptyState] = useState(false);

  function handleInput(event){
    setEmptyState(!emptyState);
    handleInputChange(event);
  }

  return (<>
    <StyledCheckboxLabel>
      Constraints
        </StyledCheckboxLabel>
    <StyledCheckboxContainer>
      <label> Allow empty wells
            <input
          name='allow_empty_wells' type="checkbox" onChange={(event) => handleInput(event)}
        />
      </label>
    </StyledCheckboxContainer>
    <StyledColLabelContainer>
      Size of empty edges:
        </StyledColLabelContainer>
    <StyledInput type="number" name='size_empty_edge' onChange={handleInputChange} disabled={emptyState} inactive={emptyState ? false : true} />
  </>
  )

}

export default ConstraintForm