import axios from "axios"
import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import "./ResetPasswordRequest.css"

const ResetPasswordRequest = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)
    const [showResetModal, setShowResetModal] = useState(false)

    const navigate = useNavigate

    const handleReset = async(e) => {
        e.preventDefault()
        try{    
            const resetMail = {
                "email" : email
            }
            console.log('resetMail : ',resetMail)
    
            const { data } = await axios.post('api/users/password-reset',resetMail)
            console.log('User for reset ', data)
        }catch(err){
            setError(true)
        }
        if(!error){
            setShowResetModal(true)
        }
    }

    const handleResetModalClose = () => {
        setShowResetModal(false)
        navigate('/login')
    }

    return (
        <>
        <div className="resetContainer">
            <h1 className="resetTitle">RESET PASSWORD</h1><br />        
            <Form className="resetForm" onSubmit={handleReset}>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>
                {error && <label className="errorText">The account entered is not a registered user!</label>}
                <div className="resetButtonContainer"><br />
                    <Button type="submit" variant="success">Reset Password</Button>
                </div>
            </Form>
        </div>

        {showResetModal && 
        <Modal 
        show={showResetModal}
        onHide={() => setShowResetModal(false)}
        centered
        >
            <div>
                <div>
                    <h5>Reset Password</h5><br />
                    <div style={{ "padding" : "15px" }}>A new password has been sent to the registered Email id. Check your spam folders too.</div><br />
                    <div className='deleteNote-footer'>
                        <Button variant='success' onClick={handleResetModalClose}>Okay!</Button>
                    </div>
                </div>
            </div>
        </Modal>}
        </>
    )
}

export default ResetPasswordRequest