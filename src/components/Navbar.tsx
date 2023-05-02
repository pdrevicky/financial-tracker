import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import styled from "@emotion/styled";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <NavbarContainer>
      <ul>
        <Title>myMoneyApp</Title>

        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
        {user && (
          <>
            <li>Hello, {user.displayName}</li>
            <li>
              <button className="btn" onClick={logout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </NavbarContainer>
  );
}

const NavbarContainer = styled.nav`
  width: 100%;
  background: #effaf0;
  padding: 20px 10px;
  box-sizing: border-box;
  ul {
    display: flex;
    margin: 0 auto;
    max-width: 960px;
    align-items: center;
  }
  button,
  a {
    margin-left: 16px;
  }
  a {
    color: #333;
    text-decoration: none;
  }
`;

const Title = styled.li`
  margin-right: auto;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 1.2em;
`;
