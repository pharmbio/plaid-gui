import React, { useState, useEffect } from "react";
import ExperimentForm from "./ExperimentForm";
import CombinationForm from "./CombinationForm";
import CompoundForm from "./CompoundForm";
import ControlForm from "./ControlForm";
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
    num_rows: 4,
    num_cols: 6,
    vertical_cell_lines: 0,
    horizontal_cell_lines: 0,
    allow_empty_wells: false,
    size_empty_edge: 0,
    concentrations_on_different_rows: false,
    concentrations_on_different_columns: false,
    replicates_on_different_plates: false,
    replicates_on_same_plate: false,
    compounds: 0,
    compound_concentration_names: [

    ], // List
    compound_concentration_indicators: [],
    compound_names: [], // List
    compound_concentrations: [],
    compound_replicates: [],
    combinations: 0,
    combination_concentrations: 0,
    combination_names: [], // List
    combination_concentration_names: [], // List
    num_controls: 0,
    control_concentrations: [],
    control_replicates: [], // List
    control_names: [], // List
    control_concentration_names: [], // List
  });
  const config = {
    fields: {
      num_rows: {
        minValidSize: {
          value: 1,
          message: "Rows must be a number > 0",
        },
      },
      num_cols: {
        minValidSize: {
          value: 1,
          message: "Columns must be a number > 0",
        },
      },
      vertical_cell_lines: {
        minValidSize: {
          value: 1,
          message: "Cell line must be a number > 0",
        },
      },
      horizontal_cell_lines: {
        minValidSize: {
          value: 1,
          message: "Cell line must be a number > 0",
        },
      },
      replicates_on_different_plates: {
        isAlsoChecked: {
          value: formState.replicates_on_same_plate,
          message:
            "Replicates on different and same plates cannot be checked at the same time",
        },
      },
      size_empty_edge: {
        minValidSize: {
          value: 0,
          message: "Empty edges must be a number >= 0",
        },
      },
      compounds: {
        minValidSize: {
          value: 1,
          message: "Compounds must be a number > 0",
        },
      },
      compound_names: {
        minValidLength: {
          value: formState.compounds,
          message:
            "Number of compound names are not equal to number of compounds",
        },
      },
      compound_replicates: {
        minValidLength: {
          value: formState.compounds,
          message: "Number of replicates does not match number of compounds",
        },
      },
      compound_concentration_indicators: {
        maxNumber: {
          value: formState.compound_concentrations,
          message: "Number of indicators does not match number of compounds",
        },
      },
      combinations: {
        minValidSize: {
          value: 0,
          message: "Combinations must be a number >= 0",
        },
      },
      combination_names: {
        minValidLength: {
          value: formState.combinations,
          message:
            "Number of combination names must be equal to amount of combinations",
        },
      },
      combination_concentrations: {
        minValidSize: {
          value: 0,
          message: "Combination concentration must be a number >= 0",
        },
      },
      combination_concentration_names: {
        minValidSize: {
          value: 0,
          message: "",
        },
      },
      num_controls: {
        minValidSize: {
          value: 0,
          message: "Number of controls must be a number >= 0",
        },
      },
      control_names: {
        minValidLength: {
          value: formState.num_controls,
          message:
            "The number of control names must match the number of controls",
        },
      },
      control_concentrations: {
        minValidLength: {
          value: formState.num_controls,
          message: "Number of control concentrations must be >= 0",
        },
      },
      control_concentration_names: {
        minValidSize: {
          value: 0,
          message: "",
        },
      },
      control_replicates: {
        minValidLength: {
          value: formState.num_controls,
          message:
            "Number of control replicates must match the number of controls",
        },
      },
    },
    selects: {
      select_plate_size: {},
    },
    checkbox: {
      allow_empty_wells: {},
    },
  };

  const [groups, setGroups] = useState({
    selectedGroup: 0,
    groups: [
      {
        id: "gr-0",
        compound_names: "",
        conc_amount: 0,
        concentration_names: "",
        compound_replicates: 0,
      },
    ],
  });

  //TODO add function mentioned in concentration_names. Fix everything left regarding valdation.
  const groupConfig = {
    fields: {
      conc_amount: {
        minValidSize: {
          value: 1,
          message: "Concentrations must be a number > 0",
        },
      },
      concentration_names: {
        concNameCount: {
          //change to function that iterates groups and finds any conc_amount/concentration_name missmatch
          value: groups,
          message: "The number of conc names must match the amount specified",
        },
      },
    },
  };
  /* utility function that converts groups to something the validation hook can read */
  const mergeGroups = (obj) => {
    let newState = {};
    let group;
    for (let i = 0; i < obj.groups.length; i++) {
      group = obj.groups[i];
      for (let key in group) {
        if (key === "conc_amount") {
          newState[key] = parseInt(group[key]);
        }
        if (key === "concentration_names") {
          newState[key] = group[key].split(",");
        }
      }
    }
    return newState;
  };

  const [errors, formUtils] = useValidation(formState, config);
  const [groupErrors, groupUtils] = useValidation(
    groups,
    groupConfig,
    mergeGroups
  );
  console.log(errors);
  console.log(groupErrors);
  const addCompoundsToState = () => {
    let processedGroup;

    // will hold the replicates array and compound concentrations numbers from each group
    let utilGroup = {
      compoundConcentrations: [],
      compoundReplicates: [],
      compound_concentration_indicators: [],
    };

    let compoundGroups = groups.groups;
    let map = {};
    for (let i = 0; i < compoundGroups.length; i++) {
      let compoundGroup = compoundGroups[i];
      processedGroup = {
        compound_names: [],
        concentration_names: [],
      };
      for (let key in compoundGroup) {
        switch (key) {
          case "compound_names":
            let compoundNames = compoundGroup.compound_names;
            processedGroup.compound_names = compoundNames;

            break;
          //length of compoundConcentrations
          case "conc_amount":
            const concAmount = parseInt(compoundGroup.conc_amount);
            console.log(concAmount);
            for (let j = 0; j < compoundGroup.compound_names.length; j++) {
              utilGroup.compoundConcentrations.push(concAmount);
            }
            for (let j = 0; j < concAmount; j++) {
              utilGroup.compound_concentration_indicators.push("");
            }
            break;
          case "compound_replicates":
            const replicateAmount = parseInt(compoundGroup.compound_replicates);
            console.log(replicateAmount);
            console.log(compoundGroup.compound_names.length);
            for (let j = 0; j < compoundGroup.compound_names.length; j++) {
              utilGroup.compoundReplicates.push(replicateAmount);
            }

            break;
          case "concentration_names":
            console.log(compoundGroup.concentration_names);
            let concentrationNames = (compoundGroup.concentration_names + "")
              .replace(/(^,)|(,$)/g, "")
              .split(",");
            processedGroup.concentration_names = concentrationNames;
            break;
          default:
            break;
        }
      }
      /*
        create this hash map
       map = {compoundName : [concName, concName...]} 
       */

      for (let j = 0; j < processedGroup.compound_names.length; j++) {
        for (let k = 0; k < processedGroup.concentration_names.length; k++) {
          if (map[processedGroup.compound_names[j]] === undefined) {
            map[processedGroup.compound_names[j]] = [
              processedGroup.concentration_names[k],
            ];
          } else {
            map[processedGroup.compound_names[j]].push(
              processedGroup.concentration_names[k]
            );
          }
        }
      }
    }

    // the matrix
    let compoundConcentrationNames = [];
    // the dimensions of the matrix
    let cols = Math.max(...utilGroup["compoundConcentrations"]);
    // amount of keys in map  === amount of compounds == rows

    for (let key in map) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        if (j > map[key].length) {
          row.push("");
        } else {
          row.push(key + map[key][j]);
        }
      }
      compoundConcentrationNames.push(row);
    }

    //run the validator here as a 2nd argument callback!! then check in stepper if no errors exist.
    setFormState(
      {
        ...formState,
        ["compound_names"]: Object.keys(map),
        ["compound_concentrations"]: utilGroup.compoundConcentrations,
        ["compound_concentration_names"]: compoundConcentrationNames,
        ["compound_replicates"]: utilGroup.compoundReplicates,
        ["compound_concentration_indicators"]:
          utilGroup.compound_concentration_indicators,
      },
      formUtils.onClick()
    );
    console.log(utilGroup);
    console.log(processedGroup);
  };

  const handleCompoundNamesChange = (compounds) => {
    setFormState({ ...formState, ["compound_names"]: compounds });
  };

  const handleChangeOnGroups = (listOfGroups, selected) => {
    if (listOfGroups === null) {
      setGroups({
        selectedGroup: selected,
        groups: [
          {
            id: "gr-0",
            compound_names: "",
            conc_amount: 0,
            concentration_names: "",
            compound_replicates: 0,
          },
        ],
      });
    } else {
      setGroups({ selectedGroup: selected, groups: listOfGroups });
    }
  };
  const handleArrayChange = (event) => {
    const deviations = {
      control_replicates: "integer",
      compound_concentrations: "integer",
      control_concentrations: "integer",
    };
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
  const handleControlFormChange = (key, data) => {
    setFormState({ ...formState, [key]: data });
  };
  const addControlConcentrationNames = () => {
    let matrix = [];
    let control_concentration_names = formState.control_concentration_names;
    let rows = formState.num_controls;
    let cols = Math.max(...formState.control_concentrations);
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        row.push(control_concentration_names[j]);
      }
      matrix.push(row);
    }

    setFormState({ ...formState, control_concentration_names: matrix });
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
            groupUtils={groupUtils}
            addCompoundsToState={addCompoundsToState}
            addControlConcentrationNames={addControlConcentrationNames}
          >
            <Step label="Experiment Setup">
              <ExperimentForm
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
                groupErrors={groupErrors}
                state={formState}
                groups={groups}
                handleCompoundNamesChange={handleCompoundNamesChange}
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
                handleControlFormChange={handleControlFormChange}
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
