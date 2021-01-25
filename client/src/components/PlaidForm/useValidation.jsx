import React, { useState, useEffect, useCallback } from 'react';

const validators = {
    minValidSize: function (config) {
        return function (value) {
            if (value < config.value || isNaN(value) || value === null) {
                return config.message;
            }
            return null;
        }
    }
}
/* Validation rules are placed here */
const config = {
    fields: {
        num_rows: {
            minValidSize: {
                value: 1,
                message: 'Rows must be a number > 0'
            },
        },
        num_cols: {
            minValidSize: {
                value: 1,
                message: 'Columns must be a number > 0'
            }
        },
        vertical_cell_lines: {
            minValidSize: {
                value: 1,
                message: 'Cell line must be a number > 0'
            }
        },
        horizontal_cell_lines: {
            minValidSize: {
                value: 1,
                message: 'Cell line must be a number > 0'
            }
        },
        size_empty_edge: {
            minValidSize: {
                value: 0,
                message: 'Empty edges must be a number >= 0'
            }
        },
        compounds: {
            minValidSize: {
                value: 1,
                message: 'Compounds must be a number > 0'
            }
        }
    },
    selects: {
        select_plate_size: {}
    },
    checkbox: {
        allow_empty_wells: {},
    }
}

function validateField(fieldValue, fieldConfig) {
    //validatorName is for e.g minValidSize
    //fieldConfig is for e.g num_rows
    for (let validatorName in fieldConfig) { //e. gfor validator in num_rows
        const validatorConfig = fieldConfig[validatorName];
        const validator = validators[validatorName]; //select the correct validator
        const configuredValidator = validator(validatorConfig); //run the validator function, get the configured validator and pass it the field value.
        const errorMessage = configuredValidator(fieldValue);
        if (errorMessage) {
            return errorMessage;
        }
        return null;
    }
}

function validateFields(fieldValues, fieldConfigs) {
    const errors = {};
    for (let fieldName in fieldConfigs) { //fieldName is e.g num_rows 
        const fieldConfig = fieldConfigs[fieldName]; //get the values stored in key e.g num_rows.
        //  const fieldValue = fieldValues[fieldName]; //get the current values found in our large object for num_rows.
        const fieldValue = fieldValues[fieldName];
        errors[fieldName] = validateField(fieldValue, fieldConfig); // pass the current value and the field into the validator. Return any errors. 
        // These errors will then be displayed in the frontend.
    }
    return errors
}

/* This custom validation hook can be used for onChange validation (comment in useEffect()) and onClick validation through the formUtils function onClick.
   onClick returns an object containing every field that may or may not have passed validation.
   There's no point in using both so we select one. 
*/
const useValidation = (input) => {
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