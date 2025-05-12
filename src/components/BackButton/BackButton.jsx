import {useNavigate} from "react-router-dom";
import "./BackButton.css";

function BackButton(){
    const navigate = useNavigate();
    return(
        <button className="big-button" id={"back-button"} onClick={() => navigate(-1)}>
            Back
        </button>
    )
}

export default BackButton;