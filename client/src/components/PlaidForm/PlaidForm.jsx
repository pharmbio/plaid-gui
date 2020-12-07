import React, { useState } from "react";
import ExperimentForm from "./ExperimentForm";
import CombinationForm from "./CombinationForm";
import CompoundForm from "./CompoundForm";
import ControlForm from "./ControlForm";
import ConstraintForm from "./ConstraintForm";
const axios = require("axios");

async function postForm(formData, event) {
  console.log("Data sent");
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  await axios
    .post("http://localhost:5000/", formData, axiosConfig)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

const PlaidForm = () => {
  const [formState, setFormState] = useState({
    rows: 8,
    columns: 12,
    verticalCellLines: 1,
    horizontalCellLines: 1,
    allowEmptyWells: false,
    sizeEmptyEdge: 1,
    compounds: 10,
    compoundConcentrationNames: [], // List
    compoundNames: [], // List
    compoundConcentrations: 8,
    replicates: 2,
    combinations: 0,
    combinationConcentrations: 0,
    combinationNames: [], // List
    combinationConcentrationNames: [], // List
    numControls: 4,
    controlConcentrations: 1,
    controlReplicates: [], // List
    controlNames: [], // List
    controlConcentrationNames: [], // List
    blanks: 0,
    blanksNames: "",
  });
  const handleArrayChange = (event) => {
    console.log("Hi")
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const newArr = [...formState[name]];
    newArr[name] = value.split(',')
    console.log(newArr)
    setFormState(
      { ...formState, [name]: newArr }
    );
    console.log(formState)
  };
  const handleInputChange = (event) => {
    console.log(formState);
    const target = event.target;
    const type = target.type;
    let value;
    switch (type) {
      case "checkbox":{
        value = target.checked;
        break;
      }
      case "number":{
        value = parseInt(target.value)
        break;
      }
      default:
        value = target.value
    }
    const name = target.name;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  return (
    <form>
      <ConstraintForm handleInputChange={handleInputChange} />
      <ExperimentForm handleInputChange={handleInputChange} />
      <CombinationForm handleInputChange={handleInputChange} handleArrayChange={handleArrayChange} />
      <CompoundForm handleInputChange={handleInputChange} handleArrayChange={handleArrayChange} />
      <ControlForm handleInputChange={handleInputChange} handleArrayChange={handleArrayChange} />
      <button type="button" onClick={() => postForm(formState)}></button>
    </form>
  );
};

export default PlaidForm;
