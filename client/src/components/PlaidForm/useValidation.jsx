import React, { useState, useEffect, useReducer } from 'react';

const validators = {
    minValidSize: function (config) {
        return function (value) {
            console.log(value);
            if (value < 1) {
                console.log('Inside!');
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
                value: 1,
                message: 'Empty edges must be a number > 0'
            }
        },
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
        console.log(fieldValue);
        console.log(validatorName);
        const errorMessage = configuredValidator(fieldValue);
        console.log(fieldValue);
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

const initialState = {}
/* TODO: Probably skip reducer for now and only implement parent-level validation. Only look att validation parts, onchange already works. */
/* Reducer that determines the type of change, submit or validation event. */
//Form validation should work directly of the object we're sending. This means it would be easy to create a validaator and simply pass it our current object, validating everything on change.
//Add the validator in the useEffect tol fire when we update the object we are sending. Value is only updated if all validators are passed. Each validation is its own function.
//The next button should not   be clickable, thus we must return an collection of current errors from the custom hook and only if this is empty can you go to the next step.
// We can then pass the updated object and a config that defines the validations.   
// to a custom hook that returns all current errors.
// Payload needs to be the event!!

//TODO NEXT: Fix this hook so that it works properly with the validatfield/fields. Then try to use it!! Should be called whenever we update values in the object.
//config can be lifted out so that user can provide his own. I dont think this is necessary for this project.
//TODO NEXT: fix validateField
const useValidation = (input) => {
    const [errors, setErrors] = useState({})
    useEffect(() => {
        const errors = validateFields(input, config.fields);
        setErrors(errors);
    }, [input]);
    console.log(errors);
    return (errors)
};

export default useValidation;