import { useEffect, useRef, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { FaCamera } from "react-icons/fa"
import "./ProfileScreen.css"
import Notification from "../../components/Notification/Notification"
import axios from "axios"
import CustomSpinner from '../../components/Spinner/Spinner'

const ProfileScreen = () => {
    const userInfoString = localStorage.getItem("userInfo")
    const userInfo = JSON.parse(userInfoString)
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(userInfo.user.name)
    const [email, setEmail] = useState(userInfo.user.email)
    const [password, setPassword] = useState('')
    const [pic, setPic] = useState(userInfo.user.pic)
    const [showPassword, setShowPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState()
    const [notify, setNotify] = useState({ isOpen : false, message : '', type : '' })

    const [loadingS, setLoadingS] = useState()

    const inputFile = useRef(null)

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
        setPasswordError(false)
    }

    const handleSave = async (e) => {
        e.preventDefault()
        setLoading(true)
        setPasswordError(false)
        if(password === confirmPassword){
            try{
                const userInfoString = localStorage.getItem("userInfo")
                const userInfo = JSON.parse(userInfoString)
        
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
        
                const updateData = {
                    "name" : name,
                    "email" : email,
                    "pic" : pic
                }
        
                if(password !== ""){
                    updateData.password = password
                }
        
                const { data } =  await axios.patch('api/users/me', updateData, config)
                data.pic = pic
                localStorage.setItem("userInfo", JSON.stringify(data));
                setLoading(false)
            }catch(err){
                setPasswordError(true)
            }
            setNotify({
                isOpen : true,
                message : 'User updated successfully',
                type : 'success'
            })
        }else{
            setPasswordError(true)
        }
    }

    const postPic = (pic) => {
        console.log(pic)
        if(pic === undefined){
            console.log('No pic selected')
        }
        if(pic.type === "image/png" || pic.type === "image/jpeg"){
            const picData = new FormData()
            picData.append('file',pic)
            picData.append('upload_preset','iqktzq36')
            picData.append("cloud_name", "dym86fvor")
            fetch("https://api.cloudinary.com/v1_1/dym86fvor/image/upload", {
                method:"post",
                body:picData,
            }).then((res) => res.json())
            .then((data) => {
                setPic(data.url.toString())
            })
            .catch((err) => {
                console.log('Error while uploading picture')
            })
        }
    }

    const handleRemoveAccount = async(e) => {
        e.preventDefault()
        setShowDeleteModal(true)
    }

    const handleDeleteAccount = async(e) => {
        setLoading(true)
        e.preventDefault()
        try{
            const userInfoString = localStorage.getItem("userInfo")
            const userInfo = JSON.parse(userInfoString)
    
            const deleteData = {
                "email" : email
            }
    
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            localStorage.removeItem("userInfo")
            const { data } =  await axios.delete('api/users/me/delete-account', config, deleteData)
            setLoading(false)
        }catch(err){

        }
        navigate("/")
    }

    const onButtonClick = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };

    useEffect(() => {
        if(!userInfo){
            navigate("/")
        };
    },[navigate, userInfo])

    return (
        <div className="profileContainer">
            {loading ? <CustomSpinner /> : ''}
            {!loading ? <div className="profilePicContainer">
                <img className="profilePic" src={pic} alt={name} />
                <div className="iconContainer" onClick={onButtonClick}>
                    <FaCamera className="cameraIcon" size="25px" color="white" />
                </div>
            </div> : ''}
            <Form onSubmit={handleSave}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group><br />

                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group><br />
                <div style={{"marginBottom" : "10px"}}>
                    <input className="form-check-input" type="checkbox" defaultChecked={showPassword} onClick={(e)=>setShowPassword(prev => !prev)} />
                    <label style={{"paddingLeft" : "10px"}}>Edit  password</label>
                </div>
                {showPassword && 
                <>
                <Form.Group controlId="password">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off"/>
                </Form.Group><br />
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPassword} autoComplete="off"/>
                </Form.Group>
                </>}
                {passwordError && <label className="errorText">Password's does not match</label>}
                <Form.Group controlId="Profile picture">
                    <Form.Control type="file" size="sm" ref={inputFile} style={{display: 'none'}} onChange={(e) => postPic(e.target.files[0])} />                
                </Form.Group>
                <div className="profileButtonContainer">
                    <Button type="submit" variant="success">Save Profile</Button>
                    <Button variant="danger" onClick={handleRemoveAccount}>Delete Account</Button>
                </div><br />
            </Form>
            {showDeleteModal && 
            <Modal 
            show={showDeleteModal}
            onHide={()=>setShowDeleteModal(false)}
            centered
            >
                <div>
                    <div>
                        <h5>Delete Account</h5><br />
                        <div style={{ "padding" : "10px"}}>Are you sure you want to delete?</div><br />
                        <div className='deleteNote-footer'>
                            <Button variant='danger' onClick={handleDeleteAccount}>Yes</Button>
                            <Button variant='primary' onClick={()=>setShowDeleteModal(false)}>No</Button>
                        </div>
                    </div>
                </div>
            </Modal>}
            <Notification notify={notify} setNotify={setNotify} />
        </div>
        // </div>
    )}

export default ProfileScreen