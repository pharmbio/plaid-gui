import React from 'react'
const CombinationForm = ({ handleInputChange, handleArrayChange }) => {
    return (<>
        <label>
            Combinations:
                  <input type="number" name='combinations' onChange={handleInputChange} />
        </label>
        <label>
            Combination names:
                  <input type="text" name='combinationNames' onChange={handleArrayChange} />
        </label>
        <label>
            Combination concentrations:
                  <input
                type="number" name='combinationConcentrations' onChange={handleInputChange}
            />
        </label>
        <label>
            Combination concentration names:
                  <input
                type="text" name='combinationConcentrationNames'  onChange={handleArrayChange}
            />
        </label>
    </>
    )
}

export default CombinationForm