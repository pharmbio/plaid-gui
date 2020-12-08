import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledSideBar = styled.nav`
  background-color: #323439;
  height: 100vh;
`;
const StyledLinkItem = styled.li`
  list-style: none;
`;

const activeClassName = "nav-item-active";

const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  color: #c3c3c3;
  text-decoration: none;
  font-size: 22px;
  font-family: "Lato", sans-serif;
  font-weight: 200;

  &.${activeClassName} {
    color: #fafafa;
  }
`;

const StyledList = styled.ul`
  padding-top: 10vh;
  padding-left: 5vh;
  height: inherit;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Navbar = () => {
  return (
    <StyledSideBar>
      <StyledList>
        <StyledLinkItem>
          <StyledNavLink to="/" exact={true}>
            Home
          </StyledNavLink>
        </StyledLinkItem>
        <StyledLinkItem>
          <StyledNavLink to="/instructions">Instructions</StyledNavLink>
        </StyledLinkItem>
        <StyledLinkItem>
          <StyledNavLink to="/tool">Tool</StyledNavLink>
        </StyledLinkItem>
        <StyledLinkItem>
          <StyledNavLink to="/publications">Publications</StyledNavLink>
        </StyledLinkItem>
        <StyledLinkItem>
          <StyledNavLink to="/contact">Contact</StyledNavLink>
        </StyledLinkItem>
      </StyledList>
    </StyledSideBar>
  );
};

export default Navbar;
