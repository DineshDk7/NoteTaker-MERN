import React from 'react'
import { Nav, NavLink, NavMenu, NavBtn, NavBtnLink, Bars, Logo} from './NavBarElements'

const headercopy = () => (
  <>
    <Nav>
      <Logo>Note-Taker</Logo>
      <Bars />
      <NavMenu>
        <NavLink to="/" activeStyle>My Notes</NavLink>
        <NavLink to="/" activeStyle>Profile</NavLink>
        {/* <NavLink to="/" activeStyle>Logout</NavLink> */}
      </NavMenu>
      <NavBtn>
          <NavBtnLink to="/logout">Logout</NavBtnLink>
      </NavBtn>
    </Nav>
  </>
);

export default headercopy;