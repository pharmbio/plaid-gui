import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SideBar = styled.nav`
  background-color: #584b4f;
  height: 100vh;
`;
const LinkItem = styled.li`
  list-style: none;
`;
const NavLink = styled(Link)`
  color: #efeae1;
  text-decoration: none;
`;

const Navbar = () => {
  return (
    <SideBar>
      <ul>
        <LinkItem>
          <NavLink to="/">Home</NavLink>
        </LinkItem>
        <LinkItem>
          <NavLink to="/instructions">Instructions</NavLink>
        </LinkItem>
        <LinkItem>
          <NavLink to="/tool">Tool</NavLink>
        </LinkItem>
        <LinkItem>
          <NavLink to="/publications">Publications</NavLink>
        </LinkItem>
        <LinkItem>
          <NavLink to="/contact">Contact</NavLink>
        </LinkItem>
      </ul>
    </SideBar>
  );
};

export default Navbar;
