// import axios from 'axios'
// import { useEffect, useState } from "react"
// import Note from "./Note"
// import './Note.css'

// const NotesList = () => {
//     const [notes, setNotes] = useState([])

    
//     const getNotes = async() => {
//         const { data } = await axios.get('/tasks')
//         console.log(data)
//         setNotes(data)
//     }

//     useEffect(() => {
//         getNotes()
//     },[])

//     return (
//         <div className="notes-list">
//             {notes.map((note) => (
//                 <Note title={note.Title} Description={note.Description} _id={note._id} key="note._id"/>
//             ))}
//         </div>
//     )
// }

// export default NotesList