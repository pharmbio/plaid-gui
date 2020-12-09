import React from "react";
import styled from "styled-components";

const StyledHighlightedWrapper = styled.section`
  background-color: rgba(255, 229, 100, 0.3);
  border-left-color: #ffe564;
  border-left-width: 9px;
  border-left-style: solid;
  padding: 20px 45px 20px 26px;
  margin: 20px;
  font-family: "Lato", sans-serif;
`;

const StyledTitle = styled.h4`
  font-weight: 700;
  margin-bottom: 5px;
  font-family: "Roboto", sans-serif;
`;

const HighlightedParagraph = (props) => {
  return (
    <StyledHighlightedWrapper>
      <StyledTitle>{props.title}</StyledTitle>
      {props.children}
    </StyledHighlightedWrapper>
  );
};

export default HighlightedParagraph;
