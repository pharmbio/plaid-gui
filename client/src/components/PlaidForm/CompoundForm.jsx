import React from "react";
import FormPage from "./FormPage";
import InputDelimiter from "./Fields/InputDelimiter";
import ListGroupedCompounds from "./ListGroupedCompounds";
import parse from "../../functions/parse.js";
import FormButtons from "./FormButtons/FormButtons";

const DEFAULT_DELIMITER = ",";

const CompoundForm = ({
  compoundState,
  isLast,
  handleNext,
  handlePrev,
  handleCompoundFormChange,
}) => {
  const [compoundForm, setCompoundForm] = React.useState(compoundState);

  const [delimiter, setDelimiter] = React.useState(DEFAULT_DELIMITER);

  const handleDelimiterChange = (new_delimiter) => {
    // When the delimiter has changed => we need to re-parse the compound names that has been written to the field (if not empty)
    if (new_delimiter === "") {
      // We want to use the default delimiter if the user leaves the input field empty
      setDelimiter(DEFAULT_DELIMITER);
    } else {
      setDelimiter(new_delimiter);
    }

    let groups = compoundForm.groups;
    for (let i in groups.groups) {
      if (groups.groups[i].compound_names !== "") {
        new_delimiter =
          new_delimiter !== "" ? new_delimiter : DEFAULT_DELIMITER;
        groups.groups[i].compound_names_parsed = parse(
          new_delimiter,
          groups.groups[i].compound_names
        );
      }
    }
    console.log(groups);
    setCompoundForm({ ...compoundForm, groups: groups });
  };

  const handleChangeOnGroups = (groups, selected) => {
    if (groups === null) {
      setCompoundForm({
        ...compoundForm,
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
      });
    } else {
      let newGroup = { groups: groups, selectedGroup: selected };
      setCompoundForm({ ...compoundForm, groups: newGroup });
    }
  };

  const setUpTheCompoundForm = (groups) => {
    let processedGroup;

    // will hold the replicates array and compound concentrations numbers from each group
    let utilGroup = {
      compoundConcentrations: [],
      compoundReplicates: [],
      compound_concentration_indicators: [],
    };

    let map = {};
    for (let i = 0; i < groups.length; i++) {
      let compoundGroup = groups[i];
      processedGroup = {
        compound_names: [],
        concentration_names: [],
        replicates: 0,
      };
      for (let key in compoundGroup) {
        switch (key) {
          case "compound_names_parsed":
            processedGroup.compound_names = compoundGroup.compound_names_parsed;
            break;
          case "compound_replicates":
            processedGroup.replicates = parseInt(
              compoundGroup.compound_replicates
            );
            break;
          case "concentration_names":
            processedGroup.concentration_names = parse(
              ",",
              compoundGroup.concentration_names
            );
            break;
          default:
            break;
        }
      }

      // fill the amount of concentrations and replicates for each compound
      let concAmount = processedGroup.concentration_names.length;
      for (let j = 0; j < processedGroup.compound_names.length; j++) {
        utilGroup.compoundConcentrations.push(concAmount);
        utilGroup.compoundReplicates.push(processedGroup.replicates);
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

    // TODO this is suposed to be removed from the model right?
    for (let j = 0; j < Math.max(...utilGroup.compoundConcentrations); j++) {
      utilGroup.compound_concentration_indicators.push("");
    }
    // the matrix
    let compoundConcentrationNames = [];
    // the dimensions of the matrix
    let cols = Math.max(...utilGroup.compoundConcentrations);
    // amount of keys in map  === amount of compounds == rows

    for (let key in map) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        if (j > map[key].length - 1) {
          row.push("");
        } else {
          row.push(map[key][j]);
        }
      }
      compoundConcentrationNames.push(row);
    }

    // all the compound names
    const compoundNames = Object.keys(map);
    // amount of compounds
    const compounds = compoundNames.length;

    let compoundObject = {
      compound_names: compoundNames,
      compounds: compounds,
      compound_concentrations: utilGroup.compoundConcentrations,
      compound_concentration_names: compoundConcentrationNames,
      compound_replicates: utilGroup.compoundReplicates,
      compound_concentration_indicators:
        utilGroup.compound_concentration_indicators,
      groups: compoundForm.groups,
    };
    console.log(compoundObject);
    return compoundObject;
  };
  /**
   * when we click next or previous we want to process the fields and set up the state object that we eventually want to send to the API
   * @param {string} action defines the action (next or previous button)
   */
  const onClick = (action) => {
    if (action === "next") {
      let compoundObj = setUpTheCompoundForm(compoundForm.groups.groups);
      handleCompoundFormChange(compoundObj);
      handleNext();
    } else {
      let compoundObj = setUpTheCompoundForm(compoundForm.groups.groups);
      handleCompoundFormChange(compoundObj);
      handlePrev();
    }
  };

  return (
    <FormPage>
      <InputDelimiter
        label={"Delimitor selection (Optional)"}
        placeholder=""
        name="delimiter_selection"
        disable={false}
        onChange={handleDelimiterChange}
        errorMsg={null}
      />
      <ListGroupedCompounds
        delimiter={delimiter}
        handleChangeOnGroups={handleChangeOnGroups}
        groups={compoundForm.groups.groups}
        selectedGroup={compoundForm.groups.selectedGroup}
      />
      <FormButtons
        isLast={isLast}
        step={1}
        onClickNext={() => onClick("next")}
        onClickPrev={() => onClick("prev")}
      />
    </FormPage>
  );
};

export default CompoundForm;
