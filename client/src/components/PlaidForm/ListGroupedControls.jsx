import React from "react";
import styled from "styled-components";
import { BiPlus } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";
import InputTextArea from "./Fields/InputTextArea";
import InputNumber from "./Fields/InputNumber";
import FormPage from "./FormPage";

const StyledSelect = styled.select`
  margin: 5px;
  margin-left: 20px;
  min-width: 80px;
  height: 20px;
  color: gray;
  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

const StyledButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  margin-left: 5px;
  align-self: center;
`;

const StyledRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const ListGroupedControls = ({
  groups,
  errors,
  handleChangeOnGroups,
  selectedGroup,
}) => {
  const handleOnGroupClick = (event) => {
    handleChangeOnGroups(groups, event.target.value);
  };

  const handleOnAddButtonClick = (event) => {
    event.preventDefault();
    let newId = "gr-" + groups.length;
    let newObj = {
      id: newId,
      control_names: "",
      concentration_names: "",
      control_replicates: 0,
    };
    let items = groups;
    items.push(newObj);

    // handle change in groups and focus on the newly added group
    handleChangeOnGroups(items, items.length - 1);
  };

  const handleOnRemoveButtonClick = (event) => {
    event.preventDefault();
    let items = [...groups];
    if (items.length === 1) {
      handleChangeOnGroups(null, 0);
    } else {
      items.splice(selectedGroup, 1);

      //update ids
      for (var i = 0; i < items.length; i++) {
        items[i].id = "gr-" + i;
      }
      //handle the updated group list and refocus on the first group after removing a group
      handleChangeOnGroups(items, items.length - 1);
    }
  };

  const handleOnInputChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    let items = [...groups];
    let item = {
      ...items[selectedGroup],
      [name]: value,
    };

    // need to update the list aswell
    items[selectedGroup] = item;

    handleChangeOnGroups(items, selectedGroup);
  };
  return (
    <StyledRowContainer>
      <FormPage>
        <InputTextArea
          label={"Control names"}
          placeholder=""
          name="control_names"
          onChange={handleOnInputChange}
          value={groups[selectedGroup].control_names}
          disable={false}
          errorMsg={errors.control_names ? errors.control_names : null}
        />
        <InputTextArea
          label={"Concentration names"}
          placeholder=""
          name="concentration_names"
          onChange={handleOnInputChange}
          value={groups[selectedGroup].concentration_names}
          disable={false}
          errorMsg={errors.concentration_names ? errors.concentration_names : null}
        />
        <InputNumber
          label={"Replicates"}
          name="control_replicates"
          onChange={handleOnInputChange}
          value={groups[selectedGroup].control_replicates}
          errorMsg={errors.control_replicates ? errors.control_replicates : null}
        />
      </FormPage>

      <StyledRowContainer>
        <StyledSelect
          id="select_group"
          name="select_group"
          value={selectedGroup}
          onChange={(event) => {
            handleOnGroupClick(event);
          }}
        >
          {groups.map((obj, index) => {
            return (
              <option id={obj.id} key={obj.id} value={index}>
                {"Group " + (index + 1)}
              </option>
            );
          })}
        </StyledSelect>
        <StyledButton title="Add new group" onClick={handleOnAddButtonClick}>
          <BiPlus />
        </StyledButton>
        <StyledButton
          title="Remove selected group"
          onClick={handleOnRemoveButtonClick}
        >
          <RiDeleteBin2Line />
        </StyledButton>
      </StyledRowContainer>
    </StyledRowContainer>
  );
};

export default ListGroupedControls;
