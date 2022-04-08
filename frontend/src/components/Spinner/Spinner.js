import Spinner from 'react-bootstrap/Spinner'
import './Spinner.css'

const CustomSpinner = () => {
    return (
        <div className="spinnerContainer">
            <Spinner className="loader" animation="border" variant="primary" />
            <h4 className="loaderText">Loading...</h4>
        </div>
    )
}

export default CustomSpinner