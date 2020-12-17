import React from 'react'
import styled from "styled-components";
const StyledCombinationsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 100px;
`;

const StyledCombinationsLabel = styled.label`
    margin-left:500px;
    margin-top: 50px;
`;
const StyledCombinations = styled.input`
    margin-left:500px; 
    width: 20%;
`;
const StyledCombinationsNames = styled.input`
    margin-left:500px;
    width: 35%;
`;

const StyledCombinationsNamesLabel = styled.label`
    margin-left:500px;
`;
const StyledCombinationsConc = styled.input`
    margin-left:500px;
    width: 20%;
`;
const StyledCombinationsConcLabel = styled.label`
    margin-left:500px;
    margin-top: 30px;
`;
const StyledCombinationsConcName = styled.input`
    margin-left:500px;
    width: 35%;
`;
const StyledCombinationsConcNameLabel = styled.label`
    margin-left:500px;
`;
const CombinationForm = ({ handleInputChange, handleArrayChange }) => {
    return (<>
        <StyledCombinationsContainer>
            <StyledCombinationsLabel>Combinations:</StyledCombinationsLabel>
            <StyledCombinations type="number" name='combinations' onChange={handleInputChange} />
            <StyledCombinationsNamesLabel>Combination names:</StyledCombinationsNamesLabel>

            <StyledCombinationsNames type="text" name='combination_names' onChange={handleArrayChange} />
            <StyledCombinationsConcLabel>Combination concentrations: </StyledCombinationsConcLabel>
            <StyledCombinationsConc
                type="number" name='combination_concentrations' onChange={handleInputChange}
            />
            <StyledCombinationsConcNameLabel>Combination concentration names:</StyledCombinationsConcNameLabel>
            <StyledCombinationsConcName
                type="text" name='combination_concentration_names' onChange={handleArrayChange}
            />

        </StyledCombinationsContainer>
    </>
    )
}

export default CombinationForm