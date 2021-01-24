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
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: red;
  font-family: ${(props) => props.theme.fonts.secondary};
`;

const InputTextArea = (props) => {
  return (
    <StyledTextAreaFieldContainer>
      <StyledLabel for={props.name}>{props.label}</StyledLabel>
      <StyledTextArea
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
        // value={props.value} needed??
        onChange={props.onChange}
        disabled={props.disable} //true or false..
      />
      <StyledErrorMessage>{props.errorMsg}</StyledErrorMessage>
    </StyledTextAreaFieldContainer>
  );
};

export default InputTextArea;
