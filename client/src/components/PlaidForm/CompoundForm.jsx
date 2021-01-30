import React, { useState } from "react";
import FormPage from "./FormPage";
import InputNumber from "./Fields/InputNumber";
import InputDelimiter from "./Fields/InputDelimiter";
import ListGroupedCompounds from "./ListGroupedCompounds";

const DEFAULT_DELIMITER = ",";

const parse = (delimiter, str) => {
  const re = new RegExp(`/(^${delimiter})|(,$)/g`, "");
  const trim = str.replace(re, "");
  const delim = trim.split(delimiter);
  return delim;
};

const CompoundForm = ({
  errors,
  handleInputChange,
  handleArrayChange,
  state,
  handleCompoundNamesChange,
}) => {
  const [compoundNames, setCompoundNames] = useState("");
  const [concentrationNames, setConcentrationNames] = useState("");
  const [delimiter, setDelimiter] = React.useState(DEFAULT_DELIMITER);

  function inputHandler(event) {
    console.log(state.compound_names.toString());
    let name = event.target.name;
    if (name === "compound_names") {
      // handle change in field belonging to compound_names
      console.log(event.target.value);
      setCompoundNames(event.target.value);
      const parsedCompoundNames = parse(delimiter, event.target.value);
      console.log(parsedCompoundNames);
      handleCompoundNamesChange(parsedCompoundNames);
    } else if (name === "compound_concentration_names") {
      setConcentrationNames(event.target.value);
      handleArrayChange(event);
    } else {
      handleInputChange(event);
    }
  }

  const handleDelimiterChange = (new_delimiter) => {
    // When the delimiter has changed => we need to re-parse the compound names that has been written to the field (if not empty)
    if (new_delimiter === "") {
      // We want to use the default delimiter if the user leaves the input field empty
      setDelimiter(DEFAULT_DELIMITER);
    } else {
      setDelimiter(delimiter);
    }

    if (compoundNames !== "") {
      new_delimiter = new_delimiter !== "" ? new_delimiter : DEFAULT_DELIMITER;
      const parsedCompoundNames = parse(new_delimiter, compoundNames);
      console.log(parsedCompoundNames);
      handleCompoundNamesChange(parsedCompoundNames);
    }
  };

  /* 
    selectedGroup is the group selected to be visible in the form
    groups contains each group-compound-objets with copound_names, conc_amount, compound_concentration_names and replicates which is needed
    for the formstate object 
  */
  const [groups, setGroups] = useState({
    selectedGroup: 0,
    groups: [
      {
        id: "gr-0",
        compound_names: "",
        conc_amount: "",
        compound_concentration_names: "",
        replicates: "",
      },
    ],
  });

  const handleChangeOnGroups = (listOfGroups, selected) => {
    if (listOfGroups === null) {
      setGroups({
        selectedGroup: selected,
        groups: [
          {
            id: "gr-0",
            compound_names: "",
            conc_amount: "",
            compound_concentration_names: "",
            replicates: "",
          },
        ],
      });
    } else {
      setGroups({ selectedGroup: selected, groups: listOfGroups });
    }
  };

  return (
    <FormPage>
      <InputNumber
        label={"Compounds"}
        name="compounds"
        onChange={inputHandler}
        value={state.compounds ? state.compounds : ""}
        errorMsg={errors.compounds ? errors.compounds : null}
      />

      <InputDelimiter
        label={"Delimitor selection (Optional)"}
        placeholder=""
        name="delimiter_selection"
        disable={false}
        onChange={handleDelimiterChange}
        errorMsg={null}
      />

      <ListGroupedCompounds
        handleChangeOnGroups={handleChangeOnGroups}
        groups={groups.groups}
        selectedGroup={groups.selectedGroup}
      />
    </FormPage>
  );
};

export default CompoundForm;
