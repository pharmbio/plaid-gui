import React from "react";
import styled from "styled-components";
/* import { BiRightArrowAlt } from "react-icons/bi"; */

const StyledButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 10px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  margin: 15px;
  border-radius: 7px;
  border: 1px solid #ccc;
  &:hover {
    outline: none;
    border: 1px solid #5096ff;
  }
`;

const NextButton = (props) => {
  return (
    <StyledButton title={props.title} type="button" onClick={props.onClick}>
      {props.children}
    </StyledButton>
  );
};

export default NextButton;
