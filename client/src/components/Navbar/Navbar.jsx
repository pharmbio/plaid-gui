import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledSideBar = styled.nav`
  background-color: #584b4f;
  height: 100vh;
`;
const StyledLinkItem = styled.li`
  list-style: none;
`;
const StyledNavLink = styled(Link)`
  color: #efeae1;
  text-decoration: none;
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Navbar = () => {
  return (
    <StyledSideBar>
      <StyledList>
        <StyledLinkItem>
          <StyledNavLink to="/">Home</StyledNavLink>
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
