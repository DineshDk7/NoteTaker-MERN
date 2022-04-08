import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

const Notification = (props) => {
    const {notify, setNotify} = props

    const handleNotificationClose = (event,reason) => {
        if(reason === 'clickaway'){
            return
        }
        setNotify({
            ...notify,
            isOpen : false
        })
    }

    return (
        <Snackbar
        open={notify.isOpen}
        autoHideDuration={3000}
        anchorOrigin={{vertical:'bottom',horizontal:'right'}}
        onClose={handleNotificationClose}
        >
            <Alert severity={notify.type} onClose={handleNotificationClose}>
                {notify.message}
            </Alert>
        </Snackbar>
    )
}

export default Notification