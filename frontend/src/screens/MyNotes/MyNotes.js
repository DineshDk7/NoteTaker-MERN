import { useEffect, useState } from 'react'
import './MyNotes.css'
import { MdDeleteForever, MdOutlineEditNote } from 'react-icons/md'
import { Button, Modal } from 'react-bootstrap'
import CustomSpinner from '../../components/Spinner/Spinner'
import Notification from '../../components/Notification/Notification'
import axios from 'axios'

const MyNotes = ({search}) => {
    const userInfoString = localStorage.getItem("userInfo")
    const userInfo = JSON.parse(userInfoString)

    const [loading, setLoading] = useState(false)
    const [notes, setNotes] = useState([])
    const [complete, setComplete] = useState()
    const [noteID, setNoteID] = useState('')
    const [noteText, setNoteText] = useState('')
    const [noteTitle, setNoteTitle] = useState('')
    const [editText, setEditText] = useState('')
    const [editTitle, setEditTitle] = useState('')
    const [showCreate, setShowCreate] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [deleteID, setDeleteID] = useState('')
    const [notify, setNotify] = useState({ isOpen : false, message : '', type : '' })

    const listNotes = async () =>{
        try {
            // setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.get('/api/notes', config)
            setNotes(data)
            // setLoading(false)
        }catch(err){
            console.log('Error while getting the notes')
        }
    }

    const handleAddNote = async () => {
        try{
            setLoading(true)
            const newData = {
                Title : noteTitle,
                Description : noteText
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
    
            await axios.post('/api/notes', newData, config)
            setLoading(false)
        }
        catch(error){
            console.log('Error while adding the notes')
        }
        setShowCreate(false)
        setNoteTitle('')
        setNoteText('')
        setNotify({
            isOpen : true,
            message : 'Note created successfully',
            type : 'success'
        })
    }

    const handleEdit = (note) => {
        setShowEdit(true)
        setNoteID(note._id)
        setEditTitle(note.Title)
        setEditText(note.Description)
        setComplete(note.completed)
    }

    const handleComplete = (e) => {
        setComplete(prev => !prev)
    }

    const handleModalClose = (e) => {
        setShowEdit(false)
        setShowDelete(false)
    }

    const handleUpdate = async () => {
        try{
            setLoading(true)
            const config = {
                headers:{
                    Authorization : `Bearer ${userInfo.token}`,
                },
            }
            const updateData = {
                Title : editTitle,
                Description : editText,
                completed : complete
            }
            const task = await axios.patch(`/api/notes/${noteID}`, updateData, config)
            setLoading(false)
        }catch(err){
            console.log('Error while updating the notes')
        }
        setShowEdit(false)
        setNotify({
            isOpen : true,
            message : 'Note updated successfully',
            type : 'success'
        })
    }


    const handleDelete = (id) => {
        setShowDelete(true)
        setDeleteID(id)
    }

    const handleDeleteConfirmation = async() => {
        try{
            setLoading(true)
            const config = {
                headers:{
                    Authorization : `Bearer ${userInfo.token}`,
                },
            }
            await axios.delete(`/api/notes/${deleteID}`, config)
    
        }catch(err){
            console.log('Error while deleting the notes')
        }
        setShowDelete(false)
        setNotify({
            isOpen : true,
            message : 'Note deleted successfully',
            type : 'error'
        })
        setLoading(false)
    }

    const handleDate = (note) => {
        const months = ["","Jan","Feb","March","April","May","June","July","August","Sept","Oct","Nov","December"]
        if(note.createdAt === note.updatedAt){
            const dateFormat = note.createdAt.split("T")[0]
            const month = dateFormat.split("-")[1]
            const date = months[parseInt(month)]+" "+dateFormat.split("-")[2]+", "+dateFormat.split("-")[0]
            return "Created at "+date
        }else{
            const dateFormat = note.updatedAt.split("T")[0]
            const month = dateFormat.split("-")[1]
            const date = months[parseInt(month)]+" "+dateFormat.split("-")[2]+", "+dateFormat.split("-")[0]
            return "Updated at "+date
        }
    }

    useEffect(() => {
        listNotes()      
    },[notify])

    return (
        <div className="notes-main">
            <h3>Welcome back {userInfo.user.name}...</h3>
            <Button variant='success' onClick={()=> setShowCreate(true)}>+ Create New Note</Button>
            {/* {loading ? (<div><ClimbingBoxLoader size={25} color={'#F37A24'} loading={loading} /></div>) 
            :  */}
            <div className='notes-list'>
                { showCreate && <div className='addnote-leaf'>
                    <input type="text" id="addnote-title" placeholder='Title..' value={noteTitle} autoComplete="off" onChange={(e) => setNoteTitle(e.target.value)}/>
                    <textarea id='addnote-text' rows="8" cols="10" value={noteText} placeholder="Type to add a note.." onChange={(e) => setNoteText(e.target.value)}></textarea>
                    <div className='addnote-footer'>
                        {/* <small value={wordAlert}>{wordAlert} remaining</small> */}
                        <Button className='addnote-save' variant="success" onClick={handleAddNote} size="sm">Save</Button>
                        <MdDeleteForever className="delete-icon" size="1.5em" onClick={() => setShowCreate(false)}/>
                    </div>
                </div>}

                {/* {notes.map((note) => (
                    <Note title={note.Title} Description={note.Description} _id={note._id} key={note._id}/>
                ))} */}
                {loading ? <CustomSpinner/> : ''}
                {/* {loading ? <ClimbingBoxLoader size={25} color={'#F37A24'} loading={loading} /> : ''} */}

                {notes && 
                notes
                .filter((filteredNote) =>
                    filteredNote.Title.toLowerCase().includes(search.toLowerCase())
                )
                .reverse()
                .map((note) => (
                    <div className="note-leaf" key={note._id}>
                        <div className="note-header">{note.Title}</div>
                        <div className="note-body">
                            <p className="note-text">{note.Description}</p>
                        </div>
                        <div className="note-footer">
                            {/* <small>Created on {note.createdAt.split("T")[0]}</small> */}
                            <small>{handleDate(note)}</small>
                            <div className='footer-buttons'>
                                {note.completed && <span className="badge rounded-pill bg-success">Completed</span>}
                                {!note.completed && <span className="badge rounded-pill bg-danger">Not Completed</span>}
                                <MdOutlineEditNote className="edit-icon" size="2.3em" onClick={() => handleEdit(note)}/>
                                <MdDeleteForever className="delete-icon" size="1.7em" onClick={() => handleDelete(note._id)}/>
                            </div>
                        </div>
                    </div>
                ))}

                {!loading && showEdit &&
                <Modal 
                show={showEdit}
                onHide={handleModalClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                    <div className='editnote-leaf'>
                        <input type="text" id="addnote-title" placeholder='Title..' value={editTitle} onChange={(e) => setEditTitle(e.target.value)}/>
                        <textarea id='addnote-text' rows="8" cols="10" value={editText} placeholder="Type to add a note.." onChange={(e) => setEditText(e.target.value)}></textarea>
                        <div className='addnote-footer'>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" defaultChecked={complete} onClick={handleComplete}/>
                                <label color='black'>Complete</label>
                            </div>
                            <Button variant="success" size="sm" onClick={handleUpdate}>Save</Button>
                        </div>
                    </div>
                </Modal>
            }
            </div>

            {showDelete && 
            <Modal 
            show={showDelete}
            onHide={handleModalClose}
            centered
            >
                <div>
                    <div>
                        <h5>Delete Note</h5><br />
                        <div style={{ "padding" : "10px"}}>Are you sure you want to delete?</div><br />
                        <div className='deleteNote-footer'>
                            <Button variant='danger' onClick={handleDeleteConfirmation}>Yes</Button>
                            <Button variant='primary' onClick={handleModalClose}>No</Button>
                        </div>
                    </div>
                </div>
            </Modal>}
            <Notification notify={notify} setNotify={setNotify} />
        </div>
    )
}

export default MyNotes