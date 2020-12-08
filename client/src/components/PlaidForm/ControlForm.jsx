import React from 'react'
const ControlForm = ({ handleInputChange, handleArrayChange }) => {
    return (<>
        <label>
            Number of controls:
                  <input type="number" name='num_controls' onChange={handleInputChange} />
        </label>
        <label>
            Control names:
                  <input
                type="text" name='control_names' onChange={handleArrayChange}
            />
        </label>
        <label>
            Control concentrations:
                  <input type="number" name='control_concentrations' onChange={handleInputChange} />
        </label>
        <label>
            Control concentration names:
                  <input
                type="text" name='control_concentration_names' onChange={handleArrayChange}
            />
        </label>
        <label>
            Control replicates:
                  <input
                type="text" name='control_replicates' onChange={handleArrayChange}
            />
        </label>
        <label>
            Blanks:
                  <input
                type="number" name='blanks' onChange={handleInputChange}
            />
        </label>
        <label>
            Blanks names:
                  <input
                type="text" name='blanks_names' onChange={handleInputChange}
            />
        </label>
    </>
    )
}

export default ControlForm