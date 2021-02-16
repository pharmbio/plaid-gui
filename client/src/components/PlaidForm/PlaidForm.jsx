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
  const [formState, setFormState] = useState({});

  /* prepopulate or default object */
  const [compoundForm, setCompoundForm] = useState({
    compounds: 0,
    compound_concentration_names: [], // List
    compound_concentration_indicators: [],
    compound_names: [], // List
    compound_concentrations: [],
    compound_replicates: [],

    groups:
      props.uploadedConfig &&
      props.uploadedConfig.compoundForm.groups.length > 0
        ? props.uploadedConfig.compoundForm
        : {
            delimiter: ",",
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
  });

  const handleCompoundFormChange = (obj) => {
    setCompoundForm(obj);
  };

  /* prepopulate or default object */
  const [controlForm, setControlForm] = useState({
    num_controls: 0,
    control_concentrations: [],
    control_replicates: [],
    control_names: [],
    control_concentration_names: [],
    groups:
      props.uploadedConfig && props.uploadedConfig.controlForm.groups.length > 0
        ? props.uploadedConfig.controlForm
        : {
            selectedGroup: 0,
            groups: [
              {
                id: "gr-0",
                concentration_names: "",
                control_replicates: 0,
                control_names: "",
              },
            ],
          },
  });

  const handleControlFormChange = (obj) => {
    setControlForm(obj);
  };
  /* prepopulate or default object */
  const [experimentForm, setExperimentForm] = useState(
    props.uploadedConfig
      ? props.uploadedConfig.experimentForm
      : {
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
        }
  );

  const handleExperimentFormChange = (obj) => {
    setExperimentForm(obj);
  };

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
        /*         postForm(
          formState,
          setResponseError,
          setFlightState,
          flightState,
          props.setData
        ); */
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
                experimentState={experimentForm}
                handleExperimentFormChange={handleExperimentFormChange}
              />
            )}
            {step === 1 && (
              <CompoundForm
                handleNext={handleNext}
                handlePrev={handlePrev}
                compoundState={compoundForm}
                handleCompoundFormChange={handleCompoundFormChange}
              />
            )}
            {step === 2 && (
              <ControlForm
                handleNext={handleNext}
                handlePrev={handlePrev}
                handleControlFormChange={handleControlFormChange}
                controlState={controlForm}
              />
            )}
          </StyledForm>
        </Formik>
      )}
    </StyledContainer>
  );
};

export default PlaidForm;
