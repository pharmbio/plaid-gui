import React from "react";
import FormPage from "./FormPage";
import styled from "styled-components";
import InputDelimiter from "./Fields/InputDelimiter";
import ListGroupedControls from "./ListGroupedControls";
import FormButtons from "./FormButtons/FormButtons";
import parse from "../../functions/parse";
import useValidation from "./Validation/useValidation";
import utils, { hasErrors } from "./utils";

const StyledSectionLabel = styled.label`
  margin-bottom: 10px;
  margin-top: 10px;
  font-weight: bold;
  border-bottom: 1px solid black;
  font-size: 16px;
`;
const DEFAULT_DELIMITER = ",";
const setUpTheControlForm = (groupObj) => {
  let groups = groupObj.groups;
  let processedGroup;

  let utilGroup = {
    controlConcentrations: [],
    controlReplicates: [],
  };
  let map = {};

  for (let i = 0; i < groups.length; i++) {
    let controlGroup = groups[i];
    processedGroup = {
      concentration_names: [],
      control_names: [],
      replicates: 0,
    };
    for (let key in controlGroup) {
      switch (key) {
        case "control_names_parsed":
          processedGroup.control_names = controlGroup.control_names_parsed;
          break;
        case "concentration_names":
          processedGroup.concentration_names =
            controlGroup.concentration_names_parsed;
          break;
        case "control_replicates":
          processedGroup.replicates = parseInt(controlGroup.control_replicates);
          break;
        default:
          break;
      }
    }
    // fill the amount of concentrations and replicates for each control
    let concAmount = processedGroup.concentration_names.length;
    for (let j = 0; j < processedGroup.control_names.length; j++) {
      utilGroup.controlConcentrations.push(concAmount);
      utilGroup.controlReplicates.push(processedGroup.replicates);
    }
    /*
      create this hash map
     map = {controlName : [concName, concName...]} 
     */
    for (let j = 0; j < processedGroup.control_names.length; j++) {
      for (let k = 0; k < concAmount; k++) {
        if (map[processedGroup.control_names[j]] === undefined) {
          map[processedGroup.control_names[j]] = [
            processedGroup.concentration_names[k],
          ];
        } else {
          map[processedGroup.control_names[j]].push(
            processedGroup.concentration_names[k]
          );
        }
      }
    }
  }

  // the matrix
  let controlConcentrationNames = [];
  let numControls = Object.keys(map).length;
  let cols = Math.max(...utilGroup.controlConcentrations);

  for (let key in map) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      if (j > map[key].length - 1) {
        row.push("");
      } else {
        row.push(map[key][j]);
      }
    }
    controlConcentrationNames.push(row);
  }

  let controlObject = {
    num_controls: numControls,
    control_concentrations: utilGroup.controlConcentrations,
    control_replicates: utilGroup.controlReplicates,
    control_names: Object.keys(map),
    control_concentration_names: controlConcentrationNames,
    groups: groupObj,
  };
  return controlObject;
};

const ControlForm = ({
  controlState,
  handleNext,
  handlePrev,
  handleControlFormChange,
}) => {
  const [controlForm, setControlForm] = React.useState(() =>
    setUpTheControlForm(controlState.groups)
  );

  const controlConfig = {
    fields: {
      control_replicates: {
         ctrlReplicateSize: {
          value: controlForm.groups,
          message: "Number of replicates must be a number > 0",
        }, 
        ctrlNameAndReplCount: {
          value: controlForm.groups,
          message: "A replicate must be provided if a name and concentration is specified.",
        },
      },
      control_names: {
        ctrlConcEmptyName:{
          value: controlForm.groups,
          message: "There must be atleast one control name for a given concentration."
        }
      },
      concentration_names: {
        ctrlNameEmptyConc:{
          value: controlForm.groups,
          message: "There must be atleast one concentration for a given control name."
        }
      }
    },
  };

  const [errors, utils] = useValidation(controlForm, controlConfig);

  const [validating, setValidating] = React.useState(false);
  React.useEffect(() => {
    if (validating) {
      const controlErrors = utils.onClick();
      if (!hasErrors(controlErrors)) {
        let controlObj = setUpTheControlForm(controlForm.groups);
        handleControlFormChange(controlObj);
        handleNext();
      }
      setValidating(false);
    }
  }, [validating]);

  const [delimiter, setDelimiter] = React.useState(
    controlForm.groups.delimiter
      ? controlForm.groups.delimiter
      : DEFAULT_DELIMITER
  );

  const handleDelimiterChange = (new_delimiter) => {
    // When the delimiter has changed => we need to re-parse the compound names that has been written to the field (if not empty)
    if (new_delimiter === "") {
      // We want to use the default delimiter if the user leaves the input field empty
      setDelimiter(DEFAULT_DELIMITER);
    } else {
      setDelimiter(new_delimiter);
    }

    let groups = controlForm.groups;
    groups.delimiter = new_delimiter;
    for (let i in groups.groups) {
      if (groups.groups[i].control_names !== "") {
        new_delimiter =
          new_delimiter !== "" ? new_delimiter : DEFAULT_DELIMITER;
        groups.groups[i].control_names_parsed = parse(
          new_delimiter,
          groups.groups[i].control_names
        );
      }
      if (groups.groups[i].concentration_names !== "") {
        groups.groups[i].concentration_names_parsed = parse(
          new_delimiter,
          groups.groups[i].concentration_names
        );
      }
    }
    console.log(groups);
    setControlForm({ ...controlForm, groups: groups });
  };

  const handleChangeOnGroups = (groups, selected) => {
    if (groups === null) {
      setControlForm({
        ...controlForm,
        groups: {
          selectedGroup: 0,
          groups: [
            {
              id: "gr-0",
              control_names: "",
              control_names_parsed: "",
              concentration_names: "",
              concentration_names_parsed: "",
              control_replicates: 0,
            },
          ],
        },
      });
    } else {
      let newGroup = {
        groups: groups,
        selectedGroup: selected,
        delimiter: delimiter,
      };
      setControlForm({ ...controlForm, groups: newGroup });
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
      let controlObj = setUpTheControlForm(controlForm.groups);
      handleControlFormChange(controlObj);
      handlePrev();
    }
  };
  return (
    <FormPage>
      <StyledSectionLabel>Controls settings</StyledSectionLabel>
      <InputDelimiter
        label={"Delimiter selection (Optional)"}
        delimiter={delimiter}
        placeholder=""
        name="delimiter_selection"
        disable={false}
        onChange={handleDelimiterChange}
        errorMsg={null}
      />
      <StyledSectionLabel>Controls</StyledSectionLabel>
      <ListGroupedControls
        handleChangeOnGroups={handleChangeOnGroups}
        groups={controlForm.groups.groups}
        errors={errors}
        selectedGroup={controlForm.groups.selectedGroup}
        delimiter={delimiter}
      />
      <FormButtons
        step={2}
        onClickNext={() => onClick("next")}
        onClickPrev={() => onClick("prev")}
      />
    </FormPage>
  );
};

export default ControlForm;
