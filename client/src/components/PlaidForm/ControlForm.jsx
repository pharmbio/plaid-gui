import React from 'react'
import styled from "styled-components";
const StyledControlContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 100px;
`;

const StyledControlLabel = styled.label`
    margin-left:500px;
    margin-top: 50px;
`;
const StyledControl = styled.input`
    margin-left:500px; 
    width: 20%;
`;
const StyledControlNames = styled.input`
    margin-left:500px;
    width: 35%;
`;

const StyledControlNamesLabel = styled.label`
    margin-left:500px;
`;
const StyledControlConc = styled.input`
    margin-left:500px;
    width: 20%;
`;
const StyledControlConcLabel = styled.label`
    margin-left:500px;
    margin-top: 30px;
`;
const StyledControlConcName = styled.input`
    margin-left:500px;
    width: 35%;
`;
const StyledControlConcNameLabel = styled.label`
    margin-left:500px;
`;
const StyledControlReplLabel = styled.label`
    margin-top: 30px;
    margin-left:500px;
`;
const StyledControlRepl = styled.input`
    margin-left:500px;
    width: 20%;
`;
const StyledControlBlanksLabel = styled.label`
    margin-left:500px;
`;
const StyledControlBlanks = styled.input`
    margin-left:500px;
    width: 20%;
`;
const StyledControlBlanksNameLabel = styled.label`
    margin-left:500px;
`;
const StyledControlBlanksName = styled.input`
    margin-left:500px;
    width: 20%;
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