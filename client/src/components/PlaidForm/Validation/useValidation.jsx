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
      if (config.value < Math.max(...value)) {
        return config.message;
      }
      return null;
    };
  },
  isAlsoChecked: function (config) {
    return function (value) {
      if (config.value == true && value == true) {
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
        if (group.concentration_names === "") {
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
        if (group.compound_names === "") {
          return config.message;

        }
      }
      return null;
    }
  },
  compNegativeReplicates: function (config) {
    return function () {
      let groups = config.value.groups;
      for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        if (parseInt(group.compound_replicates) < 0) {
          return config.message;
        }
      }
      return null;
    }
  },
  ctrlNameCount: function (config) {
    return function () {
      let groups = config.value.groups;
      for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        if (group.control_names === "") {
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
  hasEmptyWells: function (config) {
    console.log(config.value.compoundForm)
    console.log(config.value.controlForm);

    const experimentForm = config.value.experimentForm;
    const compoundForm = config.value.compoundForm;
    const controlForm = config.value.controlForm;
    return function () {
      const amountEmptyWells =
        experimentForm.num_cols * experimentForm.size_empty_edge * 2 + (
          experimentForm.num_rows - experimentForm.size_empty_edge * 2) * experimentForm.size_empty_edge * 2;

      const numWells = experimentForm.num_cols * experimentForm.num_rows;
      const numControlReplicates = controlForm.control_replicates.reduce((a,b) => a+b,0);
      const numCompoundReplicates = compoundForm.compound_replicates.reduce((a,b) => a+b,0);
      const minConcAmount = numWells - amountEmptyWells - controlForm.num_controls - numCompoundReplicates
        - compoundForm.compounds - numControlReplicates;
      if (minConcAmount > 0 && !experimentForm.hasEmptyWells) {
        console.log('returned');
        return config.message;
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

function validateSubmit(submitConfig){
  const errors = {};
  for(let validatorName in submitConfig){
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
      setErrors({...fieldErrors, ...submitErrors});
      return {...fieldErrors, ...submitErrors};
    },
  };
  return [
    errors,
    formUtils,
  ];
};

export default useValidation;
