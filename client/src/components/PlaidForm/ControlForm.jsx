import React from "react";
import FormPage from "./FormPage";
import ListGroupedControls from "./ListGroupedControls";
import FormButtons from "./FormButtons/FormButtons";

const ControlForm = ({
  controlState,
  isLast,
  handleNext,
  handlePrev,
}) => {
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
              control_concentrations: "",
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
        onClickNext={() => handleNext()}
        onClickPrev={() => handlePrev()}
      />
    </FormPage>
  );
};

export default ControlForm;
