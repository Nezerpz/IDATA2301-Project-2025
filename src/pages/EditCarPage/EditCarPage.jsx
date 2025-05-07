import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import CarEdit from '../../components/CarEdit/CarEdit.jsx'
import {fetchJSON} from "../../static/js/auth.js";

function EditCarPage() {
    const { id } = useParams();
    const [car, setCar] = useState(null)

    // Fetch car info
    useEffect(() => {
        const fetchdata = async () => {
            try {
                let data = await fetchJSON("/cars/" + id);
                setCar(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchdata();
    }, [id]);

    return (
        <CarEdit 
            carToEdit={car} 
            title={"Edit Car"} 
            actionText={"Update Car"}/>
    )
}

export default EditCarPage;
