import React from "react";
import styled from "styled-components";
const StyledCombinationsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledCombinationsLabel = styled.label`
  margin-top: 5px;
`;
const StyledCombinations = styled.input`
  margin-top: 5px;
`;
const StyledCombinationsNames = styled.input`
  margin-top: 5px;
`;

const StyledCombinationsNamesLabel = styled.label`
  margin-top: 5px;
`;
const StyledCombinationsConc = styled.input`
  margin-top: 5px;
`;
const StyledCombinationsConcLabel = styled.label`
  margin-top: 5px;
`;
const StyledCombinationsConcName = styled.input`
  margin-top: 5px;
`;
const StyledCombinationsConcNameLabel = styled.label`
  margin-top: 5px;
`;
const CombinationForm = ({ handleInputChange, handleArrayChange }) => {
  return (
    <>
      <StyledCombinationsContainer>
        <StyledCombinationsLabel>Combinations:</StyledCombinationsLabel>
        <StyledCombinations
          type="number"
          name="combinations"
          onChange={handleInputChange}
        />
        <StyledCombinationsNamesLabel>
          Combination names:
        </StyledCombinationsNamesLabel>

        <StyledCombinationsNames
          type="text"
          name="combination_names"
          onChange={handleArrayChange}
        />
        <StyledCombinationsConcLabel>
          Combination concentrations:{" "}
        </StyledCombinationsConcLabel>
        <StyledCombinationsConc
          type="number"
          name="combination_concentrations"
          onChange={handleInputChange}
        />
        <StyledCombinationsConcNameLabel>
          Combination concentration names:
        </StyledCombinationsConcNameLabel>
        <StyledCombinationsConcName
          type="text"
          name="combination_concentration_names"
          onChange={handleArrayChange}
        />
      </StyledCombinationsContainer>
    </>
  );
};

export default CombinationForm;
