import React from 'react'
const CompoundForm = ({ handleInputChange }) => {
    return (<>
        <label>
            Compounds:
                  <input type="number" name='compounds' onChange={handleInputChange} />
        </label>
        <label>
            Compound names:
                  <input type="text" name='compoundNames' onChange={handleInputChange} />
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
                type="text" name='compoundConcentrationNames' onChange={handleInputChange}
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