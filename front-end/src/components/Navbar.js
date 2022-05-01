import React from 'react';
import styled from 'styled-components';
import logo from "./../assets/logo.svg";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./../context";

const Navbar = () => {

  // fetch values from context
  const { user, logoutUser } = useGlobalContext();

  return (
    <Wrapper>
      <div className="nav-center">
        <Link to="/" className='home-link'>
          <img src={logo} alt="logo" className='logo' />
        </Link>
        {
          user && (
            <div className="nav-links">
              <p>hello, <span>{user?.name || "no-username"}</span></p>
              <button className="btn btn-small" onClick={() => {
                logoutUser();
              }}>
                logout
              </button>
            </div>
          )
        }
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  background: var(--white);
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .nav-center {
    width: var(--fluid-width);
    max-width: var(--max-width);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  .nav-links {
    display: flex;
    flex-direction: column;
  }
  .nav-links p {
    margin: 0px;
    text-transform: capitalize;
    margin-bottom: .25rem;
    span {
      font-weight: bold;
      letter-spacing: 1px;
    }
  }
  .home-link {
    display: flex;
    align-items: flex-end;
  }
  @media (min-width: 767px) {
    .nav-links {
      flex-direction: row;
      align-items: center;
    }
    .nav-links p {
      margin: 0px;
      margin-right: 1.5rem;
    }
  }
`

export default Navbar;