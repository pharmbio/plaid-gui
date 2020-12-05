import React, { useState } from "react";
import ExperimentForm from "./ExperimentForm"
import CombinationForm from "./CombinationForm"
import CompoundForm from "./CompoundForm"
import ControlForm from "./ControlForm"
import ConstraintForm from "./ConstraintForm"
const axios = require('axios')

async function postForm(formData, event) {
    console.log("Data sent")
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    await axios.post('http://localhost:5000/', formData,
        axiosConfig)
        .then((response) => {
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        });
}

const PlaidForm = () => {
    const [formState, setFormState] = useState({
        rows: 8,
        columns: 12,
        vertical: false,
        horizontal: false,
        allowEmptyWells: false,
        sizeEmptyEdge: 1,
        compounds: 10,
        compoundNames: "comp1,comp2,comp3,comp4,comp5, \
                        comp6,comp7,comp8,comp9,comp10,",
        compoundConcentrations: 8,
        compoundConcentrationNames: "0.3,1,3,5,10,15,30,100",
        replicates: 0,
        combinations: 0,
        combinationConcentrations: 0,
        combinationNames: "",
        combinationConcentrationNames: "",
        numControls: 4,
        controlConcentrations: 0,
        controlReplicates: "32,16,16,16",
        controlNames: "pos,neg,blank,dmso",
        controlConcentrationNames: "cont-conc1",
        blanks: 0,
        blanksNames: ""
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
    return (<form>
        <ConstraintForm handleInputChange={handleInputChange} />
        <ExperimentForm handleInputChange={handleInputChange} />
        <CombinationForm handleInputChange={handleInputChange} />
        <CompoundForm handleInputChange={handleInputChange} />
        <ControlForm handleInputChange={handleInputChange} />
        <button type='button' onClick={() => postForm(formState)}></button>
    </form>)
}

export default PlaidForm