import React from 'react'
const ControlForm = ({ handleInputChange, handleArrayChange }) => {
    return (<>
        <label>
            Number of controls:
                  <input type="number" name='numControls' onChange={handleInputChange} />
        </label>
        <label>
            Control names:
                  <input
                type="text" name='controlNames' onChange={handleInputChange}
            />
        </label>
        <label>
            Control concentrations:
                  <input type="number" name='controlConcentrations' onChange={handleInputChange} />
        </label>
        <label>
            Control concentration names:
                  <input
                type="text" name='controlConcentrationNames' onChange={handleInputChange}
            />
        </label>
        <label>
            Control replicates:
                  <input
                type="text" name='controlReplicates' onChange={handleInputChange}
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
                type="text" name='blanksNames' onChange={handleInputChange}
            />
        </label>
    </>
    )
}

export default ControlForm