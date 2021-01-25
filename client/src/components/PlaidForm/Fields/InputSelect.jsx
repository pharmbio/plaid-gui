import React from "react";
import styled from "styled-components";

const StyledNumberFieldContainer = styled.div`
  margin: 5px;
  margin-left: 0px;
  display: flex;
  flex-direction: row;
`;

const StyledLabel = styled.label`
  font-family: ${(props) => props.theme.fonts.primary};
  font-size: 14px;
  margin-bottom: 2.5px;
  margin-right: 5px;
`;

const StyledSelectField = styled.select`
  max-width: 80px;
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: red;
  font-family: ${(props) => props.theme.fonts.secondary};
`;

const InputSelect = (props) => {
  return (
    <StyledNumberFieldContainer>
      <StyledLabel  htmlFor={props.name}>{props.label}</StyledLabel>
      <StyledSelectField
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        onFocus={props.onFocus}
      >
        {props.children}
      </StyledSelectField>
      <StyledErrorMessage>{props.errorMsg}</StyledErrorMessage>
    </StyledNumberFieldContainer>
  );
};

export default InputSelect;
