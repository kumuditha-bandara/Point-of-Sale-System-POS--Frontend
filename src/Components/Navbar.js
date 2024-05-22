import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../Authentication/AuthProvider';

const NavContainer = styled.nav`
  background-color: rgba(255, 255, 255, 0.8); /* Glass white */
  padding: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Shadow */
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
`;

const NavItem = styled.li`
  margin: 0 15px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #555; /* Dark grey color */
  font-size: 18px;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #EA4335; /* Medium red color */
    color: #fff; /* White color */
  }
`;

const LogoutButton = styled.button`
  text-decoration: none;
  color: #555; /* Dark grey color */
  font-size: 18px;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #EA4335; /* Medium red color */
    color: #fff; /* White color */
  }
`;

const Navbar = () => {
    const { logout } = useContext(AuthContext);
    return (
        <NavContainer>
            <NavList>
                <NavItem>
                    <NavLink to="/dashboard">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/items">Items</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/categories">Categories</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/stock">Stock</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/register">Register</NavLink>
                </NavItem>
                <NavItem>
                    <LogoutButton onClick={logout}>Logout</LogoutButton>
                </NavItem>
            </NavList>
        </NavContainer>
    );
};

export default Navbar;
