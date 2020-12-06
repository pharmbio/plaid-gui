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
    // compoundNames: 
    //   "comp1,comp2,comp3,comp4,comp5,comp6,comp7,comp8,comp9,comp10", // List
    compoundConcentrations: 8,
    //compoundConcentrationNames: "0.3,1,3,5,10,15,30,100", // List
    // compound_concentration_indicators: "1,2,3,4,5,6,7,8", // TODO: ask andreina about this one
    replicates: 2,
    combinations: 0,
    combinationConcentrations: 0,
    // combinationNames: "", // List
    // combinationConcentrationNames: "", // List
    numControls: 4,
    controlConcentrations: 1,
    // controlReplicates: "32,16,16,16", // List
    // controlNames: "pos,neg,blank,dmso", // List
    // controlConcentrationNames: "cont-conc1", // List
    blanks: 0,
    blanksNames: "",
  });

  const [arrayState, setArrayState] = useState({
    compoundConcentrationNames: [], // List
    compoundNames: [], // List
    combinationNames: [], // List
    combinationConcentrationNames: [], // List
    controlReplicates: [], // List
    controlNames: [], // List
    controlConcentrationNames: [], // List
  })
  const handleArrayChange = (event) => {
    console.log("HERE")
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const newArr = [...arrayState[name]];
    newArr[name] = value.split(',')
    console.log(newArr)
     setArrayState(
      { ...arrayState, [name]: newArr }
    ); 
    console.log(arrayState)
  };
  const handleInputChange = (event) => {
    console.log(formState);
    console.log(event.target.checked);
    const target = event.target;
    const value =
      event.target.type === "checkbox" ? target.checked : target.value;
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
      <CombinationForm handleInputChange={handleInputChange} />
      <CompoundForm handleInputChange={handleInputChange, handleArrayChange} />
      <ControlForm handleInputChange={handleInputChange} />
      <button type="button" onClick={() => postForm(formState)}></button>
    </form>
  );
};

export default PlaidForm;
