import React from "react";
import styled from "styled-components";
import { BiLeftArrowAlt } from "react-icons/bi";

const StyledButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  margin:15px;
`;

const PrevButton = (props) => {
  return (
    <StyledButton title={"Previous"} type="button" onClick={props.onClick}>
      <BiLeftArrowAlt size={28} />
    </StyledButton>
  );
};

export default PrevButton;
