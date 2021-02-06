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

  const handleCompoundFormChange = () => {};

  const handleControlFormChange = () => {};

  const handleExperimentFormChange = () => {};

  /* from the Stepper component */
  const [step, setStep] = useState(0);

  const [loading, setLoading] = useState(false);

  const handleNext = () => {
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
                        concentration_names: [],
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
