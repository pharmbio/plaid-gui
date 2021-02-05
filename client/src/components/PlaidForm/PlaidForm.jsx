import React, { useState } from "react";
import ExperimentForm from "./ExperimentForm";
import CompoundForm from "./CompoundForm";
import ControlForm from "./ControlForm";
import Loader from "./../Loader";
import styled from "styled-components";
import HorizontalStepper from "./HorizontalStepper";
import { Formik, Form } from "formik";
import NextButton from "../Buttons/NextButton";
import PrevButton from "../Buttons/PrevButton";

const axios = require("axios");
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  height: 60vh;
  width: 40vw;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 10px;
`;

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
    compound_concentration_names: [], // List
    compound_concentration_indicators: [],
    compound_names: [], // List
    compound_concentrations: [],
    compound_replicates: [],
    num_controls: 0,
    control_concentrations: [],
    control_replicates: [], // List
    control_names: [], // List
    control_concentration_names: [], // List
  });

  const [groups, setGroups] = useState({
    selectedGroup: 0,
    groups: [
      {
        id: "gr-0",
        compound_names: "",
        concentration_names: "",
        compound_replicates: 0,
      },
    ],
  });

  const addCompoundsToState = () => {
    let processedGroup;
    let concAmount;
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

      // fill the amount of concentrations for each compound
      let concAmount = processedGroup.concentration_names.length;
      for (let j = 0; j < compoundGroup.compound_names.length; j++) {
        utilGroup.compoundConcentrations.push(concAmount);
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
    for (let j = 0; j < concAmount; j++) {
      utilGroup.compound_concentration_indicators.push("");
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

    // all the compound names
    const compoundNames = Object.keys(map);
    // amount of compounds
    const compounds = compoundNames.length;

    //run the validator here as a 2nd argument callback!! then check in stepper if no errors exist.
    // TODO removed the error thing since we are supposed to refactor
    setFormState({
      ...formState,
      compound_names: Object.keys(map),
      compounds: compounds,
      compound_concentrations: utilGroup.compoundConcentrations,
      compound_concentration_names: compoundConcentrationNames,
      compound_replicates: utilGroup.compoundReplicates,
      compound_concentration_indicators:
        utilGroup.compound_concentration_indicators,
    });
  };

  const handleCompoundNamesChange = (compounds) => {
    setFormState({ ...formState, compound_names: compounds });
  };

  const handleChangeOnGroups = (listOfGroups, selected) => {
    if (listOfGroups === null) {
      setGroups({
        selectedGroup: selected,
        groups: [
          {
            id: "gr-0",
            compound_names: "",
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

  /* from the Stepper component */
  const [step, setStep] = useState(0);
  function isLast() {
    return step === 2;
  }
  const [loading, setLoading] = useState(false);

  function handleNext() {
    if (step === 1) {
      addCompoundsToState();
    } else if (step === 2) {
      addControlConcentrationNames();
    }
    setLoading(true);
  }

  React.useEffect(() => {
    if (loading) {
      if (step !== 2) {
        setStep(step + 1);
      } else {
        postForm(
          formState,
          setResponseError,
          setFlightState,
          flightState,
          props.setData
        );
      }
    }
    setLoading(false);
  }, [loading, step]);

  return (
    <StyledContainer>
      {flightState["loading"] ? (
        <Loader />
      ) : (
        <Formik initialValues={formState}>
          <StyledForm>
            <HorizontalStepper
              currentStep={step}
              labels={[
                "Experiment Setup",
                "Compound Setup",
                "Experiment Validation",
              ]}
            />
            {step === 0 && (
                <ExperimentForm
                  handleInputChange={handleInputChange}
                  state={formState}
                />
            )}
            {step === 1 && (
                <CompoundForm
                  handleInputChange={handleInputChange}
                  handleArrayChange={handleArrayChange}
                  state={formState}
                  groups={groups}
                  handleCompoundNamesChange={handleCompoundNamesChange}
                  handleChangeOnGroups={handleChangeOnGroups}
                />
            )}
            {step === 2 && (

                <ControlForm
                  handleControlFormChange={handleControlFormChange}
                  state={formState}
                />
            )}
            <StyledButtonContainer>
              {step > 0 ? (
                <PrevButton type="button" onClick={() => setStep(step - 1)} />
              ) : null}
              <NextButton
                type="button"
                isLast={isLast()}
                onClick={() => handleNext()}
              />
            </StyledButtonContainer>
          </StyledForm>
        </Formik>
      )}
    </StyledContainer>
  );
};

export default PlaidForm;
