import React from 'react'
import styled from "styled-components";
const StyledControlContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledControlLabel = styled.label`
  margin-top: 5px;
`;
const StyledControl = styled.input`
  margin-top: 5px;
`;
const StyledControlNames = styled.input`
  margin-top: 5px;
`;

const StyledControlNamesLabel = styled.label`
  margin-top: 5px;
`;
const StyledControlConc = styled.input`
  margin-top: 5px;
`;
const StyledControlConcLabel = styled.label`
  margin-top: 5px;
`;
const StyledControlConcName = styled.input`
  margin-top: 5px;
`;
const StyledControlConcNameLabel = styled.label`
  margin-top: 5px;
`;
const StyledControlReplLabel = styled.label`
  margin-top: 5px;
`;
const StyledControlRepl = styled.input`
  margin-top: 5px;
`;
const StyledControlBlanksLabel = styled.label`
  margin-top: 5px;
`;
const StyledControlBlanks = styled.input`
  margin-top: 5px;
`;
const StyledControlBlanksNameLabel = styled.label`
  margin-top: 5px;
`;
const StyledControlBlanksName = styled.input`
  margin-top: 5px;

`;
const ControlForm = ({ handleInputChange, handleArrayChange }) => {
    return (<>
        <StyledControlContainer>
            <StyledControlLabel>Number of controls:</StyledControlLabel>
            <StyledControl type="number" name='num_controls' onChange={handleInputChange} />

            <StyledControlNamesLabel>Control names:</StyledControlNamesLabel>
            <StyledControlNames
                type="text" name='control_names' onChange={handleArrayChange}
            />
            <StyledControlConcLabel>Control concentrations: </StyledControlConcLabel>
            <StyledControlConc type="number" name='control_concentrations' onChange={handleInputChange} />
            <StyledControlConcNameLabel>Control concentration names: </StyledControlConcNameLabel>
            <StyledControlConcName
                type="text" name='control_concentration_names' onChange={handleArrayChange}
            />
            <StyledControlReplLabel>Control replicates:  </StyledControlReplLabel>
            <StyledControlRepl
                type="text" name='control_replicates' onChange={handleArrayChange}
            />
            <StyledControlBlanksLabel>Blanks: </StyledControlBlanksLabel>
            <StyledControlBlanks
                type="number" name='blanks' onChange={handleInputChange}
            />

            <StyledControlBlanksNameLabel>Blanks names:  </StyledControlBlanksNameLabel>
            <StyledControlBlanksName
                type="text" name='blanks_names' onChange={handleInputChange}
            />
        </StyledControlContainer>
    </>
    )
}

export default ControlForm