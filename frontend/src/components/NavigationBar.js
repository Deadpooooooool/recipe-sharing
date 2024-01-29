import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const NavigationBar = () => {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">RecipeApp</NavbarBrand>
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink href="/recipes">Recipes</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/profile">Profile</NavLink>
        </NavItem>
        {/* Add more NavItems for additional navigation links */}
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
