import React, { useState } from "react";
import ExperimentForm from "./ExperimentForm";
import CombinationForm from "./CombinationForm";
import CompoundForm from "./CompoundForm";
import ControlForm from "./ControlForm";
import ConstraintForm from "./ConstraintForm";
import Loader from "./../Loader";
const axios = require("axios");

async function postForm(formData, setLoading, setData, event) {
  console.log("Data sent");
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    setLoading(true);
    await axios
      .post("http://localhost:5000/", formData, axiosConfig)
      .then((response) => {
        console.log(response.data);
        setData({
          rows: formData.num_rows,
          cols: formData.num_cols,
          sizeEmptyEdge: formData.size_empty_edge,
          result: response.data,
        });
      });
    setLoading(false); //setLoading(true); //data received, remove loader
  } catch (e) {
    console.log(e);
  }
}

const PlaidForm = (props) => {
  const [formState, setFormState] = useState({
    num_rows: 16,
    num_cols: 48,
    vertical_cell_lines: 1,
    horizontal_cell_lines: 2,
    allow_empty_wells: false,
    size_empty_edge: 1,

    compounds: 7,
    compound_concentration_names: ["L", "M", "H"], // List
    compound_concentration_indicators: ["", "", ""],
    compound_names: ["BPA", "BADGE", "PFOA", "4-MBC", "DBP", "DEHP", "TCEP"], // List
    compound_concentrations: 3,
    replicates: 5,
    combinations: 1,
    combination_concentrations: 1,
    combination_names: ["BPA+H"], // List
    combination_concentration_names: ["comb-conc1"], // List
    num_controls: 4,
    control_concentrations: 1,
    control_replicates: [44, 44, 44, 34], // List
    control_names: ["pos", "neg", "blank", "dmso"], // List
    control_concentration_names: ["cont-conc1"], // List
    blanks: 0,
    blanks_name: "",
  });
  const handleArrayChange = (event) => {
    const deviations = { control_replicates: "integer" };
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let delim = value.split(",");
    console.log(delim);
    if (name in deviations) {
      switch (deviations[name]) {
        case "integer":
          delim.forEach((x, index) => {
            delim[index] = parseInt(x);
          });
          break;
      }
    }
    setFormState({ ...formState, [name]: delim });
    console.log(formState);
  };

  const handleInputChange = (event) => {
    console.log(formState);
    const target = event.target;
    const type = target.type;
    let value;
    switch (type) {
      case "checkbox": {
        value = target.checked;
        break;
      }
      case "number": {
        value = parseInt(target.value);
        break;
      }
      default:
        value = target.value;
    }
    const name = target.name;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form>
          <ConstraintForm handleInputChange={handleInputChange} />
          <ExperimentForm handleInputChange={handleInputChange} />
          <CombinationForm
            handleInputChange={handleInputChange}
            handleArrayChange={handleArrayChange}
          />
          <CompoundForm
            handleInputChange={handleInputChange}
            handleArrayChange={handleArrayChange}
          />
          <ControlForm
            handleInputChange={handleInputChange}
            handleArrayChange={handleArrayChange}
          />
          <button
            type="button"
            onClick={() => {
              postForm(formState, setLoading, props.setData);
            }}
          ></button>
        </form>
      )}
    </>
  );
};

export default PlaidForm;
