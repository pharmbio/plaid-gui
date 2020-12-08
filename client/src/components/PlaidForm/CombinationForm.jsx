import React from 'react'
const CombinationForm = ({ handleInputChange, handleArrayChange }) => {
    return (<>
        <label>
            Combinations:
                  <input type="number" name='combinations' onChange={handleInputChange} />
        </label>
        <label>
            Combination names:
                  <input type="text" name='combination_names' onChange={handleArrayChange} />
        </label>
        <label>
            Combination concentrations:
                  <input
                type="number" name='combination_concentrations' onChange={handleInputChange}
            />
        </label>
        <label>
            Combination concentration names:
                  <input
                type="text" name='combination_concentration_names'  onChange={handleArrayChange}
            />
        </label>
    </>
    )
}

export default CombinationForm