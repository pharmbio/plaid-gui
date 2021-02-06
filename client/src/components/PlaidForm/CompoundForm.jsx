import React from "react";
import FormPage from "./FormPage";
import InputDelimiter from "./Fields/InputDelimiter";
import ListGroupedCompounds from "./ListGroupedCompounds";
import parse from "../../functions/parse.js";
import FormButtons from "./FormButtons/FormButtons";

const DEFAULT_DELIMITER = ",";

const CompoundForm = ({ compoundState, isLast, handleNext, handlePrev }) => {
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
  /* 
    selectedGroup is the group selected to be visible in the form
    groups contains each group-compound-objets with copound_names, conc_amount, compound_concentration_names and replicates which is needed
    for the formstate object 
  */
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
        onClickNext={() => handleNext()}
        onClickPrev={() => handlePrev()}
      />
    </FormPage>
  );
};

export default CompoundForm;
