import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledSideBar = styled.nav`
  background-color: ${props => props.theme.backgroundColors.navbar};
  height: 100vh;
`;
const StyledLinkItem = styled.li`
  list-style: none;
`;

const activeClassName = "nav-item-active";
const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  color: ${props => props.theme.colors.navbarNormal};
  text-decoration: none;
  font-size: 22px;
  font-family: ${props => props.theme.fonts.secondary};
  font-weight: 300;

  &.${activeClassName} {
    color: ${props => props.theme.colors.navbarActive};
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
