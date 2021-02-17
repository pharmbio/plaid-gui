import React from "react";
import styled from "styled-components";
import { BiRightArrowAlt } from "react-icons/bi";

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

const NextButton = (props) => {
  return (
    <StyledButton
      title={"Next"}
      type="button"
      onClick={props.onClick}
    >
    <BiRightArrowAlt size={28} />
    </StyledButton>
  );
};

export default NextButton;
