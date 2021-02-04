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

const List = (props) => {
  const handleOnGroupClick = (event, groupIndex) => {
    props.handleChangeOnGroups(props.groups, groupIndex);
  };

  const handleOnAddButtonClick = (event) => {
    event.preventDefault();
    let newId = "gr-" + props.groups.length;
    let newObj = {
      id: newId,
      compound_names: "",
      conc_amount: 0,
      concentration_names: "",
      replicates: 0,
    };
    let items = props.groups;
    items.push(newObj);

    // handle change in groups and focus on the newly added group
    props.handleChangeOnGroups(items, items.length - 1);
  };

  const handleOnRemoveButtonClick = (event) => {
    event.preventDefault();
    let items = [...props.groups];
    if (items.length === 1) {
      props.handleChangeOnGroups(null, 0);
    } else {
      items.splice(props.selectedGroup, 1);

      //update ids
      for (var i = 0; i < items.length; i++) {
        items[i].id = "gr-" + i;
      }
      //handle the updated group list and refocus on the first group after removing a group
      props.handleChangeOnGroups(items, 0);
    }
  };

  const handleOnInputChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    if (name === 'compound_names') {
      console.log(props.delimiter)
      value = props.parse(props.delimiter, value)
      console.log(value);
    }

    let items = [...props.groups];
    let item = { ...items[props.selectedGroup], [name]: value };

    // need to update the list aswell
    items[props.selectedGroup] = item;

    props.handleChangeOnGroups(items, props.selectedGroup);
  };
  console.log(props.groups[props.selectedGroup].compound_names)

  return (
    <StyledRowContainer>
      <FormPage>
        <InputTextArea
          label={"Compound names"}
          placeholder=""
          name="compound_names"
          onChange={handleOnInputChange}
          value={props.groups[props.selectedGroup].compound_names}
          disable={false}
          errorMsg={props.errors.compound_names ? props.errors.compound_names : null}
        />

        <InputNumber
          label={"Amount of concentrations"}
          placeholder=""
          name="conc_amount"
          onChange={handleOnInputChange}
          value={props.groups[props.selectedGroup].conc_amount}
          errorMsg={props.groupErrors.conc_amount ? props.groupErrors.conc_amount : null}
        />

        <InputTextArea
          label={"Concentration names"}
          placeholder=""
          name="concentration_names"
          onChange={handleOnInputChange}
          value={props.groups[props.selectedGroup].concentration_names}
          disable={false}
          errorMsg={props.groupErrors.concentration_names ? props.groupErrors.concentration_names : null}
        />
        <InputNumber
          label={"Replicates"}
          name="compound_replicates"
          onChange={handleOnInputChange}
          value={props.groups[props.selectedGroup].compound_replicates}
          errorMsg={null}
        />
      </FormPage>
      <StyledRowContainer>
        <StyledSelect
          id="select_group"
          name="select_group"
          value={props.selectedGroup}
          onChange={(event) => {
            handleOnGroupClick(props.groups, event.target.value);
          }}
        >
          {props.groups.map((obj, index) => {
            return (
              <option
                onClick={(event) => handleOnGroupClick(event, index)}
                id={obj.id}
                key={obj.id}
                value={index}
              >
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

export default List;
