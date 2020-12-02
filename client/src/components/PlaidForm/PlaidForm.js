import React, { useState } from "react";
import ExperimentForm from "../ExperimentForm/ExperimentForm"



const PlaidForm = () => {
    const [formState, setFormState] = useState({
        rows: '',
        columns: '',
        vertical: false,
        horizontal: false,
    })
    const handleInputChange = (event) => {
        console.log(formState)
        console.log(event.target.checked)
        const target = event.target;
        const value = event.target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setFormState(({
            ...formState,
            [name]: value
        }));
    }


    return (<form><ExperimentForm formState = {formState} handleInputChange={handleInputChange} /></form>)
}

export default PlaidForm