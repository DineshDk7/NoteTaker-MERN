import { MdDeleteForever, MdOutlineEditNote } from 'react-icons/md'
import './Note.css'

//{title, Desc}
const Note = ({title, Description, _id}) => {
    const handleDelete = (_id) => {
        if(window.confirm("Are you sure?")){
            
        }
    }

    const handleEdit=(_id)=> {
        if(window.confirm("Are you sure to Edit?")){

        }
    }

    return (            
        <div className="note-leaf">
            <div className="note-header">{title}</div>
            <div className="note-body">
                <p className="note-text">{Description}</p>
            </div>
            <div className="note-footer">
                <small>Created on April 12, 2022</small>
                <div className='footer-buttons'>
                    <MdOutlineEditNote className="edit-icon" size="2.3em" onClick={()=>handleEdit(_id)}/>
                    <MdDeleteForever className="delete-icon" size="1.7em" onClick={()=>handleDelete(_id)} />
                </div>
            </div>
        </div>
    )
}

export default Note