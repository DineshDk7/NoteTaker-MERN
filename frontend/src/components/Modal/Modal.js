import { Button, Modal } from "react-bootstrap"

const CustomModal = ({title, showDelete}) => {
    return (
    <Modal 
    show={showDelete}
    centered
    >
        <div>
            <div>
                <h5>{title}</h5><br />
                <div style={{ "padding" : "10px"}}>Are you sure you want to delete?</div><br />
                <div className='deleteNote-footer'>
                    <Button variant='danger'>Yes</Button>
                    <Button variant='primary'>No</Button>
                </div>
            </div>
        </div>
    </Modal>)
}

export default CustomModal