import React from "react";
import NextButton from "../../Buttons/NextButton";
import PrevButton from "../../Buttons/PrevButton";
import styled from "styled-components";

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 10px;
`;

const FormButtons = ({ submit, onClickNext, onClickPrev, step, title }) => {
  return (
    <StyledButtonContainer>
      {step > 0 ? (
        <PrevButton
          title={title ? title : "Previous form page"}
          onClick={onClickPrev}
        >
          PREVIOUS
        </PrevButton>
      ) : null}
      {step < 3 ? (
        <NextButton title={"Next form page"} onClick={onClickNext}>
          NEXT
        </NextButton>
      ) : null}
      {submit ? (
        <NextButton title={"Submit form"} onClick={onClickNext}>
          SUBMIT
        </NextButton>
      ) : null}
    </StyledButtonContainer>
  );
};

export default FormButtons;
