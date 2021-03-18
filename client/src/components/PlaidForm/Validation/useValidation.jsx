import React, { useState } from "react";

const validators = {
  minValidSize: function (config) {
    return function (value) {
      if (value < config.value || isNaN(value) || value === null) {
        return config.message;
      }
      return null;
    };
  },
  minValidLength: function (config) {
    return function (value) {
      if (value.length !== config.value) {
        return config.message;
      }
      return null;
    };
  },
  isNumber: function (config) {
    return function (value) {
      for (let i = 0; i < value.length; i++) {
        if (Number.isNaN(value[i])) {
          return config.message;
        }
      }
      return null;
    };
  },
  maxNumber: function (config) {
    return function (value) {
      if (Array.isArray(value)) {
        if (config.value < Math.max(...value)) {
          return config.message;
        }
      }
      else {
        if (config.value < value) {
          return config.message
        }
      }
      return null;
    };
  },
  isAlsoChecked: function (config) {
    return function (value) {
      if (config.value === true && value === true) {
        return config.message;
      }
      return null;
    };
  },
  concNameCount: function (config) {
    return function () {
      let groups = config.value.groups;
      for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        if (group.concentration_names.trim() === "") {
          return config.message;

        }
      }
      return null;
    }
  },
  compNameCount: function (config) {
    return function () {
      let groups = config.value.groups;
      for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        console.log(group.compound_names.trim())
        if (group.compound_names.trim() === "") {
          return config.message;

        }
      }
      return null;
    }
  },
  compReplicateSize: function (config) {
    return function () {
      let groups = config.value.groups;
      for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        if (parseInt(group.compound_replicates) < 1) {
          return config.message;
        }
      }
      return null;
    }
  },
  ctrlReplicateSize: function (config) {
    return function () {
      let groups = config.value.groups;
      for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        if (parseInt(group.control_replicates) < 0) {
          return config.message;
        }
      }
      return null;
    }
  },
  ctrlNameAndReplCount: function (config) {
    return function () {
      let groups = config.value.groups;
      for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        //Om names eller conc är tom, eller om båda inte är tomma, så ska replicates vara ett tal 
        if ((group.control_names === "" && group.concentration_names === "")
          && parseInt(group.control_replicates) === 0) {
          return null;
        }

        if (((group.control_names === "" || group.concentration_names === "") || (group.control_names !== "" && group.concentration_names !== ""))
          && parseInt(group.control_replicates) < 1) {
          return config.message;
        }
      }
      return null;
    }
  },
  ctrlNameEmptyConc: function (config) {
    return function () {
      let groups = config.value.groups;
      for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        if (group.control_names !== "" && group.concentration_names === "") {
          return config.message;
        }
      }
      return null;
    }
  },
  ctrlConcEmptyName: function (config) {
    return function () {
      let groups = config.value.groups;
      for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        if (group.control_names === "" && group.concentration_names !== "") {
          return config.message;
        }
      }
      return null;
    }
  },
  ctrlNegativeReplicates: function (config) {
    return function () {
      let groups = config.value.groups;
      for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        if (parseInt(group.control_replicates) < 0) {
          return config.message;
        }
      }
      return null;
    }
  },
  maxEmptyEdgeSize: function (config) {
    return function (value) {
      const num_rows = config.value.num_rows;
      const num_cols = config.value.num_cols;
      const minVal = Math.min(num_rows, num_cols);
      if (value > Math.floor(minVal / 2)) {
        return config.message;
      }
      return null;
    }
  },
  wrongWellCount: function (config) {
    const experimentForm = config.value.experimentForm;
    const compoundForm = config.value.compoundForm;
    const controlForm = config.value.controlForm;
    return function () {

      let denom = 1;
      if (experimentForm.horizontal_cell_lines === 1 || experimentForm.vertical_cell_lines === 1) {
        denom = Math.max(experimentForm.horizontal_cell_lines, experimentForm.vertical_cell_lines);
      } else {
        denom = experimentForm.horizontal_cell_lines + experimentForm.vertical_cell_lines;
      }
      const numWells = experimentForm.num_cols * experimentForm.num_rows / denom;


      const amountEmptyWells =
        experimentForm.num_cols * experimentForm.size_empty_edge * 2 + (
          experimentForm.num_rows - experimentForm.size_empty_edge * 2) * experimentForm.size_empty_edge * 2;
      const numControlReplicates = controlForm.control_replicates.reduce((a, b) => a + b, 0);
      const numCompoundReplicates = compoundForm.compound_replicates.reduce((a, b) => a + b, 0);
      const wellsLeft = numWells - amountEmptyWells - controlForm.num_controls - numCompoundReplicates
        - compoundForm.compounds - numControlReplicates;

      if (wellsLeft < 0) {
        return config.message.tooFewWells;
      }

      if (wellsLeft > 0 && !experimentForm.allow_empty_wells) {
        return config.message.hasEmptyWells;
      }
      return null;
    }
  },
  compDuplicates: function (config) {
    return function () {
      let groups = config.value.groups;
      let noDupes = {};
      let dupes = {};
      let mergedArrays = [];
      for (let i = 0; i < groups.length; i++) {
        mergedArrays = mergedArrays.concat(groups[i].compound_names_parsed);
      }

      for (let i = 0; i < mergedArrays.length; i++) {
        if (noDupes[mergedArrays[i]] === undefined) {

          noDupes[mergedArrays[i].replace(/\(|\)/g, "")] = mergedArrays[i].replace(/\(|\)/g, "")
          noDupes['('+mergedArrays[i]+')'] = mergedArrays[i];
          noDupes[mergedArrays[i]] = mergedArrays[i];
        }
      
        else {
          dupes[mergedArrays[i]] = mergedArrays[i];
        }
      }
      if (Object.keys(dupes).length > 0) {
        let dupe_str = Object.keys(dupes).join(',');
        return config.message + `${dupe_str}`
      }
      return null;
    }
  },
  combinationDuplicates: function (config){
    return function(){
      let groups = config.value.groups;
      let mergedArrays = [];
      for (let i = 0; i < groups.length; i++) {
        mergedArrays = mergedArrays.concat(groups[i].compound_names_parsed);
      }
      for(let i = 0; i < groups.length; i++){
        if(mergedArrays[i].charAt(0) === '(' && mergedArrays[i].charAt([mergedArrays[i].length]-1) === ')'){
          for(let j = 0; j < mergedArrays[i].length; j++){
            if(/(.).*\1/.test(mergedArrays[i].split(')(').join())){
              return config.message;

            }
          }
        }
      }
      return null;
    }
  },
  ctrlDuplicates: function (config) {
    return function () {
      const groups = config.value.groups;
      let noDupes = {};
      let dupes = {};
      let mergedArrays = [];
      for (let i = 0; i < groups.length; i++) {
        mergedArrays = mergedArrays.concat(groups[i].control_names_parsed);
      }
      for (let i = 0; i < mergedArrays.length; i++) {
        if (noDupes[mergedArrays[i]] === undefined) {
          noDupes[mergedArrays[i]] = mergedArrays[i];
        }
        else {
          dupes[mergedArrays[i]] = mergedArrays[i];
        }
      }

      if (Object.keys(dupes).length > 0) {
        let dupe_str = Object.keys(dupes).join(',');
        return config.message + `${dupe_str}`
      }
      return null;
    }
  },
  isCombination: function (config) {
    return function () {
      const groups = config.value.groups;
      let mergedArrays = [];
      const regex = RegExp(/^(?<!.)[\s\t]*(\([^\(\)\s\t]+\)){1,4}(?=$)/)
      for (let i = 0; i < groups.length; i++) {
        mergedArrays = mergedArrays.concat(groups[i].compound_names_parsed);
      }
      for(let i = 0; i < mergedArrays.length; i++){
        let str = mergedArrays[i];
        if(str.includes("(") || str.includes(")")){
          if(!regex.test(str)){
            return config.message;
          }
        }
      }
      return null;
    }
  }
};


