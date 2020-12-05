import React from "react";

const ConstraintForm = ({ handleInputChange }) => {
    return (<>
        <label>
            Allow empty wells:
              <input
                name='allowEmptyWells' type="checkbox" onChange={handleInputChange}
            />
        </label>
        <label>
            Size of empty edges:
              <input type="number" name='sizeEmptyEdge' onChange={handleInputChange} />
        </label>
    </>
    )

}

export default ConstraintForm