import React, { useState, useEffect } from 'react';
import CarEdit from '../../components/CarEdit/CarEdit.jsx'

//TODO: Add option to add manufacturer
function AddNewCar() {
    const [car, setCar] = useState(null)

    return (
        <CarEdit 
            car={car} 
            setCar={setCar}
            addingNewCar={true}
            title={"Add New Car"} 
            actionText={"Add Car"}/>
    )
}

export default AddNewCar;