function validateField(fieldValue, fieldConfig, fieldStates) {

  for (let validatorName in fieldConfig) {
    const validatorConfig = fieldConfig[validatorName];
    const validator = validators[validatorName]; //select the correct validator
    const configuredValidator = validator(validatorConfig); //run the validator function, get the configured validator and pass it the field value.
    const errorMessage = configuredValidator(fieldValue, fieldStates);
    if (errorMessage) {
      return errorMessage;
    }
  }
  return null;
}


function validateFields(fieldValues, fieldStates) {
  const errors = {};
  for (let fieldName in fieldStates) {
    //fieldName is e.g num_rows
    const fieldConfig = fieldStates[fieldName]; //get the values stored in key e.g num_rows.
    //  const fieldValue = fieldValues[fieldName]; //get the current values found in our large object for num_rows.
    const fieldValue = fieldValues[fieldName];

    errors[fieldName] = validateField(fieldValue, fieldConfig, fieldStates); // pass the current value and the field into the validator. Return any errors.
    // These errors will then be displayed in the frontend.
  }
  return errors;
}

function validateSubmit(submitConfig) {
  const errors = {};
  for (let validatorName in submitConfig) {
    const validatorConfig = submitConfig[validatorName];
    const validator = validators[validatorName];
    const configuredValidator = validator(validatorConfig); //run the validator function, get the configured validator and pass it the field value.
    errors[validatorName] = configuredValidator();
  }
  return errors;
}

/* This custom validation hook can be used for onChange validation (comment in useEffect()) and onClick validation through the formUtils function onClick.
   onClick returns an object containing every field that may or may not have passed validation.
   There's no point in using both so we select one. Implement setState(updater, callback) to support it.
*/
const useValidation = (input = {}, config, func = null) => {
  const [errors, setErrors] = useState({});
  const formUtils = {
    onClick: () => {
      if (func) {
        input = func(input);
      }
      const submitErrors = validateSubmit(config.submit);
      const fieldErrors = validateFields(input, config.fields);
      setErrors({ ...fieldErrors, ...submitErrors });
      return { ...fieldErrors, ...submitErrors };
    },
  };
  return [
    errors,
    formUtils,
  ];
};

export default useValidation;
