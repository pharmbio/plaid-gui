import React from "react";
import FormPage from "./FormPage";
import InputDelimiter from "./Fields/InputDelimiter";
import ListGroupedCompounds from "./ListGroupedCompounds";
//import parse from "../../functions/parse.js"

const DEFAULT_DELIMITER = ",";

const CompoundForm = ({
  handleChangeOnGroups,
  groups
}) => {
  const [delimiter, setDelimiter] = React.useState(DEFAULT_DELIMITER);


  const handleDelimiterChange = (new_delimiter) => {

    // When the delimiter has changed => we need to re-parse the compound names that has been written to the field (if not empty)
    if (new_delimiter === "") {
      // We want to use the default delimiter if the user leaves the input field empty
      setDelimiter(DEFAULT_DELIMITER);
    } else {
      setDelimiter(new_delimiter);
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
        handleChangeOnGroups={handleChangeOnGroups}
        delimiter={delimiter}
        groups={groups.groups}
        selectedGroup={groups.selectedGroup}
      />

    </FormPage>
  );
};

export default CompoundForm;
