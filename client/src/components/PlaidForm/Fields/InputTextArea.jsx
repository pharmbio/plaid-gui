import React from "react";
import styled from "styled-components";

const StyledTextAreaFieldContainer = styled.div`
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

const StyledTextArea = styled.textarea`
  min-width: 180px;
  max-width: 400px;
  min-height: 120px;
  max-height: 500px;
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

const InputTextArea = (props) => {
  const [value, setValue] = React.useState(props.value);

  const handleChange = (event) => {
    setValue(event.target.value);
    props.onChange(event);
  };

  return (
    <StyledTextAreaFieldContainer>
      <StyledLabel htmlFor={props.name}>{props.label}</StyledLabel>
      <StyledTextArea
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
        onChange={handleChange}
        disabled={props.disable} //true or false..
        value={value}
      />
      <StyledErrorMessage>{props.errorMsg}</StyledErrorMessage>
    </StyledTextAreaFieldContainer>
  );
};

export default InputTextArea;
