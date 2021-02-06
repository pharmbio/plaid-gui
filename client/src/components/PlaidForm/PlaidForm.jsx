import React, { useState } from "react";
import ExperimentForm from "./ExperimentForm";
import CompoundForm from "./CompoundForm";
import ControlForm from "./ControlForm";
import Loader from "./../Loader";
import styled from "styled-components";
import HorizontalStepper from "./HorizontalStepper";
import { Formik, Form } from "formik";

const axios = require("axios");
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  height: 60vh;
  width: 40vw;
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

  /* from the Stepper component */
  const [step, setStep] = useState(0);
  function isLast() {
    return step === 2;
  }
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (step === 1) {
      addCompoundsToState();
    } else if (step === 2) {
      addControlConcentrationNames();
    }
    setLoading(true);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

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
                handleNext={handleNext}
                handlePrev={handlePrev}
                experimentState={{
                  num_rows: formState.num_rows,
                  num_cols: formState.num_cols,
                  vertical_cell_lines: formState.vertical_cell_lines,
                  horizontal_cell_lines: formState.horizontal_cell_lines,
                  allow_empty_wells: formState.allow_empty_wells,
                  size_empty_edge: formState.size_empty_edge,
                  concentrations_on_different_rows:
                    formState.concentrations_on_different_rows,
                  concentrations_on_different_columns:
                    formState.concentrations_on_different_columns,
                  replicates_on_different_plates:
                    formState.replicates_on_different_plates,
                  replicates_on_same_plate: formState.replicates_on_same_plate,
                }}
              />
            )}
            {step === 1 && (
              <CompoundForm
                handleNext={handleNext}
                handlePrev={handlePrev}
                compoundState={{
                  compounds: formState.compounds,
                  compound_concentration_indicators:
                    formState.compound_concentration_indicators,
                  groups: {
                    selectedGroup: 0,
                    groups: [
                      {
                        id: "gr-0",
                        compound_names: "",
                        compound_names_parsed: "",
                        concentration_names: "",
                        compound_replicates: 0,
                      },
                    ],
                  },
                }}
              />
            )}
            {step === 2 && (
              <ControlForm
                handleNext={handleNext}
                handlePrev={handlePrev}
                handleControlFormChange={handleControlFormChange}
                controlState={{
                  num_controls: formState.num_controls,
                  groups: {
                    selectedGroup: 0,
                    groups: [
                      {
                        id: "gr-0",
                        control_concentrations:
                          formState.control_concentrations,
                        control_replicates: formState.control_replicates,
                        control_names: formState.control_names,
                      },
                    ],
                  },
                }}
              />
            )}
          </StyledForm>
        </Formik>
      )}
    </StyledContainer>
  );
};

export default PlaidForm;
