import { useEffect } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {

    const navigate = useNavigate()

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo")
        if (userInfo) {
            navigate("/myNotes");
        }
    }, [navigate]);

    return (
        <div className="main">
            <Container>
                <Row>
                    <div className='intro-text'>
                        <div>
                            <h1 className='title'>Welcome to Note Taker</h1>
                            <p className='sub-title'>One safe place for all your notes.</p>
                        </div>
                        <div className='buttonContainer'>
                            <a href='/login'>
                                <Button size='lg' className='landingButton' variant='outline-primary'>Login</Button>
                            </a>
                             <a href='/register'>
                                <Button size='lg' className='btn btn-success, landingButton' variant="outline-success">SignUp</Button>
                            </a>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default LandingPage;