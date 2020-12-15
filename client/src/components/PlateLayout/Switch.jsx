import React from "react";
import styled from "styled-components";

const StyledSwitchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-family: "Lato", sans-serif;
  margin-top: 40px;
  font-size: 12px;
`;

const StyledSwitch = styled.div`
  cursor: pointer;
  margin-right: 10px;
  color: rgba(0, 0, 0, 0.6);

  ${(props) =>
    props.active &&
    `
    color: black;`}
`;

const StyledLabel = styled.span`
  margin-right: 10px;
  `;

const Switch = (props) => {
  const [active, setActive] = React.useState("none");
  const handleClick = (e) => {
    e.preventDefault();
    let activated = e.currentTarget.id === active ? "none" : e.currentTarget.id;
    setActive(activated);
    props.handleDisplay(activated);
  };
  return (
    <StyledSwitchWrapper>
      <StyledLabel>TOGGLE:</StyledLabel>
      <StyledSwitch
        active={active === "none"}
        id={"none"}
        onClick={handleClick}
      >
        None
      </StyledSwitch>
      <StyledSwitch
        active={active === "compound"}
        id={"compound"}
        onClick={handleClick}
      >
        Compound
      </StyledSwitch>
      <StyledSwitch
        active={active === "concentration"}
        id={"concentration"}
        onClick={handleClick}
      >
        Concentration
      </StyledSwitch>
    </StyledSwitchWrapper>
  );
};

export default Switch;
