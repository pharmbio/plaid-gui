import React from "react";
import styled from "styled-components";

const StyledFormPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormPage = (props) => {
  return <StyledFormPageContainer>
      {props.children}
  </StyledFormPageContainer>;
};

export default FormPage;