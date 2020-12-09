import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledSideBar = styled.nav`
  background-color: #323439;
  height: 100vh;
  width: 22vh;
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
  font-weight: 300;

  &.${activeClassName} {
    color: #fafafa;
    font-weight: 400;
  }
`;

const StyledList = styled.ul`
  padding-top: 4rem;
  padding-left: 2rem;
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
