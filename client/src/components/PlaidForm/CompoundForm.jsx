import React from 'react'
import styled from "styled-components";

const StyledCompoundsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 100px;
`;

const StyledCompoundsLabel = styled.label`
    margin-left:500px;
    margin-top: 50px;
`;
const StyledCompounds = styled.input`
    margin-left:500px; 
    width: 20%;
`;
const StyledCompoundsNames = styled.input`
    margin-left:500px;
    width: 35%;
`;

const StyledCompoundsNamesLabel = styled.label`
    margin-left:500px;
`;
const StyledCompoundsConc = styled.input`
    margin-left:500px;
    width: 20%;
`;
const StyledCompoundsConcLabel = styled.label`
    margin-left:500px;
    margin-top: 30px;
`;
const StyledCompoundsConcName = styled.input`
    margin-left:500px;
    width: 35%;
`;
const StyledCompoundsConcNameLabel = styled.label`
    margin-left:500px;
`;
const StyledCompoundsReplLabel = styled.label`
    margin-top: 30px;
    margin-left:500px;
`;
const StyledCompoundsRepl = styled.input`
    margin-left:500px;
    width: 20%;
`;


const CompoundForm = ({ handleInputChange, handleArrayChange }) => {
    return (<>
        <StyledCompoundsContainer>
            <StyledCompoundsLabel>Compounds: </StyledCompoundsLabel>
            <StyledCompounds type="number" name='compounds' onChange={handleInputChange} />
            <StyledCompoundsNamesLabel>Compound names: </StyledCompoundsNamesLabel>
            <StyledCompoundsNames type="text" name='compound_names' onChange={handleArrayChange} />
            <StyledCompoundsConcLabel>Compound concentrations: </StyledCompoundsConcLabel>
            <StyledCompoundsConc
                type="number" name='compound_concentrations' onChange={handleInputChange}
            />
            <StyledCompoundsConcNameLabel>Compound concentration names:</StyledCompoundsConcNameLabel>
            <StyledCompoundsConcName
                type="text" name='compound_concentration_names' onChange={handleArrayChange}
            />
            <StyledCompoundsReplLabel>Replicates  </StyledCompoundsReplLabel>
            <StyledCompoundsRepl
                type="number" name='replicates' onChange={handleInputChange}
            />
        </StyledCompoundsContainer>
    </>

    )
}

export default CompoundForm