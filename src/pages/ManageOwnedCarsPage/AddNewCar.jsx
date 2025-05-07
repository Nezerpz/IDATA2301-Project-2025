import React, { useState, useEffect } from 'react';
import CarEdit from '../../components/CarEdit/CarEdit.jsx'

//TODO: Add option to add manufacturer
function AddNewCar() {
    return (
        <CarEdit 
            carToEdit={null} 
            title={"Add New Car"} 
            actionText={"Add Car"}/>
    )
}

export default AddNewCar;
