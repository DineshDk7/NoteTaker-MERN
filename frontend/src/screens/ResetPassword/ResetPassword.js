import axios from "axios"
import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useLocation } from "react-router-dom"
import Notification from "../../components/Notification/Notification"

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [notify, setNotify] = useState({
                                            isOpen : false,
                                            message : '',
                                            type : ''
                                        })
    const location = useLocation()

    const handleResetPassword = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setPasswordError(true)
        }else{
            console.log('Insdie if')
            const currentpath = location.pathname
            console.log(currentpath)
            const id = currentpath.split('/')[2]
            const token = currentpath.split('/')[3]
            console.log('Token ', token)
            console.log('ID ', id)
            try{        
                const resetPass = {
                    "password" : password
                }
        
                const { data } = await axios.post(`/api/users/reset/${token}/${id}`, resetPass)
                console.log('User after password reset',data)
            }catch(err){
                setPasswordError(true)
            }
            setNotify({
                isOpen : true,
                message : 'Password updated successfully! Please close this browser and login again',
                type : 'success'
            })
        }
    }

    return (
        <>
            <div className="resetContainer">
                <h1 className="resetTitle">RESET PASSWORD</h1><br />
                <Form className="resetForm" onSubmit={handleResetPassword}>
                    <Form.Group controlId="newPasssword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off"/>
                    </Form.Group><br />
                    <Form.Group controlId="newConfirmPassword">
                        <Form.Label>New Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="off"/>
                    </Form.Group>
                    {passwordError && <label className="errorText">Password's does not match</label>}
                    <div className="resetButtonContainer"><br />
                        <Button type="submit" variant="success">Change Password</Button>
                    </div>
                </Form>
            </div>
            <Notification notify={notify} setNotify={setNotify}/>
        </>
    )
}

export default ResetPassword