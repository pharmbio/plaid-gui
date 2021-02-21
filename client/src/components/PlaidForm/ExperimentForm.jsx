import React, { useState } from "react";
import styled from "styled-components";
import FormPage from "./FormPage";
import InputNumber from "./Fields/InputNumber";
import InputSelect from "./Fields/InputSelect";
import InputCheck from "./Fields/InputCheck";
import FormButtons from "./FormButtons/FormButtons";
import useValidation from "./Validation/useValidation";
import utils, { hasErrors } from "./utils";

const StyledSectionLabel = styled.label`
  margin-bottom: 10px;
  margin-top: 10px;
  font-weight: bold;
`;

const ExperimentForm = ({
  experimentState,
  handleNext,
  handlePrev,
  handleExperimentFormChange,
}) => {

  const [experimentForm, setExperimentForm] = useState(
    experimentState);

  const ExperimentConfig = {
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
          value: experimentForm.replicates_on_same_plate,
          message:
            "Replicates on different and same plates cannot be checked at the same time",
        },
      },
      size_empty_edge: {
        minValidSize: {
          value: 0,
          message: "Empty edges must be a number >= 0",
        },
        maxEmptyEdgeSize: {
          value: {num_cols: experimentForm.num_cols, num_rows: experimentForm.num_rows},
          message: "The size of the empty edges is too large"
        }
      },
    }
  }



  const [customState, setCustomState] = useState(false);
  const [errors, utils] = useValidation(experimentForm, ExperimentConfig);
  const [validating, setValidating] = useState(false);
  React.useEffect(() => {
    if (validating) {
      const experimentErrors = utils.onClick()
      if (!hasErrors(experimentErrors)) {
        handleExperimentFormChange(experimentForm);
        handleNext();
      }
      setValidating(false);
    }
  }, [validating])




  /* Input handler for the checkbox */
  const handleChangeOfPlateSize = (event) => {

    let value = event.target.value;
    if (value === "custom") {
      setCustomState(true);
    } else {
      let obj = JSON.parse(event.target.value);
      setCustomState(false);
      setExperimentForm({
        ...experimentForm,
        num_rows: obj.num_rows,
        num_cols: obj.num_cols,
      });
    }
  };

  const handleChangeOfInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    switch (name) {
      case "num_rows":
        setExperimentForm({
          ...experimentForm,
          num_rows: parseInt(value),
        });
        break;
      case "num_cols":
        setExperimentForm({
          ...experimentForm,
          num_cols: parseInt(value),
        });
        break;
      case "vertical_cell_lines":
        setExperimentForm({
          ...experimentForm,
          [name]: parseInt(value),
        });
        break;
      case "horizontal_cell_lines":
        setExperimentForm({
          ...experimentForm,
          horizontal_cell_lines: parseInt(value),
        });
        break;
      case "allow_empty_wells":
        setExperimentForm({
          ...experimentForm,
          allow_empty_wells: !experimentForm.allow_empty_wells,
        });
        break;
      case "size_empty_edge":
        setExperimentForm({
          ...experimentForm,
          size_empty_edge: parseInt(value),
        });
        break;
      case "concentrations_on_different_columns":
        setExperimentForm({
          ...experimentForm,
          concentrations_on_different_columns: !experimentForm.concentrations_on_different_columns,
        });
        break;
      case "concentrations_on_different_rows":
        setExperimentForm({
          ...experimentForm,
          concentrations_on_different_rows: !experimentForm.concentrations_on_different_rows,
        });
        break;
      case "replicates_on_different_plates":
        setExperimentForm({
          ...experimentForm,
          replicates_on_different_plates: !experimentForm.replicates_on_different_plates,
        });
        break;
      case "replicates_on_same_plate":
        setExperimentForm({
          ...experimentForm,
          replicates_on_same_plate: !experimentForm.replicates_on_same_plate,
        });
        break;
      default:
        break;
    }
  };
  /**
   * when we click next or previous we want to process the fields and set up the state object that we eventually want to send to the API
   * @param {string} action defines the action (next or previous button)
   */
  const onClick = (action) => {
    if (action === "next") {
      setValidating(true);

    } else {
      handleExperimentFormChange(experimentForm);
      handlePrev();
    }
  };
  return (
    <FormPage>
      <StyledSectionLabel>Plate dimensions</StyledSectionLabel>
      <InputSelect
        name="select_plate_size"
        id="size_options"
        onChange={handleChangeOfPlateSize}
        onfocus="this.selectedIndex = 1;"
        label={"Plate size"}
        errorMsg={null}
      >
        <option value='{"num_rows": 6, "num_cols": 8}'>48</option>
        <option value='{"num_rows": 8, "num_cols": 12}'>96</option>
        <option value='{"num_rows": 16, "num_cols": 24}'>384</option>
        <option value='{"num_rows": 32, "num_cols": 48}'>1536</option>
        <option value='{"num_rows": 48, "num_cols": 72}'>3456</option>
        <option value="custom">Custom size</option>
      </InputSelect>

      {customState === true ? (
        <>
          <InputNumber
            name="num_rows"
            label="Rows"
            value={experimentForm.num_rows}
            onChange={handleChangeOfInput}
            errorMsg={errors.num_rows ? errors.num_rows : null}
          />
          <InputNumber
            name="num_cols"
            label="Columns"
            value={experimentForm.num_cols}
            onChange={handleChangeOfInput}
            errorMsg={errors.num_cols ? errors.num_cols : null}
          />
        </>
      ) : null}
      <StyledSectionLabel>Cell line direction </StyledSectionLabel>
      <InputNumber
        label={"Vertical"}
        name="vertical_cell_lines"
        value={experimentForm.vertical_cell_lines ? experimentForm.vertical_cell_lines : 0}
        onChange={handleChangeOfInput}
        errorMsg={errors.vertical_cell_lines ? errors.vertical_cell_lines : null}
      />

      <InputNumber
        label={"Horizontal"}
        name="horizontal_cell_lines"
        value={experimentForm.horizontal_cell_lines ? experimentForm.horizontal_cell_lines : 0}
        onChange={handleChangeOfInput}
        errorMsg={errors.horizontal_cell_lines ? errors.horizontal_cell_lines : null}
      />
      <StyledSectionLabel>Constraints</StyledSectionLabel>
      <InputCheck
        label="Allow empty wells"
        onChange={handleChangeOfInput}
        name={"allow_empty_wells"}
        value={experimentForm.allow_empty_wells}
        checked={experimentForm.allow_empty_wells}
        errorMsg={errors.allow_empty_wells ? errors.horizontal_cell_lines : null}
      />
      <InputNumber
        name="size empty_edge"
        label="Size of empty edges"
        value={experimentForm.size_empty_edge ? experimentForm.size_empty_edge : 0}
        onChange={handleChangeOfInput}
        errorMsg={errors.size_empty_edge ? errors.size_empty_edge : null}
      />
      <InputCheck
        label="Concentrations on different rows"
        onChange={handleChangeOfInput}
        name={"concentrations_on_different_rows"}
        value={experimentForm.concentrations_on_different_rows}
        checked={experimentForm.concentrations_on_different_rows}
        errorMsg={errors.concentrations_on_different_rows ? errors.concentrations_on_different_rows : null}
      />
      <InputCheck
        label="Concentrations on different columns"
        onChange={handleChangeOfInput}
        name={"concentrations_on_different_columns"}
        value={experimentForm.concentrations_on_different_columns}
        checked={experimentForm.concentrations_on_different_columns}
        errorMsg={errors.concentrations_on_different_columns ? errors.concentrations_on_different_columns : null}
      />
      <InputCheck
        label="Replicates on different plates"
        onChange={handleChangeOfInput}
        name={"replicates_on_different_plates"}
        value={experimentForm.replicates_on_different_plates}
        checked={experimentForm.replicates_on_different_plates}
        errorMsg={errors.replicates_on_different_plates ? errors.replicates_on_different_plates : null}
      />
      <InputCheck
        label="Replicates on same plate"
        onChange={handleChangeOfInput}
        name={"replicates_on_same_plate"}
        value={experimentForm.replicates_on_same_plate}
        checked={experimentForm.replicates_on_same_plate}
        errorMsg={errors.replicates_on_same_plate ? errors.replicates_on_same_plate : null}
      />
      <FormButtons
        step={0}
        onClickNext={() => onClick("next")}
        onClickPrev={() => onClick("prev")}
      />
    </FormPage>
  );
};

export default ExperimentForm;
