import { Button, Col, Form, Row } from "react-bootstrap"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import './RegisterScreen.css'
import axios from "axios"

const RegisterScreen = () => {
    const userInfoString = localStorage.getItem("userInfo")
    const userInfo = JSON.parse(userInfoString)

    const [user, setUser] = useState(userInfo)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const navigate = useNavigate()
    
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
        if(confirmPassword.length === 1){
            setPasswordError(false)
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setPasswordError(true)
        }
        else{
            setPasswordError(false)
            try{
                const config = {
                    headers: {
                        "Content-type": 'application/json',
                    },
                };
        
                const registerData = {
                    "name" : name,
                    "email" : email,
                    "password" : password
                }
        
                console.log('RegisterData',registerData)
                const { data } =  await axios.post('api/users/register', registerData, config)
                console.log('Data registered ',data)
                localStorage.setItem("userInfo", JSON.stringify(data));
            }catch(err){
                setError(true)
            }
        }
    }

     useEffect(() => {
        if(userInfo){
            navigate("/myNotes")
        }
    },[user])

    return (
        <div className="registerContainer">
            <h1 className="Title">REGISTER</h1>
            <Form onSubmit={handleRegister}>
                <Form.Group controlId="Name">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" placeholder="User name" value={name} onChange={(e) => setName(e.target.value)}/>
                </Form.Group><br />
                <Form.Group controlId="Email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group><br />

                <Form.Group controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off"/>
                </Form.Group><br />
                <Form.Group controlId="Confirm Password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPassword} autoComplete="off"/>
                </Form.Group>
                <div>
                    {passwordError && <label className="errorText">Password's does not match</label>}<br />
                    {error && <label className="errorText">Invalid Details. Please fill all the details!</label>}
                </div>
                <div className="registerButton">
                    <Button variant="success" type="submit" className="button">Register</Button>
                </div>
            </Form>
            <Row className="py-3">
                <Col>
                    Already signed in ? <Link to="/login">Login</Link>
                </Col>
            </Row>
        </div>
    )
}

export default RegisterScreen