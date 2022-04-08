import axios from "axios"
import { useEffect, useState } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import "./LoginScreen.css"

const LoginScreen = () => {
    const userInfoString = localStorage.getItem("userInfo")
    const userInfo = JSON.parse(userInfoString)

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    useEffect(() => {
        if(userInfo){
            navigate("/myNotes")
        }
    },[userInfo])

    const handleLogin = async (e) => {
        setError(false)
        e.preventDefault()
        try{
            const loginData = { email, password }
            const config = {
                headers: {
                    "Content-type": 'application/json',
                },
            };
            const { data } = await axios.post("api/users/login", loginData, config)
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/myNotes")
        }catch(err){
            setError(true)
        }
    }

    return (
        <div className="loginContainer">
            <h1 className="Title">LOGIN</h1>            
            <Form className="loginForm" onSubmit={handleLogin}>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group><br />

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off"/>
                </Form.Group><br />
                <Link to="/password-reset">Forgot password?</Link><br /> 
                <div className="loginButton">
                    <Button type="submit" variant="success">Login</Button>
                </div>
            </Form>
            {error && <label className="errorText">Email or Password is wrong! Try Again</label>}
            <Row className="py-3">
                <Col>
                New user ? <Link to="/register">Register here</Link>   
                </Col>
            </Row>
        </div>
    )
}

export default LoginScreen