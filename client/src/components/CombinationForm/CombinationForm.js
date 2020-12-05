import React from 'react'
const CombinationForm = ({ handleInputChange }) => {
    return (<>
        <label>
            Combinations:
                  <input type="number" name='combinations' onChange={handleInputChange} />
        </label>
        <label>
            Combination names:
                  <input type="text" name='combinationNames' onChange={handleInputChange} />
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
                type="text" name='combinationConcentrationNames'  onChange={handleInputChange}
            />
        </label>
    </>
    )
}

export default CombinationForm