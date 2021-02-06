import React from "react";
import FormPage from "./FormPage";
import ListGroupedControls from "./ListGroupedControls";
import FormButtons from "./FormButtons/FormButtons";
import parse from "../../functions/parse";

const ControlForm = ({ controlState, isLast, handleNext, handlePrev }) => {
  const [controlForm, setControlForm] = React.useState(controlState);

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
              concentration_names: "",
              control_replicates: 0,
            },
          ],
        },
      });
    } else {
      let newGroup = { groups: groups, selectedGroup: selected };
      setControlForm({ ...controlForm, groups: newGroup });
    }
  };

  const setUpTheControlForm = (groups) => {
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
          case "control_names":
            processedGroup.control_names = parse(
              ",",
              controlGroup.control_names
            );
            break;
          case "concentration_names":
            processedGroup.concentration_names = parse(
              ",",
              controlGroup.concentration_names
            );
            break;
          case "control_replicates":
            processedGroup.replicates = parseInt(
              controlGroup.control_replicates
            );
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
    };
    console.log(controlObject);
  };

  /**
   * when we click next or previous we want to process the fields and set up the state object that we eventually want to send to the API
   * @param {string} action defines the action (next or previous button)
   */
  const onClick = (action) => {
    if (action === "next") {
      setUpTheControlForm(controlForm.groups.groups);
      //handleNext();
    } else {
      setUpTheControlForm(controlForm.groups.groups);
      handlePrev();
    }
  };
  return (
    <FormPage>
      <ListGroupedControls
        handleChangeOnGroups={handleChangeOnGroups}
        groups={controlForm.groups.groups}
        selectedGroup={controlForm.groups.selectedGroup}
      />
      <FormButtons
        step={2}
        isLast={isLast}
        onClickNext={() => onClick("next")}
        onClickPrev={() => onClick("prev")}
      />
    </FormPage>
  );
};

export default ControlForm;
