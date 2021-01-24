import React from "react";
import styled from "styled-components";

const StyledNumberFieldContainer = styled.div`
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

const StyledNumberField = styled.input`
  max-width: 80px;
  height: 30px;
  padding-left: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: red;
  font-family: ${(props) => props.theme.fonts.secondary};
`;

const InputNumber = (props) => {
  return (
    <StyledNumberFieldContainer>
      <StyledLabel for={props.name}>{props.label}</StyledLabel>
      <StyledNumberField
        id={props.name}
        name={props.name}
        type="number"
        onChange={props.onChange}
        value={props.value}
        onBlur={props.onBlur}
      />
      <StyledErrorMessage>{props.errorMsg}</StyledErrorMessage>
    </StyledNumberFieldContainer>
  );
};

export default InputNumber;
