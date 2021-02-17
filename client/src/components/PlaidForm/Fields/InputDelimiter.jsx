import React from "react";
import styled from "styled-components";

const StyledDelimiterFieldContainer = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  font-family: ${(props) => props.theme.fonts.primary};
  font-size: 14px;
  margin-bottom: 2.5px;
`;

const StyledInput = styled.input`
  width: 80px;
  padding: 10px;
  &:focus {
    outline: none;
  }
  font-family: ${(props) => props.theme.fonts.secondary};
  font-size: 14px;
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: red;
  font-family: ${(props) => props.theme.fonts.secondary};
`;

const DEFAULT_DELIMITER = ",";

const InputDelimiter = (props) => {
  const [value, setValue] = React.useState(
    props.delimiter || DEFAULT_DELIMITER
  );
  const handleChange = (event) => {
    setValue(event.target.value);
    props.onChange(event.target.value);
  };
  return (
    <StyledDelimiterFieldContainer>
      <StyledLabel htmlFor={props.name}>{props.label}</StyledLabel>
      <StyledInput
        type="text"
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
        value={value}
        disable={props.disable}
        onChange={handleChange}
      />
      <StyledErrorMessage>{props.errorMsg}</StyledErrorMessage>
    </StyledDelimiterFieldContainer>
  );
};

export default InputDelimiter;
