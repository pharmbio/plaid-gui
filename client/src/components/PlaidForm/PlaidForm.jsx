import React, { useState, useEffect, useReducer } from "react";
import ExperimentForm from "./ExperimentForm";
import CombinationForm from "./CombinationForm";
import CompoundForm from "./CompoundForm";
import ControlForm from "./ControlForm";
import ConstraintForm from "./ConstraintForm";
import Stepper from "./Stepper";
import Step from "./Step";
import Loader from "./../Loader";
import styled from "styled-components";
import useValidation from "./useValidation";

const axios = require("axios");

const StyledContainer = styled.div`
  overflow-y: scroll;
  height: 100vh;
`;
async function postForm(
  formData,
  setResponseError,
  setFlightState,
  flightState,
  setData
) {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  setFlightState({ ...flightState, loading: true, responseError: false });
  await axios
    .post("http://localhost:5000/", formData, axiosConfig)
    .then((response) => {
      setFlightState({ ...flightState, loading: false, responseError: false });

      setData({
        rows: formData.num_rows,
        cols: formData.num_cols,
        sizeEmptyEdge: formData.size_empty_edge,
        result: response.data,
      });
    })
    .catch((error) => {
      setFlightState({ ...flightState, loading: false, responseError: true });
      setResponseError(error.response.data.message);
    });
}
const PlaidForm = (props) => {
  const [flightState, setFlightState] = useState({
    loading: false,
    responseError: false,
  });
  const [responseError, setResponseError] = useState("");
  const [formState, setFormState] = useState({
    num_rows: 8,
    num_cols: 12,
    vertical_cell_lines: 1,
    horizontal_cell_lines: 1,
    allow_empty_wells: false,
    size_empty_edge: 1,
    concentrations_on_different_rows: true,
    concentrations_on_different_columns: true,
    replicates_on_different_plates: true,
    replicates_on_same_plate: false,
    compounds: 10,
    compound_concentration_names: [
      ["a0.3", "a1", "a3", "a5", "a10", "a15", "a30", "a100"],
      ["b0.3", "b1", "b3", "b5", "b10", "b15", "b30", "b100"],
      ["c0.3", "c1", "c3", "c5", "c10", "c15", "c30", "c100"],
      ["d0.3", "d1", "d3", "d5", "d10", "d15", "d30", "d100"],
      ["e0.3", "e1", "e3", "e5", "e10", "e15", "e30", "e100"],
      ["f0.3", "f1", "f3", "f5", "f10", "f15", "f30", "f100"],
      ["g0.3", "g1", "g3", "g5", "g10", "g15", "g30", "g100"],
      ["h0.3", "h1", "h3", "h5", "h10", "h15", "h30", "h100"],
      ["i0.3", "i1", "i3", "i5", "i10", "i15", "i30", "i100"],
      ["j0.3", "j1", "j3", "j5", "j10", "j15", "j30", "j100"],
    ], // List
    compound_concentration_indicators: ["", "", "", "", "", "", "", ""],
    compound_names: [
      "c1",
      "c2",
      "c3",
      "c4",
      "c5",
      "c6",
      "c7",
      "c8",
      "c9",
      "c10",
    ], // List
    compound_concentrations: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
    compound_replicates: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    combinations: 0,
    combination_concentrations: 0,
    combination_names: [], // List
    combination_concentration_names: [], // List
    num_controls: 4,
    control_concentrations: [1, 1, 1, 1],
    control_replicates: [32, 16, 16, 16], // List
    control_names: ["pos", "neg", "blank", "dmso"], // List
    control_concentration_names: [["cont-conc1", "cont-conc2", "cont-conc3", "cont-conc4"],
    ["cont-conc1", "cont-conc2", "cont-conc3", "cont-conc4"]], // List
  });
  const config = {
    fields: {
      num_rows: {
        minValidSize: {
          value: 1,
          message: 'Rows must be a number > 0'
        },
      },
      num_cols: {
        minValidSize: {
          value: 1,
          message: 'Columns must be a number > 0'
        }
      },
      vertical_cell_lines: {
        minValidSize: {
          value: 1,
          message: 'Cell line must be a number > 0'
        }
      },
      horizontal_cell_lines: {
        minValidSize: {
          value: 1,
          message: 'Cell line must be a number > 0'
        }
      },
      replicates_on_different_plates: {
        isAlsoChecked: {
          value: formState.replicates_on_same_plate,
          message: 'Replicates on different and same plates cannot be checked at the same time'
        }
      },
      size_empty_edge: {
        minValidSize: {
          value: 0,
          message: 'Empty edges must be a number >= 0'
        }
      },
      compounds: {
        minValidSize: {
          value: 1,
          message: 'Compounds must be a number > 0'
        }
      },
      compound_names: {
        minValidLength: {
          value: formState.compounds,
          message: 'Number of compound names are not equal to number of compounds'
        }
      },
      compound_concentrations: {
        minValidLength: {
          value: formState.compounds,
          message: 'Number of concentrations are not equal to number of compounds'
        },
        isNumber: {
          value: formState.compounds,
          message: 'Concentration must be an integer or decimal'
        }
      },
      compound_concentration_names: {
        minValidSize: {
          value: formState.compounds,
          message: ''
        }
      },
      compound_replicates: {
        minValidLength: {
          value: formState.compounds,
          message: 'Number of replicates does not match number of compounds'
        }
      },
      compound_concentration_indicators: {
        maxNumber: {
          value: formState.compound_concentrations,
          message: 'Number of indicators does not match number of compounds'
        }
      },
      combinations: {
        minValidSize: {
          value: 0,
          message: 'Combinations must be a number >= 0'
        }
      },
      combination_names: {
        minValidLength: {
          value: formState.combinations,
          message: 'Number of combination names must be equal to amount of combinations'
        }
      },
      combination_concentrations: {
        minValidSize: {
          value: 0,
          message: 'Combination concentration must be a number >= 0'
        }
      },
      combination_concentration_names: {
        minValidSize: {
          value: 0,
          message: ''
        }
      },
      num_controls: {
        minValidSize: {
          value: 0,
          message: 'Number of controls must be a number >= 0'
        }
      },
      control_names: {
        minValidLength: {
          value: formState.num_controls,
          message: 'The number of control names must match the number of controls'
        }
      },
      control_concentrations: {
        minValidLength: {
          value: formState.num_controls,
          message: 'Number of control concentrations must be >= 0'
        }
      },
      control_concentration_names: {
        minValidSize: {
          value: 0,
          message: ''
        }
      },
      control_replicates: {
        minValidLength: {
          value: formState.num_controls,
          message: 'Number of control replicates must match the number of controls'
        }
      },
    },
    selects: {
      select_plate_size: {}
    },
    checkbox: {
      allow_empty_wells: {},
    }
  }

  /* custom validation hook. TODO: Pass this validation into each component. Assiciate each name with the correct validation field 
     and simply check if the error is null or not. If it's not, display that error. TOFIX, only one error at a time?
     We also provide a cu
  */

  const { errors, formUtils } = useValidation(formState, config);
  const [groups, setGroups] = useState({
    selectedGroup: 0,
    groups: [
      {
        id: "gr-0",
        compound_names: "",
        conc_amount: "",
        compound_concentration_names: "",
        replicates: "",
      },
    ],
  });
  const handleCompoundNamesChange = (compounds) => {
    setFormState({ ...formState, ["compound_names"]: compounds });
  };


  const addCompoundsToState = () => {

    //For each group
    for(let group in groups['groups']){
      
    } 
  }

  const handleChangeOnGroups = (listOfGroups, selected) => {
    if (listOfGroups === null) {
      setGroups({
        selectedGroup: selected,
        groups: [
          {
            id: "gr-0",
            compound_names: "",
            conc_amount: "",
            compound_concentration_names: "",
            replicates: "",
          },
        ],
      });
    } else {
      setGroups({ selectedGroup: selected, groups: listOfGroups });
    }
  };
  const handleArrayChange = (event) => {
    const deviations = { control_replicates: "integer", compound_concentrations: "integer", control_concentrations: "integer" };
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const trim = value.replace(/(^,)|(,$)/g, "");
    const delim = trim.split(",");
    if (name in deviations) {
      switch (deviations[name]) {
        case "integer":
          delim.forEach((x, index) => {
            delim[index] = parseInt(x);
          });
          break;
        default:
          break;
      }
    }
    setFormState({ ...formState, [name]: delim });
  };
  const handleInputChange = (event) => {
    const target = event.target;
    const type = target.type;
    let value;
    switch (type) {
      case "checkbox": {
        if (target.name === "vertical_cell_lines") {
          setFormState({ ...formState, ["horizontal_cell_lines"]: 0 });
        }
        console.log('HERE I AM');
        value = target.checked;
        break;
      }
      case "number": {
        value = parseInt(target.value);
        break;
      }
      case "select-one": {
        value = JSON.parse(target.value);
        setFormState({
          ...formState,
          ["num_rows"]: value.num_rows,
          ["num_cols"]: value.num_cols,
        });
        return;
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
  console.log(formState);
  console.log(groups)
  return (
    <StyledContainer>
      {flightState["loading"] ? (
        <Loader />
      ) : (
          <Stepper
            initialValues={formState}
            postForm={postForm}
            setResponseError={setResponseError}
            responseError={responseError}
            setFlightState={setFlightState}
            flightState={flightState}
            setData={props.setData}
            errors={errors}
            formUtils={formUtils}
            addCompoundsToState={addCompoundsToState}
          >
            <Step label="Experiment Setup">
              <ExperimentForm
                handleInputChange={handleInputChange}
                errors={errors}
                state={formState}
              />
              <ConstraintForm
                handleInputChange={handleInputChange}
                errors={errors}
                state={formState}
              />
            </Step>
            <Step label="Compound Setup">
              <CompoundForm
                handleInputChange={handleInputChange}
                handleArrayChange={handleArrayChange}
                errors={errors}
                state={formState}
                groups={groups}
                handleChangeOnGroups={handleChangeOnGroups}
              />
            </Step>
            <Step label="Combinations">
              <CombinationForm
                handleInputChange={handleInputChange}
                handleArrayChange={handleArrayChange}
                errors={errors}
                state={formState}
              />
            </Step>
            <Step label="Experiment Validation">
              <ControlForm
                handleInputChange={handleInputChange}
                handleArrayChange={handleArrayChange}
                errors={errors}
                state={formState}
              />
            </Step>
          </Stepper>
        )}
    </StyledContainer>
  );
};

export default PlaidForm;
