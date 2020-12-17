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
        setLoading(false); //data received, remove loader
        setData({
          rows: formData.num_rows,
          cols: formData.num_cols,
          sizeEmptyEdge: formData.size_empty_edge,
          result: response.data,
        });
      });
  } catch (e) {
    console.log(e);
  }
}

const PlaidForm = (props) => {
  const [formState, setFormState] = useState({
    num_rows: 18,
    num_cols: 26,
    vertical_cell_lines: 1,
    horizontal_cell_lines: 1,
    allow_empty_wells: false,
    size_empty_edge: 2,
    compounds: 8,
    compound_concentration_names: [
      "1",
      "3.16",
      "5.62",
      "10",
      "17.78",
      "56.23",
    ], // List
    compound_concentration_indicators: ["", "", "", "", "", ""],
    compound_names: [
      "(1)(M)",
      "(2)(M)",
      "(3)(M)",
      "(4)(M)",
      "(5)(M)",
      "(6)(M)",
      "(7)(M)",
      "(8)(M)",
    ], // List
    compound_concentrations: 6,
    replicates: 4,
    combinations: 28,
    combination_concentrations: 3,
    combination_names: ["(1)(2)","(1)(3)","(1)(4)","(1)(5)","(1)(6)","(1)(7)","(1)(8)","(2)(3)","(2)(4)","(2)(5)","(2)(6)","(2)(7)","(2)(8)","(3)(4)","(3)(5)","(3)(6)",
    "(3)(7)","(3)(8)","(4)(5)","(4)(6)","(4)(7)","(4)(8)","(5)(6)","(5)(7)","(5)(8)","(6)(7)","(6)(8)","(7)(8)"], // List
    combination_concentration_names: ["1","5.62","10"], // List
    num_controls: 9,
    control_concentrations: 2,
    control_replicates: [4,4,4,4,4,4,4,4,12], // List
    control_names: ["[dmso]","[sorbitol]","[I]","[II]","[III]","[IV]","[V]","[VI]","blank"], // List
    control_concentration_names: ["1","5.62"], // List
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
