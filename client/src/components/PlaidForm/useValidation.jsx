import React, { useState, useEffect, useCallback } from 'react';

const validators = {
    minValidSize: function (config) {
        return function (value) {
            if (value < config.value || isNaN(value) || value === null) {
                return config.message;
            }
            return null;
        }
    },
    minValidLength: function (config) {
        return function (value) {
            if (value.length != config.value) {
                return config.message;
            }
            return null;
        }
    }
}



function validateField(fieldValue, fieldConfig, fieldStates) {
    //validatorName is for e.g minValidSize
    //fieldConfig is for e.g num_rows
    for (let validatorName in fieldConfig) { //e. gfor validator in num_rows
        const validatorConfig = fieldConfig[validatorName];
        const validator = validators[validatorName]; //select the correct validator
        const configuredValidator = validator(validatorConfig); //run the validator function, get the configured validator and pass it the field value.
        const errorMessage = configuredValidator(fieldValue,fieldStates);
        if (errorMessage) {
            return errorMessage;
        }
        return null;
    }
}

function validateFields(fieldValues, fieldStates) {
    const errors = {};
    for (let fieldName in fieldStates) { //fieldName is e.g num_rows 
        const fieldConfig = fieldStates[fieldName]; //get the values stored in key e.g num_rows.
        //  const fieldValue = fieldValues[fieldName]; //get the current values found in our large object for num_rows.
        const fieldValue = fieldValues[fieldName];
        errors[fieldName] = validateField(fieldValue, fieldConfig, fieldStates); // pass the current value and the field into the validator. Return any errors. 
        // These errors will then be displayed in the frontend.
    }
    return errors
}

/* This custom validation hook can be used for onChange validation (comment in useEffect()) and onClick validation through the formUtils function onClick.
   onClick returns an object containing every field that may or may not have passed validation.
   There's no point in using both so we select one. Implement setState(updater, callback) to support it.
*/
const useValidation = (input, config) => {
    const [errors, setErrors] = useState({})
    const [validated, setValidated] = useState(false);
    /*  useEffect(() => {
         const errors = validateFields(input, config.fields);
         setErrors(errors);
     }, [input]); */
    const formUtils = {
        onClick: () => {
            const errors = validateFields(input, config.fields);
            setErrors(errors);
            console.log(errors);
            return errors;
        }
    }
    return {
        errors: errors,
        formUtils: formUtils
    }
};

export default useValidation;