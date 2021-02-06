import React, { useState } from "react";
import styled from "styled-components";
import FormPage from "./FormPage";
import InputNumber from "./Fields/InputNumber";
import InputSelect from "./Fields/InputSelect";
import InputCheck from "./Fields/InputCheck";
import FormButtons from "./FormButtons/FormButtons";

const StyledSectionLabel = styled.label`
  margin-bottom: 10px;
  margin-top: 10px;
  font-weight: bold;
`;

const ExperimentForm = ({
  experimentState,
  isLast,
  handleNext,
  handlePrev,
}) => {
  const [experimentForm, setExperimentForm] = useState(experimentState);
  const [customState, setCustomState] = useState(false);

  /* Input handler for the checkbox */
  const handleChangeOfPlateSize = (value) => {
    if (value === "custom") {
      setCustomState(true);
    } else {
      let obj = JSON.parse(value);
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
          vertical_cell_lines: parseInt(value),
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

  return (
    <FormPage>
      <StyledSectionLabel>Plate dimensions</StyledSectionLabel>
      <InputSelect
        name="select_plate_size"
        id="size_options"
        value={`{"num_rows": ${experimentForm.num_rows}, "num_cols":${experimentForm.num_cols}}`}
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
            errorMsg={null}
          />
          <InputNumber
            name="num_cols"
            label="Columns"
            value={experimentForm.num_cols}
            onChange={handleChangeOfInput}
            errorMsg={null}
          />
        </>
      ) : null}
      <StyledSectionLabel>Cell line direction </StyledSectionLabel>
      <InputNumber
        label={"Vertical"}
        name="vertical_cell_lines"
        value={experimentForm.vertical_cell_lines}
        onChange={handleChangeOfInput}
        errorMsg={null}
      />

      <InputNumber
        label={"Horizontal"}
        name="horizontal_cell_lines"
        value={experimentForm.horizontal_cell_lines}
        onChange={handleChangeOfInput}
        errorMsg={""}
      />
      <StyledSectionLabel>Constraints</StyledSectionLabel>
      <InputCheck
        label="Allow empty wells"
        onChange={handleChangeOfInput}
        name={"allow_empty_wells"}
        value={experimentForm.allow_empty_wells}
        errorMsg={null}
      />
      <InputNumber
        name="size_empty_edge"
        label="Size of empty edges"
        value={experimentForm.size_empty_edge}
        onChange={handleChangeOfInput}
        errorMsg={null}
      />
      <InputCheck
        label="concentrations_on_different_rows"
        onChange={handleChangeOfInput}
        name={"concentrations_on_different_rows"}
        value={experimentForm.concentrations_on_different_rows}
        errorMsg={""}
      />
      <InputCheck
        label="concentrations_on_different_columns"
        onChange={handleChangeOfInput}
        name={"concentrations_on_different_columns"}
        value={experimentForm.concentrations_on_different_columns}
        errorMsg={""}
      />
      <InputCheck
        label="replicates_on_different_plates"
        onChange={handleChangeOfInput}
        name={"replicates_on_different_plates"}
        value={experimentForm.replicates_on_different_plates}
        errorMsg={""}
      />
      <InputCheck
        label="replicates_on_same_plate"
        onChange={handleChangeOfInput}
        name={"replicates_on_same_plate"}
        value={experimentForm.replicates_on_same_plate}
        errorMsg={null}
      />
      <FormButtons
        isLast={isLast}
        step={0}
        onClickNext={() => handleNext()}
        onClickPrev={() => handlePrev()}
      />
    </FormPage>
  );
};

export default ExperimentForm;
