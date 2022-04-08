import axios from "axios";
import { useEffect } from "react";
import { Container, Form, Nav, Navbar, NavDropdown, } from "react-bootstrap"
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css"

const Header = ({ search, setSearch }) => {
    const userInfoString = localStorage.getItem("userInfo")
    const userInfo = JSON.parse(userInfoString)
    const navigate = useNavigate();

    const location = useLocation();

    const handleLogout = async () => {
        try{
            const userInfoString = localStorage.getItem("userInfo")
            const userInfo = JSON.parse(userInfoString)
            
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            localStorage.removeItem("userInfo")
            await axios.post('api/users/logout', null, config);
            
        }catch(err){
            console.log("Error while logging out")
        }
        navigate("/")
    }

    const handleLogoutAll = async() => {
        //dispatch(logoutAll())
        try{
            const userInfoString = localStorage.getItem("userInfo")
            const userInfo = JSON.parse(userInfoString)
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            localStorage.removeItem("userInfo")
            await axios.post('api/users/logoutAll', null, config)
        }catch(err){
            console.log("Error while logging out")
        }
        navigate("/")
    }

    useEffect(() => {},[userInfo])
        

    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container className="container">
            {/* <Navbar.Brand href="/">Note Taker</Navbar.Brand> */}
            <a href="/">
                <img src="./notes.png" width="30" height="30" />
            </a>
            <Nav className="m-auto">
                {location.pathname === "/myNotes" && 
                <Form>
                    <div className="searchContainer2"> 
                        <FaSearch className="searchIcon"/>
                        <input className="searchBar" type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
                    </div>
                </Form>}
            </Nav>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="m-auto">
                    {location.pathname === "/myNotes" && <Form inline="true">
                        <div className="searchContainer"> 
                            <FaSearch className="searchIcon"/>
                            <input className="searchBar" type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
                        </div>
                    </Form>}
                </Nav>
                {userInfo ? <Nav>
                    <Nav.Link href="/myNotes">My notes</Nav.Link>
                    <NavDropdown title="Settings" id="collasible-nav-dropdown" >
                        <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                        <NavDropdown.Item className="dropdown" onClick={handleLogout}>Logout</NavDropdown.Item>
                        <NavDropdown.Item className="dropdown" onClick={handleLogoutAll}>Logout of all Devices</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/register">SignUp</NavDropdown.Item>
                    </NavDropdown>
                </Nav> : <Nav><Nav.Link href="/login">Login</Nav.Link></Nav>}
            </Navbar.Collapse>
            </Container>
            </Navbar>
    );
};

export default Header;