import React from 'react'
const CompoundForm = ({ handleInputChange, handleArrayChange }) => {
    return (<>
        <label>
            Compounds:
                  <input type="number" name='compounds' onChange={handleInputChange} />
        </label>
        <label>
            Compound names:
                  <input type="text" name='compoundNames' onChange={handleArrayChange} />
        </label>
        <label>
            Compound concentrations:
                  <input
                type="number" name='compoundConcentrations' onChange={handleInputChange}
            />
        </label>
        <label>
            Compound concentration names:
                  <input
                type="text" name='compoundConcentrationNames' onChange={handleArrayChange}
            />
        </label>
        <label>
            Replicates
                  <input
                type="number" name='replicates' onChange={handleInputChange}
            />
        </label>
    </>
    )
}

export default CompoundForm