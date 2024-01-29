import React, { useEffect, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import SearchBar from "./SearchBar"; // Make sure the path to SearchBar is correct

const Header = () => {
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const user = JSON.parse(localStorage.getItem('user'));
  const toggle = () => setIsOpen(!isOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    // You can define what happens when the search is submitted
    console.log(searchQuery); // For example, logging the query to the console
    // Navigate to the search page or trigger the search action
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    // Redirect to login page or homepage after logout
  };

  useEffect(() => {
    // Perform any logout logic here if needed when isAuthenticated becomes false
    if (!isAuthenticated) {
      handleLogout();
    }
  }, [isAuthenticated]);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">RecipeApp</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            
            {isAuthenticated ? (
              <>
                {/* Profile and Logout links */}
                <NavItem>
                <NavLink href={`/profile/${user.id}`}>Profile</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/logout/" onClick={handleLogout}>
                    Logout
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
